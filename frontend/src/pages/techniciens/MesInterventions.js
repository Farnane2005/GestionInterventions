import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getInterventions, updateIntervention } from '../../services/interventionService';
import './Technicien.css';
import '../interventions/Intervention.css';

const statutLabel = { EN_ATTENTE: 'En attente', EN_COURS: 'En cours', TERMINEE: 'Terminee' };
const statutClass = { EN_ATTENTE: 'statut-attente', EN_COURS: 'statut-cours', TERMINEE: 'statut-terminee' };

export default function MesInterventions() {
  const { user } = useAuth();
  const [interventions, setInterventions] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState('');
  const [modal, setModal] = useState({ visible: false, interventionId: null, statutActuel: '', nouveauStatut: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const data = await getInterventions();
      const mesSeulement = data.filter(i => i.technicien && i.technicien.id === user.id);
      setInterventions(mesSeulement);
    } catch (err) {
      console.error('Erreur chargement', err);
    }
  };

  const ouvrirModal = (intervention) => {
    setModal({ visible: true, interventionId: intervention.id, statutActuel: intervention.statut, nouveauStatut: intervention.statut });
  };

  const fermerModal = () => {
    setModal({ visible: false, interventionId: null, statutActuel: '', nouveauStatut: '' });
  };

  const confirmerChangement = async () => {
  try {
    // Recuperer l'intervention complete
    const intervention = interventions.find(i => i.id === modal.interventionId);
    
    // Envoyer tout l'objet avec le statut mis a jour
    await updateIntervention(modal.interventionId, {
      ...intervention,
      statut: modal.nouveauStatut
    });
    
    fetchData();
    fermerModal();
  } catch (err) {
    console.error('Erreur mise a jour statut', err);
  }
};

  const filtered = interventions.filter(i =>
    filtreStatut ? i.statut === filtreStatut : true
  );

  const total = interventions.length;
  const enAttente = interventions.filter(i => i.statut === 'EN_ATTENTE').length;
  const enCours = interventions.filter(i => i.statut === 'EN_COURS').length;
  const terminees = interventions.filter(i => i.statut === 'TERMINEE').length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mes Interventions</h1>
        <span className="technicien-name">Connecté en tant que : {user?.prenom || user?.login}</span>
      </div>
      <div className="mini-stats">
        <div className="mini-stat"><span className="mini-stat-number">{total}</span><span className="mini-stat-label">Total</span></div>
        <div className="mini-stat attente"><span className="mini-stat-number">{enAttente}</span><span className="mini-stat-label">En attente</span></div>
        <div className="mini-stat cours"><span className="mini-stat-number">{enCours}</span><span className="mini-stat-label">En cours</span></div>
        <div className="mini-stat terminee"><span className="mini-stat-number">{terminees}</span><span className="mini-stat-label">Terminees</span></div>
      </div>
      <div className="filters-bar">
        <select className="filter-select" value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="EN_ATTENTE">En attente</option>
          <option value="EN_COURS">En cours</option>
          <option value="TERMINEE">Terminee</option>
        </select>
      </div>
      <table className="data-table">
        <thead>
          <tr><th>Titre</th><th>Description</th><th>Date</th><th>Statut</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="5" className="no-data">Aucune intervention trouvee</td></tr>
          ) : (
            filtered.map(i => (
              <tr key={i.id}>
                <td>{i.titre}</td>
                <td>{i.description}</td>
                <td>{i.dateIntervention}</td>
                <td><span className={`statut-badge ${statutClass[i.statut]}`}>{statutLabel[i.statut]}</span></td>
                <td>
                  {i.statut !== 'TERMINEE' ? (
                    <button className="btn-changer-statut" onClick={() => ouvrirModal(i)}>Changer statut</button>
                  ) : (
                    <span className="statut-final">Termine</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modal.visible && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Changer le statut</h3>
            <p className="modal-info">
              Statut actuel :
              <span className={`statut-badge ${statutClass[modal.statutActuel]}`}>{statutLabel[modal.statutActuel]}</span>
            </p>
            <div className="modal-statut-options">
              {['EN_ATTENTE', 'EN_COURS', 'TERMINEE'].map(s => (
                <button
                  key={s}
                  className={`modal-statut-btn ${modal.nouveauStatut === s ? 'selected' : ''} ${statutClass[s]}`}
                  onClick={() => setModal({ ...modal, nouveauStatut: s })}
                >
                  {statutLabel[s]}
                </button>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={confirmerChangement} disabled={modal.nouveauStatut === modal.statutActuel}>Confirmer</button>
              <button className="btn-cancel" onClick={fermerModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}