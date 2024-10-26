package com.example.bemedicine.api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tb_orderdetail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderDetailID")
    private Long orderdetailID;

    @Column(name = "OrderID")
    private Long orderID;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrderID", nullable = false,insertable=false, updatable=false)
    private Order order;

    @Column(name = "MedicineID")
    private Long medicineID;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicineID", nullable = false,insertable=false, updatable=false)
    private Medicine medicine;

    private Double price;

    private int quantity;

    @Column(name = "status" ,nullable = true)
    private String status;
}
