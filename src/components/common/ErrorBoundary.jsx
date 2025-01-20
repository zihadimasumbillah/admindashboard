import { Component } from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/20"
          >
            <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-100 mb-2">Something went wrong</h1>
            <p className="text-gray-400 text-center mb-6 max-w-md">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 
                text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;