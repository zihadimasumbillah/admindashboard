import { motion } from "framer-motion";
import { useMemo } from "react";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import StatsCard from "../components/common/StatsCard";
import RevenueChart from "../components/analytics/RevenueChart";
import SalesPerformanceChart from "../components/analytics/SalesPerformanceChart";
import CustomerMetricsChart from "../components/analytics/CustomerMetricsChart";
import UserActivityChart from "../components/analytics/UserActivityChart";
import TrafficSourcesChart from "../components/analytics/TrafficSourcesChart";
import ConversionFunnelChart from "../components/analytics/ConversionFunnelChart";

// Animation variants 
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const AnalyticsPage = () => {
  // Memoize stats data
  const statsData = useMemo(() => [
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
  ], []);

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6 
        space-y-4 sm:space-y-6 md:space-y-8"
      >
        {/* Stats Grid with Animation */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {statsData.map((stat) => (
            <motion.div key={stat.name} variants={item}>
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid with Updated Heights */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
          {/* Revenue Chart - Taller */}
          <motion.div 
            className="xl:col-span-7 h-[380px] sm:h-[420px] xl:h-[470px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <RevenueChart />
          </motion.div>

          {/* User Activity Chart - Wider & Taller */}
          <motion.div 
            className="xl:col-span-5 h-[380px] sm:h-[420px] xl:h-[470px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <UserActivityChart />
          </motion.div>

          {/* Performance & Customer Metrics */}
          <motion.div 
            className="xl:col-span-6 h-[350px] sm:h-[380px] md:h-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SalesPerformanceChart />
          </motion.div>

          <motion.div 
            className="xl:col-span-6 h-[350px] sm:h-[380px] md:h-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CustomerMetricsChart />
          </motion.div>

          {/* Traffic & Conversion */}
          <motion.div 
            className="xl:col-span-4 h-[350px] sm:h-[380px] md:h-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TrafficSourcesChart />
          </motion.div>

          <motion.div 
            className="xl:col-span-8 h-[350px] sm:h-[380px] md:h-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ConversionFunnelChart />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;