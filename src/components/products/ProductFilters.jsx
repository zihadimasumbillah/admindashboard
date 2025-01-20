import { Filter } from "lucide-react";
import PropTypes from 'prop-types';

const ProductFilters = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-300">Filters:</span>
      </div>
      
      <select 
        className="bg-gray-700/50 text-gray-200 text-sm rounded-lg px-3 py-1.5 border border-gray-600/50"
        value={filters.category}
        onChange={(e) => setFilters({...filters, category: e.target.value})}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="accessories">Accessories</option>
      </select>

      <select 
        className="bg-gray-700/50 text-gray-200 text-sm rounded-lg px-3 py-1.5 border border-gray-600/50"
        value={filters.stock}
        onChange={(e) => setFilters({...filters, stock: e.target.value})}
      >
        <option value="all">All Stock</option>
        <option value="in_stock">In Stock</option>
        <option value="low_stock">Low Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>

      <select 
        className="bg-gray-700/50 text-gray-200 text-sm rounded-lg px-3 py-1.5 border border-gray-600/50"
        value={filters.status}
        onChange={(e) => setFilters({...filters, status: e.target.value})}
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="draft">Draft</option>
        <option value="archived">Archived</option>
      </select>
    </div>
  );
};
ProductFilters.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    stock: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  setFilters: PropTypes.func.isRequired
};

export default ProductFilters;