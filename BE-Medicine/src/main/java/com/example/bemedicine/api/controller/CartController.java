package com.example.bemedicine.api.controller;

import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import com.example.bemedicine.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin("*")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepository cartRepository;

    // Lấy tất cả giỏ hàng
    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    // Lấy giỏ hàng theo ID khách hàng
    @GetMapping("/user/{userID}")
    public ResponseEntity<List<Cart>> getCartByUserID(@PathVariable Long userID) {
        List<Cart> cartItems = cartRepository.findByUserID(userID);
        return ResponseEntity.ok(cartItems); // Trả về danh sách các mục giỏ hàng
    }

// Thêm giỏ hàng mới
@PostMapping()
public ResponseEntity<CartResponse> addProductToCart(@RequestParam Long userID, @RequestParam Long medicineID, @RequestParam Double price, @RequestParam int quantity) {
    try {
        cartService.addCart(userID, medicineID, price,quantity );
        Optional<Cart> cartOptional = cartRepository.findByUserIDAndMedicineID(userID, medicineID);

        // Tạo đối tượng phản hồi
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            CartResponse response = new CartResponse("Sản phẩm đã được thêm vào giỏ hàng thành công", cart);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CartResponse("Không tìm thấy sản phẩm trong giỏ hàng", null));
        }
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CartResponse("Có lỗi xảy ra: " + e.getMessage(), null));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CartResponse("Có lỗi xảy ra: " + e.getMessage(), null));
    }
}


    // Cập nhật giỏ hàng
    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody Cart cartDetails) {
        // Lấy cart hiện tại theo id
        Optional<Cart> existingCartOpt = cartRepository.findById(id);

        if (!existingCartOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Nếu không tìm thấy, trả về 404
        }

        Cart existingCart = existingCartOpt.get();

        // Cập nhật số lượng từ cartDetails
        existingCart.setQuantity(cartDetails.getQuantity());

        // Tính toán lại tổng giá trị của sản phẩm
        existingCart.setTotalPrice(existingCart.getQuantity() * existingCart.getMedicine().getPrice());

        // Lưu lại cart đã cập nhật
        Cart updatedCart = cartRepository.save(existingCart);

        return new ResponseEntity<>(updatedCart, HttpStatus.OK); // Trả về cart đã cập nhật
    }


    // Xóa giỏ hàng theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/count/{userID}")
    public Long getCartCount(@PathVariable Long userID) {
        return cartService.getCartCountByUserId(userID);
    }


}
