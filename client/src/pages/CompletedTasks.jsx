import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { FaSpinner, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const CompletedTasks = () => {
    const { empid } = useOutletContext();

    const [mydata, setMydata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        setIsLoading(true);
        try {
            if (!empid) {
                toast.error("Employee ID not found.");
                setIsLoading(false);
                return;
            }
            
            let api = `${import.meta.env.VITE_BACKEND_URL}/employee/showtask/?id=${empid}`;
            const response = await axios.get(api);
            
            
            const completed = response.data.filter(task => task.status === "Fully Completed");
            setMydata(completed);

        } catch (error) {
            console.log(error);
            toast.error("Failed to load completed tasks.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [empid]);

   
    let sno = 0;
    const ans = mydata.map((key) => {
        sno++;
        return (
            <tr key={key._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sno}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{key.task}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    
                    Original: {key.duration} days
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {key.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                   
                    N/A (See task status report)
                </td>
            </tr>
        );
    });

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <FaCheckCircle className="text-green-600" />
                <span>My Completed Tasks</span>
            </h2>

            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg bg-white">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
                        <p className="ml-3 text-gray-600">Loading completed tasks...</p>
                    </div>
                ) : mydata.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <FaClipboardList className="h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800">No Completed Tasks Yet</h3>
                        <p className="mt-2 text-gray-500">
                            Get back to work and start submitting those reports!
                        </p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Detail</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Duration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Completed</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">{ans}</tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CompletedTasks;