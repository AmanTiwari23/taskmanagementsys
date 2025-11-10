import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import toast from "react-hot-toast"; 

import {
  FaTachometerAlt,
  FaUserPlus,
  FaTasks,
  FaSignOutAlt,
  FaUserCircle,
  FaClipboardCheck,
  FaSpinner,
} from "react-icons/fa";

const AdminDashboard = () => {
  const adminName = localStorage.getItem("adminname");
  const adminEmail = localStorage.getItem("adminemail");
  const navigate = useNavigate();

 
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  
  const fetchStats = async () => {
    setIsLoadingStats(true);
    try {
     
      const api = `${
        import.meta.env.VITE_BACKEND_URL
      }/admin/dashboard-stats`;
      const response = await axios.get(api);
      
    
      setStats(response.data);
    } catch (error) {
      console.error("Failed to load admin dashboard stats:", error);
      toast.error("Failed to load dashboard statistics.");
    } finally {
      setIsLoadingStats(false);
    }
  };

 
  useEffect(() => {
   
    if (!adminName) {
        navigate('/'); 
        return;
    }
    fetchStats();
  }, [navigate, adminName]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully.");
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) => {
    return `flex items-center space-x-3 py-2.5 px-4 rounded-lg font-medium transition duration-200 ${
      isActive
        ? "bg-indigo-100 text-indigo-700 shadow-sm"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
    }`;
  };

  return (
    <>
     
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaUserCircle className="h-7 w-7 text-indigo-600" />
            <p className="text-sm md:text-base text-gray-700 font-medium">
              Welcome, <span className="text-indigo-700 font-semibold">{adminName}</span>
              <span className="hidden sm:inline ml-2 text-gray-500">({adminEmail})</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-110px)] bg-gray-50">
        
      
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 shadow-sm">
          <nav className="p-4 space-y-2">
            <NavLink to="/admin-dashboard" className={getNavLinkClass} end>
              <FaTachometerAlt className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="create-user" className={getNavLinkClass}>
              <FaUserPlus className="h-5 w-5" />
              <span>Create User</span>
            </NavLink>
            <NavLink to="assign-task" className={getNavLinkClass}>
              <FaTasks className="h-5 w-5" />
              <span>Assign Task</span>
            </NavLink>
            <NavLink to="submitted-reports" className={getNavLinkClass}>
              <FaClipboardCheck className="h-5 w-5" />
              <span>Submitted Reports</span>
            </NavLink>
          </nav>
        </aside>

       
        <main className="grow p-6">
          <div className="bg-white rounded-xl shadow-lg p-6 min-h-[75vh]">
            
          
           <Outlet context={{ stats, isLoadingStats, fetchStats }} />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;