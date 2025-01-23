import { memo, useCallback } from 'react';
import { Filter, FileText, Download } from 'lucide-react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ProductFilters = memo(({ filters, setFilters, categories, onExport }) => {
  // Memoize handlers
  const handleCategoryChange = useCallback((e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  }, [setFilters]);

  const handleStockChange = useCallback((e) => {
    setFilters(prev => ({ ...prev, stock: e.target.value }));
  }, [setFilters]);

  const handleSortChange = useCallback((e) => {
    const value = e.target.value;
    setFilters(prev => ({ 
      ...prev, 
      sort: value,
      sortDirection: value === 'price-asc' || value === 'stock' ? 'ascending' : 'descending'
    }));
  }, [setFilters]);

  // Update stock filter options
  const stockOptions = [
    { value: 'all', label: 'All Stock' },
    { value: 'in', label: 'In Stock (>10)' },
    { value: 'low', label: 'Low Stock (1-10)' },
    { value: 'out', label: 'Out of Stock (0)' }
  ];

  // Add sort options
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'stock', label: 'Stock Level: High to Low' }
  ];

  // Add export handlers
  const handleExportPDF = () => {
    onExport('pdf');
  };

  const handleExportExcel = () => {
    onExport('excel');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-1 items-center gap-4"
    >
      {/* Main Sort Dropdown */}
      <div className="relative group w-full sm:w-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 
            bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-300"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
          </div>
        </motion.button>

        {/* Dropdown Menu */}
        <div className="absolute top-full left-0 mt-2 w-56 p-2 
          bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl 
          shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible 
          transition-all duration-200 z-50"
        >
          {/* Categories */}
          <div className="p-2">
            <label className="block text-xs text-gray-400 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full px-2 py-1.5 bg-gray-700/50 border border-gray-600/50 
                rounded-lg text-sm text-gray-300 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div className="p-2">
            <label className="block text-xs text-gray-400 mb-1">Stock Level</label>
            <select
              value={filters.stock}
              onChange={handleStockChange}
              className="w-full px-2 py-1.5 bg-gray-700/50 border border-gray-600/50 
                rounded-lg text-sm text-gray-300 focus:outline-none"
            >
              {stockOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="p-2">
            <label className="block text-xs text-gray-400 mb-1">Sort By</label>
            <select
              value={filters.sort}
              onChange={handleSortChange}
              className="w-full px-2 py-1.5 bg-gray-700/50 border border-gray-600/50 
                rounded-lg text-sm text-gray-300 focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Export Options */}
          <div className="p-2 border-t border-gray-700/50 mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPDF}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 
                  bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm text-gray-300 
                  transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </button>
              <button
                onClick={handleExportExcel}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 
                  bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm text-gray-300 
                  transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Excel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProductFilters.displayName = 'ProductFilters';

ProductFilters.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string.isRequired,
    stock: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onExport: PropTypes.func.isRequired
};

export default ProductFilters;