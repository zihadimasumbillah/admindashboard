import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Globe } from "lucide-react";

const trafficData = [
  { name: "Organic Search", value: 35, color: "#6366F1", gradientStart: "#818CF8" },
  { name: "Direct", value: 25, color: "#10B981", gradientStart: "#34D399" },
  { name: "Social Media", value: 20, color: "#F59E0B", gradientStart: "#FBBF24" },
  { name: "Referral", value: 15, color: "#EC4899", gradientStart: "#F472B6" },
  { name: "Email", value: 5, color: "#8B5CF6", gradientStart: "#A78BFA" }
];

const TrafficSourcesChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.div
      className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 sm:p-6 
        border border-gray-700/50 h-full 
        hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center 
          justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/10">
              <Globe className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-100">Traffic Sources</h2>
              <p className="text-sm text-gray-400">Distribution of traffic channels</p>
            </div>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-700/50 text-gray-200 rounded-lg px-3 py-1.5 text-sm
              border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
          </select>
        </div>

        {/* Chart and List Container */}
        <div className="flex flex-row items-center gap-4 flex-1">
          {/* Pie Chart */}
          <div className="w-1/2 h-[160px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {trafficData.map((entry, index) => (
                    <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={entry.gradientStart} stopOpacity={0.8}/>
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.9}/>
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={window.innerWidth < 640 ? "50%" : "60%"}
                  outerRadius={window.innerWidth < 640 ? "70%" : "80%"}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={(_, index) => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {trafficData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#gradient-${index})`}
                      stroke={entry.color}
                      strokeWidth={1}
                      className="transition-all duration-300"
                      style={{
                        filter: hoveredIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                        transform: hoveredIndex === index ? 'scale(1.03)' : 'scale(1)'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.95)",
                    borderColor: "#374151",
                    borderRadius: "0.75rem",
                    padding: "8px 12px",
                    fontSize: window.innerWidth < 640 ? "12px" : "14px"
                  }}
                  itemStyle={{ color: "#E5E7EB" }}
                  formatter={(value) => [`${value}%`, "Traffic Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Data List */}
          <div className="w-1/2 space-y-2">
            {trafficData.map((source, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-xs sm:text-sm text-gray-300 truncate">
                    {source.name}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-100">
                  {source.value}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrafficSourcesChart;