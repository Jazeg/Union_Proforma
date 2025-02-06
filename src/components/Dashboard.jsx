//src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Dashboard() {
 const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
 const [loading, setLoading] = useState(true);
 const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

 useEffect(() => {
   const handleResize = () => {
     const mobile = window.innerWidth < 1024;
     setIsMobile(mobile);
     if (mobile) {
       setSidebarOpen(false);
     }
   };
   window.addEventListener('resize', handleResize);
   setLoading(false);
   return () => window.removeEventListener('resize', handleResize);
 }, []);

 const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

 if (loading) {
   return (
     <div className="flex h-screen items-center justify-center">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4361EE]"></div>
     </div>
   );
 }

 return (
   <div className="flex h-screen bg-gray-100 overflow-hidden no-print">
     <div 
       className={`${isMobile ? 'fixed' : 'relative'} h-full bg-[#4361EE] transition-all duration-500 ease-in-out z-50
         ${isMobile ? (sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full') : (sidebarOpen ? 'w-64' : 'w-20')}`}
     >
       <Sidebar collapsed={!sidebarOpen} />
     </div>
     
     <div className="flex-1 flex flex-col min-w-0">
       <Navbar toggleSidebar={toggleSidebar} />
       <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
         <div className="container mx-auto">
           <Outlet />
         </div>
       </main>
     </div>
     
     {sidebarOpen && isMobile && (
       <div 
         className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ease-in-out"
         onClick={toggleSidebar}
       />
     )}
   </div>
 );
}