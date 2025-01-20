import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  AlertTriangle, DollarSign, Package, TrendingUp, 
  Plus,
} from "lucide-react";
// Add this import at the top
import { mockProducts } from "../mocks/productData";
import StatCard from "../components/common/StatsCard";
import SalesTrendChart from "../components/products/SalesTrendChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import ProductsTable from "../components/products/ProductsTable";
import AddProductForm from "../components/products/AddProductForm";
import ProductFilters from "../components/products/ProductFilters";
import BulkActions from "../components/products/BulkActions";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import ProductCard from "../components/products/ProductCard";

const ProductsPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: 'all',
    stock: 'all',
    status: 'all',
    sort: 'name'
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        // Use mock data if enabled in environment
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
          setTimeout(() => {
            setData(mockProducts);
            setIsLoading(false);
          }, 500);
          return;
        }

        // Real API call using environment URL
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const productsData = await response.json();
        setData(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(product => {
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (filters.stock === 'low' && product.stock > 10) return false;
      if (filters.stock === 'out' && product.stock > 0) return false;
      return true;
    });
  }, [data, filters]);

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

  // Stats data with more dynamic info
  const statsData = [
    {
      name: "Total Products",
      icon: Package,
      value: "1,234",
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
  ];

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

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle sort
  const handleSort = (sortBy) => {
    setFilters(prev => ({ ...prev, sort: sortBy }));
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
        {/* Enhanced Header */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-100">Products Management</h1>
              <p className="text-gray-400 text-sm mt-1">Manage your product inventory and track performance</p>
            </div>
            
            <div className="flex items-center gap-3">
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

        {/* Stats Grid with Loading State */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          {statsData.map((stat) => (
            <StatCard 
              key={stat.name}
              {...stat}
              loading={isLoading}
            />
          ))}
        </motion.div>

        {/* Management Tools */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <ProductFilters 
            filters={filters}
            setFilters={setFilters}
            onSort={handleSort}
          />
          <BulkActions 
            selectedProducts={selectedProducts}
            onAction={handleBulkAction}
            loading={isLoading} // Add loading prop
          />
        </div>

        {/* Products Table */}
        <ProductsTable 
          filters={filters}
          currentPage={currentPage}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onPageChange={handlePageChange}
          loading={isLoading}
          data={filteredData} // Pass filteredData prop
        />

        {/* Product Grid View (optional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredData.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onSelect={() => handleProductSelect(product.id)}
              isSelected={selectedProducts.includes(product.id)}
            />
          ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>

        {/* Add/Edit Product Modal */}
        {showAddProduct && (
          <AddProductForm 
            onClose={() => setShowAddProduct(false)}
            onSubmit={async (formData) => {
              setIsLoading(true);
              try {
                await fetch('/api/products', {
                  method: 'POST',
                  body: JSON.stringify(formData)
                });
              } catch (error) {
                console.error('Failed to add product:', error);
              }
              setIsLoading(false);
              setShowAddProduct(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default ProductsPage;