import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTechniciens, deleteTechnicien } from '../../services/technicienService';
import './Technicien.css';

export default function TechnicienList() {
  const [techniciens, setTechniciens] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const data = await getTechniciens();
      setTechniciens(data);
    } catch (err) {
      console.error('Erreur chargement techniciens', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      await deleteTechnicien(id);
      fetchData();
    }
  };

  const filtered = techniciens.filter(t =>
    t.nom.toLowerCase().includes(search.toLowerCase()) ||
    t.prenom.toLowerCase().includes(search.toLowerCase()) ||
    t.specialite.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Techniciens</h1>
        <button className="btn-primary" onClick={() => navigate('/techniciens/new')}>
          Ajouter
        </button>
      </div>
      <input
        className="search-input"
        type="text"
        placeholder="Rechercher par nom, prenom, specialite..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="data-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Login</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Specialite</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="6" className="no-data">Aucun technicien trouve</td></tr>
          ) : (
            filtered.map(t => (
              <tr key={t.id}>
                <td>{t.nom}</td>
                <td>{t.prenom}</td>
                <td><span className="badge" style={{background: 'var(--surface2)', color: 'var(--text)'}}>{t.login}</span></td>
                <td>{t.email}</td>
                <td>{t.telephone}</td>
                <td><span className="badge">{t.specialite}</span></td>
                <td>
                  <button className="btn-edit" onClick={() => navigate(`/techniciens/edit/${t.id}`)}>Modifier</button>
                  <button className="btn-delete" onClick={() => handleDelete(t.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}