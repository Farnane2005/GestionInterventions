import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInterventions, deleteIntervention } from '../../services/interventionService';
import '../techniciens/Technicien.css';
import './Intervention.css';

const statutLabel = { EN_ATTENTE: 'En attente', EN_COURS: 'En cours', TERMINEE: 'Terminee' };
const statutClass = { EN_ATTENTE: 'statut-attente', EN_COURS: 'statut-cours', TERMINEE: 'statut-terminee' };

export default function InterventionList() {
  const [interventions, setInterventions] = useState([]);
  const [search, setSearch] = useState('');
  const [filtreStatut, setFiltreStatut] = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const data = await getInterventions();
      setInterventions(data);
    } catch (err) {
      console.error('Erreur chargement', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      await deleteIntervention(id);
      fetchData();
    }
  };

  const filtered = interventions.filter(i => {
    const matchSearch = i.titre.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filtreStatut ? i.statut === filtreStatut : true;
    return matchSearch && matchStatut;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Interventions</h1>
        <button className="btn-primary" onClick={() => navigate('/interventions/new')}>Ajouter</button>
      </div>
      <div className="filters-bar">
        <input className="search-input" type="text" placeholder="Rechercher par titre..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="filter-select" value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="EN_ATTENTE">En attente</option>
          <option value="EN_COURS">En cours</option>
          <option value="TERMINEE">Terminee</option>
        </select>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Technicien</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="6" className="no-data">Aucune intervention trouvee</td></tr>
          ) : (
            filtered.map(i => (
              <tr key={i.id}>
                <td>{i.titre}</td>
                <td>{i.description}</td>
                <td>{i.dateIntervention}</td>
                <td><span className={`statut-badge ${statutClass[i.statut]}`}>{statutLabel[i.statut]}</span></td>
                <td className="technicien-cell">{i.technicien ? `${i.technicien.nom} ${i.technicien.prenom}` : 'Non affecté'}</td>
                <td>
                  <button className="btn-edit" onClick={() => navigate(`/interventions/edit/${i.id}`)}>Modifier</button>
                  <button className="btn-delete" onClick={() => handleDelete(i.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}