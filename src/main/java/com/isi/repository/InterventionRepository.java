package com.isi.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.isi.model.Intervention;
import com.isi.model.StatutIntervention;

@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {
    List<Intervention> findByStatut(StatutIntervention statut);
    List<Intervention> findByTitreContaining(String motCle);
    List<Intervention> findByTechnicienId(Long id);
    List<Intervention> findByTitreContainingOrLieuContaining(String t, String l);

    @Query("select i from Intervention i where i.dateIntervention between :d1 and :d2")
    List<Intervention> getEntreDates(@Param("d1") LocalDate d1, @Param("d2") LocalDate d2);
}