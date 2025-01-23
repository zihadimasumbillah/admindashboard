import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Grid, List, Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { mockProducts } from "../mocks/productData";
import ProductFilters from "../components/products/ProductFilters";
import ProductCard from "../components/products/ProductCard";
import ProductsTable from "../components/products/ProductsTable";
import AddProductForm from "../components/products/AddProductForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import StatsCard from "../components/common/StatsCard";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ProductsPage = () => {
  // States
  const [view, setView] = useState('table');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  // Remove the state if it's not being used
  const isSidebarOpen = true;
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    stock: 'all',
    sort: 'name'
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending'
  });

  // Update product fetching logic
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Always use mock data
        setData(mockProducts);
      } catch (err) {
        setError(err.message);
        setData(mockProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Memoized handlers
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setSortConfig({
      key: newFilters.sort === 'price-asc' || newFilters.sort === 'price-desc' 
        ? 'price' 
        : newFilters.sort,
      direction: (newFilters.sort === 'price-asc' || newFilters.sort === 'name') 
        ? 'ascending' 
        : 'descending'
    });
  }, []);

  // Update handleSort callback
  const handleSort = useCallback((config) => {
    setSortConfig(config);
    setFilters(prev => ({
      ...prev,
      sort: config.key === 'price' 
        ? config.direction === 'ascending' ? 'price-asc' : 'price-desc'
        : config.key
    }));
  }, []);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    const filtered = data.filter(product => {
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filters.category === 'all' || 
        product.category === filters.category;
      const matchesStock = filters.stock === 'all' || 
        (filters.stock === 'in' && product.stock > 10) ||
        (filters.stock === 'low' && product.stock > 0 && product.stock <= 10) ||
        (filters.stock === 'out' && product.stock === 0);
      
      return matchesSearch && matchesCategory && matchesStock;
    });

    // Unified sorting logic for both views
    return [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });
  }, [data, searchQuery, filters]);

  // Export handler - after filteredProducts is defined
  const handleExport = useCallback((type) => {
    const exportData = filteredProducts.map(p => ({
      Name: p.name,
      Category: p.category,
      Stock: p.stock,
      Price: `$${p.price.toFixed(2)}`,
      Sales: p.sales
    }));

    if (type === 'pdf') {
      const doc = new jsPDF();
      doc.autoTable({
        head: [['Name', 'Category', 'Stock', 'Price', 'Sales']],
        body: exportData.map(item => Object.values(item)),
        theme: 'grid',
        styles: { 
          font: 'helvetica',
          textColor: [50, 50, 50],
          lineColor: [200, 200, 200]
        },
        headStyles: {
          fillColor: [60, 60, 60],
          textColor: [250, 250, 250]
        }
      });
      doc.save('products.pdf');
    } else if (type === 'excel') {
      const headers = ['Name', 'Category', 'Stock', 'Price', 'Sales'];
      const csvContent = [
        headers.join(','),
        ...exportData.map(item => Object.values(item).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'products.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }, [filteredProducts]); // Depend on filteredProducts to maintain sort order

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      name: "Total Products",
      value: data.length.toString(),
      change: "+12.5%",
      changeType: "positive",
      trend: "up", 
      icon: Package,
      description: "Active products",
      color: "#6366F1",
      bgGradient: "from-indigo-500/10 to-transparent"
    },
    {
      name: "Revenue",
      value: "$45,231",
      change: "+8.2%",
      changeType: "positive",
      trend: "up",
      icon: DollarSign, 
      description: "This month",
      color: "#10B981",
      bgGradient: "from-emerald-500/10 to-transparent"
    },
    {
      name: "Low Stock",
      value: "12",
      change: "-2.1%",
      changeType: "negative",
      trend: "down",
      icon: AlertTriangle,
      description: "Items need restock",
      color: "#F59E0B",
      bgGradient: "from-amber-500/10 to-transparent"
    },
    {
      name: "Growth Rate",
      value: "+18.5%",
      change: "+5.2%",
      changeType: "positive",
      trend: "up",
      icon: TrendingUp,
      description: "vs. last month",
      color: "#EC4899", 
      bgGradient: "from-pink-500/10 to-transparent"
    }
  ], [data.length]);

  // Product operations
  const handleAddProduct = useCallback(async (product) => {
    try {
      const newProduct = {
        ...product,
        id: Date.now(),
        price: parseFloat(product.price) || 0,
        stock: parseInt(product.stock) || 0,
        sales: parseInt(product.sales) || 0 // Ensure sales is initialized
      };
      setData(prev => [...prev, newProduct]);
      setShowAddProduct(false);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleUpdateProduct = useCallback(async (updatedProduct) => {
    try {
      setData(prev => 
        prev.map(p => p.id === updatedProduct.id ? {
          ...updatedProduct,
          price: parseFloat(updatedProduct.price),
          stock: parseInt(updatedProduct.stock),
          sales: parseInt(updatedProduct.sales || 0) // Ensure sales is included
        } : p)
      );
      setEditingProduct(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleDeleteProduct = useCallback(async (productId) => {
    try {
      setData(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen pb-8">
      <div className={`
        mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6
        transition-all duration-300
        ${isSidebarOpen 
          ? 'max-w-[1440px] md:max-w-[calc(100vw-280px)]' 
          : 'max-w-[1440px] md:max-w-[calc(100vw-120px)]'}
      `}>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show" 
          className="grid grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.name}
              variants={itemVariants}
              className="w-full"
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Container */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
          {/* Search & Controls Container */}
          <div className="p-3 sm:p-4 border-b border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search and Actions Group */}
              <div className="flex flex-1 flex-col sm:flex-row items-center gap-3">
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                  {/* Search Container - Updated classes */}
                  <div className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] lg:min-w-[840px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600/50 
                          rounded-xl text-gray-100 placeholder:text-gray-400 
                          focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    </div>
                  </div>

                  {/* View Toggle and Actions - Keep existing code */}
                  <div className="flex items-center gap-2 ml-auto">
                    <ProductFilters 
                      filters={filters}
                      setFilters={handleFilterChange}
                      categories={[...new Set(data.map(p => p.category))]}
                      onExport={handleExport}
                      className="w-auto"
                    />
                    
                    {/* Actions Group */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAddProduct(true)}
                      className="p-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>

                    {/* View Toggle */}
                    <div className="flex items-center bg-gray-700/50 rounded-xl p-1">
                      <button
                        onClick={() => setView('grid')}
                        className={`p-2 rounded-lg ${view === 'grid' ? 'bg-gray-600 text-gray-100' : 'text-gray-400'}`}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setView('table')}
                        className={`p-2 rounded-lg ${view === 'table' ? 'bg-gray-600 text-gray-100' : 'text-gray-400'}`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Display */}
          <div className="w-full">
            {view === 'grid' ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className={`
                  p-3 sm:p-4 grid gap-4 md:gap-5 justify-items-center
                  grid-cols-1 sm:grid-cols-2 
                  ${isSidebarOpen 
                    ? 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' 
                    : 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'}
                `}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onEdit={() => setEditingProduct(product)}
                    onDelete={() => handleDeleteProduct(product.id)}
                    custom={index}
                  />
                ))}
              </motion.div>
            ) : (
              // Updated table container with proper overflow handling
              <div className="max-w-[90vw] overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full">
                    <ProductsTable 
                      products={filteredProducts}
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                      onEdit={setEditingProduct}
                      onDelete={handleDeleteProduct}
                      sortConfig={sortConfig}
                      onSort={handleSort}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {(showAddProduct || editingProduct) && (
            <AddProductForm 
              product={editingProduct}
              onClose={() => {
                setShowAddProduct(false);
                setEditingProduct(null);
              }}
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsPage;