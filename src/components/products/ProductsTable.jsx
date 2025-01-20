import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import PropTypes from 'prop-types';

// Subcomponents
const SearchInput = ({ onSearch }) => (
  <div className="relative w-full sm:w-72">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search products..."
      className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
};

const TableActions = ({ selectedCount, onEdit, onDelete, isLoading }) => (
  <div className="flex items-center gap-2">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg transition-colors duration-200 ${
        selectedCount === 0 
          ? 'bg-gray-800/30 text-gray-500 cursor-not-allowed'
          : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-gray-300'
      }`}
      onClick={onEdit}
      disabled={selectedCount === 0 || isLoading}
    >
      <Edit className="w-4 h-4" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg transition-colors duration-200 ${
        selectedCount === 0 
          ? 'bg-gray-800/30 text-red-500/50 cursor-not-allowed'
          : 'bg-gray-800/50 hover:bg-red-500/20 text-red-400 hover:text-red-300'
      }`}
      onClick={onDelete}
      disabled={selectedCount === 0 || isLoading}
    >
      <Trash2 className="w-4 h-4" />
    </motion.button>
    {selectedCount > 0 && (
      <span className="text-sm text-gray-400 ml-2">
        {selectedCount} selected
      </span>
    )}
  </div>
);

TableActions.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

TableActions.defaultProps = {
  isLoading: false
};

const TableHeader = ({ onSelectAll, selectedProducts }) => (
  <thead>
    <tr>
      <th className="p-4">
        <input
          type="checkbox"
          checked={selectedProducts.length > 0}
          onChange={onSelectAll}
          className="rounded border-gray-700/50"
        />
      </th>
      <th className="p-4 text-left text-sm font-medium text-gray-400">Product</th>
      <th className="p-4 text-left text-sm font-medium text-gray-400">Category</th>
      <th className="p-4 text-left text-sm font-medium text-gray-400">Price</th>
      <th className="p-4 text-left text-sm font-medium text-gray-400">Stock</th>
      <th className="p-4 text-left text-sm font-medium text-gray-400">Sales</th>
    </tr>
  </thead>
);

TableHeader.propTypes = {
  onSelectAll: PropTypes.func.isRequired,
  selectedProducts: PropTypes.array.isRequired
};

const TableBody = ({ products, selectedProducts, onSelect, loading }) => (
  <tbody className="divide-y divide-gray-700/50">
    {loading ? (
      <tr><td colSpan="6" className="text-center py-4 text-gray-400">Loading...</td></tr>
    ) : (
      products.map(product => (
        <tr key={product.id}>
          <td className="p-4">
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => onSelect(product.id)}
              className="rounded border-gray-700/50"
            />
          </td>
          <td className="p-4 text-gray-100">{product.name}</td>
          <td className="p-4 text-gray-400">{product.category}</td>
          <td className="p-4 text-gray-100">${product.price}</td>
          <td className="p-4 text-gray-400">{product.stock}</td>
          <td className="p-4 text-gray-400">{product.sales}</td>
        </tr>
      ))
    )}
  </tbody>
);

TableBody.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      sales: PropTypes.number.isRequired
    })
  ).isRequired,
  selectedProducts: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center gap-2 mt-4">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => onPageChange(i + 1)}
        className={`px-3 py-1 rounded-lg ${
          currentPage === i + 1 
            ? 'bg-indigo-500 text-white' 
            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
        }`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,  
  onPageChange: PropTypes.func.isRequired
};

const ProductsTable = ({ 
  filters, 
  currentPage,
  selectedProducts,
  setSelectedProducts,
  onPageChange,
  loading,
  data // Add data prop
}) => {
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const paginatedProducts = useMemo(() => {
    if (!data) return [];
    
    return data
      .filter(product => {
        // Apply filters
        if (filters.category !== 'all' && product.category !== filters.category) return false;
        if (filters.stock === 'low' && product.stock > 10) return false;
        if (filters.stock === 'out' && product.stock === 0) return false;
        
        // Apply search
        return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product.category.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [currentPage, searchTerm, data, filters]);

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  const handleSelectAll = () => {
    if (selectedProducts.length > 0) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };

  const handleSelect = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <motion.div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <SearchInput onSearch={setSearchTerm} />
        <TableActions 
          selectedCount={selectedProducts.length} 
          onEdit={() => console.log('Edit')} 
          onDelete={() => console.log('Delete')} 
          isLoading={loading} 
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <TableHeader 
            onSelectAll={handleSelectAll}
            selectedProducts={selectedProducts}
          />
          <TableBody 
            products={paginatedProducts}
            selectedProducts={selectedProducts}
            onSelect={handleSelect}
            loading={loading}
          />
        </table>
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </motion.div>
  );
};

ProductsTable.propTypes = {
  filters: PropTypes.object,
  currentPage: PropTypes.number.isRequired,
  selectedProducts: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    sales: PropTypes.number.isRequired
  }))
};

export default ProductsTable;