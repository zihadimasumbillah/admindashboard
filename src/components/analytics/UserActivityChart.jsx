import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

const activityData = [
  { date: "Mon", pageViews: 4200, sessions: 2400, interactions: 1800 },
  { date: "Tue", pageViews: 4800, sessions: 2800, interactions: 2100 },
  { date: "Wed", pageViews: 5200, sessions: 3100, interactions: 2400 },
  { date: "Thu", pageViews: 4900, sessions: 2900, interactions: 2200 },
  { date: "Fri", pageViews: 5800, sessions: 3400, interactions: 2600 },
  { date: "Sat", pageViews: 4600, sessions: 2700, interactions: 2000 },
  { date: "Sun", pageViews: 4100, sessions: 2300, interactions: 1700 }
];

const UserActivityChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

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
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/10">
            <Activity className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-100">User Activity</h2>
            <p className="text-sm text-gray-400">Daily user engagement</p>
          </div>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-gray-700/50 text-gray-200 rounded-lg px-3 py-1.5 text-sm
            border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="h-[calc(100%-80px)] min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(17, 24, 39, 0.8)",
                borderColor: "#374151",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Line type="monotone" dataKey="pageViews" name="Page Views" stroke="#6366F1" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#10B981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="interactions" name="Interactions" stroke="#F59E0B" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserActivityChart;