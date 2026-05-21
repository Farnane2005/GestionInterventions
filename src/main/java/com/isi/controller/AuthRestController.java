package com.isi.controller;

import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.isi.model.Admin;
import com.isi.model.Technicien;
import com.isi.model.Utilisateur;
import com.isi.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthRestController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        Optional<Utilisateur> u = authService.login(
            credentials.get("login"), credentials.get("password"));
        if (u.isPresent()) return ResponseEntity.ok(u.get());
        return ResponseEntity.status(401).body("Login ou mot de passe incorrect");
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        Optional<Utilisateur> saved = authService.register(admin);
        if (saved.isPresent()) return ResponseEntity.ok(saved.get());
        return ResponseEntity.badRequest().body("Ce login est déjà utilisé");
    }

    @PostMapping("/register/technicien")
    public ResponseEntity<?> registerTechnicien(@RequestBody Technicien technicien) {
        Optional<Utilisateur> saved = authService.register(technicien);
        if (saved.isPresent()) return ResponseEntity.ok(saved.get());
        return ResponseEntity.badRequest().body("Ce login est déjà utilisé");
    }
}