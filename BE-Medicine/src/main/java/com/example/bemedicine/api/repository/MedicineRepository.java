package com.example.bemedicine.api.repository;

import com.example.bemedicine.api.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {


    List<Medicine> findByMedicineNameContainingIgnoreCase(String name);

    Optional<Medicine> findByMedicineName(String name);

    Optional<Medicine> findByMedicineID(Long name);

    List<Medicine> findByCategoryID(Long categoryId);

    @Query(value = "SELECT p FROM Medicine p ORDER BY p.medicineID ASC")
    List<Medicine> findTopNProducts(Pageable pageable);

    @Query("SELECT COUNT(p.medicineID) FROM Medicine p")
    Integer sumProductCount();



}
