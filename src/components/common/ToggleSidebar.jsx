import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ToggleSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Add overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50"
          onClick={toggleSidebar}
        />
      )}
      
      <div className={`
        flex-1 flex flex-col 
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-[80px]'}
      `}>
        <Header 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1 overflow-auto mt-[64px] md:mt-[72px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ToggleSidebar;
