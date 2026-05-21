package com.isi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.isi.model.Technicien;

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Long> {
    List<Technicien> findBySpecialite(String specialite);
    List<Technicien> findByDisponible(boolean disponible);
    List<Technicien> findByNomContaining(String motCle);

    @Query("select t from Technicien t where t.disponible = true and t.specialite = :s")
    List<Technicien> getTechniciensDisponiblesParSpecialite(@Param("s") String s);
}