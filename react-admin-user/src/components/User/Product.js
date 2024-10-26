// components/Product.js

import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Container
} from '@mui/material';
import { MedicinesService } from '../../services/MedicinesService'; 
import { Link } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await MedicinesService.fetchMedicines(); 
        setProducts(data); 
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); 

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredProducts = products.filter(product => 
    product.medicineName && typeof product.medicineName === 'string' && product.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 , textAlign: 'center'}}>
       <Container>
       <br></br>

      <h3 className='text-center'>SẢN PHẨM NỔI BẬC</h3>
       <TextField
        label="Tìm kiếm sản phẩm"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)} 
        sx={{ marginBottom: 2 }}
      />

      <Grid container spacing={2}>
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.medicineID}>
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6"><strong>{product.medicineName}</strong></Typography>
                <Typography variant="body2">Giá: {product.price.toLocaleString('vi-VN')}đ</Typography>
                <Typography variant="body2">Số lượng: {product.quantity}</Typography>
                <Typography variant="body2">Mô tả: {product.description}</Typography>
                <img
                  src={`http://localhost:8080/uploads/${product.imageUrl}`} 
                  alt={product.medicineName}
                  width="200" 
                  height="200"
                  
                  style={{ borderRadius: '10px' }} 
                />
                <br></br>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 10 }}
                  component={Link}
                  to={`/user/product/${product.medicineID}`} 
                >
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
       </Container>
     
    </Box>
  );
};

export default Product;
