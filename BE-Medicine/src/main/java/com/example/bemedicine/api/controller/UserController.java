package com.example.bemedicine.api.controller;

import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    // Khai báo BCryptPasswordEncoder

    // Endpoint để lấy tất cả người dùng
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Endpoint để lấy người dùng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.<ResponseEntity<Object>>map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>("Không tìm thấy người dùng có chứa id: " + id, HttpStatus.NOT_FOUND));
    }

    // Endpoint để tìm người dùng theo tên Ví dụ: http://localhost:8080/api/users/search?name=John
    @GetMapping("/search")
    public ResponseEntity<Object> getUsersByName(@RequestParam String name) {
        Optional<User> users = userRepository.findByUsername(name);
        if (!users.isEmpty()) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Không tìm thấy người dùng có tên: " + name, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint để thêm người dùng mới
    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        // Kiểm tra xem name đã tồn tại chưa
        Optional<User> existingUserByName = userRepository.findByFullname(user.getFullname());
        if (existingUserByName.isPresent()) {
            return new ResponseEntity<>("Tên người dùng đã tồn tại", HttpStatus.CONFLICT);
        }

        // Kiểm tra xem user_login đã tồn tại chưa
        Optional<User> existingUserByLogin = userRepository.findByUsername(user.getUsername());
        if (existingUserByLogin.isPresent()) {
            return new ResponseEntity<>("Tên đăng nhập đã tồn tại", HttpStatus.CONFLICT);
        }
        // Kiểm tra xem user_login đã tồn tại chưa
        Optional<User> existingEmail = userRepository.findByEmail(user.getEmail());
        if (existingEmail.isPresent()) {
            return new ResponseEntity<>("Email đã tồn tại", HttpStatus.CONFLICT);
        }

        // Nếu cả hai đều chưa tồn tại, thêm người dùng mới
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>("Thêm người dùng thành công: " + savedUser.getUserID(), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Kiểm tra xem email có thay đổi không
            if (!user.getEmail().equals(userDetails.getEmail())) {
                // Nếu email thay đổi, kiểm tra xem email mới đã tồn tại chưa
                Optional<User> existingUserByEmail = userRepository.findByEmail(userDetails.getEmail());
                if (existingUserByEmail.isPresent()) {
                    return new ResponseEntity<>(Map.of("message", "Email đã được sử dụng"), HttpStatus.CONFLICT);
                }
            }

            // Cập nhật các thông tin khác
            user.setFullname(userDetails.getFullname());
            user.setEmail(userDetails.getEmail());
            user.setAddress(userDetails.getAddress());
            user.setPhone(userDetails.getPhone());

            userRepository.save(user);
            return new ResponseEntity<>(Map.of("message", "Cập nhật thông tin thành công"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Không tìm thấy người dùng", HttpStatus.NOT_FOUND);
        }
    }


    // Endpoint để xóa người dùng theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return new ResponseEntity<>("Xóa người dùng thành công", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Không tìm thấy người dùng", HttpStatus.NOT_FOUND);
        }
    }

    // API Đăng ký
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody RegisterRequest registerRequest) {
        // Kiểm tra xem email đã tồn tại chưa
        Optional<User> existingUserByEmail = userRepository.findByEmail(registerRequest.getEmail());
        if (existingUserByEmail.isPresent()) {
            return new ResponseEntity<>(Map.of("message", "Email đã được sử dụng"), HttpStatus.CONFLICT);
        }

        // Kiểm tra xem user_login đã tồn tại chưa
        Optional<User> existingUserByLogin = userRepository.findByUsername(registerRequest.getUsername());
        if (existingUserByLogin.isPresent()) {
            return new ResponseEntity<>(Map.of("message", "Tên đăng nhập đã tồn tại"), HttpStatus.CONFLICT);
        }

        // Tạo và lưu người dùng mới
        User newUser = new User();
        newUser.setFullname(registerRequest.getFullname());
        newUser.setEmail(registerRequest.getEmail());

        // Mã hóa mật khẩu bằng SHA-256
        String encodedPassword = PasswordUtil.hashPassword(registerRequest.getPassword());
        newUser.setPassword(encodedPassword);

        newUser.setUsername(registerRequest.getUsername());
        newUser.setAddress(registerRequest.getAddress());
        newUser.setPhone(registerRequest.getPhone());

        User savedUser = userRepository.save(newUser);

        // Trả về phản hồi JSON
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", "Đăng ký thành công");
        responseBody.put("userID", savedUser.getUserID());
        responseBody.put("username", savedUser.getUsername());

        return new ResponseEntity<>(responseBody, HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest loginRequest) {
        // Kiểm tra username
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        Map<String, Object> response = new HashMap<>();

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Mã hóa mật khẩu mà người dùng nhập vào
            String hashedInputPassword = PasswordUtil.hashPassword(loginRequest.getPassword());

            // So sánh mật khẩu đã mã hóa
            if (user.getPassword().equals(hashedInputPassword)) {
                // Đăng nhập thành công, trả về thông tin người dùng
                response.put("message", "Đăng nhập thành công!");
                response.put("status", "success");
                response.put("userID", user.getUserID()); // ID người dùng
                response.put("username", user.getUsername()); // Tên đăng nhập
                response.put("fullName", user.getFullname()); // Tên đầy đủ của người dùng (nếu có)
                response.put("email", user.getEmail()); // Tên đầy đủ của người dùng (nếu có)

                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                // Sai mật khẩu
                response.put("message", "Tài khoản hoặc Mật khẩu không đúng!");
                response.put("status", "error");
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } else {
            // Sai tên đăng nhập
            response.put("message", "Tên đăng nhập không đúng!");
            response.put("status", "error");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
}

}


