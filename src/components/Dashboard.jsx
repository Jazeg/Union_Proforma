//components/Dashboard.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import NewProforma from './NewProforma';
import ListProformas from './ListProformas';
import Settings from './Settings';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/new" replace />} />
            <Route path="/new" element={<NewProforma />} />
            <Route path="/list" element={<ListProformas />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}