package com.isi.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.isi.model.Intervention;
import com.isi.model.StatutIntervention;
import com.isi.service.InterventionService;

@RestController
@RequestMapping("/api/interventions")
@CrossOrigin(origins = "*")
public class InterventionRestController {

    @Autowired
    private InterventionService interventionService;

    @GetMapping
    public List<Intervention> getAll() {
        return interventionService.getAllInterventions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Intervention> getById(@PathVariable Long id) {
        Optional<Intervention> i = interventionService.getInterventionById(id);
        if (i.isPresent()) return ResponseEntity.ok(i.get());
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Intervention> add(@RequestBody Intervention i) {
        return ResponseEntity.ok(interventionService.addIntervention(i));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Intervention> update(@PathVariable Long id, @RequestBody Intervention i) {
        Optional<Intervention> updated = interventionService.updateIntervention(id, i);
        if (updated.isPresent()) return ResponseEntity.ok(updated.get());
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (interventionService.deleteIntervention(id)) return ResponseEntity.ok("Supprimée");
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/affecter/{technicienId}")
    public ResponseEntity<Intervention> affecter(@PathVariable Long id,
                                                  @PathVariable Long technicienId) {
        Optional<Intervention> updated = interventionService.affecterTechnicien(id, technicienId);
        if (updated.isPresent()) return ResponseEntity.ok(updated.get());
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/terminer")
    public ResponseEntity<Intervention> terminer(@PathVariable Long id) {
        Optional<Intervention> updated = interventionService.terminerIntervention(id);
        if (updated.isPresent()) return ResponseEntity.ok(updated.get());
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/statut/{statut}")
    public List<Intervention> getByStatut(@PathVariable String statut) {
        return interventionService.getByStatut(StatutIntervention.valueOf(statut));
    }

    @GetMapping("/recherche")
    public List<Intervention> rechercher(@RequestParam String q) {
        return interventionService.rechercherParTitreOuLieu(q);
    }
}