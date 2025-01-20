import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const salesData = [
  {
    month: 'Jan',
    'This Year': 4500,
    'Last Year': 3800,
    growth: '+18.4%'
  },
  {
    month: 'Feb',
    'This Year': 5200,
    'Last Year': 4600,
    growth: '+13.0%'
  },
  {
    month: 'Mar',
    'This Year': 4800,
    'Last Year': 4200,
    growth: '+14.3%'
  },
  {
    month: 'Apr',
    'This Year': 6200,
    'Last Year': 5100,
    growth: '+21.6%'
  },
  {
    month: 'May',
    'This Year': 5800,
    'Last Year': 4900,
    growth: '+18.4%'
  },
  {
    month: 'Jun',
    'This Year': 7500,
    'Last Year': 6600,
    growth: '+13.6%'
  },
  {
    month: 'Jul',
    'This Year': 6800,
    'Last Year': 6000,
    growth: '+18.4%'
  },
  {
    month: 'Aug',
    'This Year': 7200,
    'Last Year': 6400,
    growth: '+12.5%'
  },
  {
    month: 'Sep',
    'This Year': 6900,
    'Last Year': 6100,
    growth: '+13.1%'
  },
  {
    month: 'Oct',
    'This Year': 7400,
    'Last Year': 6600,
    growth: '+12.1%'
  },
  {
    month: 'Nov',
    'This Year': 7000,
    'Last Year': 6200,
    growth: '+12.9%'
  },
  {
    month: 'Dec',
    'This Year': 7800,
    'Last Year': 7000,
    growth: '+11.4%'
  }
];

const SalesOverviewChart = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 
        border border-gray-700/50 h-full 
        hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-purple-500/20 shadow-lg shadow-indigo-500/10 backdrop-blur-xl">
            <BarChart2 className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-gray-100">Sales Overview</h2>
            <p className="text-sm text-gray-400">Monthly sales comparison</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[calc(100%-80px)]">
        <ResponsiveContainer>
          <AreaChart
            data={salesData}
            margin={{ top: 20, right: 25, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="thisYear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="lastYear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "rgba(17, 24, 39, 0.8)", 
                borderColor: "#374151",
                borderRadius: "0.75rem",
                padding: "12px 16px"
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
            />
            
            <Area
              type="monotone"
              dataKey="This Year"
              stroke="#6366F1"
              strokeWidth={2}
              fill="url(#thisYear)"
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: "#6366F1", 
                strokeWidth: 2, 
                stroke: "#818CF8" 
              }}
            />
            
            <Area
              type="monotone"
              dataKey="Last Year"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="url(#lastYear)"
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: "#8B5CF6", 
                strokeWidth: 2, 
                stroke: "#A78BFA" 
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
