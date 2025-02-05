//components/Navbar.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Menu } from 'lucide-react';

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 z-20">
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
            aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <Menu size={24} />
          </button>
          <img src="/logo_union.jpg" alt="Logo" className="h-8" />
          <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">Panel Administrativo</h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );
}