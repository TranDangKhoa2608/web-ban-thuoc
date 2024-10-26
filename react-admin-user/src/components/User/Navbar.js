import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ShoppingCart, ListAlt } from '@mui/icons-material';

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // Kiểm tra xem người dùng đã đăng nhập chưa bằng cách xem localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Xóa localStorage khi đăng xuất
    localStorage.removeItem('username');
    localStorage.removeItem('userID'); // Nếu bạn cũng muốn xóa userID
    setUsername(null);
    navigate('/user/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          My Pharmacy
        </Typography>
        <List sx={{ width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 0 }}>
          <ListItem component={Link} to="/user/home" button>
            {/* <ListItemIcon>
              <Home sx={{ color: 'white' }} />
            </ListItemIcon> */}
            <ListItemText primary="TRANG CHỦ" sx={{ color: 'white', fontWeight: 'bold' }} />
          </ListItem>
          <ListItem component={Link} to="/user/products" button>
            <ListItemText primary="THUỐC" sx={{ color: 'white', fontWeight: 'bold' }} />
          </ListItem>
          <ListItem component={Link} to={`/user/cart/${localStorage.getItem('userID')}`} button>
            <ListItemIcon>
              <ShoppingCart sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="GIỎ HÀNG" sx={{ color: 'white', fontWeight: 'bold' }} />
          </ListItem>

          {username ? (
            <>
              <ListItem>
                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                  {`Xin chào, ${username}`}
                </Typography>
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>ĐĂNG XUẤT</Typography>
              </ListItem>
            </>
          ) : (
            <ListItem component={Link} to="/user/login" button>
              <ListItemText primary="ĐĂNG NHẬP" sx={{ color: 'white', fontWeight: 'bold' }} />
            </ListItem>
          )}

          <ListItem component={Link} to="/user/order-history" button>
            <ListItemIcon>
              <ListAlt sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="LỊCH SỬ" sx={{ color: 'white', fontWeight: 'bold' }} />
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
