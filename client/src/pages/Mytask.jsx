import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaSpinner,
  FaClipboardList,
  FaPaperPlane,
  FaTasks,
  FaCalendarCheck,
  FaTimes,
} from "react-icons/fa";

const MyTask = () => {
  const { empid, setStats } = useOutletContext();

  const [mydata, setMydata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState("");
  const [completionDays, setCompletionDays] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedTaskId(null);
    setTaskStatus("");
    setCompletionDays("");
  };

  const handleShow = (taskId) => {
    setSelectedTaskId(taskId);
    setShow(true);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (!empid) {
        toast.error("Employee ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }
      let api = `${
        import.meta.env.VITE_BACKEND_URL
      }/employee/showtask/?id=${empid}`;
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load your tasks.");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshParentStats = async () => {
    if (!empid || !setStats) return;
    try {
      const statsApi = `${
        import.meta.env.VITE_BACKEND_URL
      }/employee/stats?id=${empid}`;
      const statsResponse = await axios.get(statsApi);
      setStats(statsResponse.data);
    } catch (error) {
      console.error("Failed to refresh parent stats:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [empid]); 

  
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!taskStatus || !completionDays) {
      toast.error("Please fill out all fields in the report.");
      return;
    }

    setIsSubmitting(true);
    const reportData = {
      taskId: selectedTaskId,
      status: taskStatus,
      days: completionDays,
    };

    
    const submitPromise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/employee/submitreport`,
      reportData
    );

    toast.promise(submitPromise, {
      loading: "Submitting report...",
      success: (response) => {
        setIsSubmitting(false);
        handleClose();
        loadData(); 
        refreshParentStats(); 
        return response.data?.msg || "Report submitted successfully!";
      },
      error: (err) => {
        setIsSubmitting(false);
        return err.response?.data?.msg || "Failed to submit report.";
      },
    });
  };

  
  let sno = 0;
  
  const activeTasks = mydata.filter(
    (task) => task.status !== "Fully Completed"
  );

  const ans = activeTasks.map((key) => {
    sno++;
    return (
      <tr key={key._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {sno}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800">{key.task}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {key.duration} days
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {key.priority}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          <span
            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              key.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {key.status || "Pending"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => handleShow(key._id)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            <FaPaperPlane className="h-4 w-4" />
            <span>Send Report</span>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Active Tasks</h2>

      
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg bg-white">
        {isLoading ? (
          
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
            <p className="ml-3 text-gray-600">Loading your tasks...</p>
          </div>
        ) : activeTasks.length === 0 ? (
        
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FaClipboardList className="h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              No Active Tasks
            </h3>
            <p className="mt-2 text-gray-500">
              You have no pending tasks. Check your Completed Tasks page!
            </p>
          </div>
        ) : (
       
          <table className="min-w-full divide-y divide-gray-200">
            
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task Detail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Report</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">{ans}</tbody>
          </table>
        )}
      </div>

   
      {show && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div
            className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleReportSubmit}>
             
              <div className="flex justify-between items-center p-5 border-b">
                <h2 className="flex items-center space-x-2 text-xl font-semibold text-gray-800">
                  <FaPaperPlane className="text-indigo-600" />
                  <span>Submit Your Task Report</span>
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

          
              <div className="p-6 space-y-5">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Select Task Status
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaTasks className="h-5 w-5 text-gray-400" />
                    </span>
                    <select
                      value={taskStatus}
                      onChange={(e) => setTaskStatus(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                      required
                    >
                      <option value="">Select task status</option>
                      <option value="Fully Completed">Fully Completed</option>
                      <option value="Partial Completed">
                        Partial Completed
                      </option>
                      <option value="No Completed">No Completed</option>
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Completion Days
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaCalendarCheck className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                      type="number"
                      value={completionDays}
                      onChange={(e) => setCompletionDays(e.target.value)}
                      placeholder="E.g., 5"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
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
                    "Submit Report"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyTask;
