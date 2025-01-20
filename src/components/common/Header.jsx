import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, User, Settings, LogOut, Activity, FileText, Calendar, ChevronDown,} from "lucide-react";

const SEARCH_SUGGESTIONS = {
  contacts: [
    { 
      id: 1, 
      name: 'Emma Wilson', 
      role: 'Product Manager',
      department: 'Product',
      image: 'https://randomuser.me/api/portraits/men/5.jpg',
      status: 'online'
    },
    { 
      id: 2, 
      name: 'James Rodriguez', 
      role: 'Lead Developer',
      department: 'Engineering',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      status: 'away'
    },
    { 
      id: 3, 
      name: 'Sarah Chen', 
      role: 'UX Designer',
      department: 'Design',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      status: 'offline'
    }
  ],
  recent: [
    { type: 'file', label: 'Q4 Report.pdf', subtitle: 'Reports / 2023', icon: 'pdf', lastOpened: '2h ago' },
    { type: 'file', label: 'Marketing Plan.doc', subtitle: 'Strategy / 2024', icon: 'doc', lastOpened: '1d ago' },
    { type: 'page', label: 'Sales Dashboard', subtitle: 'Analytics', icon: 'dashboard', lastViewed: '3h ago' }
  ],
  quick_actions: [
    { 
      type: 'action', 
      label: 'Create New Order', 
      subtitle: 'Sales', 
      shortcut: '⌘ + O',
      action: () => console.log('Create Order')
    },
    { 
      type: 'action', 
      label: 'Add Product', 
      subtitle: 'Inventory', 
      shortcut: '⌘ + P',
      action: () => console.log('Add Product')
    },
    { 
      type: 'action', 
      label: 'Generate Report', 
      subtitle: 'Analytics', 
      shortcut: '⌘ + R',
      action: () => console.log('Generate Report')
    }
  ]
};

const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: 'user_action',
    user: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'Sales Manager'
    },
    action: 'updated',
    target: 'Sales Pipeline',
    time: '2m ago',
    details: 'Added 3 new leads',
    category: 'sales',
    status: 'completed'
  },
  {
    id: 2,
    type: 'user_action',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: 'Product Designer'
    },
    action: 'commented on',
    target: 'Dashboard Redesign',
    time: '30m ago',
    details: 'Left feedback on the new layout',
    category: 'design',
    status: 'pending'
  },
  {
    id: 3,
    type: 'system_update',
    title: 'Database Optimization',
    description: 'Automated cleanup completed',
    status: 'completed',
    time: '2h ago',
    category: 'maintenance',
    metrics: {
      records: '15K',
      performance: '+25%'
    }
  }
];

const NOTIFICATIONS = [
  {
    id: 1,
    priority: 'high',
    category: 'order',
    title: 'Urgent Order Review',
    message: 'Order #123 requires immediate attention',
    time: '2m ago',
    action: 'Review Now',
    status: 'pending'
  },
  {
    id: 2,
    priority: 'medium',
    category: 'system',
    title: 'Performance Alert',
    message: 'High CPU usage detected on main server',
    time: '5m ago',
    metrics: { cpu: '85%', memory: '70%' },
    action: 'View Details'
  },
  {
    id: 3,
    priority: 'low',
    category: 'update',
    title: 'New Features Available',
    message: 'Dashboard updated with new analytics',
    time: '1h ago',
    action: 'See What\'s New'
  }
];

const PROFILE_DATA = {
  name: "Alex Thompson",
  position: "Senior Developer",
  email: "alex.thompson@company.com",
  avatar: "https://randomuser.me/api/portraits/men/42.jpg",
  status: "online"
};

// PropTypes definitions
const ItemPropType = PropTypes.shape({
  type: PropTypes.oneOf(['recent', 'action', 'contact', 'file']).isRequired,
  label: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  shortcut: PropTypes.string,
});

const NotificationPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
  category: PropTypes.oneOf(['order', 'system', 'update']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  action: PropTypes.string,
  status: PropTypes.string,
  metrics: PropTypes.objectOf(PropTypes.string),
});

const ActivityPropType = PropTypes.shape({
  type: PropTypes.oneOf(['user_action', 'system_update']).isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string,
  details: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.string,
  target: PropTypes.string,
  status: PropTypes.string.isRequired,
  metrics: PropTypes.objectOf(PropTypes.string),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
});

const SuggestionItem = ({ item }) => (
  <motion.button
    whileHover={{ backgroundColor: 'rgba(75, 85, 99, 0.3)' }}
    className="w-full flex items-start gap-3 p-2 rounded-lg text-left"
  >
    {item.type === 'recent' && <Calendar size={16} className="mt-0.5 text-gray-400" />}
    {item.type === 'action' && <Activity size={16} className="mt-0.5 text-gray-400" />}
    {item.type === 'contact' && <User size={16} className="mt-0.5 text-gray-400" />}
    {item.type === 'file' && <FileText size={16} className="mt-0.5 text-gray-400" />}
    
    <div className="flex-1">
      <p className="text-sm text-gray-100">{item.label}</p>
      <p className="text-xs text-gray-400">{item.subtitle}</p>
    </div>
    {item.shortcut && (
      <span className="text-xs text-gray-500">{item.shortcut}</span>
    )}
  </motion.button>
);

SuggestionItem.propTypes = {
  item: ItemPropType.isRequired,
};

const NotificationCard = ({ notification }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 
      border border-gray-700/50 transition-all duration-300"
  >
    {/* Priority & Category */}
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <span className={`
        px-2 py-1 rounded-full text-[10px] font-medium
        ${notification.priority === 'high' ? 'bg-red-500/10 text-red-400' :
          notification.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
          'bg-emerald-500/10 text-emerald-400'}
      `}>
        {notification.priority.toUpperCase()}
      </span>
      
      <span className={`
        px-2 py-1 rounded-md text-[10px] font-medium
        ${notification.category === 'order' ? 'bg-indigo-500/10 text-indigo-400' :
          notification.category === 'system' ? 'bg-amber-500/10 text-amber-400' :
          'bg-emerald-500/10 text-emerald-400'}
      `}>
        {notification.category.toUpperCase()}
      </span>
    </div>

    {/* Content */}
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-medium text-gray-100 mb-1">{notification.title}</h4>
        <p className="text-xs text-gray-400">{notification.message}</p>
      </div>

      {/* Metrics Display */}
      {notification.metrics && (
        <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-gray-700/30">
          {Object.entries(notification.metrics).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <div>
                <span className="text-[10px] text-gray-400">{key.toUpperCase()}</span>
                <span className="text-xs font-medium text-gray-200 ml-1">{value}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
        <div className="flex items-center gap-3">
          {notification.status && (
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute h-full w-full rounded-full opacity-75
                  ${notification.status === 'pending' ? 'bg-amber-400' : 'bg-emerald-400'}`} 
                />
                <span className={`relative inline-flex h-2 w-2 rounded-full
                  ${notification.status === 'pending' ? 'bg-amber-400' : 'bg-emerald-400'}`} 
                />
              </span>
              <span className={`text-[10px] font-medium
                ${notification.status === 'pending' ? 'text-amber-400' : 'text-emerald-400'}`}
              >
                {notification.status.toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-[10px] text-gray-500">{notification.time}</span>
        </div>

        {notification.action && (
          <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
            {notification.action}
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

NotificationCard.propTypes = {
  notification: NotificationPropType.isRequired,
};

const ActivityItem = ({ activity }) => (
  <div className="relative p-3 sm:p-4 rounded-xl 
    bg-gray-800/50 hover:bg-gray-700/50 
    border border-gray-700/50 
    transition-all duration-300"
  >
    {activity.type === 'user_action' ? (
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
        <img 
          src={activity.user.avatar}
          alt={activity.user.name}
          className="w-10 h-10 rounded-lg object-cover 
            ring-2 ring-gray-700/50"
        />
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center 
            sm:items-start justify-between gap-2 mb-1">
            <p className="text-sm font-medium text-gray-100 truncate">
              {activity.user.name}
            </p>
            <span className="text-[10px] text-gray-500">
              {activity.time}
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-1">{activity.user.role}</p>
          <p className="text-xs text-gray-300">
            <span className="text-indigo-400">{activity.action}</span>
            {' '}{activity.target}
          </p>
          <p className="text-xs text-gray-400 mt-1">{activity.details}</p>
        </div>
      </div>
    ) : (
      <div className="text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center 
          sm:items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <Activity className="w-4 h-4 text-indigo-400" />
            </div>
            <h4 className="text-sm font-medium text-gray-100">
              {activity.title}
            </h4>
          </div>
          <span className="text-[10px] text-gray-500">{activity.time}</span>
        </div>
        <p className="text-xs text-gray-400">{activity.description}</p>
        
        {activity.metrics && (
          <div className="grid grid-cols-2 gap-2 p-2 mt-2 
            rounded-lg bg-gray-700/30">
            {Object.entries(activity.metrics).map(([key, value]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                <span className="text-[10px] text-gray-400">
                  {key.toUpperCase()}:
                </span>
                <span className="text-[10px] font-medium text-gray-300">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);

ActivityItem.propTypes = {
  activity: ActivityPropType.isRequired,
};

const Header = ({ isSidebarOpen }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const searchInputRef = useRef(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) { 
        setIsVisible(false);
      } else { 
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsNotificationOpen(false);
        setIsActivityOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (isSearchFocused && e.metaKey) {
        const action = SEARCH_SUGGESTIONS.quick_actions.find(
          item => item.shortcut.toLowerCase().includes(e.key.toLowerCase())
        );
        if (action) {
          e.preventDefault();
          action.action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchFocused]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    // Add keyboard shortcut hint
    document.body.classList.add('search-focused');
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
      document.body.classList.remove('search-focused');
    }, 200);
  };

  


  

  const renderQuickActions = () => (
    <div className="space-y-1">
      {SEARCH_SUGGESTIONS.quick_actions.map((action, index) => (
        <motion.button
          key={index}
          onClick={action.action}
          whileHover={{ scale: 1.02 }}
          className="w-full flex items-center gap-3 p-2.5 rounded-lg 
            hover:bg-gray-700/50 transition-all duration-200 group"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 
            flex items-center justify-center">
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0 flex items-center justify-between">
            <div className="text-left">
              <p className="text-sm font-medium text-gray-100 truncate">
                {action.label}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {action.subtitle}
              </p>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 
              rounded bg-gray-700/50 border border-gray-600 
              text-[10px] font-mono text-gray-400">
              {action.shortcut}
            </kbd>
          </div>
        </motion.button>
      ))}
    </div>
  );

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        fixed top-0 right-0 z-50
        ${isSidebarOpen ? 'md:left-[280px]' : 'md:left-[80px]'}
        left-0
        bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95
        backdrop-blur-xl border-b border-gray-700/30
        transition-all duration-300
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    > 
      <div className="h-14 lg:h-18 px-4 mx-auto max-w-[1920px]">
        <div className="h-full flex items-center justify-between gap-4">
          
                    
          {/* Search Section */}
          <div className="relative flex-1 max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto lg:ml-16">
          <div className="relative ml-10 md:ml-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
              <span className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded-md">
                ⌘ K
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full pl-8 lg:pl-10 pr-8 lg:pr-16 py-2 lg:py-3 
                  text-xs lg:text-sm
                  bg-gray-800/50 border border-gray-700/50 
                  rounded-lg lg:rounded-xl 
                  text-gray-100 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                  transition-all duration-300"
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
            </div>

          <AnimatePresence>
          {isSearchFocused && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-x-4 sm:absolute sm:inset-x-0 top-full mt-2"
          >
            <div className="bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-lg overflow-hidden">
            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-700/50">
            <div className="space-y-4 p-3 sm:p-4">
            {/* Contacts Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Contacts
                  </h3>
                  <span className="text-[10px] text-gray-500">
                    {SEARCH_SUGGESTIONS.contacts.length} people
                  </span>
                </div>
                
                <div className="space-y-1">
                  {SEARCH_SUGGESTIONS.contacts.map((contact) => (
                    <motion.button
                      key={contact.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg 
                        hover:bg-gray-700/50 transition-all duration-200 group"
                    >
                      <div className="relative flex-shrink-0">
                        <img 
                          src={contact.image} 
                          alt={contact.name}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover 
                            ring-2 ring-gray-700/50 group-hover:ring-gray-600/50"
                        />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 
                          rounded-full border-2 border-gray-800
                          ${contact.status === 'online' ? 'bg-emerald-500' : 
                            contact.status === 'away' ? 'bg-amber-500' : 
                            'bg-gray-500'}`} 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-gray-100 truncate 
                          group-hover:text-white transition-colors">
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate 
                          group-hover:text-gray-300 transition-colors">
                          {contact.role} • {contact.department}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recent Items */}
              <div className="space-y-2">
                <h3 className="px-2 text-[10px] sm:text-xs font-medium 
                  text-gray-400 uppercase tracking-wider">
                  Recent
                </h3>
                <div className="space-y-1">
                  {SEARCH_SUGGESTIONS.recent.map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg 
                        hover:bg-gray-700/50 transition-all duration-200 group"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg 
                        bg-gray-700/50 flex items-center justify-center 
                        group-hover:bg-gray-600/50 transition-colors">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 
                          group-hover:text-gray-300" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-gray-100 truncate 
                          group-hover:text-white transition-colors">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-400 truncate 
                          group-hover:text-gray-300 transition-colors">
                          {item.subtitle} • {item.lastOpened || item.lastViewed}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h3 className="px-2 text-[10px] sm:text-xs font-medium 
                  text-gray-400 uppercase tracking-wider">
                  Quick Actions
                </h3>
                {renderQuickActions()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

{/* Right Section */}
<div className="flex items-center gap-4">
  {/* Activity Icon */}
  <div className="relative dropdown-container">
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={() => setIsActivityOpen(!isActivityOpen)}
      className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
    >
      <Activity className="w-5 h-5 lg:w-7 lg:h-7" />
      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-gray-900" />
    </motion.button>

    {/* Activities Panel with Timeline */}
    <AnimatePresence>
      {isActivityOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed inset-x-4 sm:absolute sm:inset-x-auto sm:right-0 top-full 
            mt-2 w-[calc(100%-2rem)] sm:w-80 
            bg-gray-800/95 backdrop-blur-xl 
            border border-gray-700/50 rounded-xl shadow-lg"
        >
          <div className="p-3 sm:p-4">
            {/* Header with Timeline Title */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-100">
                  Activity Timeline
                </h2>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                  Recent updates & changes
                </p>
              </div>
              <button className="text-[10px] sm:text-xs text-indigo-400 hover:text-indigo-300">
                View all
              </button>
            </div>

            {/* Timeline Content */}
            <div className="relative max-h-[45vh] overflow-y-auto 
              scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-700/50">
              <div className="space-y-4 relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-700/50" />

                {RECENT_ACTIVITIES.map(activity => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative pl-8"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-3 top-4 w-2.5 h-2.5 rounded-full 
                      transform -translate-x-1/2 border-2 border-gray-800
                      ${activity.type === 'user_action' ? 'bg-indigo-400' : 'bg-emerald-400'}`}
                    />

                    <div className="relative p-3 rounded-xl 
                      bg-gray-800/50 hover:bg-gray-700/50 
                      border border-gray-700/50 
                      transition-all duration-300"
                    >
                      {activity.type === 'user_action' ? (
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                          <img 
                            src={activity.user.avatar}
                            alt={activity.user.name}
                            className="w-8 h-8 rounded-lg object-cover ring-2 ring-gray-700/50"
                          />
                          <div className="flex-1 min-w-0 text-center sm:text-left">
                            <p className="text-xs sm:text-sm font-medium text-gray-100">
                              {activity.user.name}
                            </p>
                            <p className="text-[10px] text-gray-400 mb-1">
                              {activity.user.role}
                            </p>
                            <p className="text-[10px] text-gray-300">
                              <span className="text-indigo-400">{activity.action}</span>
                              {' '}{activity.target}
                            </p>
                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                              <span className="text-[10px] text-gray-500">{activity.time}</span>
                              <span className="text-[10px] text-gray-400">•</span>
                              <span className="text-[10px] text-gray-400">{activity.details}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-emerald-400" />
                            <h4 className="text-xs font-medium text-gray-100">
                              {activity.title}
                            </h4>
                          </div>
                          <p className="text-[10px] text-gray-400 mb-2">
                            {activity.description}
                          </p>
                          {activity.metrics && (
                            <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-gray-700/30">
                              {Object.entries(activity.metrics).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-gray-400">
                                    {key}:
                                  </span>
                                  <span className="text-[10px] font-medium text-gray-300">
                                    {value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          <span className="block text-[10px] text-gray-500 mt-2">
                            {activity.time}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* Notification Icon */}
  <div className="relative dropdown-container">
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={() => setIsNotificationOpen(!isNotificationOpen)}
      className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
    >
      <Bell className="w-5 h-5 lg:w-7 lg:h-7" />
      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-400 ring-2 ring-gray-900" />
    </motion.button>

    <AnimatePresence>
      {isNotificationOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed inset-x-4 sm:absolute sm:inset-x-auto sm:right-0 top-full 
            mt-2 w-[calc(100%-2rem)] sm:w-80
            bg-gray-800/95 backdrop-blur-xl 
            border border-gray-700/50 rounded-xl shadow-lg
            overflow-hidden"
        >
          {/* Header - Reduced padding */}
          <div className="p-2.5 sm:p-3 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-100">
                Notifications
              </h2>
              <button className="text-[10px] sm:text-xs text-indigo-400 hover:text-indigo-300">
                Mark all as read
              </button>
            </div>
          </div>

          {/* Scrollable Content - Reduced max-height */}
          <div className="max-h-[45vh] overflow-y-auto 
            scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-700/50">
            <div className="p-2.5 sm:p-3 space-y-2">
              {NOTIFICATIONS.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          </div>

          {/* Footer - Reduced padding */}
          <div className="p-2.5 sm:p-3 border-t border-gray-700/50">
            <button 
              className="w-full py-1.5 px-3 rounded-lg
                bg-gray-700/50 hover:bg-gray-700/70
                text-xs font-medium text-gray-100
                transition-colors duration-200"
            >
              View All Notifications
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* Time and Date */}
  <div className="hidden lg:flex flex-col items-end">
    <span className="text-sm font-medium text-gray-100">
      {formatTime(currentTime)}
    </span>
    <span className="text-xs text-gray-400">
      {formatDate(currentTime)}
    </span>
  </div>

  {/* Profile Section */}
  <div className="relative dropdown-container">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsProfileOpen(!isProfileOpen)}
      className="flex items-center gap-3 p-1.5 rounded-xl 
        hover:bg-gray-700/50 transition-all duration-200"
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <img 
            src={PROFILE_DATA.avatar}
            alt={PROFILE_DATA.name}
            className="w-9 h-9 rounded-lg object-cover 
              ring-2 ring-gray-700/50"
          />
          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 
            rounded-full ${PROFILE_DATA.status === 'online' ? 'bg-emerald-500' : 'bg-gray-500'}
            ring-2 ring-gray-900`} 
          />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-100">
            {PROFILE_DATA.name}
          </p>
          <p className="text-[10px] text-gray-400">
            {PROFILE_DATA.position}
          </p>
        </div>
      </div>
      <ChevronDown 
        size={14} 
        className={`text-gray-400 transition-transform duration-200
          ${isProfileOpen ? 'rotate-180' : ''}`}
      />
    </motion.button>

    <AnimatePresence>
    {isProfileOpen && (
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: 10 }}
className="absolute right-0 mt-2 w-56 rounded-xl 
  bg-gray-800/95 backdrop-blur-xl 
  border border-gray-700/50 shadow-lg"
>
<div className="p-1.5 space-y-1">
<button className="w-full flex items-center gap-3 p-2 rounded-lg 
  hover:bg-gray-700/50 transition-colors duration-200 text-gray-100">
  <User size={16} className="text-gray-400" />
  <span className="text-sm">My Profile</span>
</button>

<button className="w-full flex items-center gap-3 p-2 rounded-lg 
  hover:bg-gray-700/50 transition-colors duration-200 text-gray-100">
  <Settings size={16} className="text-gray-400" />
  <span className="text-sm">Account Settings</span>
</button>

<div className="my-1 border-t border-gray-700/50" />

<button className="w-full flex items-center gap-3 p-2 rounded-lg 
  hover:bg-gray-700/50 transition-colors duration-200 text-red-400">
  <LogOut size={16} />
  <span className="text-sm">Sign Out</span>
</button>
</div>
</motion.div>
)}
    </AnimatePresence>
  </div>
</div>
</div>
</div>
</motion.header>
);
};


const ProfileMenuItem = ({ icon: Icon, label, danger }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    className={`w-full flex items-center gap-3 p-2 rounded-lg 
      hover:bg-gray-700/50 transition-colors duration-200
      ${danger ? 'text-red-400' : 'text-gray-100'}`}
  >
    <Icon size={16} className={danger ? 'text-red-400' : 'text-gray-400'} />
    <span className="text-sm">{label}</span>
  </motion.button>
);

ProfileMenuItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  danger: PropTypes.bool
};

Header.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
