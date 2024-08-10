import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, FormControl, RadioGroup, FormControlLabel, Radio, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.scss';

const products = [
  { id: 1, name: 'Orange Fruit Katli - 250 g x 15', price: '₹150', image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Orange Fruit Katli - 250 g x 10', price: '₹150', image: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Orange Fruit Katli - 250 g x 10', price: '₹150', image: 'https://via.placeholder.com/100' },
  { id: 4, name: 'Orange Fruit Katli - 250 g x 10', price: '₹150', image: 'https://via.placeholder.com/100' },
  { id: 5, name: 'Orange Fruit Katli - 250 g x 10', price: '₹150', image: 'https://via.placeholder.com/100' },
];

const Checkout = () => {
  const subTotal = 3980;
  const discount = 302;
  const shipping = 'FREE';
  const total = subTotal - discount;

  useEffect(() => {
    document.body.style.backgroundColor = '#B9D514';
    return () => {
      document.body.style.backgroundColor = '';
    }
  })

  return (
    <Box className="checkout-container">
      {/* Payment Section */}
      <Box className="payment-section">
        <Typography variant="h6" className="section-title">
          PAYMENT OPTION
        </Typography>

        {/* Address Section */}
        <Typography variant="subtitle1" className="sub-title">
          Address:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name" variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone Number" variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address" variant="outlined" className="text-field" multiline rows={3} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Pincode" variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Country" variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="State" variant="outlined" className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="City" variant="outlined" className="text-field" />
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

        {/* Pay Now Button */}
        <Button variant="contained" color="primary" className="pay-now-button">
          PAY NOW
        </Button>

        {/* Estimated Delivery */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" className="delivery-date">
          ESTIMATED DELIVERY BY
        </Typography>
        <Typography variant="body1" className="delivery-date">
          29/AUG/2024
        </Typography>
        </Box>
      </Box>

      {/* Product List and Order Summary Section */}
      <Box className="product-list">
        <List>
          {products.map((product, index) => (
            <React.Fragment key={product.id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={product.image} alt={product.name} />
                </ListItemAvatar>
                <ListItemText primary={product.name} secondary={product.price} />
              </ListItem>
              {index < products.length - 1 && <Divider variant="inset" component="li" sx={{ marginLeft: 0 }} />}
            </React.Fragment>
          ))}
        </List>

        {/* Order Summary */}
        <Box className="order-summary">
        <Box className="shipping-box">
          <Typography variant="body1">SUB TOTAL:</Typography>
          <Typography variant="body1">₹{subTotal}.00</Typography>
          </Box>
          <Box className="shipping-box">
          <Typography variant="body1">DISCOUNT:</Typography>
          <Typography variant="body1">₹{discount}.00</Typography>
          </Box>
          <Box className="shipping-box">
            <Typography variant="body1">SHIPPING:</Typography>
            <Typography variant="body1">{shipping}</Typography>
          </Box>
          <Divider className="summary-divider" />
          <Box className="total-amount-box">
            <Typography variant="h6" className="total-amount">TOTAL:</Typography>
            <Typography variant="h6" className="total-amount">₹{total}.00</Typography>
          </Box>
          <Divider className="summary-divider" />
          <Box className="delivery-date-box">
            <Typography variant="caption" className="delivery-date">ESTIMATED DELIVERY BY</Typography>
            <Typography variant="body1" className="delivery-date">29/AUG/2024</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
