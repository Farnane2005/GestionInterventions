import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InterventionList from './pages/interventions/InterventionList';
import InterventionForm from './pages/interventions/InterventionForm';
import TechnicienList from './pages/techniciens/TechnicienList';
import TechnicienForm from './pages/techniciens/TechnicienForm';
import MesInterventions from './pages/techniciens/MesInterventions';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Navbar cachée sur /login
const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && user && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/interventions" element={<PrivateRoute><InterventionList /></PrivateRoute>} />
          <Route path="/interventions/new" element={<PrivateRoute><InterventionForm /></PrivateRoute>} />
          <Route path="/interventions/edit/:id" element={<PrivateRoute><InterventionForm /></PrivateRoute>} />
          <Route path="/techniciens" element={<PrivateRoute><TechnicienList /></PrivateRoute>} />
          <Route path="/techniciens/new" element={<PrivateRoute><TechnicienForm /></PrivateRoute>} />
          <Route path="/techniciens/edit/:id" element={<PrivateRoute><TechnicienForm /></PrivateRoute>} />
          <Route path="/mes-interventions" element={<PrivateRoute><MesInterventions /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;