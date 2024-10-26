package com.example.bemedicine.api.repository;

import com.example.bemedicine.api.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByNameContainingIgnoreCase(String name);

    void deleteCategoriesByCategoryID(Long id);
}
