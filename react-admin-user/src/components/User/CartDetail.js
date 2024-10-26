import React, { useEffect, useState } from 'react';
import { CartService } from '../../services/CartService';
import { Checkbox, Button, Grid, Card, CardContent, Typography, Box, FormControlLabel, TextField, IconButton, Container, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from '../../components/User/Footer';
import { MedicinesService } from '../../services/MedicinesService';

const CartDetail = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0); // State for total price

    
    const userID = localStorage.getItem('userID');
    const userName = localStorage.getItem('username');

    useEffect(() => {
        const fetchCart = async () => {
          if (!userID) {
            setError('User ID is not available.');
            return;
          }
    
          try {
            const data = await CartService.getCartByUserID(userID);
            setCartItems(data);
    
            // Fetch detailed information about each product in the cart
            const productDetailsMap = {};
            await Promise.all(data.map(async (item) => {
              const productDetail = await MedicinesService.fetchMedicineById(item.medicineID);
              productDetailsMap[item.medicineID] = productDetail;
            }));
            setProductDetails(productDetailsMap);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchCart();
      }, [userID]);
    
      // Calculate total price based on selected items
      useEffect(() => {
        const calculateTotalPrice = () => {
          let total = 0;
          selectedItems.forEach((cartID) => {
            const item = cartItems.find((item) => item.cartID === cartID);
            if (item) {
              total += item.totalPrice; // Add the price of each selected item
            }
          });
          setTotalPrice(total);
        };
    
        calculateTotalPrice();
      }, [selectedItems, cartItems]);

    const handleQuantityChange = async (cartID, quantity) => {
        if (quantity < 1) return; // Prevent negative quantities
        try {
            const updatedCart = await CartService.updateCartQuantity(cartID, quantity);
            setCartItems((prevItems) =>
                prevItems.map((item) => (item.cartID === cartID ? updatedCart : item))
            );
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (cartID) => {
        try {
            await CartService.deleteCartItem(cartID);
            setCartItems((prevItems) => prevItems.filter((item) => item.cartID !== cartID));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSelectItem = (cartID) => {
        setSelectedItems((prev) => 
            prev.includes(cartID) ? prev.filter(id => id !== cartID) : [...prev, cartID]
        );
    };

    const handleCheckout = () => {
        const selectedProducts = cartItems.filter(item => selectedItems.includes(item.cartID));
        navigate('/user/orderform', { state: { selectedProducts } });
    };

    if (error)
    return (
    
     <Box sx={{ mt: 4 , textAlign: 'center'}}>
        <Navbar />
            <Container>
                        <Typography color="primary" variant="h4" >
                            <br></br>

                            <h3 className='text-center'> Mời bạn đăng nhập để xem giỏ hàng </h3>
                            <ListItem component={Link} to="/user/login" button>
                                <ListItemText primary="ĐĂNG NHẬP" sx={{ color: 'black', fontWeight: 'bold', background: '#f9f9f9', textAlign: 'center' }} />
                            </ListItem>
                        </Typography>;
                    </Container>
                    <Footer/>
            </Box>
        )
    return (
      
        <Box sx={{ mt: 4, textAlign: 'center' }}>
            
            <Navbar />
            <Container>
            <br></br>
            <br></br>
            <Typography variant="h4" gutterBottom>Giỏ hàng của bạn, {userName}</Typography>
            {cartItems.length === 0 ? (
                <Typography variant="body1" color="textSecondary">Giỏ hàng của bạn đang trống.
                 <img src="https://lh3.googleusercontent.com/proxy/r2ZmH3n7BVrdBUnvdzcdTL0f52a4rlZQKsAU6W83qSOFIAy8S414HGlrgqwDHBRnBM7WRAIRjeaY9QIOLoODJWzM" width="1000" height="500" alt="" />
                </Typography>
                
            ) : (
                <Grid container spacing={2}>
                    {cartItems.map((item) => (
                        <Grid item xs={12} key={item.cartID}>
                            <Card variant="outlined">
                            <CardContent key={item.cartID}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={1}>
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            checked={selectedItems.includes(item.cartID)}
                                            onChange={() => handleSelectItem(item.cartID)}
                                        />
                                        }
                                    />
                                    </Grid>

                                    <Grid item xs={4}>
                                    <Box display="flex" alignItems="center">
                                        {/* Hiển thị ảnh thuốc */}
                                        {productDetails[item.medicineID] && (
                                        <>
                                            <img
                                            src={`http://localhost:8080/uploads/${productDetails[item.medicineID].imageUrl}`}
                                            alt={productDetails[item.medicineID].medicineName}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                marginRight: '10px',
                                            }}
                                            />
                                            <Box>
                                            <Typography variant="h6">
                                                {productDetails[item.medicineID].medicineName}
                                            </Typography>
                                            <Typography variant="body2">Mã giỏ hàng: {item.cartID}</Typography>
                                            </Box>
                                        </>
                                        )}
                                    </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                    <Typography variant="body2">
                                        Giá: {item.totalPrice.toLocaleString()} VNĐ
                                    </Typography>
                                    </Grid>

                                    <Grid item xs={3} display="flex" alignItems="center">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleQuantityChange(item.cartID, Math.max(item.quantity - 1, 1))} // giảm số lượng
                                            disabled={item.quantity <= 1} 
                                        >
                                            -
                                        </Button>
                                        <TextField
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.cartID, parseInt(e.target.value))}
                                            inputProps={{ min: 1 }}
                                            sx={{ width: '60px', mx: 1 }} 
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleQuantityChange(item.cartID, item.quantity + 1)} 
                                        >
                                            +
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                    <IconButton color="error" onClick={() => handleDelete(item.cartID)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    </Grid>
                                </Grid>
                                </CardContent>

                            </Card>
                        </Grid>
                    ))}
                    {/* Hiển thị tổng tiền */}
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6"  color="primary">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</Typography>
                    </Box>
                </Grid>
            )}
            {cartItems.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckout}
                        disabled={selectedItems.length === 0}
                        fullWidth
                    >
                        Đặt hàng
                    </Button>
                </Box>
            )}
            </Container>
            <br></br>
            <br></br>
          <Footer/>

        </Box>
        
    );
};

export default CartDetail;
