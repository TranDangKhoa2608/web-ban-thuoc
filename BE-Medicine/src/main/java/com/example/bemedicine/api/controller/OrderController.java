package com.example.bemedicine.api.controller;

import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import com.example.bemedicine.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderDetailRepository orderdetailRepository;
    @Autowired
    private MedicineRepository medicineRepository;

    // Hiển thị tất cả đơn hàng
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        orders.sort(Comparator.comparing(Order::getOrderID));
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Hàm tạo mã code ngẫu nhiên gồm chữ và số với độ dài cho trước
    public static String generateRandomCode(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }

        return sb.toString();
    }
    public String formatPrice(Double price) {
        // Định dạng tiền tệ theo chuẩn Việt Nam
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));

        // Loại bỏ ký hiệu tiền tệ "₫" nếu chỉ muốn hiển thị số và "VND"
        String formattedPrice = currencyFormat.format(price).replace("₫", "").trim();

        return formattedPrice + " VND"; // Thêm "VND" vào cuối chuỗi
    }
    //đặt hàng
    @PostMapping("/buy")
    public ResponseEntity<String> addCart(@RequestBody OrderRequest orderRequest) {
        try {
            // Validate request parameters
            if (orderRequest.getUserID() == null || orderRequest.getPaymentID() == null ||
                    orderRequest.getTotalPrice() == null || orderRequest.getItems().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Thiếu thông tin đặt hàng.\"}");
            }

            // Create new order
            Order order = new Order();
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            order.setOrderDate(timestamp);

            String randomCode = generateRandomCode(10);
            order.setCode(randomCode);
            order.setUserID(orderRequest.getUserID());
            order.setPaymentID(String.valueOf(orderRequest.getPaymentID()));
            order.setStatus("1");
            order.setTotalPrice(orderRequest.getTotalPrice());

            // Save the order to the database
            orderRepository.save(order);

            // Create order details for each selected product
            for (OrderItemRequest item : orderRequest.getItems()) {
                // Check if medicine ID exists
                if (!medicineRepository.existsById(item.getMedicineID())) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("{\"error\":\"Medicine with ID " + item.getMedicineID() + " does not exist.\"}");
                }

                OrderDetail orderDetail = new OrderDetail();
                orderDetail.setMedicineID(item.getMedicineID());
                orderDetail.setOrderID(order.getOrderID());
                orderDetail.setQuantity(Math.toIntExact(item.getQuantity()));
                orderDetail.setPrice(item.getPrice());

                // Save order detail
                orderdetailRepository.save(orderDetail);
            }

            // Return success response
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\":\"Order created successfully.\"}");

        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\":\"Đã xảy ra lỗi khi đặt hàng: " + e.getMessage() + "\"}");
        }
    }



    // Hiển thị đơn hàng theo ID khách hàng
    @GetMapping("/customer/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Long userId) {
        List<Order> orders = orderRepository.findByUserID(userId);
        orders.sort(Comparator.comparing(Order::getOrderID));
        return ResponseEntity.ok(orders);
    }

    // Hiển thị đơn hàng theo ID khách hàng
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Order>> getOrdersByOrderId(@PathVariable Long id) {
        Optional<Order> orders = orderRepository.findByOrderID(id);
        return ResponseEntity.ok(orders);
    }



    // Hiển thị đơn hàng theo ID khách hàng và tình trạng
    @GetMapping("/customer/{userId}/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByUserIdAndStatus(@PathVariable Long userId, @PathVariable Long status) {
        List<Order> orders = orderRepository.findByUserIDAndStatus(userId, String.valueOf(status));
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    // Cập nhật thông tin đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<String> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        Optional<Order> existingOrderOptional = orderRepository.findByOrderID(id);

        if (existingOrderOptional.isEmpty()) {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }

        Order existingOrder = existingOrderOptional.get();
        existingOrder.setStatus(orderDetails.getStatus());

        orderRepository.save(existingOrder);
        return new ResponseEntity<>("Cập nhật trạng thái thành công", HttpStatus.OK);
    }

    // Xóa đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        try {
            // Xóa tất cả chi tiết đơn hàng liên quan đến đơn hàng này
            orderdetailRepository.deleteByOrderID(id);

            // Xóa đơn hàng
            orderRepository.deleteById(id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Trả về 204 NO_CONTENT nếu thành công
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Trả về lỗi 500 nếu có lỗi xảy ra
        }
    }


    // Hiển thị tổng doanh thu theo trạng thái
    @GetMapping("/revenue/status/{status}")
    public ResponseEntity<Double> calculateTotalRevenueByStatus(@PathVariable Long status) {
        Double totalRevenue = orderRepository.calculateTotalRevenueByStatus(status);
        return new ResponseEntity<>(totalRevenue, HttpStatus.OK);
    }
}
