import React from 'react';
import { FilterList, Search } from '@mui/icons-material';
import Sidebar from '../Sidebar/Sidebar'; 
import { Link } from 'react-router-dom';


const ChargerList = () => {
  const chargers = [
    { id: 'cn7196', status: 'Offline', hub: '--', name: 'TransEV-Benny...', connectors: '2', hostDetails: 'Chitradeep...', protocol: 'OCPP', lastOnline: '05/08/2024 09:59:53 am', uptime: '0.00%', make: '*', firmware: '1.0.31', update: 'Latest', action: '--' },
    { id: 'ch55cr', status: 'Offline', hub: '--', name: 'TransEv Benny-05', connectors: '2', hostDetails: 'Chitradeep...', protocol: 'OCPP', lastOnline: '19/07/2024 02:48:10 pm', uptime: '0.00%', make: '*', firmware: '1.0.31', update: 'Latest', action: '--' },
    { id: 'c3ys3z', status: 'Offline', hub: '--', name: 'TransEV 03', connectors: '2', hostDetails: 'Chitradeep...', protocol: 'OCPP', lastOnline: '19/07/2024 11:43:37 am', uptime: '0.00%', make: '*', firmware: '1.0.31', update: 'Latest', action: '--' },
    // Add more data as required
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Include the Sidebar */}
      <div className="flex-1 p-6 bg-gray-900 text-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-white">Chargers & Sessions / Chargers</h2>

        <div className="mb-4 flex items-center justify-between">
          <div className="space-x-2">
            <button className="bg-gray-700 text-gray-200 py-2 px-4 rounded border border-gray-600 hover:bg-gray-600">11 Chargers</button>
            <button className="bg-gray-700 text-gray-200 py-2 px-4 rounded border border-gray-600 hover:bg-gray-600">11 Connectors</button>
          </div>
          <Link to="/add-charger">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">+ Add Charger  </button>
          </Link>
        </div>

        <div className="flex items-center mb-6 space-x-2">
          <select className="border border-gray-600 rounded py-2 px-4 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500">
            <option value="All Network">All Network</option>
            {/* Add more options as needed */}
          </select>
          <select className="border border-gray-600 rounded py-2 px-4 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500">
            <option value="All">All (11)</option>
            <option value="Busy">Busy (0)</option>
            <option value="Available">Available (4)</option>
            <option value="Error">Error (7)</option>
          </select>
          <button className="p-2 text-gray-400 hover:text-gray-300">
            <FilterList />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-600 rounded py-2 px-10 pl-10 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CHARGER ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CHARGER STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">HUB NAME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CHARGER NAME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CONNECTOR(S)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">HOST DETAILS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">PROTOCOL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">LAST ONLINE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">UPTIME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">MAKE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">FIRMWARE VERSION</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">FIRMWARE UPDATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {chargers.map((charger) => (
                <tr key={charger.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{charger.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.hub}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.connectors}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.hostDetails}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.protocol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.lastOnline}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.uptime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.make}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.firmware}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.update}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{charger.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChargerList;
