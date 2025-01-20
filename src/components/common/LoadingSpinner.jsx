import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = "md", color = "primary", showText = true }) => {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const colors = {
    primary: "border-indigo-500",
    secondary: "border-purple-500",
    white: "border-white"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`
          ${sizes[size]} 
          border-2 
          border-gray-700/50 
          rounded-full
          ${colors[color]} 
          border-t-transparent
        `}
      />
      {showText && (
        <p className="text-sm text-gray-400">Loading...</p>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.oneOf(["primary", "secondary", "white"]),
  showText: PropTypes.bool
};

export default LoadingSpinner;