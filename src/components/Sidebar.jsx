//src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, List, Settings } from 'lucide-react';

export default function Sidebar({ collapsed }) {
  const links = [
    { to: '/dashboard/new', icon: FileText, text: 'Nueva Proforma' },
    { to: '/dashboard/list', icon: List, text: 'Listar Proformas' },
    { to: '/dashboard/settings', icon: Settings, text: 'Configuración' }
  ];

  return (
    <div className="h-full flex flex-col text-white">
      <div className={`p-6 ${collapsed ? 'text-center' : ''}`}>
        <h2 className={`font-semibold transition-all duration-300 ${collapsed ? 'scale-0 h-0' : 'text-lg'}`}>
          {!collapsed && 'Vidriería La Unión'}
        </h2>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center p-4 rounded-lg transition-all duration-500 ease-in-out ${
                isActive ? 'bg-white text-[#4361EE]' : 'hover:bg-[#3651D4]'
              } ${collapsed ? 'justify-center' : 'justify-start space-x-3'}`
            }
            title={collapsed ? link.text : ''}
          >
            <link.icon size={24} className="min-w-6" />
            <span className={`transition-all duration-300 ${collapsed ? 'w-0 scale-0 opacity-0' : 'w-auto'}`}>
              {link.text}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}