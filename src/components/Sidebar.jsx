

import React from 'react';
import { Home, User, ScanBarcode, LogOut, BarChart2, Shield } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // get logged-in user
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const role = storedUser?.role;

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen bg-indigo-950 text-white shadow-lg fixed">
      <div className="flex items-center justify-center h-20 ">
        <h1 className="text-2xl font-bold">QR System</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-4">
        <SidebarLink to="/dashboard" icon={<Home size={18} />} label="Dashboard" />

        {/* Only show Users link when admin */}
        {role === 'Admin' && (
          <SidebarLink to="/usermanage" icon={<User size={18} />} label="Users" />
        )}

        <SidebarLink to="/reports" icon={<BarChart2 size={18} />} label="Reports" />
        <SidebarLink to="/security" icon={<Shield size={18} />} label="Enter Package Details" />
        <SidebarLink to="/settings" icon={<ScanBarcode size={18} />} label="Scan Barcode" />
        {role === 'Admin' && (
          <SidebarLink to="/useraccess" icon={<User size={18} />} label="User Access" />
        )}
      </nav>

      <div className="px-4 py-4 mt-auto">
        <NavLink
          to="/logout"
          className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
        isActive ? 'bg-blue-300 font-semibold' : 'hover:bg-blue-500'
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;













































