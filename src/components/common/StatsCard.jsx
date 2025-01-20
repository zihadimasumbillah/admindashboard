import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ name, icon: Icon, value, change, trend, description, color, bgGradient }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gray-800/40 backdrop-blur-sm p-2.5 sm:p-3 md:p-4"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${bgGradient} opacity-20`} />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5 md:mb-2">
          <span className="text-[9px] sm:text-xs md:text-sm font-medium text-gray-400">
            {name}
          </span>
          <span className="p-1 sm:p-1.5 md:p-2 lg:p-2.5 rounded-lg" 
            style={{ backgroundColor: `${color}20`, color }}
          >
            <Icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </span>
        </div>

        {/* Value */}
        <div className="mt-0.5 sm:mt-1 flex items-baseline">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-100">
            {value}
          </p>
          <span className={`ml-1 flex items-center text-[8px] sm:text-xs md:text-sm font-medium ${
            trend === 'up' ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {trend === 'up' ? (
              <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />
            )}
            {change}
          </span>
        </div>

        {/* Description */}
        <p className="mt-0.5 text-[8px] sm:text-[10px] md:text-xs text-gray-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

StatsCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  change: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down']).isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  bgGradient: PropTypes.string.isRequired,
};

export default StatsCard;