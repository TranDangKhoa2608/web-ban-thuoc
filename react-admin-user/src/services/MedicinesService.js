// medicinesService.js

const API_URL = 'http://localhost:8080/api/medicines';

// Fetch tất cả sản phẩm
const fetchMedicines = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Không thể tải danh sách sản phẩm.');
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Cập nhật thông tin sản phẩm
const updateMedicine = async (medicineID, formData) => {
  try {
    const response = await fetch(`${API_URL}/${medicineID}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) throw new Error('Cập nhật sản phẩm thất bại.');

    const contentType = response.headers.get('Content-Type');
    return contentType && contentType.includes('application/json') 
      ? await response.json() 
      : await response.text();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const addMedicine = async (formData) => {
  try {
    const response = await fetch('http://localhost:8080/api/medicines/add', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      // Kiểm tra mã trạng thái từ server, ví dụ: Conflict (409) hoặc Bad Request (400)
      if (response.status === 409) {
        alert(`Tên sản phẩm đã tồn tại!`); // Notify user
        throw new Error('Tên sản phẩm đã tồn tại!');
      }
      if (response.status === 400) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || 'Dữ liệu không hợp lệ!');
      }
      throw new Error('Không thể thêm sản phẩm.');
    }

    // Kiểm tra kiểu nội dung từ phản hồi server
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      if (responseData.status === 'success') {
        console.log(responseData.message); // Hiển thị thông báo thành công
        alert(`Thêm sản phẩm thành công!`); // Notify user
        return responseData;
      } else {
        throw new Error(responseData.message);
      }
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

  
// Xóa sản phẩm
const deleteMedicine = async (medicineID) => {
  try {
    const response = await fetch(`${API_URL}/${medicineID}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Xóa sản phẩm thất bại.');

    return true;  // Trả về true nếu xóa thành công
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};


// Phương thức tìm kiếm sản phẩm
const searchMedicines= async (name) => {
  try {
      const response = await fetch(`${API_URL}/search?name=${encodeURIComponent(name)}`);

      // Kiểm tra xem yêu cầu có thành công không
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const medicines = await response.json(); // Chuyển đổi dữ liệu thành JSON
      return medicines; // Giả sử API trả về danh sách sản phẩm
  } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error; // Để có thể xử lý lỗi ở nơi gọi
  }
}

// Fetch a medicine by ID
const fetchMedicineById=async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`); // Update the URL as necessary
    if (!response.ok) {
      throw new Error('Error fetching product details');
    }
    const data = await response.json();
    return data; // Return the product details
  } catch (error) {
    console.error('Error fetching product details', error);
    throw error;
  }
}
export const MedicinesService = {
  fetchMedicines,
  updateMedicine,
  deleteMedicine,
  addMedicine,
  searchMedicines,
  fetchMedicineById,
};
