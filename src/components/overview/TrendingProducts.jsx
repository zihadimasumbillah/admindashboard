import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Package } from 'lucide-react';

const TRENDING_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    growth: 28,
    sales: 892,
    revenue: "$89,200",
    image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    category: "Wearables",
    growth: 32,
    sales: 654,
    revenue: "$130,800",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Premium Leather Wallet",
    category: "Accessories",
    growth: 24,
    sales: 445,
    revenue: "$22,250",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Gaming Mechanical Keyboard",
    category: "Gaming",
    growth: 35,
    sales: 567,
    revenue: "$113,400",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Noise Cancelling Headphones",
    category: "Audio",
    growth: 22,
    sales: 789,
    revenue: "$157,800",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    name: "4K Ultra HD Monitor",
    category: "Electronics",
    growth: 30,
    sales: 432,
    revenue: "$172,800",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60"
  }
];

const TrendingProducts = () => {
  return (
    <div className="h-full w-full p-3 sm:p-4 md:p-6">
      {/* Header - Improved spacing */}
      <div className="flex items-center gap-3 mb-3 sm:mb-4 md:mb-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="p-2 sm:p-2.5 md:p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-purple-500/20 border border-indigo-500/20 shadow-lg shadow-indigo-500/10"
        >
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-400" />
        </motion.div>
        
        <div>
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-100">
            Trending Products
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-400">
            Top performing products
          </p>
        </div>
      </div>

      {/* Products List - Better scrolling */}
      <div className="space-y-2 sm:space-y-3 overflow-y-auto max-h-[calc(100%-4rem)] scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-700/50 pr-2 pt-2">
        {TRENDING_PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300"
          >
            {/* Product Image - Responsive sizes */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info - Better spacing */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
                <h3 className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-100 truncate">
                  {product.name}
                </h3>
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[9px] sm:text-[10px] md:text-xs font-medium">
                  +{product.growth}%
                </span>
              </div>

              <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 mb-1">
                {product.category}
              </p>

              {/* Stats - Improved layout */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1">
                  <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-300">
                    {product.sales}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-300">
                    {product.revenue}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;