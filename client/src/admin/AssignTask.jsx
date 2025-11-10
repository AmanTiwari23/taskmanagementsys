import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast"; 

import {
  FaTasks,
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaPaperPlane,
  FaClipboardList,
  FaEdit,
  FaClock,
  FaExclamationCircle,
  FaTimes,
  FaSpinner,
  FaUsersSlash,
} from "react-icons/fa";

const AssignTask = () => {
  const [mydata, setMydata] = useState([]);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({});
  const [uid, setUid] = useState("");

  
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setShow(false);
    setInput({});
    setUid("");
  };

  const handleShow = (id) => {
    setUid(id);
    setShow(true);
  };

  const loadData = async () => {
    setIsTableLoading(true); 
    try {
      let api = `${import.meta.env.VITE_BACKEND_URL}/admin/empdisplay`;
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to load employees.");
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!input.task || !input.duration || !input.priority) {
      toast.error("Please fill out all fields.");
      return;
    }
  const payload = {
        id: uid,
        task: input.task,
        priority: input.priority,
       
        duration: parseInt(input.duration), 
    };
    setIsSubmitting(true);
    let api = `${import.meta.env.VITE_BACKEND_URL}/admin/tasksave`;
    
 
    const taskPromise = axios.post(api, payload);

    
    toast.promise(taskPromise, {
      loading: "Assigning task...",
      success: (response) => {
        handleClose();
        setIsSubmitting(false);
        return response.data.msg || "Task assigned successfully!";
      },
      error: (err) => {
        setIsSubmitting(false);
        return err.response?.data?.msg || "Failed to assign task.";
      },
    });
  };

  const ans = mydata.map((key) => {
    return (
      <tr key={key._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {key.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {key.designation}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
         
          <a
            href={`mailto:${key.email}`}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {key.email}
          </a>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          
          <button
            onClick={() => handleShow(key._id)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            <FaPaperPlane className="h-4 w-4" />
            <span>Assign Task</span>
          </button>
        </td>
      </tr>
    );
  });

 
  const TableLoader = () => (
    <div className="flex justify-center items-center py-20">
      <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
      <p className="ml-3 text-gray-600">Loading employees...</p>
    </div>
  );

  
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FaUsersSlash className="h-16 w-16 text-gray-400" />
      <h3 className="mt-4 text-xl font-semibold text-gray-800">No Employees Found</h3>
      <p className="mt-2 text-gray-500">
        Try creating a new employee in the "Create User" section.
      </p>
    </div>
  );

  return (
    <div className="p-6 md:p-10">
      <h1 className="flex items-center space-x-3 text-3xl font-bold text-gray-800 mb-6">
        <FaTasks className="text-indigo-600" />
        <span>Assign Task to Employee</span>
      </h1>

      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg bg-white">
       
        {isTableLoading ? (
          <TableLoader />
        ) : mydata.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
           <thead className="bg-gray-50">
  <tr>
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      
      <div className="flex items-center space-x-2">
        <FaUser /> <span>Employee Name</span>
      </div>
    </th>
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      
      <div className="flex items-center space-x-2">
        <FaBriefcase /> <span>Designation</span>
      </div>
    </th>
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
     
      <div className="flex items-center space-x-2">
        <FaEnvelope /> <span>Email</span>
      </div>
    </th>
    <th scope="col" className="relative px-6 py-3">
      <span className="sr-only">Assign</span>
    </th>
  </tr>
</thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ans}
            </tbody>
          </table>
        )}
      </div>

      
      <div
        className={`fixed inset-0 z-40 bg-black flex items-center justify-center p-4
          transition-opacity duration-300 ease-in-out
          ${show ? "bg-opacity-50 opacity-100" : "bg-opacity-0 opacity-0 pointer-events-none"}`}
        onClick={handleClose}
      >
        
        <div
          className={`bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden
            transition-all duration-300 ease-in-out
            ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95"}`}
          onClick={(e) => e.stopPropagation()}
        >
         
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="flex items-center space-x-2 text-xl font-semibold text-gray-800">
              <FaClipboardList className="text-indigo-600" />
              <span>Assign New Task</span>
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

         
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-5">
             
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Enter Task
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaEdit className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    name="task"
                    value={input.task || ""}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                   
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Enter Duration (in days)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaClock className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    type="number"
                    name="duration"
                    value={input.duration || 0 }
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                   
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Select Priority
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaExclamationCircle className="h-5 w-5 text-gray-400" />
                  </span>
                  <select
                    name="priority"
                    value={input.priority || ""}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none appearance-none"
                   
                  >
                    <option value="">Select priority</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
            </div>

           
            <div className="flex justify-end items-center gap-3 p-5 border-t bg-gray-50">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm transition duration-200"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-200
                disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin h-5 w-5" />
                ) : (
                  "Submit Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignTask;