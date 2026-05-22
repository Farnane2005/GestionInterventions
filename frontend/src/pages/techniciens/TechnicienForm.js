import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTechniciens, createTechnicien, updateTechnicien } from '../../services/technicienService';
import './Technicien.css';

const emptyForm = { nom: '', prenom: '', email: '', telephone: '', specialite: '', login: '', password: '', disponible: true };

export default function TechnicienForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      getTechniciens().then(data => {
        const found = data.find(t => t.id === parseInt(id));
        if (found) setForm(found);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nom || !form.prenom || !form.email || !form.login || (!isEdit && !form.password)) {
      setError('Veuillez remplir tous les champs obligatoires (incluant login et mot de passe).');
      return;
    }
    try {
      if (isEdit) {
        await updateTechnicien(id, form);
      } else {
        await createTechnicien(form);
      }
      navigate('/techniciens');
    } catch (err) {
      setError('Une erreur est survenue. Verifiez le backend.');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{isEdit ? 'Modifier Technicien' : 'Nouveau Technicien'}</h1>
      </div>
      <div className="form-card">
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nom <span className="required">*</span></label>
              <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Ex: Alami" />
            </div>
            <div className="form-group">
              <label>Prenom <span className="required">*</span></label>
              <input type="text" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Ex: Youssef" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Login <span className="required">*</span></label>
              <input type="text" name="login" value={form.login} onChange={handleChange} placeholder="Ex: y.alami" />
            </div>
            {!isEdit && (
              <div className="form-group">
                <label>Mot de passe <span className="required">*</span></label>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
              </div>
            )}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Ex: youssef@gmail.com" />
            </div>
            <div className="form-group">
              <label>Telephone</label>
              <input type="text" name="telephone" value={form.telephone} onChange={handleChange} placeholder="Ex: 0612345678" />
            </div>
          </div>
          <div className="form-group">
            <label>Specialite</label>
            <select name="specialite" value={form.specialite} onChange={handleChange}>
              <option value="">-- Choisir une specialite --</option>
              <option value="Electricite">Electricite</option>
              <option value="Plomberie">Plomberie</option>
              <option value="Informatique">Informatique</option>
              <option value="Mecanique">Mecanique</option>
            </select>
            </div>
            <div className="form-group">
              <label>Disponibilité</label>
              <select name="disponible" value={form.disponible} onChange={e => setForm({...form, disponible: e.target.value === 'true'})}>
                <option value="true">Disponible</option>
                <option value="false">Occupé</option>
              </select>
            </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">{isEdit ? 'Enregistrer' : 'Ajouter'}</button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/techniciens')}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}