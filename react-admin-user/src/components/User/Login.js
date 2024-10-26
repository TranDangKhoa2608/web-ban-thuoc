import React, { useState } from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, Container, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UserService } from '../../services/UserService'; // Nhập UserService
import { useNavigate } from 'react-router-dom'; // Để điều hướng sau khi đăng nhập
import {Link as RouterLink } from 'react-router-dom';

import Navbar from './Navbar';

import Footer from '../../components/User/Footer';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Điều hướng để chuyển trang sau khi đăng nhập thành công

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }
    try {
      // Gọi dịch vụ đăng nhập với tên đăng nhập và mật khẩu đã nhập
      const loginRequest = { username, password };
      const response = await UserService.login(loginRequest);

      // Xử lý đăng nhập thành công (ví dụ: lưu tên người dùng)
      localStorage.setItem('username', username);
      localStorage.setItem('userID',response.userID);
      localStorage.setItem('fullName',response.fullName);
      localStorage.setItem('userEmail',response.email);

      console.log('Đã lưu FullName:', response.fullName);
      console.log('Đã lưu userID:', response.userID); // Lưu tên người dùng vào localStorage
      console.log('Đăng nhập thành công:', response);

      setError(''); // Xóa thông báo lỗi trước đó nếu có

      // Điều hướng người dùng đến trang chủ sau khi đăng nhập
      navigate('/user/home'); 
    } catch (error) {
      // Xử lý thất bại khi đăng nhập
      console.error('Đăng nhập thất bại:', error);
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin và thử lại.');
    }
  };

  return (
    <Box>
    <Navbar/>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              
            </Grid>
            <Grid item>
            <Link component={RouterLink} to="/user/resgister" variant="body2">
                {"Chưa có tài khoản? Đăng ký"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    <Footer></Footer>
    </Box>

  );
};

export default Login;
