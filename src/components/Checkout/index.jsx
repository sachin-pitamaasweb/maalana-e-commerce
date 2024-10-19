import React, { useState } from 'react';
import {
  TextField,
  Card,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Pagination,
  Box,
  Divider,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiscountIcon from '@mui/icons-material/Discount';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { ArrowBack } from '@mui/icons-material';
import './style.css';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], selectedAddress = {}, profile = {}, orderSummary = {} } = location.state || {};
  const { userId, updateCartItemCount } = useAuth();

  // Define state for payment method and other states
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // Payment method state
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const itemsPerPage = 3;

  const paginatedItems = cartItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  console.log('profile', profile);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (orderData) => {
    try {
      const isScriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!isScriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      const response = await fetch('https://maalana-backend.onrender.com/api/create-order-online', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        const { amount, id: order_id, currency, razorpayOrderId } = result;
        const options = {
          key: 'rzp_test_mQ80OF7C7GfnTU',
          amount: amount,
          currency: currency,
          name: 'Maalana',
          description: 'Test Transaction',
          order_id: order_id,
          handler: async (response) => {
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

            const paymentResult = await fetch('https://maalana-backend.onrender.com/api/payment-verification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentData),
            });

            if (paymentResult.ok) {
              setSnackbarMessage('Order placed successfully!');
              setSnackbarSeverity('success');
              navigate('/order-success', { state: { result: result } });
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

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error('Razorpay order creation failed');
      }
    } catch (error) {
      setSnackbarMessage('An error occurred during Razorpay payment!');
      setSnackbarSeverity('error');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handlePayNow = async () => {
    setLoading(true);
    setSnackbarOpen(false);

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
          setSnackbarMessage('Order placement failed!');
          setSnackbarSeverity('error');
        }
      } catch (error) {
        setSnackbarMessage('An error occurred while placing the order!');
        setSnackbarSeverity('error');
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
    <Box className="checkout-container animated-fade-in">
      <Card className="checkout-card">
        <Box className="checkout-header animated-slide-in">
          <Button
            className="back-button"
            variant="outlined"
            style={{ borderColor: '#000', color: '#000' }}
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </Button>
          <h1 className="checkout-title">Checkout</h1>
        </Box>

        <Box className="checkout-content">
          <Box className="shipping-section animated-slide-in">
            <h2 className="section-title">Shipping Address</h2>
            <form className="shipping-form">
              <InputField placeholder="First Name" name="firstName" defaultValue={profile.firstName} disabled={true} />
              <InputField placeholder="Last Name" name="lastName" defaultValue={profile.lastName} />
              <InputField placeholder="Phone Number" name="phone" defaultValue={profile.phone} className="full-width" />
              <InputField placeholder="Email Address" name="email" defaultValue={profile.email} type="email" className="full-width" />
              <InputField placeholder="Address" name="address" defaultValue={selectedAddress.address} className="full-width" />
              <InputField placeholder="Pincode" name="pincode" defaultValue={selectedAddress.pincode} />
              <InputField placeholder="Country" name="country" defaultValue={selectedAddress.country} />
              <InputField placeholder="State" name="state" defaultValue={selectedAddress.state} />
              <InputField placeholder="City" name="city" defaultValue={selectedAddress.city} />
            </form>
          </Box>

          <Box className="order-summary-section animated-slide-in">
            <h2 className="section-title">Order Summary</h2>
            <OrderSummary handlePlaceOrder={handlePayNow} loading={loading} paginatedItems={paginatedItems} orderSummary={orderSummary} paymentMethod={paymentMethod} handlePaymentMethodChange={handlePaymentMethodChange} />
          </Box>
        </Box>

        {paginatedItems.length > 0 && <Box className="pagination-container animated-slide-in">
          <Pagination count={Math.ceil(cartItems.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
        </Box>}
      </Card>
    </Box>
  );
}

function InputField({ placeholder, name, defaultValue = '', type = 'text', className = '' }) {
  return (
    <Box className={`input-field ${className}`}>
      <TextField
        placeholder={placeholder}
        name={name}
        type={type}
        defaultValue={defaultValue}
        fullWidth
        variant="outlined"
        margin="normal"
        disabled
      />
    </Box>
  );
}

function OrderSummary({ handlePlaceOrder, loading, paginatedItems, orderSummary, paymentMethod, handlePaymentMethodChange }) {

  return (
    <>
      {paginatedItems.length === 0 ? (
        // When there are no items, show a message or empty state component
        <Box className="order-item animated-fade-in">
          <h3>No items in the cart</h3>
        </Box>
      ) : (
        // When there are items, render them
        <>
          {paginatedItems.map((item, index) => (
            <Box key={index} className="order-item animated-fade-in">
              {/* <div className="item-image-placeholder"></div> */}
              <img src={item.cartProducts.images.mainImage || 'https://placehold.it/200x200'} alt={item.name} className="item-image-placeholder" />
              <Box className="item-details-checkout">
                <h3 className="item-title">{item.cartProducts.name}</h3> {/* Use item name dynamically */}
                <p className="item-quantity">Quantity: {item.quantity}</p> {/* Use item quantity dynamically */}
              </Box>
              <p className="item-price">₹{item.cartProducts.price}</p>
            </Box>
          ))}
        </>
      )}
      <Divider style={{ margin: '16px 0' }} />
      <Box className="order-summary animated-fade-in">
        <Box className="order-row" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          <MonetizationOnIcon style={{ marginRight: 8 }} />
          <span>Subtotal</span>
          <span>{orderSummary.subTotal ? '₹' + orderSummary.subTotal : '₹0.00'}</span>
        </Box>
        <Divider style={{ margin: '8px 0' }} />
        <Box className="order-row" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          <DiscountIcon style={{ marginRight: 8 }} />
          <span>Discount</span>
          <span>{orderSummary.discount ? '₹' + orderSummary.discount : '₹0.00'}</span>
        </Box>
        <Divider style={{ margin: '8px 0' }} />
        <Box className="order-row" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          <LocalShippingIcon style={{ marginRight: 8 }} />
          <span>Shipping</span>
          <span className="free-shipping">FREE</span>
        </Box>
        <Divider style={{ margin: '16px 0' }} />
        <Box className="order-total" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          <span>Total</span>
          <span>{orderSummary.total ? '₹' + orderSummary.total : '₹0.00'}</span>
        </Box>
      </Box>
      <Box className="payment-section animated-slide-in">
        <h3 className="payment-title">Payment Method</h3>
        <RadioGroup name="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel value="razorpay" control={<Radio />} label="Razorpay" />
          <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
        </RadioGroup>
      </Box>
      <Button
        variant="contained"
        color="primary"
        className="place-order-button animated-slide-in"
        onClick={handlePlaceOrder}
        style={{ backgroundColor: 'rgb(185, 213, 20)', color: '#000' }}
        disabled={loading || paginatedItems.length === 0}
      >
        {loading ? <CircularProgress size={24} style={{ color: '#000' }} /> : 'Place Order'}
      </Button>
    </>
  );
}
