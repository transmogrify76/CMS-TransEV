import React from 'react';
import './index.css'; 
import { ThemeProvider } from './ThemeContext'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import ChargerSessions from './components/ChargerSessions';
import RevenueManagement from './components/RevenueManagement';
import AddChargerForm from './components/AddChargerForm';
import DriversVehicles from './components/DriversVehicles';
import AlertsPage from './components/AlertsPage';
import MaintenanceSupportPage from './components/Maintenance';
import AddHubForm from './components/AddHubForm';

function App() {
  return (
    <ThemeProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/charger-session" element={<ChargerSessions />} />
          <Route path="/revenue" element={<RevenueManagement />} />
          <Route path="/add-charger" element={<AddChargerForm />} />
          <Route path="/vd-management" element={<DriversVehicles />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/maintenance" element={<MaintenanceSupportPage />} />
          <Route path="/add-hub" element={<AddHubForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
