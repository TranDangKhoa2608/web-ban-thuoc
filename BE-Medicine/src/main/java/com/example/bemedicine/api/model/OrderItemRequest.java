package com.example.bemedicine.api.model;

import lombok.Data;

@Data
public class OrderItemRequest {
    private Long medicineID;
    private Long quantity;
    private Double price;
}
