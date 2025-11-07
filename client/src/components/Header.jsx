
import { FaTasks } from "react-icons/fa";

const Header = () => {
  return (
    <>
     
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
       
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
         
          <div className="flex items-center space-x-2">
            <FaTasks className="h-8 w-8" />
            <span className="text-2xl font-bold tracking-wide">
              Task Management System
            </span>
          </div>

         
          
        </div>
      </header>
    </>
  );
};

export default Header;