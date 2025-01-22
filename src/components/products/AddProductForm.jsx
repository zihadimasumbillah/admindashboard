import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

const AddProductForm = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center 
        bg-gray-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 
          rounded-2xl p-6 w-full max-w-md relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg 
            hover:bg-gray-700/50 text-gray-400 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-100 mb-6">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Product Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 
                rounded-xl text-gray-100 placeholder:text-gray-400 
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Category
            </label>
            <select
              required
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 
                rounded-xl text-gray-100 focus:outline-none 
                focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Price
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 
                rounded-xl text-gray-100 placeholder:text-gray-400 
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Stock
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.stock}
              onChange={e => setFormData({...formData, stock: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 
                rounded-xl text-gray-100 placeholder:text-gray-400 
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Image URL
            </label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={e => setFormData({...formData, image: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 
                rounded-xl text-gray-100 placeholder:text-gray-400 
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 
              text-white rounded-xl font-medium transition-colors 
              shadow-lg shadow-indigo-500/25"
          >
            {product ? 'Update Product' : 'Add Product'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

AddProductForm.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AddProductForm;