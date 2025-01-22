import { Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Add animation variants
const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    y: 50,
    scale: 0.8,
    transition: {
      duration: 0.4,
      delay: index * 0.1,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }),
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.1,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  })
};

const ProductCard = ({ product, onEdit, onDelete, custom }) => {
  const stockStatus = product.stock === 0 
    ? { color: 'red', text: 'Out of Stock' }
    : product.stock < 10 
      ? { color: 'amber', text: 'Low Stock' }
      : { color: 'emerald', text: 'In Stock' };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      custom={custom}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-gray-800/40 backdrop-blur-sm rounded-xl 
        border border-gray-700/50 overflow-hidden hover:border-indigo-500/50 
        transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-gray-100 font-medium line-clamp-1">{product.name}</h3>
            <p className="text-gray-400 text-sm">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-100 font-medium">${product.price.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">{product.sales} sales</p>
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <span className={`
            px-2.5 py-1 rounded-lg text-xs font-medium
            bg-${stockStatus.color}-500/10 text-${stockStatus.color}-400
          `}>
            {stockStatus.text}
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="absolute top-3 right-3 flex items-center gap-2 
        opacity-0 group-hover:opacity-100 transition-all duration-200 
        transform translate-y-2 group-hover:translate-y-0"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onEdit}
          className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 
            text-gray-300 transition-colors"
        >
          <Edit className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          className="p-2 rounded-lg bg-gray-700/50 hover:bg-red-500/50 
            text-gray-300 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
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
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  custom: PropTypes.number.isRequired
};

export default ProductCard;