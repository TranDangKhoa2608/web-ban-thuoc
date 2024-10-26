package com.example.bemedicine.api.service;
import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    // Lấy tất cả sản phẩm
    public List<Medicine> getAllProducts() {
        return medicineRepository.findAll();
    }

    // Lưu sản phẩm
    public Medicine saveProduct(Medicine product) {
        return medicineRepository.save(product);
    }

    // Lấy sản phẩm theo ID
    public Medicine findMedicineById(Long id) {
        return medicineRepository.findById(id).orElse(null);
    }

    // Xóa sản phẩm theo ID
    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

    // Tìm kiếm sản phẩm theo tên
    public List<Medicine> searchMedicines(String name) {
        return medicineRepository.findByMedicineNameContainingIgnoreCase(name);
    }

    public Page<Medicine> getMedicinesByPage(int page, int size) {
        return medicineRepository.findAll(PageRequest.of(page, size));
    }
    // Tìm tất cả sản phẩm
    public List<Medicine> findAllMedicines() {
        return medicineRepository.findAll();
    }
}
