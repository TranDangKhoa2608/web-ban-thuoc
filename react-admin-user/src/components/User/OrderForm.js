
// export default OrderForm;
import React, {useMemo, useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Card, CardContent, Avatar, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation } from 'react-router-dom'; // Import useLocation to get passed data
import { OrderDetailService } from '../../services/OrderDetaiService'; // Assuming this is the API service
import Navbar from './Navbar';
import Footer from '../../components/User/Footer';
const OrderForm = () => {
    const location = useLocation();
    const selectedItems = useMemo(() => location.state?.selectedProducts || [], [location.state?.selectedProducts]);
    const [userID,setUserID] = useState('');
    const [fullName, setFullName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [totalPrice, setTotalPrice] = useState(0); // Total price calculation
    const [address, setAddress] = useState(''); // Address for delivery
    const [error, setError] = useState(''); // Error handling

    useEffect(() => {
        // Retrieve user information from localStorage
        setFullName(localStorage.getItem('fullName') || '');
        setUserEmail(localStorage.getItem('userEmail') || '');
        setUserID(localStorage.getItem('userID') || '');
        

        // Calculate total price based on selected items
        const calculateTotal = (items) => {
            const total = items.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
            setTotalPrice(total);
        };

        if (selectedItems.length > 0) {
            calculateTotal(selectedItems);
        }
    }, [selectedItems]);

    const handlePlaceOrder = async () => {
        if (address === '') {
            setError('Vui lòng nhập địa chỉ nhận hàng.');
            return;
        }

        const orderRequest = {
            userID: localStorage.getItem('userID'), // Fetch userID from localStorage
            paymentID:1, // Cash on delivery
            totalPrice,
           
            items: selectedItems.map(item => ({
                medicineID: item.medicineID,
                quantity: item.quantity,
                price: item.totalPrice
            }))
        };

        try {
            const response = await OrderDetailService.addOrder(orderRequest);
            console.log('Đơn hàng thành công:', response);
            alert(`Đặt hàng thành công!`); 
            window.location.href = '/user/order-history'; // Adjust the route as needed
        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
            setError('Không thể xử lý đơn hàng. Vui lòng thử lại.');
        }
    };

    return (
        <Box sx={{ mt:2, flexDirection: 'column', alignItems: 'center' }}>
        <Navbar/>
        <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
           
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <ShoppingCartIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
                    Thanh toán khi nhận hàng
                </Typography>

                {/* Display User Information */}
                <Box sx={{ mt: 3, width: '100%' }}>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6">Thông tin người dùng</Typography>
                            <Divider sx={{ my: 1 }} />
                           
                            <Typography sx={{ display: 'none'}}>Tên: {userID }</Typography>
                            <Typography>Họ và tên: {fullName}</Typography>
                            <Typography>Địa chỉ mail: {userEmail}</Typography>
                        </CardContent>
                    </Card>

                    {selectedItems.length > 0 ? (
                        <Grid container spacing={2}>
                            {selectedItems.map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <CardContent>
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Typography>Mã thuốc: {item.medicineID}</Typography>
                                            <Typography>Số lượng: {item.quantity}</Typography>
                                        </CardContent>
                                        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body1">
                                                Giá: {item.totalPrice.toLocaleString()} VND
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography>Giỏ hàng của bạn trống.</Typography>
                    )}
                    <Divider sx={{ my: 3 }} />

                    {/* Address Field */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Địa chỉ nhận hàng"
                        name="address"
                        autoComplete="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    {/* Display Total Price */}
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Tổng giá: {totalPrice.toLocaleString()} VND
                    </Typography>

                    {/* Error Message */}
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}

                    {/* Place Order Button */}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handlePlaceOrder}
                        sx={{ py: 1.5, fontSize: '1rem' }}
                    >
                        Đặt hàng
                        <br></br>
                    </Button>
                </Box>
                <br></br>
          
        </Container>
        <Footer></Footer>
        </Box>
    );
};

export default OrderForm;
