package com.example.bemedicine.api.controller;

import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import com.example.bemedicine.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private CategoryService categoryService;

    // Thêm loại sản phẩm mới
    @PostMapping("/add")
    public ResponseEntity<Object> createCategory(@RequestBody Category category) {
        Category cate = new Category();
        cate.setName(category.getName());
        cate.setDescription(category.getDescription());
        categoryRepository.save(cate);
        return  ResponseEntity.status(HttpStatus.CREATED).body(cate);
    }

    // Sửa thông tin loại sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            Category cate = existingCategory.get();
            cate.setName(category.getName());
            cate.setDescription(category.getDescription());
            categoryRepository.save(cate);
            return  ResponseEntity.status(HttpStatus.CREATED).body(cate);
        } else {
            return new ResponseEntity<>("Không tìm thấy loại sản phẩm có ID: " + id, HttpStatus.NOT_FOUND);
        }
    }

    // Xóa loại sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCategory(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            // Kiểm tra nếu danh mục tồn tại
            if (!categoryRepository.existsById(id)) {
                response.put("message", "Danh mục không tồn tại.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            // Kiểm tra sản phẩm có liên quan
            List<Medicine> Medicines = medicineRepository.findByCategoryID(id);
            if (!Medicines.isEmpty()) {
                // ResponseEntity.badRequest().body("Không thể xóa danh mục. Hãy xóa hoặc di chuyển sản phẩm trước.");
                response.put("message", "Không thể xóa danh mục. Danh mục đã chứa sản phẩm.");
                return ResponseEntity.badRequest().body(response);
            }else {
                categoryService.deleteCategoryById(id);
                response.put("message", "Xóa danh mục thành công!");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.put("message", "Lỗi khi xóa danh mục: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Lấy tất cả loại sản phẩm
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    // Lấy danh mục theo ID
    @GetMapping("/{id}") // Đường dẫn lấy danh mục theo ID
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        // Trả về 404 nếu không tìm thấy danh mục
        return categoryOptional.map(category -> new ResponseEntity<>(category, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/search")
    public ResponseEntity<List<Category>> searchCategoriesByName(@RequestParam String name) {
        List<Category> categories = categoryRepository.findByNameContainingIgnoreCase(name);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }


    @GetMapping("/categories")
    public ResponseEntity<Map<String, Object>> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Category> pageCategories = categoryRepository.findAll(paging);

        Map<String, Object> response = new HashMap<>();
        response.put("categories", pageCategories.getContent());
        response.put("totalPages", pageCategories.getTotalPages());
        response.put("currentPage", pageCategories.getNumber() + 1);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
