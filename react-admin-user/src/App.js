import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/Admin/AdminPage';
import UserPage from './pages/User/UserPage';
import ProductDetail from './components/User/ProductDetail';
import CartDetail from './components/User/CartDetail';
import Login from './components/User/Login';
import Register from './components/User/Register';
import OrderForm from './components/User/OrderForm';
import OrderHistory from './components/User/Order-history';
import Home from './components/User/Home';
import OrderDetail from './components/Admin/OrderDetail'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Đường dẫn dành cho admin */}
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/orders/:orderID" element={<OrderDetail />} /> 
        
        {/* Đường dẫn dành cho user */}
        <Route path="/*" element={<UserPage />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/product/:id" element={<ProductDetail />} />
        <Route path="/user/cart/:userID" element={<CartDetail />}/>
        <Route path="/user/login" element={<Login />}/>
        <Route path="/user/resgister" element={<Register/>} />
        <Route path="user/orderform" element={<OrderForm/>} />
        <Route path="/user/order-history" element={<OrderHistory />} />
      
        {/* Đường dẫn mặc định */}
        {/* <Route path="/" element={<UserPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
