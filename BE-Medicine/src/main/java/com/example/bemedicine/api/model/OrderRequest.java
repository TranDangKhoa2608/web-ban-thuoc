package com.example.bemedicine.api.model;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private Long userID;
    private Long paymentID;
    private Long productID;
    private Double totalPrice;
    private Long quantity;
    private Double price;

    private String userEmail; // Email của người dùng

    private List<OrderItemRequest> items;
}
