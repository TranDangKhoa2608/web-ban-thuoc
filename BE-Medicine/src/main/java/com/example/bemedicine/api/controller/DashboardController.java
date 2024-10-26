package com.example.bemedicine.api.controller;

import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import com.example.bemedicine.api.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {
    private final MedicineRepository medicineRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public DashboardController(MedicineRepository medicineRepository,
                               OrderRepository orderRepository,
                               UserRepository userRepository) {
        this.medicineRepository = medicineRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }


    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        Map<String, Object> summary = new HashMap<>();

        // Tổng số lượng sản phẩm (count) trong product
        Integer totalProductCount = medicineRepository.sumProductCount();
        summary.put("totalProductCount", totalProductCount);

        // Tổng tiền (totalPrice) của đơn hàng có status = 2
        Double totalOrderPrice = orderRepository.sumTotalPriceByStatus(2);
        summary.put("totalOrderPrice", totalOrderPrice);

        // Tổng số user trong bảng user
        Long totalUsers = userRepository.count();
        summary.put("totalUsers", totalUsers);

        return ResponseEntity.ok(summary);
    }
}
