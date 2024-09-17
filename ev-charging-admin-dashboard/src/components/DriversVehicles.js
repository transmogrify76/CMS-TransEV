import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Settings, Refresh, Add, Search, ArrowDropDown } from '@mui/icons-material';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const DriversVehicles = () => {
  const [tabValue, setTabValue] = useState(0); 
  const [anchorEl, setAnchorEl] = useState(null); 
  const [monthDropdown, setMonthDropdown] = useState(false); 
  const [driverData, setDriverData] = useState([]); 
  const [vehicleData, setVehicleData] = useState([]); 
  const [loading, setLoading] = useState(false);

  
  const fetchData = async () => {
    const apiKey = 'aBcD1eFgH2iJkLmNoPqRsTuVwXyZ012345678jasldjalsdjurewouroewiru'; 
    const token = localStorage.getItem('token'); 

    if (!token) {
      console.error("Error: Token is null or undefined.");
      return; 
    }

    try {
      
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userid; 

      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/admin/getvobyaid', 
        { userid: userId }, 
        {
          headers: {
            'apiauthkey': apiKey, 
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.data && response.data.data) {
        const { data } = response.data;
        if (data.length > 0) {
          const [driver] = data;
          if (tabValue === 0) {
            setDriverData([driver]); 
          } else if (tabValue === 1) {
            setVehicleData(driver.vehicles); 
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue); 
  };

  const handleAddClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); 
  };

  const handleMonthClick = () => {
    setMonthDropdown(!monthDropdown); 
  };

  const handleMenuClose = () => {
    setAnchorEl(null); 
  };

  const handleAddOptionClick = (option) => {
    console.log(`${option} clicked`);
    handleMenuClose(); 
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-semibold mb-6">Drivers & Vehicles / Manage {tabValue === 0 ? "Drivers" : "Vehicles"}</h1>

        <div className="mb-6 border-b border-gray-300">
          <nav className="flex space-x-8">
            <button
              onClick={(e) => handleTabChange(e, 0)}
              className={`py-3 px-5 text-sm font-medium rounded-lg border-b-2 ${
                tabValue === 0
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600'
              } flex items-center transition duration-150 ease-in-out`}
            >
              <Settings className="mr-2" />
              Drivers
            </button>
            <button
              onClick={(e) => handleTabChange(e, 1)}
              className={`py-3 px-5 text-sm font-medium rounded-lg border-b-2 ${
                tabValue === 1
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600'
              } flex items-center transition duration-150 ease-in-out`}
            >
              <Settings className="mr-2" />
              Vehicles
            </button>
          </nav>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-semibold text-gray-700">{tabValue === 0 ? `Driver List (${driverData.length})` : `Vehicle List (${vehicleData.length})`}</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150 ease-in-out"
              />
              <Search className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
            </div>

            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-150 ease-in-out" onClick={fetchData}>
              <Refresh />
            </button>

            <button className="p-2 rounded-full hover:bg-gray-200 transition duration-150 ease-in-out">
              <Settings />
            </button>

            <div className="relative">
              <button
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center transition duration-150 ease-in-out"
                onClick={handleMonthClick}
              >
                This Month
                <ArrowDropDown className="ml-1" />
              </button>

              {monthDropdown && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-40 border border-gray-200">
                  <ul className="py-2">
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                      <li key={month} className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out">
                        {month}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition duration-150 ease-in-out"
                onClick={handleAddClick}
              >
                <Add className="mr-1" />
                Add
              </button>

              {anchorEl && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2 w-48 border border-gray-200">
                  <button
                    onClick={() => handleAddOptionClick('Add Hub')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
                  >
                    Add Hub
                  </button>
                  <button
                    onClick={() => handleAddOptionClick('')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
                  >
                    Add Charger
                  </button>
                  <button
                    onClick={() => handleAddOptionClick('Add User')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
                  >
                    Add User
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : tabValue === 0 ? (
          driverData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 border-b text-left text-gray-600"></th>
                    <th className="py-3 px-4 border-b text-left text-gray-600">First Name</th>
                    <th className="py-3 px-4 border-b text-left text-gray-600">Last Name</th>
                    <th className="py-3 px-4 border-b text-left text-gray-600">Email</th>
                    <th className="py-3 px-4 border-b text-left text-gray-600">Phone Number</th>
                    <th className="py-3 px-4 border-b text-left text-gray-600">License</th>
                    <th className="py-3 px-4 border-b text-left text-gray-600">Gov Docs</th>
                    <th className="py-3 px-4 border-b text-left text-gray-600">Nationality</th>
                    <th className="py-3 px-4 border-b text-left text-gray-600">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {driverData.map((driver, index) => (
                    <tr key={driver.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="py-3 px-4 border-b">{index + 1}</td>
                      <td className="py-3 px-4 border-b">{driver.vehicleowenerfirstname}</td>
                      <td className="py-3 px-4 border-b">{driver.vehicleowenerlastename}</td>
                      <td className="py-3 px-4 border-b">{driver.vehicleoweneremail}</td>
                      <td className="py-3 px-4 border-b">{driver.phonenumber}</td>
                      <td className="py-3 px-4 border-b">{driver.vehicleowenerlicense}</td>
                      <td className="py-3 px-4 border-b">{driver.vehicleowenergovdocs}</td>
                      <td className="py-3 px-4 border-b">{driver.vehicleowenernationality}</td>
                      <td className="py-3 px-4 border-b">{driver.vehicleoweneraddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No drivers found.</p>
          )
        ) : vehicleData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left text-gray-600"></th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Vehicle ID</th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Name</th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Model</th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">License Plate</th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Category</th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Type</th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Assigned</th>
                </tr>
              </thead>
              <tbody>
                {vehicleData.map((vehicle, index) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="py-3 px-4 border-b">{index + 1}</td>
                    <td className="py-3 px-4 border-b">{vehicle.id}</td>
                    <td className="py-3 px-4 border-b">{vehicle.vehiclename}</td>
                    <td className="py-3 px-4 border-b">{vehicle.vehiclemodel}</td>
                    <td className="py-3 px-4 border-b">{vehicle.vehiclelicense}</td>
                    <td className="py-3 px-4 border-b">{vehicle.vehiclecategory}</td>
                    <td className="py-3 px-4 border-b">{vehicle.vehicletype}</td>
                    <td className="py-3 px-4 border-b">{vehicle.isvehicleassigned ? "Assigned" : "Not Assigned"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No vehicles found.</p>
        )}
      </div>
    </div>
  );
};

export default DriversVehicles;
