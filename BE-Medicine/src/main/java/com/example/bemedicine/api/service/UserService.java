package com.example.bemedicine.api.service;

import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return (User) userRepository.save(user);
    }

    public User getUserById(Long id) {
        return (User) userRepository.findById(id).orElse(null);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
