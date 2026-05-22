package com.isi.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.isi.model.Intervention;
import com.isi.model.StatutIntervention;
import com.isi.model.Technicien;
import com.isi.repository.InterventionRepository;
import com.isi.repository.TechnicienRepository;

@Service
public class InterventionService {

    @Autowired
    private InterventionRepository interventionRepository;

    @Autowired
    private TechnicienRepository technicienRepository;

    public Intervention addIntervention(Intervention i) {
        if (i.getStatut() == null) i.setStatut(StatutIntervention.EN_ATTENTE);
        return interventionRepository.save(i);
    }

    public List<Intervention> getAllInterventions() {
        return interventionRepository.findAll();
    }

    public Optional<Intervention> getInterventionById(Long id) {
        return interventionRepository.findById(id);
    }

    public Optional<Intervention> updateIntervention(Long id, Intervention modifiee) {
        Optional<Intervention> existing = interventionRepository.findById(id);
        if (existing.isPresent()) {
            Intervention i = existing.get();
            i.setTitre(modifiee.getTitre());
            i.setDescription(modifiee.getDescription());
            i.setDateIntervention(modifiee.getDateIntervention());
            i.setStatut(modifiee.getStatut());
            i.setLieu(modifiee.getLieu());
            return Optional.of(interventionRepository.save(i));
        }
        return Optional.empty();
    }

    public boolean deleteIntervention(Long id) {
        if (interventionRepository.existsById(id)) {
            interventionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Intervention> affecterTechnicien(Long interventionId, Long technicienId) {
        Optional<Intervention> intervention = interventionRepository.findById(interventionId);
        Optional<Technicien> technicien = technicienRepository.findById(technicienId);
        if (intervention.isPresent() && technicien.isPresent()) {
            Intervention i = intervention.get();
            Technicien t = technicien.get();
            i.setTechnicien(t);
            i.setStatut(StatutIntervention.EN_COURS);
            t.setDisponible(false);
            technicienRepository.save(t);
            return Optional.of(interventionRepository.save(i));
        }
        return Optional.empty();
    }

    public Optional<Intervention> terminerIntervention(Long id) {
        Optional<Intervention> existing = interventionRepository.findById(id);
        if (existing.isPresent()) {
            Intervention i = existing.get();
            i.setStatut(StatutIntervention.TERMINEE);
            if (i.getTechnicien() != null) {
                Technicien t = i.getTechnicien();
                t.setDisponible(true);
                technicienRepository.save(t);
            }
            return Optional.of(interventionRepository.save(i));
        }
        return Optional.empty();
    }

    public List<Intervention> getByStatut(StatutIntervention statut) {
        return interventionRepository.findByStatut(statut);
    }

    public List<Intervention> rechercherParTitreOuLieu(String motCle) {
        return interventionRepository.findByTitreContainingOrLieuContaining(motCle, motCle);
    }
}