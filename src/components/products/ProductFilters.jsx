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
      className="flex-1"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        {/* Category & Stock Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 
              bg-gray-800/50 border border-gray-700/50 rounded-xl"
          >
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full sm:w-auto bg-transparent text-sm text-gray-300 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </motion.div>

          <motion.select
            whileHover={{ scale: 1.02 }}
            value={filters.stock}
            onChange={handleStockChange}
            className="w-full sm:w-auto px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 
              rounded-xl text-sm text-gray-300 focus:outline-none"
          >
            {stockOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </motion.select>
        </div>

        {/* Sort & Export Options */}
        <div className="flex items-center gap-4">
          <motion.select
            whileHover={{ scale: 1.02 }}
            value={filters.sort}
            onChange={handleSortChange}
            className="w-full sm:w-auto px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 
              rounded-xl text-sm text-gray-300 focus:outline-none"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </motion.select>

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExportPDF}
              className="p-2.5 flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 
                rounded-xl text-gray-300 hover:bg-gray-700/50 transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline">PDF</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExportExcel}
              className="p-2.5 flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 
                rounded-xl text-gray-300 hover:bg-gray-700/50 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Excel</span>
            </motion.button>
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