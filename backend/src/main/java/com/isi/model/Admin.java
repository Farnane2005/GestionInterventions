package com.isi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("ADMIN")
public class Admin extends Utilisateur {
    private String niveauAcces;
}