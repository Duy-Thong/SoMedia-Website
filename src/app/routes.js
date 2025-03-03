import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import withRouter from "../hooks/withRouter"
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { Socialicons } from "../components/socialicons";
import { Recruit } from "../pages/recruitment";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Activities } from "../pages/activities";
import { Tradition } from "../pages/traditionroom";
import { Contributors } from "../pages/contributors";
import AdminLogin from '../pages/admin/login/AdminLogin';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import UserManagement from '../pages/admin/users/UserManagement';
import HomeManagement from '../pages/admin/home/HomeManagement';
import AboutManagement from '../pages/admin/about/AboutManagement';
import ContactManagement from '../pages/admin/contact/ContactManagement';
import SystemSettings from '../pages/admin/settings/SystemSettings';
import ActivitiesManagement from "../pages/admin/activities/ActivitiesManagement";
import ProjectsManagement from "../pages/admin/projects/ProjectsManagement";
import PrivateRoute from "../components/PrivateRoute";
import FocusRing from "../components/focusring";

const AnimatedRoutes = withRouter(({ location }) => {
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Use animation only for non-admin routes
  if (isAdminRoute) {
    return (
      <Routes location={location}>
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <UserManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/home-management"
          element={
            <PrivateRoute>
              <HomeManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/about-management"
          element={
            <PrivateRoute>
              <AboutManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/contact-management"
          element={
            <PrivateRoute>
              <ContactManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <PrivateRoute>
              <SystemSettings />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/activities"
          element={
            <PrivateRoute>
              <ActivitiesManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <PrivateRoute>
              <ProjectsManagement />
            </PrivateRoute>
          } 
        />
        
      </Routes>
    );
  }

  // Original animated routes for main website
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={{
          enter: 400,
          exit: 400,
        }}
        classNames="page"
        unmountOnExit
      >
        <Routes location={location}>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/projects" element={<Portfolio />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="*" element={<Home />} />
          <Route path="/recruitment" element={<Recruit />} />
          <Route path="/traditionalroom" element={<Tradition />} />
          <Route path="/contributors" element={<Contributors />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
});

function AppRoutes() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="s_c">
      <AnimatedRoutes />
      {!isAdminRoute && <Socialicons />}
    </div>
  );
}

export default AppRoutes;
