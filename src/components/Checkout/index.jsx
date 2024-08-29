import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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


const Checkout = () => {
  const location = useLocation();
  const { cartItems, selectedAddress, profile, orderSummary } = location.state || {};
 const { userId } = useAuth();
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
        product: item.cartProducts.id,
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
    try {
      const response = await fetch('http://localhost:8000/api/orders', {
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
        <Typography variant="subtitle1" className="sub-title">
          Address:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name" value={profile?.firstName} disabled={true} variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" value={profile?.lastName} disabled={true} variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone Number" value={profile?.phone} disabled={true} variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address" value={selectedAddress?.address} disabled={true} variant="outlined" className="text-field" multiline rows={3} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Pincode" value={selectedAddress?.pincode} disabled={true} variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Country" value={selectedAddress?.country} disabled={true} variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="State" value={selectedAddress?.state} disabled={true} variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="City" value={selectedAddress?.city} disabled={true} variant="outlined" className="text-field" />
          </Grid>
        </Grid>

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
            <React.Fragment key={product.id}>
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
                  <Avatar src={product.cartProducts.images.mainImage} alt={product.name} />
                </ListItemAvatar>
                <ListItemText primary={product.cartProducts.name} secondary={product.price} />
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
