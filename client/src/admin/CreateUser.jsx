import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; 

import { FaUserPlus, FaEnvelope, FaUserTie, FaBriefcase } from "react-icons/fa";

const CreateUser = () => {
  const [input, setInput] = useState({
    empname: "",
    empemail: "",
    designation: "",
  });
  const [isLoading, setIsLoading] = useState(false); 

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!input.empname || !input.empemail || !input.designation) {
      toast.error("Please fill out all fields.");
      return;
    }

    setIsLoading(true);
    const api = `${import.meta.env.VITE_BACKEND_URL}/admin/usercreate`;
    const createPromise = axios.post(api, input);

    
    toast.promise(createPromise, {
      loading: "Creating user...",
      success: (response) => {
        setInput({ empname: "", empemail: "", designation: "" });
        setIsLoading(false);
        return response.data.msg || "User created successfully!";
      },
      error: (err) => {
        setIsLoading(false);
        return err.response?.data?.msg || "Failed to create user.";
      },
    });
  };

  return (
    
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
     
      <div className="flex flex-col items-center mb-6">
        <span className="inline-block p-4 bg-indigo-100 rounded-full mb-3">
          <FaUserPlus className="h-10 w-10 text-indigo-600" />
        </span>
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create New Employee
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
       
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Employee Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUserTie className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              name="empname"
              value={input.empname}
              onChange={handleInput}
              placeholder="e.g., user"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
            
            />
          </div>
        </div>

        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Employee Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="email"
              name="empemail"
              value={input.empemail}
              onChange={handleInput}
              placeholder="e.g., user@company.com"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
             
            />
          </div>
        </div>

        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Select Designation
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaBriefcase className="h-5 w-5 text-gray-400" />
            </span>
            <select
              name="designation"
              value={input.designation}
              onChange={handleInput}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300 appearance-none"
              
            >
              <option value="">Select designation</option>
              <option value="Programmer">Programmer</option>
              <option value="Tester">Tester</option>
              <option value="Designer">Designer</option>
              <option value="DB Designer">Database Designer</option>
              <option value="Analyst">Analyst</option>
            </select>
           
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
          </div>
        </div>

       
        <button
          type="submit"
          disabled={isLoading} 
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:-translate-y-0.5
          disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" 
        >
          {isLoading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;