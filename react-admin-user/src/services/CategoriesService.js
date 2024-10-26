// categoriesService.js

const API_URL_CATEGORY = 'http://localhost:8080/api/categories';

// Lấy thông tin category theo categoryID
const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL_CATEGORY}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Không thể lấy thông tin danh mục`);
    }

    const data = await response.json(); // Giả sử API trả về thông tin danh mục
    return data; // Trả về dữ liệu danh mục
  } catch (error) {
    console.error(error.message); // Log lỗi chi tiết
    throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi
  }
};

const addCategories = async (formData) => {
  try {
    const response = await fetch(`${API_URL_CATEGORY}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Thêm tiêu đề nếu cần
      },
      body: JSON.stringify(formData), // Chuyển đổi formData thành JSON
    });

    // Kiểm tra xem yêu cầu có thành công hay không
    if (!response.ok) {
      throw new Error(`Không thể thêm danh mục: ${response.statusText}`);
    }

    const dataResponse = await response.json(); // Giả sử API trả về thông tin danh mục
    return dataResponse; // Trả về dữ liệu danh mục

  } catch (error) {
    console.error(`Lỗi khi thêm danh mục: ${error.message}`); // Log lỗi chi tiết
    throw error; // Ném lại lỗi để xử lý ở nơi khác nếu cần
  }
};
const updateCate = async (categoryID, formData) => {
  try {
    const response = await fetch(`${API_URL_CATEGORY}/${categoryID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Thêm tiêu đề nếu cần
      },
      body: JSON.stringify(formData), // Chuyển đổi formData thành JSON
    });

    // Kiểm tra xem yêu cầu có thành công hay không
    if (!response.ok) {
      throw new Error(`Không thể cập nhật thuốc: ${response.statusText}`);
    }

    const dataResponse = await response.json(); // Giả sử API trả về thông tin thuốc đã cập nhật
    return dataResponse; // Trả về dữ liệu thuốc đã cập nhật

  } catch (error) {
    console.error(`Lỗi khi cập nhật thuốc: ${error.message}`); // Log lỗi chi tiết
    throw error; // Ném lại lỗi để xử lý ở nơi khác nếu cần
  }
};

const deleteCategory = async (categoryID) => {
  try {
    const response = await fetch(`${API_URL_CATEGORY}/${categoryID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Thêm tiêu đề nếu cần
      },
    });

    // Kiểm tra xem yêu cầu có thành công hay không
    if (!response.ok) {
      throw new Error(`Không thể xóa danh mục: ${response.statusText}`);
    }

    const dataResponse = await response.json(); // Giả sử API trả về thông tin danh mục đã xóa
    return dataResponse; // Trả về dữ liệu danh mục đã xóa hoặc thông báo thành công

  } catch (error) {
    console.error(`Lỗi khi xóa danh mục: ${error.message}`); // Log lỗi chi tiết
    throw error; // Ném lại lỗi để xử lý ở nơi khác nếu cần
  }
};

 // Đường dẫn API

const searchCategoriesByName = async (categoryName) => {
  try {
    const response = await fetch(`${API_URL_CATEGORY}/search?name=${encodeURIComponent(categoryName)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Thêm tiêu đề nếu cần
      },
    });

    // Kiểm tra xem yêu cầu có thành công hay không
    if (!response.ok) {
      throw new Error(`Không thể tìm kiếm danh mục: ${response.statusText}`);
    }

    const categories = await response.json(); // Giả sử API trả về danh sách danh mục
    return categories; // Trả về danh sách danh mục tìm thấy

  } catch (error) {
    console.error(`Lỗi khi tìm kiếm danh mục: ${error.message}`); // Log lỗi chi tiết
    throw error; // Ném lại lỗi để xử lý ở nơi khác nếu cần
  }
};



export const CategoriesService = {
    fetchCategories,
    addCategories,
    updateCate,
    deleteCategory,
    searchCategoriesByName,
};
