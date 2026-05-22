package com.isi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.isi.model.Admin;
import com.isi.repository.UtilisateurRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public void run(String... args) {
        // Créer un admin par défaut si aucun utilisateur "admin" n'existe
        if (!utilisateurRepository.existsByLogin("admin")) {
            Admin admin = new Admin();
            admin.setLogin("admin");
            admin.setPassword("1234");
            admin.setNom("Administrateur");
            admin.setPrenom("Super");
            admin.setNiveauAcces("TOTAL");
            utilisateurRepository.save(admin);
            System.out.println("==> Compte admin par defaut cree (login: admin, password: 1234)");
        } else {
            System.out.println("==> Compte admin deja existant, aucune creation.");
        }
    }
}
