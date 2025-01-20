import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";

const customerData = [
  { month: "Jan", activeUsers: 2100, newUsers: 420, churnRate: 2.1 },
  { month: "Feb", activeUsers: 2300, newUsers: 380, churnRate: 1.8 },
  { month: "Mar", activeUsers: 2500, newUsers: 450, churnRate: 1.9 },
  { month: "Apr", activeUsers: 2700, newUsers: 520, churnRate: 1.7 },
  { month: "May", activeUsers: 3000, newUsers: 580, churnRate: 1.5 },
  { month: "Jun", activeUsers: 3200, newUsers: 610, churnRate: 1.6 }
];

const CustomerMetricsChart = () => {
  const [selectedMetric, setSelectedMetric] = useState("all");

  return (
    <motion.div
      className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 
        border border-gray-700/50 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/10">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-100">Customer Metrics</h2>
            <p className="text-sm text-gray-400">User growth and engagement</p>
          </div>
        </div>
        
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="bg-gray-700/50 text-gray-200 rounded-lg px-3 py-1.5 text-sm
            border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="all">All Metrics</option>
          <option value="activeUsers">Active Users</option>
          <option value="newUsers">New Users</option>
          <option value="churnRate">Churn Rate</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[calc(100%-80px)] min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={customerData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "rgba(17, 24, 39, 0.8)", 
                borderColor: "#374151",
                borderRadius: "0.5rem" 
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            {(selectedMetric === "all" || selectedMetric === "activeUsers") && (
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Active Users"
                dot={false}
              />
            )}
            {(selectedMetric === "all" || selectedMetric === "newUsers") && (
              <Line 
                type="monotone" 
                dataKey="newUsers" 
                stroke="#10B981" 
                strokeWidth={2}
                name="New Users"
                dot={false}
              />
            )}
            {(selectedMetric === "all" || selectedMetric === "churnRate") && (
              <Line 
                type="monotone" 
                dataKey="churnRate" 
                stroke="#F43F5E" 
                strokeWidth={2}
                name="Churn Rate (%)"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CustomerMetricsChart;