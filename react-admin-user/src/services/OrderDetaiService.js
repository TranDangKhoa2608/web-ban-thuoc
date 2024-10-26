const API_BASE_URL = 'http://localhost:8080/api/orders'; // Thay thế với URL API thực tế của bạn
const API_orderdetails = 'http://localhost:8080/api/orderdetails'; // Thay thế với URL API thực tế của bạn

export const OrderDetailService = {
  // Lấy tất cả đơn hàng
  fetchAllOrders: async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy đơn hàng: ' + response.statusText);
    }
    return await response.json();
  },

  // Tạo một đơn hàng mới
  addOrder: async (orderRequest) => {
    const response = await fetch(`${API_BASE_URL}/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderRequest),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi tạo đơn hàng: ' + response.statusText);
    }
    return await response.json();
  },

  // Lấy đơn hàng theo ID đơn hàng
  getOrderById: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/${orderId}`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy đơn hàng theo ID: ' + response.statusText);
    }
    return await response.json();
  },

  // Lấy đơn hàng theo ID người dùng và tình trạng
  getOrdersByUserIdAndStatus: async (userId, status) => {
    const response = await fetch(`${API_BASE_URL}/customer/${userId}/status/${status}`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy đơn hàng theo ID người dùng và tình trạng: ' + response.statusText);
    }
    return await response.json();
  },
  // Lấy đơn hàng chii tiết theo orderID 
  getOrderDetailByOrderId: async (orderID) => {
    try {
      const response = await fetch(`${API_orderdetails}/orderdetail/${orderID}`);
      if (!response.ok) {
        throw new Error('Lỗi khi lấy chi tiết đơn hàng theo ID: ' + response.statusText);
      }
      console.log('Fetching order details', response);
      return await response.json(); // Trả về dữ liệu chi tiết đơn hàng

    } catch (error) {
      console.error('Error fetching order details', error);
      throw error; // Ném lỗi nếu có
    }
  },

  // Lấy đơn hàng theo ID người dùng
  getOrdersByUserId: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/customer/${userId}`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy đơn hàng theo ID người dùng: ' + response.statusText);
    }
    return await response.json();
  },

  // Cập nhật trạng thái đơn hàng
  updateOrder: async (orderId, orderDetails) => {
    const response = await fetch(`${API_BASE_URL}/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật trạng thái đơn hàng: ' + response.statusText);
    }
    return await response.text();
  },

  // Xóa một đơn hàng
  deleteOrder: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/${orderId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Lỗi khi xóa đơn hàng: ' + response.statusText);
    }
  },

  // Tính tổng doanh thu theo tình trạng
  calculateTotalRevenueByStatus: async (status) => {
    const response = await fetch(`${API_BASE_URL}/revenue/status/${status}`);
    if (!response.ok) {
      throw new Error('Lỗi khi tính tổng doanh thu theo tình trạng: ' + response.statusText);
    }
    return await response.json();
  }
};

export default OrderDetailService;
