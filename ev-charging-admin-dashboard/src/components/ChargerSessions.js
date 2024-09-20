import React, { useEffect, useState } from 'react';
import { FilterList, Search } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ChargerList = () => {
  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userid;
    }
    return null;
  };

  const fetchChargerStatus = async (uid) => {
    try {
      const response = await axios.post(
        'http://srv586896.hstgr.cloud:80/api/status',
        { uid },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '3qrCLEcHa8wwaZC34xhAd3RotuYdHwiB',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch charger status', error);
      return null;
    }
  };

  const triggerMessage = async (chargerId) => {
    try {
      const response = await axios.post(
        'http://srv586896.hstgr.cloud:80/api/trigger_message',
        { uid: chargerId, requested_message: 'BootNotification' },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '3qrCLEcHa8wwaZC34xhAd3RotuYdHwiB',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to trigger message', error);
      return null;
    }
  };

  const fetchChargers = async () => {
    setLoading(true);
    setError(null);
    const userId = getUserIdFromToken();

    if (!userId) {
      setError('User ID not found in token');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/admin/getchargerbyuserid',
        { get_user_id: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            apiauthkey: 'aBcD1eFgH2iJkLmNoPqRsTuVwXyZ012345678jasldjalsdjurewouroewiru',
          },
        }
      );

      const chargerDetails = response.data.user_chargerunit_details;

      const chargerDataWithStatus = await Promise.all(
        (Array.isArray(chargerDetails) ? chargerDetails : []).map(async (charger) => {
          const statusData = await fetchChargerStatus(charger.uid);
          const messageData = await triggerMessage(charger.uid); // Trigger message API

          return {
            ...charger,
            status: statusData?.status || 'Unknown',
            online: statusData?.online || 'Offline',
            make: messageData?.latest_message?.charge_point_model || 'N/A', // Map vendor
            firmwareVersion: messageData?.latest_message?.firmware_version || 'N/A', // Map firmware version
          };
        })
      );

      setChargers(chargerDataWithStatus);
    } catch (error) {
      setError('Failed to fetch chargers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChargers();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <div className="flex-1 p-6 max-w-full overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6">Chargers & Sessions / Chargers</h2>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button className="bg-gray-700 text-gray-200 py-2 px-4 rounded border border-gray-600 hover:bg-gray-600">
              {chargers.length} Chargers
            </button>
            <button className="bg-gray-700 text-gray-200 py-2 px-4 rounded border border-gray-600 hover:bg-gray-600">
              {Array.isArray(chargers) ? chargers.reduce((total, charger) => total + Number(charger.number_of_connectors || 0), 0) : 0} Connectors
            </button>
          </div>
          <Link to="/add-charger">
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              + Add Charger
            </button>
          </Link>
        </div>

        <div className="flex items-center mb-6 space-x-4">
          <select className="border border-gray-300 rounded py-2 px-4 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500">
            <option value="All Network">All Network</option>
          </select>
          <select className="border border-gray-300 rounded py-2 px-4 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500">
            <option value="All">All ({chargers.length})</option>
            <option value="Busy">Busy (0)</option>
            <option value="Available">Available (4)</option>
            <option value="Error">Error (7)</option>
          </select>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <FilterList />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded py-2 px-10 pl-10 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-matte-black text-white">
                  <tr>
                    {[
                      'CHARGER ID', 'Status', 'HUB NAME', 'CHARGER NAME', 'CONNECTOR', 'HOST DETAILS',
                      'PROTOCOL', 'LAST ONLINE', 'UPTIME', 'MAKE', 'FIRMWARE VERSION', 'FIRMWARE UPDATE', 'ACTION'
                    ].map((header) => (
                      <th key={header} className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white text-black">
                  {chargers.map((charger) => (
                    <tr key={charger.uid} className="hover:bg-gray-100">
                      {[
                        charger.uid || '',
                        charger.status || 'N/A',
                        charger.Chargerhost || '',
                        charger.ChargerName || '',
                        charger.Connector_type || '',
                        charger.firstname || '',
                        'OCPP',
                        formatDate(charger.createdAt) || '',
                        charger.online || 'N/A',
                        charger.make || 'N/A', // Display make
                        charger.firmwareVersion || 'N/A', // Display firmware version
                        'N/A', 'N/A' // Other actions can remain as is
                      ].map((value, index) => (
                        <td key={index} className="px-4 py-2 text-sm font-bold whitespace-nowrap">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChargerList;
