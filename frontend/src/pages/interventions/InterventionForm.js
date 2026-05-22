import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInterventions, createIntervention, updateIntervention } from '../../services/interventionService';
import { getTechniciens } from '../../services/technicienService';
import '../techniciens/Technicien.css';
import './Intervention.css';

const emptyForm = { titre: '', description: '', dateIntervention: '', statut: 'EN_ATTENTE', technicienId: '' };

export default function InterventionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [techniciens, setTechniciens] = useState([]);
  const [error, setError] = useState('');
  const isEdit = !!id;

  useEffect(() => {
    getTechniciens().then(data => setTechniciens(data));
    if (isEdit) {
      getInterventions().then(data => {
        const found = data.find(i => i.id === parseInt(id));
        if (found) {
          // Map backend's technicien object to our flat technicienId for the select
          setForm({
            ...found,
            technicienId: found.technicien ? found.technicien.id : ''
          });
        }
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titre || !form.dateIntervention) {
      setError('Le titre et la date sont obligatoires.');
      return;
    }
    try {
      // Build payload with technicien as nested object (what Spring Boot expects)
      const payload = {
        titre: form.titre,
        description: form.description,
        dateIntervention: form.dateIntervention,
        statut: form.statut,
        lieu: form.lieu || '',
        technicien: form.technicienId ? { id: parseInt(form.technicienId) } : null
      };
      if (isEdit) {
        await updateIntervention(id, payload);
      } else {
        await createIntervention(payload);
      }
      navigate('/interventions');
    } catch (err) {
      setError('Une erreur est survenue. Verifiez le backend.');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{isEdit ? 'Modifier Intervention' : 'Nouvelle Intervention'}</h1>
      </div>
      <div className="form-card">
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre <span className="required">*</span></label>
            <input type="text" name="titre" value={form.titre} onChange={handleChange} placeholder="Ex: Panne electrique bureau 3" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Decrivez le probleme..." rows={3} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date d'intervention <span className="required">*</span></label>
              <input type="date" name="dateIntervention" value={form.dateIntervention} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Statut</label>
              <select name="statut" value={form.statut} onChange={handleChange}>
                <option value="EN_ATTENTE">En attente</option>
                <option value="EN_COURS">En cours</option>
                <option value="TERMINEE">Terminee</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Affecter a un technicien</label>
            <select name="technicienId" value={form.technicienId} onChange={handleChange}>
              <option value="">-- Non affecte --</option>
              {techniciens.map(t => (
                <option key={t.id} value={t.id}>{t.nom} {t.prenom}</option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">{isEdit ? 'Enregistrer' : 'Ajouter'}</button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/interventions')}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}