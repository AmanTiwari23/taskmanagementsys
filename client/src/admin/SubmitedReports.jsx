import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaSpinner,
  FaClipboardList,
  FaClipboardCheck,
  FaRedoAlt,
  FaSearch,
} from "react-icons/fa";

const SubmittedReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;


  const loadReports = async () => {
    setIsLoading(true);
    try {
     
      const api = `${BASE_URL}/admin/submittedreports`;
      const response = await axios.get(api);
      
      
      setReports(response.data); 
    } catch (error) {
      console.error("Failed to load reports:", error);
      toast.error("Failed to load submitted reports from the server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

 
 


  let sno = 0;
  const ans = reports.map((key) => {
    sno++;
    return (
      <tr key={key._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sno}</td>
        
       
        <td className="px-6 py-4 text-sm font-medium text-indigo-700">
            {key.employeeName || "N/A"} ({key.empid.substring(0, 4)}...) 
        </td>
        
        <td className="px-6 py-4 text-sm text-gray-800">{key.task}</td>
        
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <span
            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              key.status === "Fully Completed" 
                ? "bg-green-100 text-green-800"
                : key.status === "Partial Completed"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {key.status || "Reported"}
          </span>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
            {key.completionDays || '-'} days
        </td>
        
        
      </tr>
    );
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
        <FaClipboardCheck className="text-indigo-600" />
        <span>Employee Task Reports</span>
      </h2>

     
      <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
          <FaSearch className="text-gray-500 h-5 w-5" />
          <p className="text-sm text-gray-600">
              *Reports are tasks where the employee has submitted a status update.
              
          </p>
      </div>

      
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg bg-white">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
            <p className="ml-3 text-gray-600">Loading submitted reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FaClipboardList className="h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">No Reports Submitted Yet</h3>
            <p className="mt-2 text-gray-500">
              Employees have not submitted any task reports.
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Taken</th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">{ans}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SubmittedReports;