package com.isi.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.isi.model.Technicien;
import com.isi.service.TechnicienService;

@RestController
@RequestMapping("/api/techniciens")
@CrossOrigin(origins = "*")
public class TechnicienRestController {

    @Autowired
    private TechnicienService technicienService;

    @GetMapping
    public List<Technicien> getAll() {
        return technicienService.getAllTechniciens();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Technicien> getById(@PathVariable Long id) {
        Optional<Technicien> t = technicienService.getTechnicienById(id);
        if (t.isPresent()) return ResponseEntity.ok(t.get());
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Technicien> add(@RequestBody Technicien t) {
        return ResponseEntity.ok(technicienService.addTechnicien(t));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Technicien> update(@PathVariable Long id, @RequestBody Technicien t) {
        Optional<Technicien> updated = technicienService.updateTechnicien(id, t);
        if (updated.isPresent()) return ResponseEntity.ok(updated.get());
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (technicienService.deleteTechnicien(id)) return ResponseEntity.ok("Supprimé");
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/disponibles")
    public List<Technicien> getDisponibles() {
        return technicienService.getTechniciensDisponibles();
    }

    @GetMapping("/recherche")
    public List<Technicien> rechercher(@RequestParam String nom) {
        return technicienService.rechercherParNom(nom);
    }
}