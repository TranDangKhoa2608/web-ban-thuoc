import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, Container, Box, CircularProgress } from '@mui/material';
import OrderDetailService from '../../services/OrderDetaiService';
import Sidebar from '../../components/Admin/Sidebar';
import { MedicinesService } from '../../services/MedicinesService';



const OrderDetail = () => {
  const { orderID } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState({});


  useEffect(() => {
    const fetchOrderDetail = async () => {
      console.log("Fetching details for order ID:", orderID);
      try {
        const data = await OrderDetailService.getOrderDetailByOrderId(orderID);
        console.log("Fetched order details:", data);
        setOrderDetails(data); // Dữ liệu trả về là mảng
          // Fetch detailed information about each product in the cart
          const productDetailsMap = {};
          await Promise.all(data.map(async (item) => {
            const productDetail = await MedicinesService.fetchMedicineById(item.medicineID);
            productDetailsMap[item.medicineID] = productDetail;
          }));
          setProductDetails(productDetailsMap);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderID]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ mt: 2, padding: 2}}>
        <Sidebar />
    <Container>
      <Typography variant="h4">Chi tiết đơn hàng - {orderID}</Typography>
      {orderDetails.length > 0 ? (
        orderDetails.map((item) => (
          <Box key={item.orderdetailID} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 2 }}>
             <Box display="flex" alignItems="center">
                {/* Hiển thị ảnh thuốc */}
                {productDetails[item.medicineID] && (
                <>
                    <img
                    src={`http://localhost:8080/uploads/${productDetails[item.medicineID].imageUrl}`}
                    alt={productDetails[item.medicineID].medicineName}
                    style={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginRight: '10px',
                    }}
                    />
                    <Box>
                    <Typography variant="h3">
                        {productDetails[item.medicineID].medicineName}
                    </Typography>
                  
                    </Box>
                </>
                )}
            </Box>
            <Typography variant="h6">Mã thuốc: {item.medicineID}</Typography>
            <Typography variant="body1">Số lượng: {item.quantity}</Typography>
            <Typography variant="body1">Giá: {item.price}đ</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">Không có sản phẩm trong đơn hàng.</Typography>
      )}

      <Button variant="contained" color="primary" onClick={() => window.location.href = "/admin/managementOrder"}>
        Trở về
      </Button>
    </Container>
    </Box>
  );
};

export default OrderDetail;
