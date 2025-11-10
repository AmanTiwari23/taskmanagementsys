import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { FaRegSmileBeam, FaTasks, FaBullhorn, FaArrowRight } from 'react-icons/fa';



const EmployeeHome = () => {
    
    const context = useOutletContext();
    const { empid, setStats } = context;

   
    const empName = localStorage.getItem("empname") || "Valued Employee";
    const empDesignation = localStorage.getItem("empdesignation") || "Staff Member";

    return (
        <div className="space-y-8">
            
          
            <div className="bg-white p-8 rounded-xl shadow-xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 flex items-center space-x-3">
                    <FaRegSmileBeam className="text-yellow-500" />
                    <span>Hello, {empName}!</span>
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    Your central hub for task management.
                </p>
                <div className="text-sm text-gray-500 mt-3 border-t pt-3 flex flex-wrap gap-x-4">
                    <p>Designation: <span className="font-semibold text-gray-700">{empDesignation}</span></p>
                    <p>Employee ID: <span className="font-mono text-xs">{empid ? empid.substring(0, 10) + '...' : 'N/A'}</span></p>
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 pt-4">Quick Access</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 transition duration-300 hover:shadow-xl">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                        <FaTasks className="text-indigo-500" />
                        <span>View All Assigned Tasks</span>
                    </h3>
                    <p className="text-gray-600 mt-3 mb-4">
                        Jump directly to your list of active, pending, and completed assignments.
                    </p>
                    <Link
                        to="mytask" 
                        className="inline-flex items-center space-x-2 text-indigo-600 font-semibold hover:text-indigo-800 transition duration-200"
                    >
                        <span>Go to My Tasks</span>
                        <FaArrowRight className="h-4 w-4" />
                    </Link>
                </div>

               
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 transition duration-300 hover:shadow-xl">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                        <FaBullhorn className="text-green-500" />
                        <span>Latest Updates</span>
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 mt-3 space-y-2">
                        <li>**Reminder:** All High Priority tasks must be reviewed by EOD.</li>
                        <li>Q3 feedback submissions are now open.</li>
                        <li>See your task counts in the header above!</li>
                    </ul>
                </div>
            </div>

           
            <div className="bg-white p-6 rounded-xl shadow-lg text-center text-gray-500 mt-8">
                <p className="font-semibold">Need to start a task? Check the "My Tasks" section.</p>
            </div>

        </div>
    );
};

export default EmployeeHome;