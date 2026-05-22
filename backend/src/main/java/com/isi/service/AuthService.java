package com.isi.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.isi.model.Utilisateur;
import com.isi.repository.UtilisateurRepository;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Optional<Utilisateur> login(String login, String password) {
        Optional<Utilisateur> u = utilisateurRepository.findByLogin(login);
        if (u.isPresent() && u.get().getPassword().equals(password))
            return u;
        return Optional.empty();
    }

    public Optional<Utilisateur> register(Utilisateur u) {
        if (utilisateurRepository.existsByLogin(u.getLogin()))
            return Optional.empty();
        return Optional.of(utilisateurRepository.save(u));
    }
}