    package com.example.bemedicine.api.model;
    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import lombok.Data;

    @Entity
    @Data
    @Table(name="tb_cart")
    public class Cart {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "CartID")
        private Long cartID;

        @Column(name = "UserID")
        private Long userID;

        @JsonIgnore
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "UserID", nullable = false,insertable=false, updatable=false)
        private User user;

        private Double totalPrice;

        @Column(name = "MedicineID" )
        private Long medicineID;

        @JsonIgnore
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "medicineID", nullable = false,insertable=false, updatable=false)
        private Medicine medicine;

        private int quantity;

    }
