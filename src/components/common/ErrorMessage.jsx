import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import PropTypes from 'prop-types';

const ErrorMessage = ({ 
  message, 
  details, 
  onRetry,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex flex-col items-center justify-center p-6 
        bg-gray-800/40 backdrop-blur-sm rounded-xl 
        border border-red-500/20 ${className}
      `}
    >
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-100 mb-2 text-center">
        {message || "An error occurred"}
      </h3>
      
      {details && (
        <p className="text-sm text-gray-400 text-center mb-4 max-w-md">
          {details}
        </p>
      )}

      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 
            bg-gray-700/50 hover:bg-gray-600/50 
            rounded-lg text-gray-200 text-sm font-medium
            transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  details: PropTypes.string,
  onRetry: PropTypes.func,
  className: PropTypes.string
};

export default ErrorMessage;