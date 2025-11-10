import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";


const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
    <div className={`p-4 rounded-full ${colorClass}`}>{icon}</div>
  </div>
);

const EmpDashBoard = () => {
  const navigate = useNavigate();
  const empName = localStorage.getItem("empname");
  const empDesignation = localStorage.getItem("empdesignation");
  const empid = localStorage.getItem("empid");

  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  
  useEffect(() => {
    if (!empid) {
      toast.error("Employee not found. Please log in.");
      navigate("/");
      return;
    }

    const loadStats = async () => {
      try {
        
        const api = `${
          import.meta.env.VITE_BACKEND_URL
        }/employee/stats?id=${empid}`;
        const response = await axios.get(api);
        setStats(response.data);
      } catch (error) {
        toast.error("Could not fetch dashboard stats.");
        console.log(error);
      }
    };
    loadStats();
  }, [empid, navigate]);

 
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
          <div className="flex items-center space-x-3">
            <FaUserCircle className="h-8 w-8 text-indigo-600" />
            <div>
              <p className="text-base md:text-lg text-gray-800 font-semibold">
                Welcome, {empName}
              </p>
              <p className="text-sm text-gray-500">{empDesignation}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-gray-50 min-h-[calc(100vh-110px)]">
       
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 shadow-sm">
          <nav className="p-4 space-y-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">
              Menu
            </h2>
             <NavLink to="/emp-dashboard" className={getNavLinkClass} end>
              <FaClipboardList className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="mytask" className={getNavLinkClass} end>
              <FaClipboardList className="h-5 w-5" />
              <span>My Tasks</span>
            </NavLink>
            <NavLink to="completedtask" className={getNavLinkClass} end>
              <FaClipboardList className="h-5 w-5" />
              <span>Completed Tasks</span>
            </NavLink>
           
          </nav>
        </aside>

        <main className="grow p-6 md:p-10">
         
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Tasks"
              value={stats.total}
              icon={<FaTasks className="h-6 w-6" />}
              colorClass="bg-blue-100 text-blue-600"
            />
            <StatCard
              title="Pending Tasks"
              value={stats.pending}
              icon={<FaClock className="h-6 w-6" />}
              colorClass="bg-yellow-100 text-yellow-600"
            />
            <StatCard
              title="Completed Tasks"
              value={stats.completed}
              icon={<FaCheckCircle className="h-6 w-6" />}
              colorClass="bg-green-100 text-green-600"
            />
          </div>

         
          <Outlet context={{ empid, setStats }} />
        </main>
      </div>
    </>
  );
};

export default EmpDashBoard;