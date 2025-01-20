import { motion } from "framer-motion";
import { Package, TrendingUp, RefreshCcw, BarChart2 } from 'lucide-react';

const ProductAnalytics = () => {
  return (
    <motion.div 
      className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-purple-500/10 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-purple-500/20">
              <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
            </div>
            <h2 className="text-sm sm:text-base md:text-lg font-medium text-gray-100">
              Product Analytics
            </h2>
          </div>
          <select className="text-xs sm:text-sm bg-gray-700/50 text-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Card 1 */}
          <div className="relative bg-gradient-to-br from-gray-700/30 via-gray-700/20 to-gray-700/30 rounded-xl p-3 sm:p-4 overflow-hidden group hover:from-gray-700/40 hover:to-gray-700/40 transition-all duration-300">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                  <span className="text-xs sm:text-sm text-gray-400">Low Stock Items</span>
                </div>
                <span className="text-sm sm:text-base font-medium text-red-400">12</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-gray-600/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-400"
                  initial={{ width: 0 }}
                  animate={{ width: '30%' }}
                />
              </div>
              <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-400">
                5 items need immediate restock
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-gradient-to-br from-gray-700/30 via-gray-700/20 to-gray-700/30 rounded-xl p-3 sm:p-4 overflow-hidden group hover:from-gray-700/40 hover:to-gray-700/40 transition-all duration-300">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm text-gray-400">Top Rated Products</span>
                </div>
                <span className="text-sm sm:text-base font-medium text-emerald-400">85%</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-gray-600/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                />
              </div>
              <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-400">
                32 products rated above 4.5
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-gradient-to-br from-gray-700/30 via-gray-700/20 to-gray-700/30 rounded-xl p-3 sm:p-4 overflow-hidden group hover:from-gray-700/40 hover:to-gray-700/40 transition-all duration-300">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <RefreshCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
                  <span className="text-xs sm:text-sm text-gray-400">Returns Rate</span>
                </div>
                <span className="text-sm sm:text-base font-medium text-yellow-400">3.2%</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-gray-600/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: '15%' }}
                />
              </div>
              <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-400">
                Decreased by 1.2% this month
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative bg-gradient-to-br from-gray-700/30 via-gray-700/20 to-gray-700/30 rounded-xl p-3 sm:p-4 overflow-hidden group hover:from-gray-700/40 hover:to-gray-700/40 transition-all duration-300">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="text-xs sm:text-sm text-gray-400">Stock Coverage</span>
                </div>
                <span className="text-sm sm:text-base font-medium text-blue-400">45 days</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-gray-600/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                />
              </div>
              <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-400">
                Optimal inventory level maintained
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductAnalytics;