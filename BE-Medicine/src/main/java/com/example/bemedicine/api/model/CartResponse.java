package com.example.bemedicine.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartResponse {
    private String message;
    private Cart cart; // hoặc một kiểu dữ liệu khác nếu bạn muốn trả về thông tin khác
}
