package com.example.bemedicine.api.controller;

import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import com.example.bemedicine.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orderdetails")
@CrossOrigin("*")
public class OrderDetailController {
    @Autowired
    private OrderDetailRepository orderdetailRepository;

    @GetMapping("/orderdetail/{orderID}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailsByOrderId(@PathVariable Long orderID) {
        List<OrderDetail> orderdetails = orderdetailRepository.findByOrderID(orderID);
        return ResponseEntity.ok(orderdetails);
    }


}
