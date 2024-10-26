package com.example.bemedicine.api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "tb_invoice")
@Data
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="InvoiceID")
    private int invoiceID;
    private Date orderDate;
    private String fullName;

    private String addCode;
    private Double price;

    @Column(name = "OrderID")
    private Long orderID;

}
