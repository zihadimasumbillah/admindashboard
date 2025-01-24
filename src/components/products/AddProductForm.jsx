import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import PropTypes from 'prop-types';

const AddProductForm = ({ product, onClose, onSubmit }) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: product?.name ?? '',
    category: product?.category ?? 'Electronics',
    price: product?.price ? parseFloat(product.price).toString() : '0',
    stock: product?.stock ? parseInt(product.stock).toString() : '0',
    sales: product?.sales ? parseInt(product.sales).toString() : '0',
    image: product?.image ?? '',
    imageUrl: product?.imageUrl ?? ''
  });
  const [preview, setPreview] = useState(formData.image || formData.imageUrl || '');
  const [isDragging, setIsDragging] = useState(false);
  const [imageSource, setImageSource] = useState(formData.imageUrl ? 'url' : 'upload');

  const handleImageUrl = useCallback((url) => {
    const newUrl = url ?? '';
    setFormData(prev => ({
      ...prev,
      image: '',
      imageUrl: newUrl
    }));
    setPreview(newUrl);
  }, []);

  const handleImageSourceChange = useCallback((source) => {
    setImageSource(source);
    setFormData(prev => ({
      ...prev,
      image: '',
      imageUrl: ''
    }));
    setPreview('');
  }, []);

  const handleImageChange = useCallback((file) => {
    if (file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result ?? '';
        setPreview(result);
        setFormData(prev => ({
          ...prev,
          image: result,
          imageUrl: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value ?? '' 
    }));
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageChange(file);
    }
  }, [handleImageChange]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  
  const handleNumericInput = useCallback((e, field) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setFormData(prev => ({ ...prev, [field]: val }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      ...formData,
      id: product?.id || Date.now(),
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      sales: parseInt(formData.sales) || 0,
      image: formData.image || formData.imageUrl || ''
    };
    onSubmit(submittedData);
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
          rounded-2xl w-full max-w-xl relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-lg 
              hover:bg-gray-700/50 text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-semibold text-gray-100 mb-6">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>

          {/* Scrollable form content */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto 
            scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/40">
            <form onSubmit={handleSubmit} className="space-y-6 pr-2">
              {/* Image Source Toggle */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => handleImageSourceChange('upload')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    imageSource === 'upload' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-700/50 text-gray-300'
                  }`}
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => handleImageSourceChange('url')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    imageSource === 'url' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-700/50 text-gray-300'
                  }`}
                >
                  Image URL
                </button>
              </div>

              {imageSource === 'upload' ? (
                /* Image Upload Section */
                <div
                  className={`
                    relative h-[180px] w-full rounded-xl overflow-hidden
                    border-2 border-dashed transition-colors duration-200
                    ${isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-600/50 bg-gray-700/50'}
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4 space-y-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <p className="text-sm text-gray-400 text-center">
                        Drag & drop an image here, or click to select
                      </p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                  />
                </div>
              ) : (
                /* Image URL Input */
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => handleImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 
                      rounded-xl text-gray-100 placeholder:text-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                  {formData.imageUrl && (
                    <div className="relative h-[200px] mt-4">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview"
                        className="h-full mx-auto object-contain rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={e => handleInputChange('name', e.target.value)}
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
                  onChange={e => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 
                    rounded-xl text-gray-100 focus:outline-none 
                    focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Sports">Sports</option>
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
                  onChange={(e) => handleNumericInput(e, 'price')}
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
                  onChange={(e) => handleNumericInput(e, 'stock')}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 
                    rounded-xl text-gray-100 placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Sales
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.sales}
                  onChange={(e) => handleNumericInput(e, 'sales')}
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
          </div>
        </div>
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