import { DollarSign, Package, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "../components/common/StatsCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import TrendingProducts from "../components/overview/TrendingProducts";
import IssueTracker from "../components/overview/IssueTracker";
import ProductAnalytics from "../components/overview/ProductAnalytics";

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

const statsData = [
  {
    name: "Total Sales",
    value: "$245,890",
    change: "+12.5%",
    changeType: "positive",
    trend: "up", 
    icon: DollarSign,
    description: "Sales this month",
    color: "#0EA5E9",
    bgGradient: "from-sky-500/10 to-transparent"
  },
  {
    name: "Products",
    value: "2,450",
    change: "+8.2%",
    changeType: "positive",
    trend: "up", 
    icon: Package,
    description: "Active products",
    color: "#10B981",
    bgGradient: "from-emerald-500/10 to-transparent"
  },
  {
    name: "Active Customers",
    value: "12,789",
    change: "+23.1%",
    changeType: "positive",
    trend: "up",
    icon: Users,
    description: "This month",
    color: "#6366F1",
    bgGradient: "from-indigo-500/10 to-transparent"
  },
  {
    name: "Growth Rate",
    value: "+18.5%",
    change: "+5.2%",
    changeType: "positive",
    trend: "up", 
    icon: TrendingUp,
    description: "vs. last month",
    color: "#EC4899",
    bgGradient: "from-pink-500/10 to-transparent"
  }
];

const OverviewPage = () => {
  return (
    <div className="min-h-screen pb-8 px-4 sm:px-6 lg:px-8 
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Stats Grid - Row 1 */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="sm:mt-2 lg:mt-4 grid grid-cols-2 lg:grid-cols-4 
            gap-3 md:gap-4 lg:gap-6 lg:mb-10"
        >
          {statsData.map((stat) => (
            <motion.div key={stat.name} variants={item}>
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Row 2: Sales Overview + Category */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-7 h-[380px] sm:h-[400px] xl:h-[450px] bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
          >
            <SalesOverviewChart />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="xl:col-span-5 h-[350px] sm:h-[400px] xl:h-[450px] bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
          >
            <CategoryDistributionChart />
          </motion.div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="xl:col-span-7 space-y-4 md:space-y-6">
            <motion.div className="h-[480px] md:h-[420px] bg-gray-800/40 backdrop-blur-sm 
              rounded-2xl border border-gray-700/50 shadow-lg 
              hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <SalesChannelChart />
            </motion.div>
            <motion.div className="h-[400px] bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-red-500/10 transition-all duration-300">
              <IssueTracker />
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="xl:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sm:h-[410px] md:h-[378px] bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <ProductAnalytics />
            </motion.div>
            {/* Right Column - Trending Products */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="xl:col-span-5 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-pink-500/10 transition-all duration-300"
            >
              <TrendingProducts />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
