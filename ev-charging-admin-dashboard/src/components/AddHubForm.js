import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Sidebar from './Sidebar';

const AddHubForm = () => {
  const [formData, setFormData] = useState({
    hubname: '',
    hubchargers: [],
    hubtariff: '',
    hublocation: '',
    adminid: '',
  });

  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState('');

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userid;
    }
    return null;
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
      setChargers(Array.isArray(chargerDetails) ? chargerDetails : []);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChargerChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, hubchargers: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/addhubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apiauthkey: 'aBcD1eFgH2iJkLmNoPqRsTuVwXyZ012345678jasldjalsdjurewouroewiru',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Hub added successfully!');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error adding hub.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex justify-center items-center p-6 bg-white text-gray-800">
        <div className="bg-white rounded-xl p-8 shadow-xl w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Hub</h2>
          <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-96 p-4">
            {currentStep === 1 && (
              <>
                <div className="flex flex-col mb-4">
                  <label className="text-lg font-medium mb-2 text-gray-700" htmlFor="hubname">
                    Hub Name:
                  </label>
                  <input
                    id="hubname"
                    name="hubname"
                    type="text"
                    value={formData.hubname}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-lg font-medium mb-2 text-gray-700" htmlFor="hubchargers">
                    Hub Chargers:
                  </label>
                  {loading ? (
                    <p className="text-sm text-yellow-400">Loading chargers...</p>
                  ) : error ? (
                    <p className="text-sm text-red-400">{error}</p>
                  ) : (
                    <div className="relative">
                      <select
                        id="hubchargers"
                        name="hubchargers"
                        multiple
                        value={formData.hubchargers}
                        onChange={handleChargerChange}
                        className="p-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none w-full"
                      >
                        {chargers.map((charger) => (
                          <option key={charger.uid} value={charger.uid}>
                            {charger.uid}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-lg font-medium mb-2 text-gray-700" htmlFor="hubtariff">Hub Tariff:</label>
                  <input
                    id="hubtariff"
                    name="hubtariff"
                    type="text"
                    value={formData.hubtariff}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-all"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="flex flex-col mb-4">
                  <label className="text-lg font-medium mb-2 text-gray-700" htmlFor="hublocation">Hub Location:</label>
                  <input
                    id="hublocation"
                    name="hublocation"
                    type="text"
                    value={formData.hublocation}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-lg font-medium mb-2 text-gray-700" htmlFor="adminid">Admin ID:</label>
                  <input
                    id="adminid"
                    name="adminid"
                    type="text"
                    value={formData.adminid}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow hover:bg-gray-700 transition-all"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
          {message && <p className="text-center mt-4 text-lg text-red-500">{message}</p>}
        </div>
      </main>
    </div>
  );
};

export default AddHubForm;
