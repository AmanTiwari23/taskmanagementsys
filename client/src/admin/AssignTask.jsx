import axios from "axios";
import { useState, useEffect } from "react";

const AssignTask = () => {
  const [mydata, setMydata] = useState([]);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({});
  const [uid, setUid] = useState("");

  // This function now also clears the form state
  const handleClose = () => {
    setShow(false);
    setInput({}); // Clear form on close
    setUid("");   // Clear selected user ID
  };
  
  const handleShow = (id) => {
    setUid(id);
    setShow(true);
  };

  const loadData = async () => {
    try {
      let api = `${import.meta.env.VITE_BACKEND_URL}/admin/empdisplay`;
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
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
    try {
      let api = `${import.meta.env.VITE_BACKEND_URL}/admin/tasksave`;
      const response = await axios.post(api, { id: uid, ...input });
      console.log(response);
      handleClose(); // Close modal on successful submission
      // You could add a success toast notification here
    } catch (error) {
      console.log(error);
      // You could add an error toast notification here
    }
  };

  // Improved mapping with Tailwind classes and a 'key' prop
  const ans = mydata.map((key) => {
    return (
      <tr key={key._id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {key.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {key.designation}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {key.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          {/* Tailwind Styled Button */}
          <button
            onClick={() => handleShow(key._id)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            Assign Task
          </button>
        </td>
      </tr>
    );
  });

  return (
    // Add some padding to the main container
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Assign Task</h1>

      {/* Tailwind Styled Table */}
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Employee Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Designation
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
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
      </div>

      {/* --- Tailwind CSS Modal --- */}
      {show && (
        // Overlay (Backdrop)
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleClose} // Close modal when clicking overlay
        >
          {/* Modal Content */}
          <div
            className="bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside content
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Assign New Task</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body (Form) */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                {/* Task Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Task
                  </label>
                  <input
                    type="text"
                    name="task"
                    value={input.task || ""} // Controlled component
                    onChange={handleInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Duration Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Duration (in days)
                  </label>
                  <input
                    type="number" // Use type="number" for days
                    name="duration"
                    value={input.duration || ""} // Controlled component
                    onChange={handleInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                {/* Priority Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Priority
                  </label>
                  <select
                    name="priority"
                    value={input.priority || ""} // Controlled component
                    onChange={handleInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="" disabled>Select priority</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer (Buttons) */}
              <div className="flex justify-end items-center gap-3 p-5 border-t bg-gray-50">
                <button
                  type="button" // Important: type="button" to prevent form submission
                  onClick={handleClose}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
                >
                  Submit Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignTask;