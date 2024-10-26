import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';

function AddProduct() {
  const [product, setProduct] = useState({ name: '', price: '', stock: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    // Xử lý khi thêm sản phẩm
    console.log(product);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>QUẢN LÝ SẢN PHẨM</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      
      <Grid item xs={3}>
        <TextField
          label="Stock"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Product
        </Button>
      </Grid>

    </Grid>
  );
}

export default AddProduct;
