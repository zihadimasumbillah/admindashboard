import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart2 } from "lucide-react";

const salesData = [
  { category: "Electronics", current: 82000, previous: 75000 },
  { category: "Fashion", current: 67000, previous: 62000 },
  { category: "Home & Living", current: 54000, previous: 48000 },
  { category: "Sports", current: 43000, previous: 38000 },
  { category: "Books", current: 35000, previous: 31000 }
];

const SalesPerformanceChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  return (
    <motion.div
      className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 
        border border-gray-700/50 h-full 
        hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/10">
            <BarChart2 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-100">Sales Performance</h2>
            <p className="text-sm text-gray-400">Category-wise comparison</p>
          </div>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-gray-700/50 text-gray-200 rounded-lg px-3 py-1.5 text-sm
            border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[calc(100%-80px)] min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="category" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value/1000}k`} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(17, 24, 39, 0.8)", 
                borderColor: "#374151",
                borderRadius: "0.5rem"
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
            />
            <Legend />
            <Bar 
              dataKey="current" 
              name="Current Period" 
              fill="#8B5CF6" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="previous" 
              name="Previous Period" 
              fill="#4B5563" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesPerformanceChart;