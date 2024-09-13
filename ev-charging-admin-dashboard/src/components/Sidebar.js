// src/components/Sidebar.js
import React, { useState,  } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaArrowRight,
  FaArrowLeft,
  FaTachometerAlt,
  FaBatteryFull,
  FaWallet,
  FaCar,
  FaBell,
  FaHeadset,
} from 'react-icons/fa';
import { ThemeContext } from '../ThemeContext'; 

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`bg-black bg-opacity-90 h-screen p-5 flex flex-col transition-width duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div
        className="flex justify-end mb-4 cursor-pointer"
        onClick={toggleExpand}
      >
        {isExpanded ? (
          <FaArrowLeft className="text-white" size={20} />
        ) : (
          <FaArrowRight className="text-white" size={20} />
        )}
      </div>

      <ul className="flex flex-col gap-4">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-600'
              }`
            }
            to="/dashboard"
          >
            <FaTachometerAlt size={20} />
            {isExpanded && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-600'
              }`
            }
            to="/charger-session"
          >
            <FaBatteryFull size={20} />
            {isExpanded && <span>Chargers / Sessions</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-600'
              }`
            }
            to="/revenue"
          >
            <FaWallet size={20} />
            {isExpanded && <span>Revenue Management</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-600'
              }`
            }
            to="/vd-management"
          >
            <FaCar size={20} />
            {isExpanded && <span>Drivers / Vehicles</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-600'
              }`
            }
            to="/alerts"
          >
            <FaBell size={20} />
            {isExpanded && <span>Alerts</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-600'
              }`
            }
            to="/maintenance"
          >
            <FaHeadset size={20} />
            {isExpanded && <span>Support</span>}
          </NavLink>
        </li>
      </ul>

    </div>

    
  );
};

export default Sidebar;
