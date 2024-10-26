package com.example.bemedicine.api.repository;

import com.example.bemedicine.api.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAll();

    User save(User user);

    Optional<User> findByUserID(Long id);

    void deleteById(Long id);

    Optional<User> findByEmail(String email);

    Optional<User> findByFullname(String email);

    // Đảm bảo phương thức này đúng với tên thuộc tính `user_login`
    Optional<User> findByUsername(String user_login);

    // Thêm phương thức đếm số lượng khách hàng
    @Query("SELECT COUNT(u) FROM User u")
    Long countTotalUsers(); // Trả về tổng số khách hàng
}
