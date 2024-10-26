import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Box, Alert } from '@mui/material';
import { UserService } from '../../services/UserService';
// import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from '../../components/User/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    address: '',
    phone: '',
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await UserService.register(formData);
      setSuccess('Registration successful!');
      // Navigate('/user/home'); 
      window.location.href = '/user/home';
      setFormData({
        fullname: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phone: '',
      });
      
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Box>
      <Navbar/>
 <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Đăng ký tài khoản
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên đăng nhập"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mật khẩu"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" type="submit">
                Đăng ký
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
    <Footer/>
    </Box>
   
  );
};

export default Register;
