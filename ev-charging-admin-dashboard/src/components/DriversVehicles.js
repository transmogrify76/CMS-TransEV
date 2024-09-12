// src/DriversVehicles.js

import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar'; 
import { Settings, Refresh, Add, Search } from '@mui/icons-material';

const DriversVehicles = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Drivers & Vehicles / Manage Drivers</h1>

        {/* Tabs for Drivers and Vehicles */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={(e) => handleTabChange(e, 0)}
              className={`py-4 px-1 text-sm font-medium ${
                tabValue === 0
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              } flex items-center`}
            >
              <Settings className="mr-2" />
              Drivers
            </button>
            <button
              onClick={(e) => handleTabChange(e, 1)}
              className={`py-4 px-1 text-sm font-medium ${
                tabValue === 1
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              } flex items-center`}
            >
              <Settings className="mr-2" />
              Vehicles
            </button>
          </nav>
        </div>

        {/* Toolbar Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Driver List (0)</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 py-2 px-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>

            <button className="bg-gray-200 p-2 rounded hover:bg-gray-300">
              <Refresh />
            </button>

            <button
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded flex items-center"
              onClick={handleMenuClick}
            >
              <Settings className="mr-1" />
              Table Fields
            </button>

            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded">
              This Month
            </button>

            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleMenuClick}
            >
              <Add />
            </button>

            {/* Dropdown Menu */}
            {anchorEl && (
              <div className="absolute bg-white shadow rounded mt-2 p-2">
                <button onClick={handleMenuClose} className="block w-full text-left px-4 py-2 text-sm">
                  Add Hub
                </button>
                <button onClick={handleMenuClose} className="block w-full text-left px-4 py-2 text-sm">
                  Add Charger
                </button>
                <button onClick={handleMenuClose} className="block w-full text-left px-4 py-2 text-sm">
                  Add User
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Empty State for the Driver List */}
        <div className="flex flex-col items-center justify-center h-64 border border-gray-200 rounded-lg">
          <img
            src="https://img.icons8.com/ios/50/000000/no-data.png"
            alt="No Data"
            className="w-12 mb-4"
          />
          <p className="text-gray-500">No Data Found!</p>
        </div>
      </div>
    </div>
  );
};

export default DriversVehicles;
