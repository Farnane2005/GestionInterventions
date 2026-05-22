import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getInterventions } from '../services/interventionService';
import { getTechniciens } from '../services/technicienService';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalInterventions: 0,
    enAttente: 0,
    enCours: 0,
    terminees: 0,
    totalTechniciens: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [interventions, techniciens] = await Promise.all([
          getInterventions(),
          getTechniciens()
        ]);
        
        setStats({
          totalInterventions: interventions.length,
          enAttente: interventions.filter(i => i.statut === 'EN_ATTENTE').length,
          enCours: interventions.filter(i => i.statut === 'EN_COURS').length,
          terminees: interventions.filter(i => i.statut === 'TERMINEE').length,
          totalTechniciens: techniciens.length,
        });
      } catch (err) {
        console.error("Erreur lors de la récupération des statistiques", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Bonjour, {user?.prenom || user?.login} 👋</h1>
      <p className="dashboard-subtitle">Voici un aperçu de l'activité</p>

      {/* Cartes statistiques */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div>
            <p className="stat-number">{stats.totalInterventions}</p>
            <p className="stat-label">Total Interventions</p>
          </div>
        </div>

        <div className="stat-card attente">
          
          <div>
            <p className="stat-number">{stats.enAttente}</p>
            <p className="stat-label">En Attente</p>
          </div>
        </div>

        <div className="stat-card cours">
          
          <div>
            <p className="stat-number">{stats.enCours}</p>
            <p className="stat-label">En Cours</p>
          </div>
        </div>

        <div className="stat-card terminees">
          
          <div>
            <p className="stat-number">{stats.terminees}</p>
            <p className="stat-label">Terminées</p>
          </div>
        </div>

        <div className="stat-card techniciens">
          
          <div>
            <p className="stat-number">{stats.totalTechniciens}</p>
            <p className="stat-label">Techniciens</p>
          </div>
        </div>
      </div>

      {/* Raccourcis */}
      <div className="shortcuts">
        <h2>Actions rapides</h2>
        <div className="shortcuts-grid">
          <button onClick={() => navigate('/interventions/new')} className="shortcut-btn">
            Nouvelle Intervention +
          </button>
          <button onClick={() => navigate('/interventions')} className="shortcut-btn">
            Voir les Interventions
          </button>
          <button onClick={() => navigate('/techniciens/new')} className="shortcut-btn">
            Ajouter un Technicien +
          </button>
          <button onClick={() => navigate('/techniciens')} className="shortcut-btn">
            Voir les Techniciens
          </button>
        </div>
      </div>
    </div>
  );
}