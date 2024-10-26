import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'white',
        mt: 4,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Thông tin về cửa hàng */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Về Chúng Tôi
          </Typography>
          <Typography variant="body2">
            Trang web bán thuốc trực tuyến cung cấp các sản phẩm chất lượng cao, uy tín, và đảm bảo an toàn cho sức khỏe người tiêu dùng. Chúng tôi cam kết dịch vụ khách hàng tốt nhất.
          </Typography>
        </Grid>

        {/* Dịch vụ khách hàng */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Dịch Vụ Khách Hàng
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Liên hệ
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Câu hỏi thường gặp
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Chính sách hoàn trả
            </Link>
          </Typography>
        </Grid>

        {/* Thông tin pháp lý */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Thông Tin Pháp Lý
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Điều khoản sử dụng
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Chính sách bảo mật
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Quy định về bán hàng
            </Link>
          </Typography>
        </Grid>

        {/* Mạng xã hội */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Theo Dõi Chúng Tôi
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Facebook
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Instagram
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Twitter
            </Link>
          </Typography>
        </Grid>
      </Grid>
      
      {/* Bản quyền */}
      <Box textAlign="center" pt={4}>
        <Typography variant="body2">
          © {new Date().getFullYear()} ThuocOnline. All rights reserved. | Địa chỉ: 123 Đường Sức Khỏe, Quận 10, TP. HCM | Hotline: 1800-123-456
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
