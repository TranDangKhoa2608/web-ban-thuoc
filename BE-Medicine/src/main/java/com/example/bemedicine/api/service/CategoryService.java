package com.example.bemedicine.api.service;
import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    // Lấy tất cả loại sản phẩm
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Lưu loại sản phẩm
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Lấy loại sản phẩm theo ID
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    // Xóa loại sản phẩm theo ID
    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }


}
