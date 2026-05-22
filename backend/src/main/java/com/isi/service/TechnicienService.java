package com.isi.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.isi.model.Technicien;
import com.isi.repository.TechnicienRepository;

@Service
public class TechnicienService {

    @Autowired
    private TechnicienRepository technicienRepository;

    public Technicien addTechnicien(Technicien t) {
        return technicienRepository.save(t);
    }

    public List<Technicien> getAllTechniciens() {
        return technicienRepository.findAll();
    }

    public Optional<Technicien> getTechnicienById(Long id) {
        return technicienRepository.findById(id);
    }

    public Optional<Technicien> updateTechnicien(Long id, Technicien modifie) {
        Optional<Technicien> existing = technicienRepository.findById(id);
        if (existing.isPresent()) {
            Technicien t = existing.get();
            t.setNom(modifie.getNom());
            t.setPrenom(modifie.getPrenom());
            t.setLogin(modifie.getLogin());
            t.setSpecialite(modifie.getSpecialite());
            t.setDisponible(modifie.isDisponible());
            t.setEmail(modifie.getEmail());
            t.setTelephone(modifie.getTelephone());
            return Optional.of(technicienRepository.save(t));
        }
        return Optional.empty();
    }

    public boolean deleteTechnicien(Long id) {
        if (technicienRepository.existsById(id)) {
            technicienRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Technicien> getTechniciensDisponibles() {
        return technicienRepository.findByDisponible(true);
    }

    public List<Technicien> rechercherParNom(String motCle) {
        return technicienRepository.findByNomContaining(motCle);
    }
}