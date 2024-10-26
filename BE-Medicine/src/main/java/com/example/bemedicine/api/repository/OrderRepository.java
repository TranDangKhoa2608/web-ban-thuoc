package com.example.bemedicine.api.repository;

import com.example.bemedicine.api.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserID(Long userId);

    List<Order> findByStatus(String status);

    List<Order> findByUserIDAndStatus(Long userID, String status);

    // Cần định nghĩa các phương thức này trong repository
    default Double calculateTotalRevenueByStatus(Long status) {
        List<Order> orders = findByStatus(String.valueOf(status));
        return orders.stream().mapToDouble(Order::getTotalPrice).sum();
    }

    Optional<Order> findByOrderID(Long id);

    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.status = :status")
    Double sumTotalPriceByStatus(@Param("status") int status);

}
