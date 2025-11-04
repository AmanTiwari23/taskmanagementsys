import { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let api = `${import.meta.env.VITE_BACKEND_URL}/admin/usercreate`;
      const response = await axios.post(api, input);
      console.log(response.data);
      alert("User created successfully!");
      setInput({});
    } catch (error) {
      console.log(error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
        Create New User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Employee Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Employee Name
          </label>
          <input
            type="text"
            name="empname"
            value={input.empname || ""}
            onChange={handleInput}
            placeholder="Enter employee name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        {/* Employee Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Employee Email
          </label>
          <input
            type="email"
            name="empemail"
            value={input.empemail || ""}
            onChange={handleInput}
            placeholder="Enter employee email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Designation
          </label>
          <select
            name="designation"
            value={input.designation || ""}
            onChange={handleInput}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          >
            <option value="">Select designation</option>
            <option value="Programmer">Programmer</option>
            <option value="Tester">Tester</option>
            <option value="Designer">Designer</option>
            <option value="DB Designer">Database Designer</option>
            <option value="Analyst">Analyst</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
