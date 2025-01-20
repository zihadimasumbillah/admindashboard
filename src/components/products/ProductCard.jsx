import { motion } from "framer-motion";
import { Edit, Trash2, ShoppingCart } from "lucide-react";
import PropTypes from 'prop-types';

const ProductCard = ({ product, onSelect, isSelected }) => {
  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'bg-red-500/10 text-red-400', text: 'Out of Stock' };
    if (stock < 10) return { color: 'bg-amber-500/10 text-amber-400', text: 'Low Stock' };
    return { color: 'bg-emerald-500/10 text-emerald-400', text: 'In Stock' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative bg-gray-800/40 backdrop-blur-sm rounded-xl border
        ${isSelected ? 'border-indigo-500/50' : 'border-gray-700/50'}
        hover:border-indigo-500/50 transition-all duration-300
      `}
    >
      {/* Quick Actions */}
      <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
          onClick={() => onSelect(product.id)}
        >
          <Edit className="w-4 h-4" />
        </button>
        <button 
          className="p-2 rounded-lg bg-gray-700/50 hover:bg-red-500/50 text-gray-300 hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square rounded-t-xl overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-gray-100 font-medium line-clamp-1">{product.name}</h3>
            <p className="text-gray-400 text-sm">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-100 font-medium">${product.price}</p>
            <p className="text-gray-400 text-sm">{product.sales} sales</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
          {product.stock > 0 && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 
              hover:bg-indigo-500/20 text-indigo-400 text-sm font-medium transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    sales: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default ProductCard;