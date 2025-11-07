import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast"; 

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
    
      <Toaster position="top-right" reverseOrder={false} />

      <Header />

      
      <main className="flex-grow">
        <Outlet />
      </main>

     
      <Footer />
    </div>
  );
};

export default Layout;