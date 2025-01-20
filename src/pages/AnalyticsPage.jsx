import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import StatsCard from "../components/common/StatsCard";
import RevenueChart from "../components/analytics/RevenueChart";
import SalesPerformanceChart from "../components/analytics/SalesPerformanceChart";
import CustomerMetricsChart from "../components/analytics/CustomerMetricsChart";
import UserActivityChart from "../components/analytics/UserActivityChart";
import TrafficSourcesChart from "../components/analytics/TrafficSourcesChart";
import ConversionFunnelChart from "../components/analytics/ConversionFunnelChart";

const statsData = [
  {
    name: "Revenue Growth",
    value: "$86,245",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    description: "vs. previous month",
    color: "#6366F1",
    bgGradient: "from-indigo-500/10 to-transparent"
  },
  {
    name: "Active Users",
    value: "2,345",
    change: "+10.2%",
    trend: "up",
    icon: Users,
    description: "Current active users",
    color: "#10B981",
    bgGradient: "from-emerald-500/10 to-transparent"
  },
  {
    name: "Conversion Rate",
    value: "3.2%",
    change: "+2.1%",
    trend: "up",
    icon: Activity,
    description: "Conversions this month",
    color: "#F59E0B",
    bgGradient: "from-amber-500/10 to-transparent"
  },
  {
    name: "Avg. Order Value",
    value: "$245",
    change: "+8.4%",
    trend: "up",
    icon: TrendingUp,
    description: "Per transaction",
    color: "#EC4899",
    bgGradient: "from-pink-500/10 to-transparent"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6 
        space-y-4 sm:space-y-6 md:space-y-8"
      >
        {/* Stats Grid - Responsive 2x2 on mobile */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {statsData.map((stat) => (
            <StatsCard key={stat.name} {...stat} />
          ))}
        </motion.div>

        {/* Main Charts Grid - Updated Responsive Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
          {/* Revenue Chart */}
          <motion.div 
            className="xl:col-span-8 h-[350px] sm:h-[400px] md:h-[420px]"
          >
            <RevenueChart />
          </motion.div>

          {/* User Activity Chart */}
          <motion.div 
            className="xl:col-span-4 h-[350px] sm:h-[400px] md:h-[420px]"
          >
            <UserActivityChart />
          </motion.div>

          {/* Performance & Customer Metrics */}
          <motion.div 
            className="xl:col-span-6 h-[350px] sm:h-[400px] md:h-[420px]"
          >
            <SalesPerformanceChart />
          </motion.div>

          <motion.div 
            className="xl:col-span-6 h-[350px] sm:h-[400px] md:h-[420px]"
          >
            <CustomerMetricsChart />
          </motion.div>

          {/* Traffic & Conversion */}
          <motion.div 
            className="xl:col-span-4 h-[350px] sm:h-[400px] md:h-[420px]"
          >
            <TrafficSourcesChart />
          </motion.div>

          <motion.div 
            className="xl:col-span-8 h-[350px] sm:h-[400px] md:h-[420px]"
          >
            <ConversionFunnelChart />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;