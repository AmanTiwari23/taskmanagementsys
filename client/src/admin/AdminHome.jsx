import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import {
  FaUsers,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaUserPlus,
  FaPlusCircle,
  FaSpinner,
} from "react-icons/fa";


const StatCard = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`p-4 rounded-full ${colorClass}`}>{icon}</div>
    </div>
  );
};

const AdminHome = () => {
 
  const context = useOutletContext() || {};
  const {
    stats = {
      totalEmployees: 0,
      totalTasks: 0,
      pendingTasks: 0,
      completedTasks: 0,
    },
    isLoadingStats = true,
  } = context;


 
  const [recentTasks, setRecentTasks] = useState([]);
  const [isLoadingRecentTasks, setIsLoadingRecentTasks] = useState(true); 
  const [isError, setIsError] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  
  const fetchRecentTasks = async () => {
    setIsLoadingRecentTasks(true);
    setIsError(false);
    try {
      const tasksApi = `${BASE_URL}/admin/recent-tasks`;
      const tasksResponse = await axios.get(tasksApi);
      setRecentTasks(tasksResponse.data);
    } catch (error) {
      console.error("Error fetching recent tasks:", error);
      setIsError(true);
    } finally {
      setIsLoadingRecentTasks(false);
    }
  };

 
  useEffect(() => {
    fetchRecentTasks();
  }, []);

 
  if (isLoadingStats) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
        <p className="ml-3 text-lg text-gray-600">Loading Dashboard Data...</p>
      </div>
    );
  }

  
  if (isError) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <h2 className="text-xl font-bold text-red-700">Error Loading Data</h2>
        <p className="text-red-500">
          Could not load recent tasks. Check the network connection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
     
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      <p className="text-gray-600">Here's a quick overview of your system.</p>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={<FaUsers className="h-6 w-6" />}
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={<FaTasks className="h-6 w-6" />}
          colorClass="bg-indigo-100 text-indigo-600"
        />
        {/* <StatCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          icon={<FaClock className="h-6 w-6" />}
          colorClass="bg-yellow-100 text-yellow-600"
        /> */}
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks} 
          icon={<FaCheckCircle className="h-6 w-6" />}
          colorClass="bg-green-100 text-green-600"
        />
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              to="create-user"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
            >
              <FaUserPlus />
              <span>Create New User</span>
            </Link>
            <Link
              to="assign-task"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
            >
              <FaPlusCircle />
              <span>Assign New Task</span>
            </Link>
          </div>
        </div>

      
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Tasks
            {isLoadingRecentTasks && (
              <FaSpinner className="animate-spin ml-2 h-4 w-4 text-gray-400 inline" />
            )}
          </h3>
          <ul className="divide-y divide-gray-200">
            {recentTasks.length === 0 ? (
              <li className="py-3 text-center text-gray-500">
                No recent tasks found.
              </li>
            ) : (
              recentTasks.map((task) => (
                <li
                  key={task._id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{task.task}</p>
                    <p className="text-sm text-gray-500">
                      Assigned ID: {task.empid.substring(0, 8)}...
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
