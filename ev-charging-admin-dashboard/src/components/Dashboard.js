import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  FaDollarSign,
  FaChartLine,
  FaBatteryHalf,
  FaClock,
  FaUser,
} from 'react-icons/fa';

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
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [revenue, setRevenue] = useState('$0.00');
  const [numOfSession, setNumOfSession] = useState('0');
  const [usage, setUsage] = useState('0%');
  const [uptime, setUptime] = useState('0%');
  const [chargerCount, setChargerCount] = useState('0');
  const [blockCount, setBlockCount] = useState('0');
  const [allChargersCount, setAllChargersCount] = useState('0');
  const [chargingCount, setChargingCount] = useState('0');
  const [availableCount, setAvailableCount] = useState('0');
  const [offlineCount, setOfflineCount] = useState('0');
  const [errorCount, setErrorCount] = useState('0');

  useEffect(() => {
    const getUserDataFromToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserName(decodedToken.firstname || 'User');
        } catch (error) {
          console.error('Failed to decode token:', error);
          navigate('/signin');
        }
      } else {
        navigate('/signin');
      }
    };

    getUserDataFromToken();
  }, [navigate]);

  useEffect(() => {
    const fetchChargerAnalytics = async () => {
      const apiUrl = 'http://srv586896.hstgr.cloud:80/api/charger_analytics';
      const apiKey = '3qrCLEcHa8wwaZC34xhAd3RotuYdHwiB';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            charger_id: 'cumulative',
            user_id: 'zzzz',
          }),
        });

        const data = await response.json();
        setUptime(data.total_uptime);
        setNumOfSession(data.total_transactions.toString());
        setUsage('100%'); // Adjust this according to your logic
        setChargerCount(data.charger_count);
        setBlockCount(data.block_count);
        setAllChargersCount(data.all_chargers_count);
        setChargingCount(data.charging_count);
        setAvailableCount(data.available_count);
        setOfflineCount(data.offline_count);
        setErrorCount(data.error_count);
        
      } catch (error) {
        console.error('Error fetching charger analytics:', error);
      }
    };

    const fetchTotalRevenue = async () => {
      const apiUrl = 'http://localhost:3000/admin/totalrevenue';
      const apiAuthKey = 'aBcD1eFgH2iJkLmNoPqRsTuVwXyZ012345678jasldjalsdjurewouroewiru';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'apiAuthKey': apiAuthKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: 'yyyy',
          }),
        });

        const data = await response.json();
        setRevenue(`$${data.totalrevenues.toFixed(2)}`);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };

    fetchChargerAnalytics();
    fetchTotalRevenue();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar className="h-full" />
      <div className="flex-1 h-full overflow-y-auto p-8 bg-white text-gray-800">
        <nav className="bg-white shadow-md p-5 rounded-lg mb-8 border border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-900 font-semibold text-2xl">
              Welcome, {userName}!
            </h1>
            <div className="flex items-center space-x-4">
              <form className="flex items-center">
                <input
                  className="form-input px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <a href="#" className="flex items-center text-gray-800 ml-6">
                <FaUser className="text-xl" />
              </a>
            </div>
          </div>
        </nav>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <select
              className="form-select bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="form-select bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-100 p-6 rounded-lg text-gray-800 shadow-md flex items-center space-x-4 transform hover:scale-105 transition-transform">
              <FaDollarSign className="text-3xl text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold">Revenue</h2>
                <p className="text-2xl font-bold">{revenue}</p>
              </div>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg text-gray-800 shadow-md flex items-center space-x-4 transform hover:scale-105 transition-transform">
              <FaChartLine className="text-3xl text-yellow-600" />
              <div>
                <h2 className="text-lg font-semibold">No of Sessions</h2>
                <p className="text-2xl font-bold">{numOfSession}</p>
              </div>
            </div>
            <div className="bg-teal-100 p-6 rounded-lg text-gray-800 shadow-md flex items-center space-x-4 transform hover:scale-105 transition-transform">
              <FaBatteryHalf className="text-3xl text-teal-600" />
              <div>
                <h2 className="text-lg font-semibold">Usage</h2>
                <p className="text-2xl font-bold">{usage}</p>
              </div>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg text-gray-800 shadow-md flex items-center space-x-4 transform hover:scale-105 transition-transform">
              <FaClock className="text-3xl text-purple-600" />
              <div>
                <h2 className="text-lg font-semibold">Uptime</h2>
                <p className="text-2xl font-bold">{uptime}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <select className="form-select bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="all">All Chargers</option>
            </select>
            <div className="flex space-x-6">
              <span className="font-medium text-gray-600">{chargerCount} Chargers</span>
              <span className="font-medium text-gray-400">|</span>
              <span className="font-medium text-gray-600">{blockCount} Blocks</span>
            </div>
          </div>

          <div className="flex justify-around bg-white p-4 rounded-lg shadow-inner border border-gray-200">
            <span className="font-medium text-gray-700">All ({allChargersCount})</span>
            <span className="font-medium text-gray-700">Charging ({chargingCount})</span>
            <span className="font-medium text-gray-700">Available ({availableCount})</span>
            <span className="font-medium text-gray-700">Offline ({offlineCount})</span>
            <span className="font-medium text-gray-700">Error ({errorCount})</span>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">Charger List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg text-gray-800 shadow-lg hover:scale-105 transition-transform border border-gray-200"
                >
                  <h3 className="font-semibold text-lg">Charger {index + 1}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Detailed information about this charger's current state and specifications.
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default Dashboard;
