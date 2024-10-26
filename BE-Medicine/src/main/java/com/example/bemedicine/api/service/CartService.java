package com.example.bemedicine.api.service;
import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Optional<Cart> getCartById(Long id) {
        return cartRepository.findById(id);
    }


    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Optional<Cart> updateCart(Long id, Cart cartDetails) {
        return cartRepository.findById(id).map(cart -> {
            cart.setQuantity(cartDetails.getQuantity());
            return cartRepository.save(cart);
        });
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }


    public void addCart(Long userID, Long medicineID, Double price, int quantity) {
        // Kiểm tra xem sản phẩm có tồn tại hay không
        Optional<Medicine> medicineOpt = medicineRepository.findById(medicineID);
        if (!medicineOpt.isPresent()) {
            throw new RuntimeException("Medicine not found with ID: " + medicineID);
        }

        // Kiểm tra sản phẩm có trong giỏ hàng hay không
        Optional<Cart> cartOptional = cartRepository.findByUserIDAndMedicineID(userID, medicineID);

        if (cartOptional.isPresent()) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
            Cart cart = cartOptional.get();
            cart.setQuantity(cart.getQuantity() + quantity); // Thay đổi để tăng theo số lượng đã truyền
            cart.setTotalPrice(cart.getTotalPrice() + (price * quantity)); // Cập nhật giá trị tổng
            cartRepository.save(cart);
        } else {
            // Tạo một giỏ hàng mới nếu chưa có
            Cart cart = new Cart();
            cart.setUserID(userID);
            cart.setMedicineID(medicineID); // Đảm bảo giá trị này không NULL
            cart.setTotalPrice(price * quantity); // Đặt tổng giá trị cho sản phẩm
            cart.setQuantity(quantity); // Đặt số lượng cho sản phẩm
            cartRepository.save(cart);
        }
    }



    public Long getCartCountByUserId(Long userID) {
        return cartRepository.countByUserId(userID);
    }

}
