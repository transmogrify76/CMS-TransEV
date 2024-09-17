import React from 'react';
import Sidebar from './Sidebar'; 
import { Build } from '@mui/icons-material'; 

const MaintenanceSupportPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-white to-gray-100">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <Build className="text-yellow-500" style={{ fontSize: 80 }} />
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-5xl font-extrabold text-gray-800">Maintenance Support</h2>
            <p className="text-xl text-gray-600">
              Our team is here to help you with any maintenance needs. Whether it’s a routine check or an urgent fix, we are committed to keeping your system running smoothly.
            </p>
            <button className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition-transform transform hover:scale-105">
              Request Support
            </button>
            <div className="border-t border-gray-300 pt-6 mt-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Contact Support</h3>
              <p className="text-gray-600 mb-2">For immediate assistance, please contact our support team:</p>
              <p className="text-gray-600 mb-2"><strong>Email:</strong> tgwbin@gmail.com</p>
              <p className="text-gray-600 mb-2"><strong>Phone:</strong> +91 6202329011</p>
              <p className="text-gray-600"><strong>Office Hours:</strong> Mon-Fri, 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceSupportPage;
