import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/admin/login/AdminLogin';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
// Import placeholder components for management pages
import UserManagement from './pages/admin/users/UserManagement';
import HomeManagement from './pages/admin/home/HomeManagement';
import AboutManagement from './pages/admin/about/AboutManagement';
import ContactManagement from './pages/admin/contact/ContactManagement';
import SystemSettings from './pages/admin/settings/SystemSettings';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/home-management" element={<HomeManagement />} />
                <Route path="/admin/about-management" element={<AboutManagement />} />
                <Route path="/admin/contact-management" element={<ContactManagement />} />
                <Route path="/admin/settings" element={<SystemSettings />} />
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                <Route path="/" element={<Navigate to="/admin/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
