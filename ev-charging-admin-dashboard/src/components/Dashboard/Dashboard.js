// src/components/Dashboard.js

import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar'; 
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

const states = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Arunachal Pradesh'
];

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [revenue, setRevenue] = useState(0);
  const [numOfSession, setNumOfSession] = useState(0);
  const [usage, setUsage] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [chargerCount, setChargerCount] = useState(0);
  const [blockCount, setBlockCount] = useState(0);
  const [allChargersCount, setAllChargersCount] = useState(0);
  const [chargingCount, setChargingCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar Integration */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6">
        <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-bold text-2xl">Welcome, User!</h1>
            <form className="flex items-center">
              <input
                className="form-input px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                type="submit"
              >
                Search
              </button>
            </form>
            <a href="#" className="text-white ml-4">
              Account
            </a>
          </div>
        </nav>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <select
              className="form-select bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select
              className="form-select bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Key Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-400 to-green-500 p-4 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-lg font-semibold">Revenue</h2>
              <p className="text-2xl font-bold">{revenue}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-lg font-semibold">No of Session</h2>
              <p className="text-2xl font-bold">{numOfSession}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-lg font-semibold">Usage</h2>
              <p className="text-2xl font-bold">{usage}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-4 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-lg font-semibold">Uptime</h2>
              <p className="text-2xl font-bold">{uptime}</p>
            </div>
          </div>
        </div>

        {/* Charger Status Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <select className="form-select bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Chargers</option>
            </select>
            <div className="flex space-x-4">
              <span className="font-medium">{chargerCount} Chargers</span>
              <span>|</span>
              <span className="font-medium">{blockCount} Blocks</span>
            </div>
          </div>

          <div className="flex justify-around bg-gray-100 p-4 rounded-lg shadow-inner">
            <span className="font-medium">All ({allChargersCount})</span>
            <span className="font-medium">Charging ({chargingCount})</span>
            <span className="font-medium">Available ({availableCount})</span>
            <span className="font-medium">Offline ({offlineCount})</span>
            <span className="font-medium">Error ({errorCount})</span>
          </div>

          {/* Search and Charger Cards */}
          <div className="mt-4">
            <input
              type="text"
              className="form-input w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Offline</h3>
              <p>a7crit</p>
              <hr className="my-2" />
              <p>Rate: ----</p>
              <hr className="my-2" />
              <p>----</p>
              <p>0.0</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Charging</h3>
              <p>b3fexe</p>
              <hr className="my-2" />
              <p>Rate: $0.50/min</p>
              <hr className="my-2" />
              <p>----</p>
              <p>1.2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
