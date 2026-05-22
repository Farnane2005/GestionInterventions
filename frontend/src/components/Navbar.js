import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        GestionTech
      </div>

      <div className="navbar-links">
        {user?.role === 'ADMIN' && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/interventions">Interventions</Link>
            <Link to="/techniciens">Techniciens</Link>
          </>
        )}
        {user?.role === 'TECHNICIEN' && (
          <Link to="/mes-interventions">Mes Interventions</Link>
        )}
      </div>

      <div className="navbar-user">
        <span>{user?.username}</span>
        <span className="navbar-role">{user?.role}</span>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </nav>
  );
}