import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material';
import { OrderDetailService } from '../../services/OrderDetaiService'// Ensure this service has necessary methods
import { UserService } from '../../services/UserService';  // Đường dẫn dịch vụ lấy thông tin người dùng
import jsPDF from 'jspdf';
const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await OrderDetailService.fetchAllOrders(); // Adjust your service method to fetch all orders
        setOrders(fetchedOrders);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const [users, setUsers] = useState({}); // State để lưu thông tin người dùng

  useEffect(() => {
    const fetchUsers = async () => {
      const userPromises = orders.map(order => UserService.fetchUserById(order.userID));
      try {
        const userData = await Promise.all(userPromises);
        const userMap = userData.reduce((acc, user) => {
          acc[user.userID] = user.fullname; 
          return acc;
        }, {});
        setUsers(userMap); // Lưu vào state
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUsers();
  }, [orders]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  const handleApproveOrder = async (orderId) => {
    try {
      const updatedStatus = { status: "2" }; // Status "2" for approved orders
      await OrderDetailService.updateOrder(orderId, updatedStatus);
      // Refetch orders
      const updatedOrders = await OrderDetailService.fetchAllOrders();
      setOrders(updatedOrders);
    } catch (err) {
      setError(err.message);
    }
  };
  const generatePDF = (order) => {
    // Check if order properties exist
    if (!order || !order.productName || !order.quantity || !order.price) {
        console.error('Order data is incomplete:', order);
       
    }

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define your PDF content
    doc.setFontSize(20);
    doc.text(`Invoice: ${order.orderID}`, 20, 20);

    doc.setFontSize(12);
    doc.text(`Full Name: ${users[order.userID] || "Đang tải..."}`, 20, 40)
    doc.text(`Order Date: ${formatOrderDate(order.orderDate)}`, 20, 60)
    doc.text(`Total Price: ${order.totalPrice} vnd`, 20, 80);
    // Save the PDF
    doc.save(`invoice_${order.orderID}.pdf`);
};







  const formatOrderDate = (dateString) => {
    const datePart = dateString.substring(0, 8); // Get "20241022"
    const year = datePart.substring(0, 4); // "2024"
    const month = datePart.substring(4, 6); // "10"
    const day = datePart.substring(6, 8); // "22"
    return `${day}/${month}/${year}`; // Format: dd/mm/yyyy
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>QUẢN LÝ ĐƠN HÀNG</Typography>
      <TableContainer component={Paper}>
        <Table sx={{}}>
          <TableHead>
            <TableRow>
              <TableCell>Mã Đơn Hàng</TableCell>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Ngày Đặt Hàng</TableCell>
              <TableCell>Tổng Giá</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
               <TableRow key={order.orderID}>
               <TableCell>{order.code}</TableCell>
               <TableCell>{users[order.userID] || "Đang tải..."}</TableCell> {/* Hiển thị tên người dùng */}
               <TableCell>{formatOrderDate(order.orderDate)}</TableCell>
               <TableCell>{order.totalPrice}đ</TableCell>
               <TableCell>
                 {order.status === "1" ? "Đang chờ duyệt" :
                  order.status === "2" ? "Đã duyệt" :
                  order.status === "3" ? "Đã hủy" : "Không xác định"}
               </TableCell>
               <TableCell>
                 {order.status === "1" && (
                   <>
                     <Button
                       variant="contained"
                       color="primary"
                       onClick={() => handleApproveOrder(order.orderID)}
                     >
                       Duyệt
                     </Button>
                     <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => window.location.href = `/orders/${order.orderID}`} // Chuyển đến trang chi tiết
                        style={{ marginLeft: '10px' }}
                      >
                        Xem chi tiết
                      </Button>
 
                      <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                              console.log("Order data before PDF generation:", order); // Log order data
                              generatePDF(order);
                          }}
                          style={{ marginLeft: '10px' }}
                      >
                          Xuất hóa đơn
                      </Button>
                   </>
                 ) } 

                {order.status === "3" && (
                  <>
                    <Typography variant="body6" sx={{ marginBottom: 2 }}>
                      Đơn hàng đã hủy.
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => window.location.href = `/orders/${order.orderID}`} // Chuyển đến trang chi tiết
                      style={{ marginLeft: '10px' }}
                    >
                      Xem chi tiết
                    </Button>
                  </>
                )}
                {order.status === "2" && (
                  <>
                    <Typography variant="body6" sx={{ marginBottom: 2 }}>
                      Đơn hàng đã duyệt.
                    </Typography>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => window.location.href = `/orders/${order.orderID}`} // Chuyển đến trang chi tiết
                      style={{ marginLeft: '10px' }}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                              console.log("Order data before PDF generation:", order); // Log order data
                              generatePDF(order);
                          }}
                          style={{ marginLeft: '10px' }}
                      >
                          Xuất hóa đơn
                      </Button>
                  </>
                )}
            

               </TableCell>
             </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminOrderManagement;
