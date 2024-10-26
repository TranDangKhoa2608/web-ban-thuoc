package com.example.bemedicine.api.repository;

import com.example.bemedicine.api.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    // Tìm giỏ hàng theo ID khách hàng
    List<Cart> findByUserID(Long userID); // Tìm các mục giỏ hàng theo userID
    // Lấy tất cả giỏ hàng
    List<Cart> findAllBy();

    Optional<Cart> findByUserIDAndMedicineID(Long userID, Long medicineID);

    @Query("SELECT COUNT(c.cartID) FROM Cart c WHERE c.userID = :userID")
    Long countByUserId(@Param("userID") Long userID);

}
