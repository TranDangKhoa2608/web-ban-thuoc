package com.example.bemedicine.api.repository;

import jakarta.transaction.Transactional;
import com.example.bemedicine.api.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    Optional<OrderDetail> findByMedicineID(Long medicineID);

    List<OrderDetail> findByOrderID(Long orderID);

    @Transactional
    @Modifying
    @Query("DELETE FROM OrderDetail od WHERE od.orderID = :orderID")
    void deleteByOrderID(@Param("orderID") Long orderID);

    @Modifying
    @Transactional
    @Query("UPDATE OrderDetail o SET o.status = '2' WHERE o.medicineID = :medicineID AND o.orderID = :orderID")
    void updateStatusToReviewed(Long medicineID, Long orderID);

}
