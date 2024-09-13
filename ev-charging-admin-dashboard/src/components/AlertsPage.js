import React from 'react';
import Sidebar from './Sidebar'; // Adjust the import based on your file structure
import { NotificationImportant } from '@mui/icons-material'; // Import an icon from MUI

const AlertPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-white to-gray-100">
        {/* Centered Content Section */}
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <NotificationImportant className="text-blue-500" style={{ fontSize: 80 }} />
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-5xl font-extrabold text-gray-800">Alerts</h2>
            <p className="text-xl text-gray-600">
              Welcome to the TransEV CRM Alerts Page! Manage and view all fleet alerts here. Stay updated with the latest notifications and important messages.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105">
              Learn More
            </button>
            <div className="border-t border-gray-300 pt-6 mt-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Contact Us</h3>
              <p className="text-gray-600 mb-2">For inquiries or assistance, please reach out to us:</p>
              <p className="text-gray-600 mb-2"><strong>Email:</strong> tgwbin@gmail.com </p>
              <p className="text-gray-600"><strong>Phone:</strong> +91 6202329011</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPage;
