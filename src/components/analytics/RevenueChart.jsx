import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 65000, target: 60000 },
  { month: "Feb", revenue: 58000, target: 62000 },
  { month: "Mar", revenue: 90000, target: 70000 },
  { month: "Apr", revenue: 75000, target: 72000 },
  { month: "May", revenue: 98000, target: 80000 },
  { month: "Jun", revenue: 88000, target: 85000 },
  { month: "Jul", revenue: 110000, target: 95000 },
];

const RevenueChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

  return (
    <motion.div
      className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 
        border border-gray-700/50 h-full 
        hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-100">Revenue Analytics</h2>
          <p className="text-sm text-gray-400">Revenue vs Target Comparison</p>
        </div>
        <select
          className="bg-gray-700/50 text-gray-200 rounded-lg px-3 py-1.5 text-sm
            border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="h-[calc(100%-80px)]">
        <ResponsiveContainer>
          <AreaChart 
            data={revenueData} 
            margin={{ top: 20, right: 25, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="target" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value/1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", borderColor: "#374151" }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8B5CF6" 
              fill="url(#revenue)" 
              strokeWidth={2}
              name="Revenue"
            />
            <Area 
              type="monotone" 
              dataKey="target" 
              stroke="#10B981" 
              fill="url(#target)" 
              strokeWidth={2}
              name="Target"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueChart;