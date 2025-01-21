import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  AlertTriangle, DollarSign, Package, TrendingUp, 
  Plus, Grid, List
} from "lucide-react";
import { mockProducts } from "../mocks/productData";
import StatCard from "../components/common/StatsCard";
import ProductsTable from "../components/products/ProductsTable";
import AddProductForm from "../components/products/AddProductForm";
import ProductFilters from "../components/products/ProductFilters";
import BulkActions from "../components/products/BulkActions";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import ProductCard from "../components/products/ProductCard";

// API URL configuration
const API_CONFIG = {
  url: import.meta.env.VITE_API_URL || '/api',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true'
};

const ProductsPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [data, setData] = useState(API_CONFIG.useMockData ? mockProducts : []);
  const [view, setView] = useState('table'); // 'table' or 'grid'
  const [filters, setFilters] = useState({
    category: 'all',
    stock: 'all',
    status: 'all',
    sort: 'name'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        if (API_CONFIG.useMockData) {
          setData(mockProducts);
          return;
        }

        const response = await fetch(`${API_CONFIG.url}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const productsData = await response.json();
        setData(productsData);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setData(mockProducts);
        setError('Using sample data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter data with useMemo
  const filteredData = useMemo(() => {
    return data.filter(product => {
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (filters.stock === 'low' && product.stock > 10) return false;
      if (filters.stock === 'out' && product.stock === 0) return false;
      return true;
    });
  }, [data, filters]);

  // Calculate stats data
  const statsData = useMemo(() => [
    {
      name: "Total Products",
      icon: Package,
      value: data.length.toString(),
      change: "+12.5%",
      trend: "up",
      description: "48 new this month",
      color: "#6366F1",
      bgGradient: "from-indigo-500/10 to-transparent"
    },
    {
      name: "Top Selling",
      icon: TrendingUp,
      value: "89",
      change: "+23.1%",
      trend: "up", 
      description: "↑ 12 from last month",
      color: "#10B981",
      bgGradient: "from-emerald-500/10 to-transparent"
    },
    {
      name: "Low Stock",
      icon: AlertTriangle,
      value: "23",
      change: "-5.2%",
      trend: "down",
      description: "5 need restock",
      color: "#F59E0B", 
      bgGradient: "from-amber-500/10 to-transparent"
    },
    {
      name: "Total Revenue",
      icon: DollarSign,
      value: "$543,210",
      change: "+18.7%",
      trend: "up",
      description: "$98k this month",
      color: "#EF4444",
      bgGradient: "from-red-500/10 to-transparent"
    }
  ], [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <ErrorMessage message={error} />
      </div>
    );
  }

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    setIsLoading(true);
    try {
      switch(action) {
        case 'delete':
          // Delete logic
          break;
        case 'archive':
          // Archive logic
          break;
        case 'export':
          // Export logic
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // Handle product selection
  const handleProductSelect = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsData.map((stat) => (
            <StatCard key={stat.name} {...stat} />
          ))}
        </div>

        {/* Management Tools */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <ProductFilters 
            filters={filters}
            setFilters={setFilters}
          />
          <BulkActions 
            selectedProducts={selectedProducts}
            onAction={handleBulkAction}
            loading={isLoading}
          />
        </div>

        {/* View Toggle & Content */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-100">Products Management</h1>
                <p className="text-gray-400 text-sm mt-1">Manage your product inventory</p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center gap-2 p-1 bg-gray-800/50 rounded-lg">
                  <button
                    onClick={() => setView('table')}
                    className={`p-2 rounded-lg ${view === 'table' ? 
                      'bg-gray-700/50 text-gray-100' : 
                      'text-gray-400 hover:text-gray-300'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg ${view === 'grid' ? 
                      'bg-gray-700/50 text-gray-100' : 
                      'text-gray-400 hover:text-gray-300'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                </div>

                {/* Add Product Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddProduct(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 
                    rounded-xl text-white font-medium transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </motion.button>
              </div>
            </div>
          </div>

          {view === 'table' ? (
            <ProductsTable 
              data={filteredData}
              filters={filters}
              currentPage={currentPage}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              onPageChange={setCurrentPage}
              loading={isLoading}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onSelect={() => handleProductSelect(product.id)}
                  isSelected={selectedProducts.includes(product.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {showAddProduct && (
          <AddProductForm 
            onClose={() => setShowAddProduct(false)}
          />
        )}
      </main>
    </div>
  );
};

export default ProductsPage;