import { BarChart2, ShoppingBag, Users, DollarSign, TrendingUp, Settings, MessageSquare, FileText, Package, HelpCircle, X, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SIDEBAR_ITEMS = [
  {
    section: "MAIN",
    items: [
      { name: "Overview", icon: BarChart2, href: "/", color: "#6366F1" },
      { name: "Analytics", icon: TrendingUp, href: "/analytics", color: "#10B981" }
    ]
  },
  {
    section: "MANAGEMENT",
    items: [
      { name: "Products", icon: ShoppingBag, href: "/products", color: "#F59E0B" },
      { name: "Orders", icon: Package, href: "/orders", color: "#3B82F6" },
      { name: "Users", icon: Users, href: "/users", color: "#8B5CF6" },
      { name: "Sales", icon: DollarSign, href: "/sales", color: "#EC4899" }
    ]
  },
  {
    section: "TOOLS",
    items: [
      { name: "Messages", icon: MessageSquare, href: "/messages", color: "#14B8A6" },
      { name: "Reports", icon: FileText, href: "/reports", color: "#F43F5E" },
      { name: "FAQ", icon: HelpCircle, href: "/faq", color: "#6366F1" },
      { name: "Settings", icon: Settings, href: "/settings", color: "#8B5CF6" }
    ]
  }
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => { 
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-3 left-3 z-[100] p-1.5 
          text-gray-400 hover:text-gray-100 transition-colors
          bg-gray-800/50 backdrop-blur-sm rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <motion.div 
        className={`
          fixed left-0 bottom-0 z-[90]
          top-0 
          w-[290px]
          bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95
          backdrop-blur-xl border-r border-gray-800/50
          transition-all duration-300 ease-in-out
          md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${!isSidebarOpen ? 'md:w-[80px]' : 'md:w-[280px]'}
        `}
      >
        <div className="h-[57px] px-4 flex items-center border-b border-gray-800/50 md:justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="hidden md:block p-2 text-gray-400 hover:text-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <nav className={`
          h-[calc(100vh-72px)] overflow-y-auto
          ${!isSidebarOpen && 'hidden md:block'}
        `}>
          <div className="py-3">
            {SIDEBAR_ITEMS.map((section, idx) => (
              <div key={section.section} className={`px-3 ${idx !== 0 ? 'mt-3' : ''}`}>
                <span className={`text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2 pl-2
                  ${!isSidebarOpen && 'md:hidden'}`}>
                  {section.section}
                </span>
                
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`
                          flex items-center gap-3 px-3 py-2.5
                          rounded-xl transition-colors duration-200
                          group/item relative
                        `}
                      >
                        <div 
                          className="relative min-w-[2.5rem] h-10 flex items-center justify-center
                            rounded-xl transition-colors duration-200"
                          style={{
                            backgroundColor: isActive ? `${item.color}15` : 'rgba(31, 41, 55, 0.5)',
                            color: isActive ? item.color : 'currentColor'
                          }}
                        >
                          <item.icon className="w-[22px] h-[22px]" />
                        </div>

                        <span 
                          className={`
                            text-sm font-medium whitespace-nowrap flex-1
                            ${!isSidebarOpen && 'md:hidden'}
                            transition-all duration-200
                          `}
                          style={{
                            color: isActive ? item.color : '#9CA3AF'
                          }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </motion.div>
    </>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
