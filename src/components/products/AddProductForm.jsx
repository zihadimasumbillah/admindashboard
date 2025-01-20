import { motion } from "framer-motion";
import { X } from "lucide-react";
import PropTypes from 'prop-types';

const AddProductForm = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-800 rounded-2xl border border-gray-700 p-6 w-full max-w-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Add New Product</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400 hover:text-gray-300" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
            <input
              type="text"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100"
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
              <input
                type="number"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
              <input
                type="number"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100">
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100"
              rows="3"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
AddProductForm.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AddProductForm;