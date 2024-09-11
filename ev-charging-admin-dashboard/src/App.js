import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/Sidebar/Sidebar';
import ChargerSessions from './components/ChargerSessions/ChargerSessions';
import './index.css'; 
import RevenueManagement from './components/RevenueManagement';
import AddChargerForm from './components/AddChargerForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/charger-session" element={<ChargerSessions />} />
        <Route path="/revenue" element={<RevenueManagement />} />
        <Route path="/add-charger" element={<AddChargerForm />} />
      </Routes>
    </Router>
  );
}

export default App;