package com.isi.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Intervention {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "interv_seq")
    @SequenceGenerator(name = "interv_seq", sequenceName = "INTERV_SEQ", allocationSize = 1)
    private Long id;

    private String titre;

    @Column(length = 1000)
    private String description;

    private LocalDate dateIntervention;

    @Enumerated(EnumType.STRING)
    private StatutIntervention statut;

    private String lieu;

    @ManyToOne
    @JoinColumn(name = "technicien_id")
    private Technicien technicien;
}