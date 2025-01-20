import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";
import { BarChart2 } from "lucide-react";
import { motion } from 'framer-motion';

const SALES_DATA = {
  "This Month": [
    { name: "Website", value: 45600 },
    { name: "Mobile App", value: 38200 },
    { name: "Marketplace", value: 29800 },
    { name: "Social Media", value: 18700 },
  ],
  "Last Month": [
    { name: "Website", value: 42300 },
    { name: "Mobile App", value: 35100 },
    { name: "Marketplace", value: 27500 },
    { name: "Social Media", value: 16900 },
  ],
  "This Year": [
    { name: "Website", value: 156000 },
    { name: "Mobile App", value: 142000 },
    { name: "Marketplace", value: 98500 },
    { name: "Social Media", value: 76400 },
  ]
};

const COLORS = [
  ["#818CF8", "#4F46E5"], 
  ["#34D399", "#059669"], 
  ["#60A5FA", "#2563EB"],
  ["#F472B6", "#DB2777"]  
];

const SalesChannelChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  const filteredData = SALES_DATA[selectedPeriod].filter(item => item.value !== 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative h-full w-full"
    >
      {/* Main Card */}
      <div className="relative h-full w-full rounded-2xl transition-all duration-300">
        <div className="h-full w-full border border-gray-700/30 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden">
          {/* Content Container */}
          <div className="relative h-full p-6 space-y-6">
            {/* Enhanced Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Modern Icon Container */}
                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-purple-500/20 border border-indigo-500/20 shadow-lg shadow-indigo-500/10 backdrop-blur-xl">
                  <BarChart2 className="w-5 h-5 text-indigo-400" />
                </div>
                
                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Sales Channels
                  </h2>
                  <p className="text-xs text-gray-400">
                    Performance across different platforms
                  </p>
                </div>
              </div>

              {/* Period Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-2 py-1 text-xs text-gray-300 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                >
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>

            {/* Chart Container */}
            <div className="relative h-[calc(100%-6rem)] min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={filteredData}
                  layout="vertical"
                  margin={{ 
                    top: 20, 
                    right: 30, 
                    left: 10, 
                    bottom: 20 
                  }}
                >
                  <defs>
                    {COLORS.map((colors, index) => (
                      <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={colors[0]} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={colors[1]} stopOpacity={0.9} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#374151" 
                    horizontal={false}
                    opacity={0.5}
                  />
                  <XAxis 
                    type="number"
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                    tickLine={false}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <YAxis 
                    type="category"
                    dataKey="name"
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: '#374151' }}
                    width={60} 
                    tickMargin={2} 
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                    contentStyle={{
                      backgroundColor: "rgba(31, 41, 55, 0.95)",
                      border: "1px solid rgba(75, 85, 99, 0.3)",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      padding: "12px"
                    }}
                    formatter={(value) => [
                      <span key="value" className="text-gray-100 font-medium">
                        ${(value / 1000).toFixed(1)}K
                      </span>
                    ]}
                    labelStyle={{ color: "#E5E7EB", marginBottom: "4px" }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 6, 6, 0]}
                    barSize={32}
                    animationDuration={1500}
                    animationBegin={200}
                  >
                    {filteredData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#gradient-${index})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SalesChannelChart;
