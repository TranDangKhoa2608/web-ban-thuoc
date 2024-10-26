package com.example.bemedicine.api.service;
import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderdetailRepository;

}
