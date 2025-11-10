import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaUsers,
} from "react-icons/fa";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    
    if (!email || !password || !usertype) {
      setError("Please fill out all fields.");
      return;
    }
   


    let api;
    if (usertype === "admin") {
      api = `${import.meta.env.VITE_BACKEND_URL}/admin/login`;
    } else {
      api = `${import.meta.env.VITE_BACKEND_URL}/employee/login`;
    }

    const loginPromise = axios.post(api, { email, password });

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (response) => {
        if (usertype === "admin") {
          localStorage.setItem("adminname", response.data.Admin.name);
          localStorage.setItem("adminemail", response.data.Admin.email);
          navigate("/admin-dashboard");
        } else {
          localStorage.setItem("empid", response.data.employee._id);
          localStorage.setItem("empname", response.data.employee.name);
          localStorage.setItem("empemail", response.data.employee.email);
          localStorage.setItem(
            "empdesignation",
            response.data.employee.designation
          );
          navigate("/emp-dashboard");
        }
        return response.data.msg || "Login successful!";
      },
      error: (err) => {
        console.log(err);
        return err.response?.data?.msg || "Login failed. Please try again.";
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <span className="inline-block p-4 bg-indigo-100 rounded-full">
            <FaUserShield className="h-10 w-10 text-indigo-600" />
          </span>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

       
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
             
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select User Type
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUsers className="h-5 w-5 text-gray-400" />
              </span>
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300 appearance-none"
                value={usertype}
                onChange={(e) => setUserType(e.target.value)}
               
              >
                <option value="">Select user type</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
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
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;