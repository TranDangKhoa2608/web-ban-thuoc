import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress, Button, TextField, Container } from '@mui/material';
import { MedicinesService } from '../../services/MedicinesService';
import { CartService } from '../../services/CartService'; // Importing CartService
import Navbar from './Navbar';
import Footer from '../../components/User/Footer';

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for managing quantity

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await MedicinesService.fetchMedicineById(id);
        setProduct(data); // Update product info
        console.log("Fetched product data:", data); // Log fetched data
      } catch (error) {
        setError(error); // Handle error
        console.error("Error fetching product details:", error); // Log error
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <CircularProgress />; // Show loading spinner
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show error message
  }

  // Handle adding product to cart
  const handleAddToCart = async () => {
    const userID = localStorage.getItem('userID');
    console.log("Mã người dùng", userID); // Replace with actual user ID from your authentication context or state
    try {
      const result = await CartService.addProductToCart(userID, id, product.price, quantity);
      console.log(result); // Log success message
      alert(`${quantity} sản phẩm ${product.medicineName} đã được thêm vào giỏ hàng!`); // Notify user
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.'); // Notify error
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Chia cột theo chiều ngang với màn hình lớn, còn màn hình nhỏ thì theo cột dọc
            gap: 2,
            padding: 2,
          }}
        >
          {product ? (
            <>
              {/* Cột chứa ảnh sản phẩm */}
              <Box sx={{ flex: 1, paddingRight: 2, display: 'flex', justifyContent: 'center' }}>
                <img
                  src={`http://localhost:8080/uploads/${product.imageUrl}`} // Đường dẫn ảnh sản phẩm
                  alt={product.medicineName}
                  style={{
                    width: '100%', // Chiếm toàn bộ chiều rộng của cột ảnh
                    maxWidth: '400px', // Giới hạn chiều rộng tối đa cho ảnh
                    height: 'auto',
                    maxHeight: '400px', // Giới hạn chiều cao tối đa
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              {/* Cột chứa mô tả sản phẩm */}
              <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h4" sx={{ marginBottom: 1 }}>
                  {product.medicineName}
                </Typography>
                <Typography variant="body1">Giá: {product.price.toLocaleString('vi-VN')}đ/ vỉ</Typography>
                <Typography variant="body1">Số lượng có sẵn: {product.quantity} hộp</Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>Mô tả: {product.description}</Typography>

                <TextField
                  label="Số lượng"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const inputQuantity = Math.max(1, Math.min(e.target.value, product.quantity));
                    setQuantity(inputQuantity);
                  }}
                  inputProps={{ min: 1, max: product.quantity }} // Giới hạn số lượng
                  sx={{ width: '100%', marginBottom: 2 }} // TextField chiếm toàn bộ chiều rộng cột
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  sx={{ alignSelf: 'flex-start' }} // Button căn sang bên trái
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1">Sản phẩm không tìm thấy.</Typography>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
