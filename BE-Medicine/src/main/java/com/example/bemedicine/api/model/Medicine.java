package com.example.bemedicine.api.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import org.hibernate.validator.constraints.Length;
@Entity
@Table(name = "tb_medicine")
@Data
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MedicineID")
    private Long medicineID;

    private String medicineName;

    private String origin;

    @Length(min=1, max=10000)
    private String description;

    private Double price;

    private int quantity;

    //@JsonIgnore
    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Cart> carts;


    @Column(name = "CategoryID", nullable = false)
    private Long categoryID;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryID", nullable = false,insertable=false, updatable=false)
    private Category category;

    private String imageUrl;

    private Double disPrice; ///phần trăm giảm giá

    @JsonIgnore
    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderDetail> orderdetails;
}
