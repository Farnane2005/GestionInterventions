package com.isi.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("TECHNICIEN")
public class Technicien extends Utilisateur {

    private String specialite;
    private boolean disponible;

    @OneToMany(mappedBy = "technicien")
    @JsonIgnore
    private List<Intervention> interventions;
}