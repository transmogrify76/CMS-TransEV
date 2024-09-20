import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import Sidebar from './Sidebar';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import

const RevenueManagement = () => {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get userId from token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userid;
    }
    return null;
  };

  // Function to fetch revenue data
  const fetchRevenueData = async () => {
    setLoading(true);
    setError(null);

    const userId = getUserIdFromToken();

    if (!userId) {
      setError('User ID not found in token');
      setLoading(false);
      return;
    }

    try {
      // Fetch total revenue
      const revenueResponse = await axios.post(
        'http://localhost:3000/admin/totalrevenue',
        { userId },
        {
          headers: {
            'Content-Type': 'application/json',
            apiauthkey: 'aBcD1eFgH2iJkLmNoPqRsTuVwXyZ012345678jasldjalsdjurewouroewiru',
          },
        }
      );
      setTotalRevenue(revenueResponse.data.totalrevenues);

      // Fetch transactions from the first API
      const transactionsResponse = await axios.post(
        'http://localhost:3000/admin/totalrevenue',
        { userId },
        {
          headers: {
            'Content-Type': 'application/json',
            apiauthkey: 'aBcD1eFgH2iJkLmNoPqRsTuVwXyZ012345678jasldjalsdjurewouroewiru',
          },
        }
      );
      const oldTransactions = transactionsResponse.data.transactions || [];

      // Fetch transactions from the second API (new transactions)
      const newTransactionsResponse = await axios.post(
        'http://localhost:3000/admin/alltsdetails',
        { userid: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            apiauthkey: 'aBcD1eFgH2iJkLmNoPqRsTuVwXyZ012345678jasldjalsdjurewouroewiru',
          },
        }
      );

      // Transform new API data
      const newTransactions = newTransactionsResponse.data.data.map((transaction) => ({
        id: transaction.paymentid,
        status: 'Completed',
        amount: transaction.price,
        charger: transaction.chargerDetails?.chargeridentity || 'Unknown',
        hub: transaction.hubdetails?.hubname || 'N/A',
        tariff: transaction.hubdetails?.hubtariff || 'Standard',
        usage: '10 kWh', // Placeholder, adjust based on real data
        owner: transaction.userDetails?.firstname + ' ' + transaction.userDetails?.lastname || 'Unknown',
        hostDetails: transaction.hubdetails?.full_address || 'Unknown',
        driverDetails:
          transaction.driverdetails?.vehicleowenerfirstname + ' ' + transaction.driverdetails?.vehicleowenerlastename || 'Unknown',
        timestamp: transaction.createdAt,
      }));

      // Combine old and new transactions, avoiding duplicates
      const combinedTransactions = [
        ...oldTransactions,
        ...newTransactions.filter((newTransaction) => !oldTransactions.some((old) => old.id === newTransaction.id)),
      ];

      setTransactions(combinedTransactions);
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('en-GB'); // Adjust the format as needed
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="flex-1 p-6 max-w-full overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h4" className="text-2xl font-bold text-gray-700">
            Revenue Management / Overview
          </Typography>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-all py-2 px-4 rounded-md">
            Sep 2024
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" className="text-lg font-medium text-gray-700">
              Total Revenue ₹{totalRevenue !== null ? totalRevenue : 'Loading...'}
            </Typography>
            <Button className="bg-indigo-500 text-white hover:bg-indigo-600 transition-colors py-2 px-4 rounded-lg">
              May 2024
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <TextField
            label="Search by transaction id, charger id, etc."
            variant="outlined"
            className="flex-1"
            sx={{ marginRight: '10px' }}
          />
          <select className="border border-gray-300 rounded py-2 px-4 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500">
            <option value="All">All</option>
          </select>
          <select className="border border-gray-300 rounded py-2 px-4 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500">
            <option value="All Hubs">All Hubs</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-x-auto" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <div className="flex justify-between mb-2 px-4">
              <Typography variant="h6" className="text-lg font-medium text-gray-700">
                Transactions ({transactions.length})
              </Typography>
            </div>
            <table className="min-w-full table-auto bg-white">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Transaction ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Payment Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Billed Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Charger ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Hub</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Tariff</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Usage (kWh)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Owner</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Host Details</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Driver Details</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {transactions.map((row, index) => (
                  <tr key={row.id} className="text-gray-800">
                    <td className="px-4 py-2 text-sm">{index + 1}. {row.id}</td>
                    <td className="px-4 py-2 text-sm">{row.status}</td>
                    <td className="px-4 py-2 text-sm">{row.amount}</td>
                    <td className="px-4 py-2 text-sm">{row.charger}</td>
                    <td className="px-4 py-2 text-sm">{row.hub}</td>
                    <td className="px-4 py-2 text-sm">{row.tariff}</td>
                    <td className="px-4 py-2 text-sm">{row.usage}</td>
                    <td className="px-4 py-2 text-sm">{row.owner}</td>
                    <td className="px-4 py-2 text-sm">{row.hostDetails}</td>
                    <td className="px-4 py-2 text-sm">{row.driverDetails}</td>
                    <td className="px-4 py-2 text-sm">{formatDate(row.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueManagement;
