//components/navbar.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo_union.png" alt="Logo" className="h-8" />
          <h1 className="text-xl font-semibold text-gray-800">Panel Administrativo</h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );
}