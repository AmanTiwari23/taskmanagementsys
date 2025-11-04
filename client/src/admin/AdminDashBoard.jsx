import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const adminName = localStorage.getItem("adminname");
  const adminEmail = localStorage.getItem("adminemail");

  return (
    <>
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold tracking-wide">Admin Dashboard</h1>
      </div>

      {/* Welcome Bar */}
      <div className="bg-indigo-50 border-b border-indigo-200 py-3 px-6 flex justify-between items-center text-sm md:text-base text-gray-700 font-medium">
        <p>
          Welcome, <span className="text-indigo-700 font-semibold">{adminName}</span>  
          <span className="ml-2 text-gray-500">({adminEmail})</span>
        </p>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Layout */}
      <div className="flex flex-col md:flex-row min-h-[80vh] bg-gray-100">
        {/* Sidebar Menu */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 shadow-sm">
          <nav className="p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Menu
            </h2>
            <Link
              to="create-user"
              className="block py-2 px-4 rounded-lg text-gray-700 font-medium hover:bg-indigo-100 hover:text-indigo-700 transition duration-200"
            >
              Create User
            </Link>
            
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-6">
          <div className="bg-white rounded-xl shadow-md p-6 min-h-[70vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
