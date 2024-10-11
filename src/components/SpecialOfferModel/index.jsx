import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, Box, Typography, Button, TextField, Link } from '@mui/material';
import './style.css';  // Import simple CSS

const SpecialOfferModel = ({ open, handleClose }) => {

  const [isLaunching, setIsLaunching] = useState(false);  // State to trigger the rocket launch
  const [email, setEmail] = useState('');  // State to handle email input
  const [error, setError] = useState('');  // State for handling validation error
  const [loading, setLoading] = useState(false);  // State for handling loading state

  const handleButtonClick = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');  // Set error if email is empty
      return;  // Do not proceed if the email is not provided
    } 

    setError('');  // Clear any existing error if email is provided
    setLoading(true);  // Set loading state to true
    setIsLaunching(false);  // Set rocket to ready state but don't launch yet

    try {
      // Make HTTP POST request to generate coupon
      await axios.post('https://maalana.ritaz.in/api/generate-coupon', {
        email,
        discount: 10
      });

      // Simulate an action and launch the rocket after loading is done
      setTimeout(() => {
        setIsLaunching(true);  // Trigger rocket launch after successful submission
        setLoading(false);  // Reset loading state after the request is successful

        // Close the dialog after 3 more seconds (after the rocket animation)
        setTimeout(() => {
          handleClose();
          setIsLaunching(false);  // Reset rocket state after closing
        }, 3000);
      }, 2000);  // Delay for showing loading state
    } catch (error) {
      console.error('Error generating coupon:', error);
      setError( error.response.data.message ||'Failed to generate coupon. Please try again later.');
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" className="special-offer-dialog">
      <DialogTitle>
        <Box className="dialog-header">
          <img
            src={require('../../assets/offer/rocket.png')}  // Dummy image for the rocket
            alt="Rocket"
            className={`top-left-image ${loading ? 'rocket-ready' : isLaunching ? 'rocket-launch' : ''}`}  // Different class for ready and launch states
          />
          <img
            src={require('../../assets/logo/logo-1.png')}  // Dummy logo image
            alt="Logo"
            className="top-right-logo"
          />
        </Box>
      </DialogTitle>
      <DialogContent className="special-offer-content">
        <Box className="special-offer-text">
          <Typography variant="body1" gutterBottom>
            🚀 SPECIAL OFFER JUST FOR YOU! 🎉
          </Typography>
          <Typography variant="h4" gutterBottom>
            Get <strong>10% OFF</strong> on your first order!
          </Typography>
          <Typography variant="body2" gutterBottom>
            🔸 On a minimum order of ₹499 🔸
          </Typography>

          {/* Email Input Field */}
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Email Address"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Update email state on input change
            error={!!error}  // Show error state if error exists
            helperText={error}  // Display error message if any
            className="email-input"
          />

          {/* Call-to-action Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="offer-button"
            onClick={handleButtonClick}  // Trigger the launch on button click
          >
            {loading ? 'LOADING...' : 'SEND ME THE DEAL!'}
          </Button>

          {/* Opt-out Link */}
          <Link className="opt-out-link" onClick={handleClose}>
            No Thanks, I Don't Like Discounts
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialOfferModel;
