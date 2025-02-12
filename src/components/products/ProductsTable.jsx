import { memo, useCallback, useMemo } from 'react';
import { ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const ProductsTable = memo(({ 
  products, 
  onEdit, 
  onDelete, 
  sortConfig, 
  onSort 
}) => {
  

 

  // Memoize sort icon
  const getSortIcon = useCallback((columnName) => {
    if (!sortConfig || sortConfig.key !== columnName) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  }, [sortConfig]);

  // Memoize sorted products
  const sortedProducts = useMemo(() => {
    if (!sortConfig) return products;
    
    return [...products].sort((a, b) => {
      const direction = sortConfig.direction === 'ascending' ? 1 : -1;
      
      switch (sortConfig.key) {
        case 'name':
          return direction * a.name.localeCompare(b.name);
        case 'price':
          return direction * (a.price - b.price);
        case 'stock':
          return direction * (a.stock - b.stock);
        default:
          return 0;
      }
    });
  }, [products, sortConfig]);

  const handleSort = useCallback((columnName) => {
    onSort({
      key: columnName,
      direction: sortConfig?.key === columnName && sortConfig?.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    });
  }, [onSort, sortConfig]);

  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-700/50">
        <thead className="text-xs md:text-sm text-gray-300 uppercase bg-gray-800/50">
          <tr>
           

            {/* Image header */}
            <th scope="col" className="px-4 sm:px-6 py-4 w-[100px] font-medium">
              Image
            </th>

            {/* Product Name header */}
            <th 
              scope="col"
              className="pl-8 sm:pl-6 pr-4 sm:pr-6 py-4 min-w-[200px] text-left font-medium cursor-pointer hover:bg-gray-700/50"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center gap-1">
                Product Name
                {getSortIcon('name')}
              </div>
            </th>

            {/* Category header */}
            <th scope="col" className="px-6 py-4 min-w-[120px] text-left font-medium">
              Category
            </th>

            {/* Stock header */}
            <th 
              scope="col"
              className="px-6 py-4 min-w-[100px] text-left font-medium cursor-pointer hover:bg-gray-700/50"
              onClick={() => handleSort('stock')}
            >
              <div className="flex items-center gap-1">
                Stock
                {getSortIcon('stock')}
              </div>
            </th>

            {/* Price header */}
            <th 
              scope="col"
              className="px-6 py-4 min-w-[100px] text-left font-medium cursor-pointer hover:bg-gray-700/50"
              onClick={() => handleSort('price')}
            >
              <div className="flex items-center gap-1">
                Price
                {getSortIcon('price')}
              </div>
            </th>

            {/* Sales header */}
            <th scope="col" className="p-2 min-w-[80px] text-left">
              Sales
            </th>

            {/* Actions header */}
            <th scope="col" className="px-6 py-4 w-[100px] text-right font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700/50 bg-gray-800/20">
          <AnimatePresence>
            {sortedProducts.map(product => (
              <motion.tr 
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gray-800/20 backdrop-blur-sm hover:bg-gray-800/40 text-sm md:text-base"
              >
               
                <td className="px-4 sm:px-6 py-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="pl-8 sm:pl-6 pr-4 sm:pr-6 py-4">
                  <div className="font-medium text-gray-200">{product.name}</div>
                </td>
                <td className="px-6 py-4 text-gray-300">{product.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap
                    ${product.stock === 0 
                      ? 'bg-red-500/10 text-red-400'
                      : product.stock < 10 
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-emerald-500/10 text-emerald-400'
                    }`}
                  >
                    {product.stock === 0 ? 'Out of Stock' :
                     product.stock < 10 ? 'Low Stock' :
                     `${product.stock} in Stock`}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {product.sales}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-lg bg-gray-700/50 hover:bg-indigo-500/50 
                        text-gray-300 hover:text-indigo-400 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(product.id)}
                      className="p-2 rounded-lg bg-gray-700/50 hover:bg-red-500/50 
                        text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
});

ProductsTable.displayName = 'ProductsTable';

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    sales: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  })).isRequired,
  selectedProducts: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['ascending', 'descending'])
  }),
  onSort: PropTypes.func.isRequired
};

export default ProductsTable;