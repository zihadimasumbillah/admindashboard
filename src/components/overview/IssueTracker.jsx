import { motion } from "framer-motion";
import { AlertOctagon, AlertCircle, Clock, CheckCircle2 } from "lucide-react";

const ISSUES_DATA = [
  {
    id: 1,
    title: "Dashboard Performance Issue",
    description: "Loading time exceeds 3 seconds on initial render",
    priority: "high",
    date: "2 hours ago",
    assignees: [
      {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        role: "Developer"
      },
      {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        role: "QA"
      }
    ]
  },
  {
    id: 2,
    title: "Mobile App Crash",
    description: "App crashes on launch for iOS users",
    priority: "high",
    date: "4 hours ago",
    assignees: [
      {
        name: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        role: "Mobile Dev"
      }
    ]
  },
  {
    id: 3,
    title: "Payment Gateway Error",
    description: "Users unable to complete transactions",
    priority: "medium",
    date: "1 day ago",
    assignees: [
      {
        name: "Sarah Wilson",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        role: "Backend Dev"
      }
    ]
  }
];

const getPriorityBadge = (priority) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  switch(priority) {
    case 'high':
      return `${baseClasses} bg-red-500/20 text-red-400`;
    case 'medium':
      return `${baseClasses} bg-yellow-500/20 text-yellow-400`;
    default:
      return `${baseClasses} bg-gray-500/20 text-gray-400`;
  }
};

const IssueTracker = () => {
  return (
    <div className="h-full p-4 sm:p-6 flex flex-col">
      {/* Header with Stats */}
      <div className="space-y-4 sm:space-y-6">

        {/* Title Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-purple-500/20 shadow-lg shadow-indigo-500/10">
              <AlertCircle className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-gray-100">Active Issues</h2>
              <p className="text-xs sm:text-sm text-gray-400">Current sprint issues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className=" mt-2 grid grid-cols-3 gap-3">
          <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">Total</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-gray-100">24</p>
          </div>
          
          <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-400">Ongoing</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-yellow-400">16</p>
          </div>
          
          <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-gray-400">Completed</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-emerald-400">8</p>
          </div>
        </div>

      {/* Scrollable Issues List */}
      <div className="mt-3 flex-1 overflow-y-auto pr-2 -mr-2 space-y-3 scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-700/50">
        {ISSUES_DATA.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mt-4 p-3 sm:p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 min-h-[150px]"
          >
            {/* Issue Content */}
            <div className="space-y-2 sm:space-y-3 mt-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={getPriorityBadge(issue.priority)}>
                      {issue.priority}
                    </span>
                    <span className="text-xs text-gray-400">{issue.date}</span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-200 truncate mb-1">
                    {issue.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {issue.description}
                  </p>
                </div>
                
                <div className="flex items-center -space-x-2">
                  {issue.assignees.map((assignee, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-gray-800 overflow-hidden ring-2 ring-gray-700/50"
                    >
                      <img
                        src={assignee.avatar}
                        alt={assignee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2 pt-2 border-t border-gray-600/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-xs text-gray-300">65%</span>
                </div>
                <div className="mt-1 h-1.5 bg-gray-600/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IssueTracker;