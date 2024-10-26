import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom'; // Thêm import cho Routes và Route
import Navbar from '../../components/User/Navbar';
import Home from '../../components/User/Home';
import Product from '../../components/User/Product'; // Import ProductList component
import ProductDetail from '../../components/User/ProductDetail';
import Login from '../../components/User/Login';
import CartDetail from '../../components/User/CartDetail';
import Register from '../../components/User/Register';
import OrderForm from '../../components/User/OrderForm';
import OrderHistory from '../../components/User/Order-history';
import Footer from '../../components/User/Footer';

const UserPage = () => {
  return (
    <Box>
      <Navbar />
        <Routes>
          <Route path="home" index element={<Home />}/>
          <Route path="user/products" element={<Product />} /> 
          <Route path="user/product/:id" element={<ProductDetail />} />
          <Route path="user/cart/:userID" element={<CartDetail />} />
          <Route path="user/login" element={<Login/>} /> 
          <Route path="user/resgister" element={<Register/>} />
          <Route path="user/orderform" element={<OrderForm/>} />
          <Route path="/user/order-history" element={<OrderHistory />} /> {/* Sử dụng ProductList cho trang sản phẩm */}
          <Route path="*" element={<div>Page Not Found</div>} /> {/* Route fallback */}
        </Routes>
        <Footer/>
    </Box>
  );
};

export default UserPage;
