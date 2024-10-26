package com.example.bemedicine.api.controller;

import com.example.bemedicine.api.model.Medicine;
import com.example.bemedicine.api.repository.CategoryRepository;
import com.example.bemedicine.api.repository.MedicineRepository;
import com.example.bemedicine.api.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/medicines")
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicineController {
    
    @Autowired
    private MedicineRepository medicineRepository;
    
    @Autowired
    private MedicineService medicineService;

    @Autowired
    private CategoryRepository categoryRepository;

    //HÀM UPDATE
    @PutMapping(value = "/{medicineID}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> updateMedicine(
            @PathVariable("medicineID") Long medicineID,
            @RequestParam("medicineName") String medicineName,
            @RequestParam("description") String description,
            @RequestParam("origin") String origin,
            @RequestParam("price") Double price,
            @RequestParam("quantity") int quantity,
            @RequestParam("categoryID") Long categoryID,
            @RequestParam(value = "imageUrl", required = false) MultipartFile imageFile,
            @RequestParam("disPrice") Long disPrice
    ) {
        try {
            // Tìm sản phẩm theo ID
            Optional<Medicine> MedicineOptional = medicineRepository.findByMedicineID(medicineID);
            if (!MedicineOptional.isPresent()) {
                return new ResponseEntity<>("Sản phẩm không tồn tại", HttpStatus.NOT_FOUND);
            }
            // Kiểm tra xem tên sản phẩm đã tồn tại hay chưa
            Optional<Medicine> existingMedicine = medicineRepository.findByMedicineName(medicineName);
//            if (existingMedicine.isPresent()) {
//                // Nếu sản phẩm đã tồn tại, trả về mã trạng thái 409 (Conflict)
//                return new ResponseEntity<>("Tên sản phẩm đã tồn tại", HttpStatus.CONFLICT);
//            }
            Medicine medicine = MedicineOptional.get();
            // Cập nhật các giá trị của sản phẩm
            medicine.setMedicineName(medicineName);
            medicine.setDescription(description);
            medicine.setPrice(price);
            medicine.setOrigin(origin);
            medicine.setDisPrice(Double.valueOf(disPrice));
            medicine.setQuantity(quantity);
            medicine.setCategoryID(categoryID);
            // Kiểm tra nếu người dùng có chọn ảnh mới
            if (imageFile != null && !imageFile.isEmpty()) {
                // Xóa ảnh cũ nếu có
                String oldImagePath = medicine.getImageUrl();
                if (oldImagePath != null) {
                    Path oldImagePathPath = Paths.get("uploads/", oldImagePath);
                    Files.deleteIfExists(oldImagePathPath); // Xóa ảnh cũ
                }
                // Lưu ảnh mới lên server
                String newImagePath = saveImage(imageFile);
                medicine.setImageUrl(newImagePath);
            }
            // Kiểm tra điều kiện đầu vào
            if (medicine.getMedicineName() == null || medicine.getMedicineName().isEmpty()) {
                return new ResponseEntity<>("Tên sản phẩm không được để trống", HttpStatus.BAD_REQUEST);
            }
            if (medicine.getPrice() < 0) {
                return new ResponseEntity<>("Giá sản phẩm không hợp lệ", HttpStatus.BAD_REQUEST);
            }
            // Lưu thay đổi vào database
            medicineRepository.save(medicine);
return ResponseEntity.status(HttpStatus.CREATED).body(medicine);
//            return new ResponseEntity<>("Sửa sản phẩm thành công: " + medicine.getMedicineID(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Có lỗi xảy ra khi sửa sản phẩm: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //HÀM LƯU HÌNH ẢNH
    private String saveImage(MultipartFile imageFile) throws IOException {
        String folder = "uploads/";  // Đường dẫn đến thư mục lưu ảnh
        // Lấy thời gian hiện tại và format theo kiểu yyyyMMdd_HHmmss
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        // Tạo tên file mới với thời gian hiện tại
        String fileName = timestamp + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(folder + fileName);
        // Tạo thư mục nếu chưa tồn tại
        Files.createDirectories(filePath.getParent());
        // Lưu file vào thư mục
        Files.write(filePath, imageFile.getBytes());
        return fileName;  // Trả về tên file để lưu vào database
    }

    ///HÀM ADD
    @PostMapping(value ="/add",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Map<String, Object>> createMedicine(
            @RequestParam("medicineName") String medicineName,
            @RequestParam("description") String description,
            @RequestParam("origin") String origin,
            @RequestParam("price") Double price,
            @RequestParam("quantity") int quantity,
            @RequestParam("categoryID") Long categoryID,
            @RequestParam("imageUrl") MultipartFile imageFile,
            @RequestParam("disPrice") Long disPrice
) {
        Map<String, Object> response = null;
        try {
            // Kiểm tra xem tên sản phẩm đã tồn tại hay chưa
            Optional<Medicine> existingMedicine = medicineRepository.findByMedicineName(medicineName);
            response = new HashMap<>();
            if (existingMedicine.isPresent()) {
                // Nếu sản phẩm đã tồn tại, trả về mã trạng thái 409 (Conflict)
                response.put("message", "Tên sản phẩm đã tồn tại!");
                response.put("status", "error");
                return new ResponseEntity<>(response, HttpStatus.CONFLICT);
            }
            // Lưu file ảnh lên server
            String imagePath = saveImage(imageFile);
            // Tạo sản phẩm mới
            Medicine medicine = new Medicine();
            medicine.setMedicineName(medicineName);
            medicine.setDescription(description);
            medicine.setOrigin(origin);
            medicine.setPrice(price);
            medicine.setQuantity(quantity);
            medicine.setCategoryID(categoryID);
            medicine.setImageUrl(imagePath);
            medicine.setDisPrice(Double.valueOf(disPrice));
            // Kiểm tra các điều kiện đầu vào
            if (medicine.getMedicineName() == null || medicine.getMedicineName().isEmpty()) {
                // Nếu tên sản phẩm rỗng, trả về mã trạng thái 400 (Bad Request)
                response.put("message", "Tên sản phẩm không được để trống!");
                response.put("status", "error");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            if (medicine.getPrice() < 0) {
                // Nếu giá sản phẩm không hợp lệ, trả về mã trạng thái 400 (Bad Request)
                response.put("message", "Giá sản phẩm không hợp lệ!");
                response.put("status", "error");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

            }
            // Lưu sản phẩm vào database
            medicineRepository.save(medicine);
            // Trả về mã trạng thái 201 (Created) khi thêm sản phẩm thành công
            response.put("message", "Thêm sản phẩm thành công -> " + medicine.getMedicineID());
            response.put("status", "success");
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            // Trả về mã trạng thái 500 (Internal Server Error) khi có lỗi xảy ra
            response.put("message", "Thêm sản phẩm thất bại" + e.getMessage());
            response.put("status", "error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMedicine(@PathVariable Long id) {
        Optional<Medicine> MedicineOptional = medicineRepository.findById(id);

        if (MedicineOptional.isPresent()) {
            Medicine Medicine = MedicineOptional.get();

            // Lấy đường dẫn của ảnh cần xóa
            String imagePath = "uploads/" + Medicine.getImageUrl();

            // Xóa sản phẩm khỏi cơ sở dữ liệu
            medicineRepository.deleteById(id);

            // Xóa ảnh khỏi thư mục
            try {
                Path imageFilePath = Paths.get(imagePath);
                Files.deleteIfExists(imageFilePath);  // Xóa ảnh nếu tồn tại
            } catch (IOException e) {
                // Nếu có lỗi khi xóa ảnh, trả về lỗi
                return new ResponseEntity<>("Lỗi khi xóa ảnh: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); //500
            }

            return new ResponseEntity<>("Xóa sản phẩm thành công", HttpStatus.CREATED); //201
        } else {
            return new ResponseEntity<>("Không tìm thấy sản phẩm có ID: " + id, HttpStatus.NOT_FOUND); //404
        }
    }


    // Tìm kiếm sản phẩm theo tên
    @GetMapping("/search")
    public ResponseEntity<List<Medicine>> searchMedicines(@RequestParam String name) {
        List<Medicine> Medicines = medicineRepository.findByMedicineNameContainingIgnoreCase(name);
        return new ResponseEntity<>(Medicines, HttpStatus.OK);
    }

    /// hiển thị sản phẩm theo soos lượng
    @GetMapping("/quantity")
    public ResponseEntity<List<Medicine>> getMedicinesByLimit(@RequestParam(defaultValue = "8") int limit) {
        // Lấy danh sách sản phẩm từ service
        List<Medicine> Medicines = medicineService.findAllMedicines();

        // Sắp xếp sản phẩm theo MedicineID tăng dần
        Medicines.sort(Comparator.comparing(Medicine::getMedicineID));

        // Kiểm tra nếu số lượng sản phẩm lớn hơn limit, chỉ trả về số lượng yêu cầu
        if (Medicines.size() > limit) {
            Medicines = Medicines.subList(0, limit); // Lấy 'limit' sản phẩm đầu tiên
        }

        return ResponseEntity.ok(Medicines);
    }


    // Lấy tất cả sản phẩm cùng với danh mục, thương hiệu và đánh giá
    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        List<Medicine> Medicines = medicineService.findAllMedicines();
        return ResponseEntity.ok(Medicines);
    }

    // Lấy sản phẩm theo loại sản phẩm
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Medicine>> getMedicinesByCategoryId(@PathVariable Long categoryId) {
        List<Medicine> Medicines = medicineRepository.findByCategoryID(categoryId);
        if (Medicines.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(Medicines, HttpStatus.OK);
    }

    // API trả về danh sách sản phẩm có phân trang
    @GetMapping("/page")
    public Page<Medicine> getMedicinesByPage(@RequestParam int page, @RequestParam int size) {
        return medicineService.getMedicinesByPage(page, size);
    }
    // Lấy sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        Medicine Medicine = medicineService.findMedicineById(id);
        if (Medicine != null) {
            return ResponseEntity.ok(Medicine);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

