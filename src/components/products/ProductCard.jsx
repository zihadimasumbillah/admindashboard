import { Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

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
      ? { color: 'amber', text: `Low Stock (${product.stock})` }
      : { color: 'emerald', text: `${product.stock} in Stock` };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      custom={custom}
      whileHover={{ 
        rotateY: 180,
        transition: {
          duration: 0.8,
          ease: "easeInOut"
        }
      }}
      style={{
        perspective: 2000,
        transformStyle: "preserve-3d"
      }}
      className="group relative w-full max-w-sm h-[300px] sm:h-[400px] 
        transition-all duration-300"
    >
      {/* Front Face */}
      <motion.div
        style={{ backfaceVisibility: "hidden" }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="relative h-full w-full bg-gray-800/40 backdrop-blur-sm rounded-xl 
          border border-gray-700/50 overflow-hidden">
          <div className="h-full w-full">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
            <h3 className="text-base sm:text-lg font-medium text-gray-100 line-clamp-1">
              {product.name}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Back Face */}
      <motion.div
        style={{ 
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)"
        }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="h-full w-full p-4 sm:p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl 
          border border-gray-700/50 flex flex-col gap-4 sm:gap-6"
        >
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(product)}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-700/50 hover:bg-indigo-500/90 
                text-gray-300 hover:text-white shadow-lg backdrop-blur-sm
                transition-all duration-300 border border-gray-600/50"
            >
              <Edit className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(product.id)}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-700/50 hover:bg-red-500/90 
                text-gray-300 hover:text-white shadow-lg backdrop-blur-sm
                transition-all duration-300 border border-gray-600/50"
            >
              <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </motion.button>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-100 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">{product.category}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xl sm:text-2xl font-bold text-indigo-400">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className={`
                px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium w-fit
                bg-${stockStatus.color}-500/10 text-${stockStatus.color}-400
                border border-${stockStatus.color}-500/20
              `}>
                {stockStatus.text}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-400">
                Total Sales: {product.sales}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
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