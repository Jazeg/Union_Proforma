//components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, List, Settings } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { to: '/dashboard/new', icon: FileText, text: 'Nueva Proforma' },
    { to: '/dashboard/list', icon: List, text: 'Listar Proformas' },
    { to: '/dashboard/settings', icon: Settings, text: 'Configuración' }
  ];

  return (
    <aside className="w-64 bg-[#4361EE] text-white">
      <div className="h-full flex flex-col">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Vidriería La Unión</h2>
        </div>
        <nav className="flex-1 p-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-white text-[#4361EE]' : 'hover:bg-[#3651D4]'
                }`
              }
            >
              <link.icon size={20} />
              <span>{link.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}