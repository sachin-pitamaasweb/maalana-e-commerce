import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './style.scss';
import { useAuth } from '../../context/AuthContext';
import AddressSection from './AddressSection';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, selectedAddress, profile, orderSummary } = location.state || {};
  const { userId, updateCartItemCount } = useAuth();

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
    };
  }, []);

  const paginatedItems = cartItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Function to handle Razorpay payment
  const handleRazorpayPayment = async (orderData) => {
    try {
      // Load Razorpay script dynamically if not already present
      const isScriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      if (!isScriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      // Create Razorpay order using API call
      const response = await fetch('http://localhost:8000/api/create-order-online', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log('response', result);
      if (response.ok) {
        const { amount, id: order_id, currency, razorpayOrderId } = result;
        console.log('razorpayOrderId', razorpayOrderId);
        const options = {
          key: 'rzp_test_mQ80OF7C7GfnTU',
          amount: amount,
          currency: currency,
          name: 'Maalana',
          description: 'Test Transaction',
          order_id: order_id,
          handler: async (response) => {
            // Call your server to save the transaction
            console.log("Complete Razorpay Response: ", response);
            console.log("Razorpay Payment ID:", response.razorpay_payment_id);
            console.log("Razorpay Order ID:", razorpayOrderId);
            console.log("Razorpay Signature:", response.razorpay_signature);
            console.log(response);
            const paymentData = {
              user: orderData.user,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: razorpayOrderId,
              razorpay_signature: response.razorpay_signature,
              cartItems: orderData.cartItems,
              address: orderData.address,
              paymentMethod: 'razorpay',
              orderSummary: orderData.orderSummary,
            };

            const paymentResult = await fetch('http://localhost:8000/api/payment-verification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentData),
            });
            console.log('paymentResult', paymentResult);
            if (paymentResult.ok) {
              setSnackbarMessage('Order placed successfully!');
              setSnackbarSeverity('success');
              navigate('/order-success', { state: { result: paymentData } });
              updateCartItemCount(0);
            } else {
              setSnackbarMessage('Payment verification failed!');
              setSnackbarSeverity('error');
            }
          },
          prefill: {
            name: profile.name,
            email: profile.email,
            contact: selectedAddress.phone,
          },
          notes: {
            address: selectedAddress.address,
          },
          theme: {
            color: '#3399cc',
          },
        };

        // Check if Razorpay is available globally
        if (!window.Razorpay) {
          throw new Error('Razorpay SDK not available.');
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error('Razorpay order creation failed');
      }
    } catch (error) {
      setSnackbarMessage('An error occurred during Razorpay payment!');
      setSnackbarSeverity('error');
      console.error('Razorpay Payment Error:', error);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handlePayNow = async () => {
    setLoading(true);
    setSnackbarOpen(false); // Close any previous snackbar

    const orderData = {
      user: userId,
      cartItems: cartItems.map(item => ({
        name: item.cartProducts.name,
        image: item.cartProducts.images.mainImage,
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

    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment(orderData);
    } else {
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
          navigate('/order-success', { state: { result } });
          updateCartItemCount(0);
        } else {
          setSnackbarMessage('Order place failed!');
          setSnackbarSeverity('error');
          console.error('Order place failed:', result);
        }
      } catch (error) {
        setSnackbarMessage('An error occurred while placing the order!');
        setSnackbarSeverity('error');
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
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
      <Helmet>
        <title>Maalana-Checkout</title>
      </Helmet>
      <Box className="payment-section">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton className="back-button" onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className="section-title">PAYMENT OPTION</Typography>
        </Box>
        <AddressSection profile={profile} selectedAddress={selectedAddress} />
        <Typography variant="subtitle1" className="sub-title">Payment Method</Typography>
        <FormControl component="fieldset">
          <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
            <FormControlLabel
              value="razorpay"
              control={<Radio />}
              label="Razorpay"
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
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: 'capitalize' }}
          className="pay-now-button"
          onClick={handlePayNow}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : (paymentMethod === 'cod' ? 'Place Order' : 'PAY NOW')}
        </Button>
      </Box>
      <Box className="product-list-section">
        <List>
          {paginatedItems.map((product, index) => (
            <React.Fragment key={product._id}>
              <ListItem secondaryAction={<><Typography variant="body1">₹{product.cartProducts.price || 0}.00</Typography><Typography variant="body1">Quantity: {product.quantity}</Typography></>} >
                <ListItemAvatar>
                  <Avatar src={product.cartProducts.images.mainImage} alt={product.cartProducts.name} />
                </ListItemAvatar>
                <ListItemText primary={product.cartProducts.name} secondary={product.price} />
              </ListItem>
              {index < cartItems.length - 1 && <Divider variant="inset" component="li" sx={{ marginLeft: 0 }} />}
            </React.Fragment>
          ))}
        </List>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
          <Pagination count={Math.ceil(cartItems.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" sx={{ marginTop: 2 }} />
        </div>
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Checkout;
