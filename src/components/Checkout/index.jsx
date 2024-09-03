import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  Pagination,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './style.scss';

import { useAuth } from '../../context/AuthContext';

import AddressSection from './AddressSection';


const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, selectedAddress, profile, orderSummary } = location.state || {};
  const { userId, updateCartItemCount } = useAuth();
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const itemsPerPage = 5;

  useEffect(() => {
    document.body.style.backgroundColor = '#B9D514';
    return () => {
      document.body.style.backgroundColor = '';
    }
  })

  const paginatedItems = cartItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handlePayNow = async () => {
    setLoading(true);
    setSnackbarOpen(false); // Close any previous snackbar

    const orderData = {
      user: userId,
      cartItems: cartItems.map(item => ({
        name: item.cartProducts.name,
        product: item.productId,
        quantity: item.quantity,
        price: item.cartProducts.price
      })),
      address: {
        address: selectedAddress.address,
        pincode: selectedAddress.pincode,
        country: selectedAddress.country,
        state: selectedAddress.state,
        city: selectedAddress.city
      },
      paymentMethod: paymentMethod,
      orderSummary: {
        subTotal: orderSummary.subTotal,
        discount: orderSummary.discount,
        shipping: orderSummary.shipping,
        total: orderSummary.total
      }
    };
    console.log(orderData);
    console.log('here', cartItems[0].productId
    );
    try {
      const response = await fetch('https://maalana-backend.onrender.com/api/create-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      if (response.ok) {
        setSnackbarMessage('Order placed successfully!');
        setSnackbarSeverity('success');
        // Handle success (e.g., redirect to order confirmation page)
        console.log('Order placed successfully:', result);
        // Navigate to OrderPlaceSuccess page
        navigate('/order-success', { state: { result } });
        updateCartItemCount(0);
      } else {
        setSnackbarMessage('Order placement failed!');
        setSnackbarSeverity('error');
        // Handle error
        console.error('Order placement failed:', result);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred while placing the order!');
      setSnackbarSeverity('error');
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
      setSnackbarOpen(true); // Show snackbar after request completes
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };


  console.log(paginatedItems);
  return (
    <Box className="checkout-container">
      {/* Payment Section */}
      <Box className="payment-section">
        <Box>
          <IconButton className="back-button" onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className="section-title">
            PAYMENT OPTION
          </Typography>
        </Box>
        {/* Address Section */}
        <AddressSection profile={profile} selectedAddress={selectedAddress} />

        {/* Payment Method Section */}
        <Typography variant="subtitle1" className="sub-title">
          Payment Method
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup>
            <FormControlLabel
              value="razorpay"
              control={<Radio />}
              label="Razorpay"
              onChange={handlePaymentMethodChange}
              sx={{
                '& .MuiTypography-root': {
                  backgroundColor: '#fff',
                  padding: '10px 60px 8px 50px',
                  fontSize: '23px',
                  borderRadius: '8px',
                },
              }}
            />
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label="Cash on Delivery"
              onChange={handlePaymentMethodChange}
              sx={{
                '& .MuiTypography-root': {
                  backgroundColor: '#fff',
                  padding: '10px 60px 8px 50px',
                  fontSize: '23px',
                  borderRadius: '8px',
                  marginTop: '10px',
                },
              }}
            />
          </RadioGroup>
        </FormControl>

        {/* Pay Now Button */}
        <Button
          variant="contained"
          color="primary"
          className="pay-now-button"
          onClick={handlePayNow}
          disabled={loading} // Disable button while loading
        >
          {loading ? <CircularProgress size={24} /> : 'PAY NOW'}
        </Button>
      </Box>

      {/* Product List and Order Summary Section */}
      <Box className="product-list-section">
        <List>
          {paginatedItems.map((product, index) => (
            <React.Fragment key={product._id}>
              <ListItem
                secondaryAction={
                  // <IconButton edge="end" aria-label="delete">
                  //   <DeleteIcon />
                  // </IconButton>
                  <>
                    <Typography variant="body1">₹{product.cartProducts.price || 0}.00</Typography>
                    <Typography variant="body1">Quantity: {product.quantity}</Typography>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar src={product.cartProducts.images.mainImage} alt={product.cartProducts.name} />
                </ListItemAvatar>
                <ListItemText primary={product.cartProducts.name} secondary={product.price}   />
                {/* <Typography variant="body1">₹{product.cartProducts.price || 0}.00</Typography> */}
              </ListItem>
              {index < cartItems.length - 1 && <Divider variant="inset" component="li" sx={{ marginLeft: 0 }} />}
            </React.Fragment>
          ))}
        </List>
        {/* Pagination */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '10px'
          }}
        >
          <Pagination
            count={Math.ceil(cartItems.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ marginTop: 2 }}
          />
        </div>

        {/* Order Summary */}
        <Box className="order-summary">
          <Box className="shipping-box">
            <Typography variant="body1">SUB TOTAL:</Typography>
            <Typography variant="body1">₹{orderSummary.subTotal || 0}.00</Typography>
          </Box>
          <Box className="shipping-box">
            <Typography variant="body1">DISCOUNT:</Typography>
            <Typography variant="body1">₹{orderSummary.discount || 0}.00</Typography>
          </Box>
          <Box className="shipping-box">
            <Typography variant="body1">SHIPPING:</Typography>
            <Typography variant="body1">{orderSummary.shipping || 'Free'}</Typography>
          </Box>
          <Divider className="summary-divider" />
          <Box className="total-amount-box">
            <Typography variant="h6" className="total-amount">TOTAL:</Typography>
            <Typography variant="h6" className="total-amount">₹{orderSummary.total}.00</Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Checkout;
