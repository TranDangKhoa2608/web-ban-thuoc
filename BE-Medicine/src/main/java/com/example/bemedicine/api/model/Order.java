package com.example.bemedicine.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
@Table(name = "tb_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderID")
    private Long orderID;

    @Column(name = "code_order")
    private String code;

    @Column(name = "order_date")
    private String orderDate;

    @Column(name = "status")
    private String status;

    // Many-to-One relationship with User
    @Column(name = "UserID")
    private Long userID;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID", nullable = false,insertable=false, updatable=false)
    private User user;


    @Column(name = "PaymentID", nullable = false)
    private String paymentID;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderDetail> orderdetails;

    // Other order fields
    private Double totalPrice;





}
