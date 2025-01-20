import { motion } from "framer-motion";
import { Activity, User, ShoppingCart, Settings, MessageSquare } from "lucide-react";

const ACTIVITY_DATA = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    amount: "$892.00",
    time: "2 minutes ago",
    status: "success"
  },
  {
    id: 2,
    type: "payment",
    title: "Payment processed",
    amount: "$1,200.00",
    time: "15 minutes ago",
    status: "success"
  },
  {
    id: 3,
    type: "refund",
    title: "Refund requested",
    amount: "$89.00",
    time: "1 hour ago",
    status: "warning"
  },
  {
    id: 4,
    type: "order",
    title: "Bulk order placed",
    amount: "$3,450.00",
    time: "2 hours ago",
    status: "success"
  },
  {
    id: 5,
    type: "payment",
    title: "Subscription renewed",
    amount: "$199.00",
    time: "3 hours ago",
    status: "success"
  },
  {
    id: 6,
    type: "support",
    title: "Customer inquiry",
    description: "Product return",
    time: "4 hours ago",
    status: "info"
  }
];

const getActivityIcon = (type) => {
  switch(type) {
    case 'user':
      return <User size={20} className="text-indigo-400" />; 
    case 'order':
      return <ShoppingCart size={20} className="text-emerald-400" />; 
    case 'system':
      return <Settings size={20} className="text-yellow-400" />; 
    case 'message':
      return <MessageSquare size={20} className="text-pink-400" />; 
    default:
      return null;
  }
};



const RecentActivity = () => {
  return (
    <motion.div 
      className="h-full bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-medium bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Recent Activity
          </h2>
        </div>
        <button className="px-3 py-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors rounded-lg hover:bg-indigo-400/10">
          View All
        </button>
      </div>

      <motion.div 
        className="space-y-4 overflow-y-auto max-h-[calc(100%-80px)] pr-2 scrollbar-thin scrollbar-thumb-gray-700/50 scrollbar-track-transparent"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1, transition: { staggerChildren: 0.1 }}
        }}
        initial="hidden"
        animate="show"
      >
        {ACTIVITY_DATA.map((activity) => (
          <motion.div
            key={activity.id}
            className="group relative bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 hover:from-gray-700/50 hover:to-gray-600/50 transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2.5 rounded-xl ${
                activity.status === 'success' ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 text-emerald-400' :
                activity.status === 'warning' ? 'bg-gradient-to-br from-amber-500/20 to-amber-400/10 text-amber-400' :
                'bg-gradient-to-br from-blue-500/20 to-blue-400/10 text-blue-400'
              }`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
                {activity.amount && (
                  <p className="text-sm text-gray-300 mt-1 group-hover:text-gray-200">
                    {activity.amount}
                  </p>
                )}
                {activity.description && (
                  <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-300">
                    {activity.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentActivity;