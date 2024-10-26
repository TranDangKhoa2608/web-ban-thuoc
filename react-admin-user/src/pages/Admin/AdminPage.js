import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Dashboard from '../../components/Admin/Dashboard';
import ProductList from '../../components/Admin/ProductList';
import AddProduct from '../../components/Admin/AddProduct';
import CategoryList from '../../components/Admin/CategoryList';
import AdminOrderManagement from '../../components/Admin/AdminOrderManagement';
import OrderDetail from '../../components/Admin/OrderDetail';


function AdminPage() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar dành cho admin */}
      <Sidebar />
      {/* Các route dành riêng cho trang admin */}
      <div style={{ marginLeft: 240, padding: 20 }}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="category" element={<CategoryList />} />
        <Route path="managementOrder" element={<AdminOrderManagement />} />
        <Route path="/:orderID" element={<OrderDetail />} />
        <Route path="*" element={<div>Page Not Found</div>} /> {/* Route fallback */}
      </Routes>

      </div>
    </div>
  );
}

export default AdminPage;
