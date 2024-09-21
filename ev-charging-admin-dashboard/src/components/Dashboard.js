import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  FaDollarSign,
  FaChartLine,
  FaBatteryHalf,
  FaClock,
  FaBolt,
} from 'react-icons/fa';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December',
];

const states = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Arunachal Pradesh',
];

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [revenue, setRevenue] = useState('$0.00');
  const [numOfSession, setNumOfSession] = useState('0');
  const [usage, setUsage] = useState('0 Wh');
  const [uptime, setUptime] = useState('0%');

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
      } catch (error) {
        console.error('Error fetching charger analytics:', error);
      }
    };

    const fetchTotalRevenue = async () => {
      const apiUrl = 'http://localhost:3000/admin/totalrevenue';
      const apiAuthKey =
        'aBcD1eFgH2iJkLmNoPqRsTuVwXyZ012345678jasldjalsdjurewouroewiru';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            apiAuthKey: apiAuthKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 'yyyy',
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
      <div className="flex-1 h-full overflow-y-auto p-8 bg-gray-100 text-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-700">
            Welcome, {userName}!
          </h1>
          <div className="space-x-4">
            <select
              className="form-select py-2 px-3 rounded-md border border-gray-300"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">This Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select
              className="form-select py-2 px-3 rounded-md border border-gray-300"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" >
          <div className="bg-white p-6 rounded-lg shadow-md" onClick={() => navigate('/revenue')}>
            <FaDollarSign className="text-3xl text-blue-500 mb-3" />
            
            <h2 className="text-sm font-semibold text-gray-500">Revenue</h2>
            <p className="text-xl font-bold text-gray-800">{revenue}</p>
        
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaChartLine className="text-3xl text-purple-500 mb-3" />
            <h2 className="text-sm font-semibold text-gray-500">
              No of Sessions
            </h2>
            <p className="text-xl font-bold text-gray-800">{numOfSession}</p>
            
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaBatteryHalf className="text-3xl text-green-500 mb-3" />
            <h2 className="text-sm font-semibold text-gray-500">Usage</h2>
            <p className="text-xl font-bold text-gray-800">{usage}</p>
            
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaBolt className="text-3xl text-yellow-500 mb-3" />
            <h2 className="text-sm font-semibold text-gray-500">
              Online Percentage/Charger
            </h2>
            <p className="text-xl font-bold text-gray-800">0%</p>
            
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button className="bg-gray-100 px-3 py-2 rounded-lg">All Hubs</button>
              <button className="bg-gray-100 px-3 py-2 rounded-lg">11 Chargers</button>
              <button className="bg-gray-100 px-3 py-2 rounded-lg">
                11 Connectors
              </button>
              <button className="bg-gray-100 px-3 py-2 rounded-lg">
                9 Non Configured
              </button>
            </div>

            <select className="form-select py-2 px-3 rounded-md border border-gray-300">
              <option value="chargers">Chargers</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                className="form-input w-full px-4 py-3 border border-gray-300 rounded-md"
                placeholder="Search by charger id"
              />

              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold">TransEV BN02</h3>
                  <span className="text-xs text-red-600">Offline</span>
                </div>
                <p className="text-gray-500 text-sm">Basudebpur, West Bengal, 743504</p>
                <p className="text-gray-500 text-sm">Rate: --</p>
              </div>

              {/* More charger cards */}
            </div>

            <div>
              {/* Map component */}
              <div className="w-full h-96 bg-gray-200 rounded-lg">
                {/* Map placeholder */}
                <p className="text-center text-gray-600">Map goes here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
