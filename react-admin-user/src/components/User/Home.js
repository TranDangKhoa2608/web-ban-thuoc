import React from 'react';
import { Box, Typography,Container } from '@mui/material';
import Product from './Product';
import Navbar from './Navbar';

import Footer from '../../components/User/Footer';



const Home = () => {
  return (
    <Box sx={{ mt: 2 , textAlign: 'center'}}>
      <Navbar />
      <Container>
      <Typography variant="h4" gutterBottom>
      <br></br>

      <h3 className='text-center'>TRANG CHỦ BÁN THUỐC</h3>
      
      <img src="https://tamanhhospital.vn/wp-content/uploads/2023/10/panadol-extra.jpg" width="1000" height="500" alt="" />
        
        <Product />
      </Typography>
     
      {/* Thêm nội dung khác hoặc thành phần khác nếu cần */}
      </Container>

      <Footer />
    </Box>
  );
  
};


export default Home;
