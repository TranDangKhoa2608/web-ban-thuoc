import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from '../../components/User/Footer';

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
  Box,
  ListItem,
  ListItemText
} from '@mui/material';
import { OrderDetailService } from '../../services/OrderDetaiService';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userID'); // Get user ID from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await OrderDetailService.getOrdersByUserId(userId);
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
    
     <Box sx={{ mt: 4 , textAlign: 'center'}}>
        <Navbar />
            <Container>
                        <Typography color="primary" variant="h4" >
                            <br></br>

                            <h3 className='text-center'> Mời bạn đăng nhập để xem giỏ hàng </h3>
                            <ListItem component={Link} to="/user/login" button>
                                <ListItemText primary="ĐĂNG NHẬP" sx={{ color: 'black', fontWeight: 'bold', background: '#f9f9f9', textAlign: 'center' }} />
                            </ListItem>
                        </Typography>;
                    </Container>

                    <Footer/>
            </Box>
        )
      }
  const formatOrderDate = (dateString) => {
    const datePart = dateString.substring(0, 8); // Get "20241022"
    const year = datePart.substring(0, 4); // "2024"
    const month = datePart.substring(4, 6); // "10"
    const day = datePart.substring(6, 8); // "22"
    return `${day}/${month}/${year}`; // Format: dd/mm/yyyy
  };

  const handleCancelOrder = async (orderId) => {
    try {
      // Prepare the new order status, "3" for canceled
      const updatedStatus = { status: "3" }; // Update this value based on your application logic

      // Call the service to cancel the order by updating its status
      await OrderDetailService.updateOrder(orderId, updatedStatus);

      // Optionally, refetch the orders after cancellation
      const updatedOrders = await OrderDetailService.getOrdersByUserId(userId);
      setOrders(updatedOrders);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
    <Navbar />
    <Container>
    
      <Typography variant="h4" gutterBottom>
      <br></br>

      <h3 className='text-center'>LỊCH SỬ ĐẶT HÀNG</h3>
        </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã Đơn Hàng</TableCell>
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
                <TableCell>{formatOrderDate(order.orderDate)}</TableCell>
                <TableCell>{order.totalPrice.toLocaleString()} VNĐ</TableCell>
                <TableCell>
                  {order.status === "1" ? "Đơn hàng mới" : 
                   order.status === "2" ? "Đã duyệt" : 
                   order.status === "3" ? "Đã hủy" : "Không xác định"}
                </TableCell>
                <TableCell>
                  {order.status === "1" && (
                   <>
                     <Button
                       variant="contained"
                       color="error"
                       onClick={() => handleCancelOrder(order.orderID)}
                     >
                       Hủy đơn hàng
                     </Button>
                   </>
                 ) } 
                  {order.status === "3" && (
                  <>
                    <Typography variant="body6" sx={{ marginBottom: 2 }}>
                      Đơn hàng đã hủy.
                    </Typography>
                  </>
                )}
                  {order.status === "2" && (
                  <>
                    <Typography variant="body6" sx={{ marginBottom: 2 }}>
                      Đơn hàng đã duyệt.
                    </Typography>

                  </>
                )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    <br></br>
    <br></br>
    <Footer/>
    </Box>
  );
};

export default OrderHistory;
