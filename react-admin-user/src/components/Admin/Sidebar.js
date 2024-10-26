import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Dashboard, AddBox, ListAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 30,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: 'primary.main', // Thay đổi màu nền thanh điều hướng
          color: 'white', // Thay đổi màu chữ
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon sx={{ color: 'white' }}><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" primaryTypographyProps={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/products">
          <ListItemIcon sx={{ color: 'white' }}><ListAlt /></ListItemIcon>
          <ListItemText primary="Quản lý sản phẩm" primaryTypographyProps={{ color: 'white' }} />
        </ListItem>      
        <ListItem button component={Link} to="/admin/category">
          <ListItemIcon sx={{ color: 'white' }}><AddBox /></ListItemIcon>
          <ListItemText primary="Quản lý danh mục" primaryTypographyProps={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/managementOrder">
          <ListItemIcon sx={{ color: 'white' }}><AddBox /></ListItemIcon>
          <ListItemText primary="Quản lý đơn hàng" primaryTypographyProps={{ color: 'white' }} />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
