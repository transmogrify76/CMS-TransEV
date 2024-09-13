import React from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import Sidebar from './Sidebar';

const RevenueManagement = () => {
  const transactions = [
    { id: '57783333', status: 'Success', amount: '1.00', charger: 'mvzg yu', hub: '--', tariff: 'test1', usage: '0.00 kWh', owner: 'Host', hostDetails: 'SHUBHAJIT...', driverDetails: 'Nikshith trans', timestamp: '09/05/2024 04:07:52 pm' },
  ];

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <div className="flex-1 p-6 max-w-full overflow-hidden">
        <Typography variant="h4" className="text-3xl font-semibold mb-6">
          Revenue Management / Overview
        </Typography>

        <div className="flex items-center justify-between mb-6">
          <Typography variant="h6" className="text-lg font-medium">
            Total Revenue ₹1.10
          </Typography>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors py-2 px-4 rounded">
            May 2024
          </Button>
        </div>

        <div className="flex items-center mb-6 space-x-4">
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

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <TableContainer component={Paper} className="bg-gray-200">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-700 text-gray-200">
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">TRANSACTION ID</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">PAYMENT STATUS</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">BILLED AMOUNT</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">CHARGER ID</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">HUB</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">TARIFF</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">USAGE (kWh)</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">Owner</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">HOST DETAILS</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">DRIVER DETAILS</TableCell>
                  <TableCell className="text-left text-xs font-medium uppercase tracking-wider px-4 py-3">TIMESTAMP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((row) => (
                  <TableRow key={row.id} className="bg-white text-gray-800">
                    <TableCell className="px-4 py-3 text-sm">{row.id}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.status}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.amount}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.charger}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.hub}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.tariff}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.usage}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.owner}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.hostDetails}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.driverDetails}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{row.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueManagement;
