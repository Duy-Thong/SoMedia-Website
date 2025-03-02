import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css'; // Add this import for Ant Design styles
import AdminLogin from './pages/admin/login/AdminLogin';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
// Import placeholder components for management pages
import UserManagement from './pages/admin/users/UserManagement';
import HomeManagement from './pages/admin/home/HomeManagement';
import AboutManagement from './pages/admin/about/AboutManagement';
import ContactManagement from './pages/admin/contact/ContactManagement';
import SystemSettings from './pages/admin/settings/SystemSettings';
import ActivitiesManagement from './pages/admin/activities/ActivitiesManagement';
import ProjectsManagement from './pages/admin/projects/ProjectsManagement';
import RecruitmentManagement from './pages/admin/recruitment/RecruitmentManagement';

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
                <Route path="/admin/activities" element={<ActivitiesManagement />} />
                <Route path="/admin/projects" element={<ProjectsManagement />} />
                <Route path="/admin/recruitment" element={<RecruitmentManagement />} />
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                <Route path="/" element={<Navigate to="/admin/login" replace />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </Router>
    );
}

export default App;
