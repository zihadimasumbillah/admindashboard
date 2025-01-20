import PropTypes from 'prop-types';

const BulkActions = ({ selectedProducts, onAction, loading }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
      <span className="text-sm text-gray-300">
        {selectedProducts.length} items selected
      </span>
      
      <button 
        className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
        onClick={() => onAction('delete')}
        disabled={loading || selectedProducts.length === 0}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
      
      <button 
        className="px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
        onClick={() => onAction('archive')}
        disabled={loading || selectedProducts.length === 0}
      >
        {loading ? 'Archiving...' : 'Archive'}
      </button>
      
      <button 
        className="px-3 py-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50"
        onClick={() => onAction('export')}
        disabled={loading || selectedProducts.length === 0}
      >
        {loading ? 'Exporting...' : 'Export'}
      </button>
    </div>
  );
};

BulkActions.propTypes = {
  selectedProducts: PropTypes.array.isRequired,
  onAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default BulkActions;