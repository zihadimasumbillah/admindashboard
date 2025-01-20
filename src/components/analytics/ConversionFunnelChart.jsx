import { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { ResponsiveContainer } from "recharts";

const funnelData = [
  { stage: "Visitors", value: 12000, percentage: 100, color: "#6366F1" },
  { stage: "Product Views", value: 8400, percentage: 70, color: "#8B5CF6" },
  { stage: "Add to Cart", value: 4200, percentage: 35, color: "#EC4899" },
  { stage: "Checkout", value: 2520, percentage: 21, color: "#F59E0B" },
  { stage: "Purchased", value: 1680, percentage: 14, color: "#10B981" }
];

const ConversionFunnelChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [hoveredStage, setHoveredStage] = useState(null);
  
  // Responsive dimensions
  const padding = {
    top: 40,
    right: 120,
    bottom: 40,
    left: 120
  };
  
  const getResponsiveDimensions = () => {
    const width = Math.min(800, window.innerWidth - 48);
    const height = Math.min(400, window.innerHeight * 0.6);
    return { width, height };
  };

  const { width: maxWidth, height: maxHeight } = getResponsiveDimensions();
  const stageHeight = (maxHeight - (padding.top + padding.bottom)) / funnelData.length;

  // Modern funnel path calculation
  const getFunnelPath = (index) => {
    const topWidth = maxWidth - (padding.left + padding.right);
    // More dramatic narrowing for better funnel shape
    const bottomWidth = topWidth * Math.pow(0.75, index + 1);
    const y = padding.top + (stageHeight * index);
    const nextY = y + stageHeight;
    const curve = 20; // Increased curve for smoother corners

    const topLeft = padding.left + ((topWidth - bottomWidth) / 2);
    const topRight = maxWidth - padding.right - ((topWidth - bottomWidth) / 2);
    const nextBottomWidth = topWidth * Math.pow(0.75, index + 2);
    const bottomLeft = padding.left + ((topWidth - nextBottomWidth) / 2);
    const bottomRight = maxWidth - padding.right - ((topWidth - nextBottomWidth) / 2);

    // Bezier curve path for smoother shape
    return `
      M ${topLeft},${y}
      L ${topRight},${y}
      C ${topRight + curve},${y} 
        ${bottomRight + curve},${nextY} 
        ${bottomRight},${nextY}
      L ${bottomLeft},${nextY}
      C ${bottomLeft - curve},${nextY} 
        ${topLeft - curve},${y} 
        ${topLeft},${y}
      Z
    `;
  };

  return (
    <motion.div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 
      border border-gray-700/50 h-full hover:shadow-lg hover:shadow-purple-500/10 
      transition-all duration-300"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center 
        justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 
            to-pink-500/20 border border-purple-500/10"
          >
            <Filter className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-100">
              Conversion Funnel
            </h2>
            <p className="text-sm text-gray-400">Stage-wise analysis</p>
          </div>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="w-full sm:w-auto bg-gray-700/50 text-gray-200 rounded-lg 
            px-3 py-1.5 text-sm border border-gray-600/50 
            focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
        </select>
      </div>

      {/* Funnel Chart */}
      <div className="h-[calc(100%-80px)] min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <svg 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${maxWidth} ${maxHeight}`} 
            className="overflow-visible"
            style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))' }}
          >
            <defs>
              {funnelData.map((item, index) => (
                <linearGradient 
                  key={`gradient-${index}`} 
                  id={`gradient-${index}`} 
                  x1="0" y1="0" x2="1" y2="1"
                >
                  <stop offset="0%" stopColor={`${item.color}50`} />
                  <stop offset="100%" stopColor={`${item.color}20`} />
                </linearGradient>
              ))}
            </defs>
            
            {funnelData.map((item, index) => (
              <g 
                key={item.stage}
                onMouseEnter={() => setHoveredStage(index)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <motion.path
                  d={getFunnelPath(index)}
                  fill={`url(#gradient-${index})`}
                  stroke={item.color}
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    scale: hoveredStage === index ? 1.02 : 1,
                    filter: hoveredStage === index ? 'brightness(1.2)' : 'brightness(1)'
                  }}
                  transition={{ duration: 0.3 }}
                  className="transition-all duration-300"
                />
                
                {/* Stage Labels */}
                <motion.text
                  x={maxWidth - padding.right + 20}
                  y={padding.top + (stageHeight * index) + (stageHeight / 2)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium fill-gray-200"
                  style={{ filter: hoveredStage === index ? 'brightness(1.2)' : 'brightness(1)' }}
                >
                  {item.stage}
                </motion.text>

                {/* Values and Percentages */}
                <motion.text
                  x={padding.left - 20}
                  y={padding.top + (stageHeight * index) + (stageHeight / 2)}
                  textAnchor="end"
                  className="text-sm fill-gray-400"
                >
                  <tspan className="font-medium">{item.value.toLocaleString()}</tspan>
                  <tspan dx="5" className="text-xs fill-gray-500">({item.percentage}%)</tspan>
                </motion.text>
              </g>
            ))}
          </svg>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ConversionFunnelChart;
