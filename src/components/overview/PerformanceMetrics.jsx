import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PERFORMANCE_DATA = [
  {
    department: "Engineering",
    productivity: 92,
    satisfaction: 88,
    retention: 95
  },
  {
    department: "Sales",
    productivity: 88,
    satisfaction: 85,
    retention: 82
  },
  {
    department: "Marketing",
    productivity: 90,
    satisfaction: 87,
    retention: 88
  },
  {
    department: "Support",
    productivity: 85,
    satisfaction: 82,
    retention: 90
  }
];

const PerformanceMetrics = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Performance Metrics</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PERFORMANCE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="department" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey="productivity" name="Productivity" fill="#6366F1" />
            <Bar dataKey="satisfaction" name="Satisfaction" fill="#10B981" />
            <Bar dataKey="retention" name="Retention" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PerformanceMetrics;