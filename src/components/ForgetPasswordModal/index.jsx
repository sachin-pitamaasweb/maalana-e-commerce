import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button, Divider, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import styles from './ForgetPasswordModal.module.scss';

const ForgetPasswordModal = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState(''); // State to store the new password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [otpMode, setOtpMode] = useState(false); // State to track OTP mode
    const [resetPasswordMode, setResetPasswordMode] = useState(false); // State to track Reset Password mode


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/api/new-forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                setOtpMode(true); // Switch to OTP mode

            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        console.log(typeof otp);
        setLoading(true);
        setError('');
        try {
            // Ensure otp is converted to a number
            const otpNumber = Number(otp);
            console.log(typeof otpNumber);
            const response = await fetch('http://localhost:8000/api/otp-verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp: otpNumber }),
            });
            const data = await response.json();
            if (data.success) {
                setResetPasswordMode(true); // Switch to Reset Password mode
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPasswordSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/api/reset-password-with-otp', {  // Assuming there's an endpoint for password reset
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            });
            const data = await response.json();
            if (data.success) {
                setError('Password reset successfully. You can now log in with your new password.');
                handleClose(); // Close the modal after a successful password reset
            } else {
                setError(data.message || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={styles.modalBox}>
                <Typography variant="h6" className={styles.modalTitle}>
                    {resetPasswordMode ? 'Reset Password' : otpMode ? 'Enter OTP' : 'Forget Password'}
                </Typography>
                <Typography variant='subtitle2' className={styles.modalSubTitle}>
                    {resetPasswordMode ? "Enter your new password" : otpMode ? "Enter the OTP sent to your email address" : "No worries, it happens! Just enter your email address below, and we'll send you an OTP to reset your password."}
                </Typography>
                {resetPasswordMode ? (
                    <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={Boolean(error)}
                            className={styles.modalInput}
                            helperText={error}
                            fullWidth={true}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                ) : otpMode ? (
                    <TextField
                        label="OTP"
                        variant="outlined"
                        fullWidth
                        className={styles.modalInput}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        error={Boolean(error)}
                        helperText={error}
                    />
                ) : (
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        className={styles.modalInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                    />
                )}
                <Box mt={2} display="flex" justifyContent="center">
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: loading || (!email && !otp && !newPassword) ? 'gray' : '#B9D514',
                            ":hover": {
                                backgroundColor: loading || (!email && !otp && !newPassword) ? 'gray' : '#B9D514',
                            },
                            color: loading || (!email && !otp && !newPassword) ? 'white' : 'black',
                            fontSize: '13px',
                        }}
                        onClick={resetPasswordMode ? handleResetPasswordSubmit : otpMode ? handleOtpSubmit : handleEmailSubmit}
                        disabled={loading || (!email && !otp && !newPassword)}
                        className={styles.modalButton}
                    >
                        {loading ? 'Processing...' : resetPasswordMode ? 'Reset Password' : otpMode ? 'Verify OTP' : 'Send OTP'}
                    </Button>
                </Box>
                {!resetPasswordMode && !otpMode && (
                    <Box mt={2} display="flex" justifyContent="center">
                        <Typography variant="subtitle2" className={styles.loginLink}>
                            Remembered your password? <Link to='/login' style={{ color: '#647500' }}>Log In</Link>
                        </Typography>
                    </Box>
                )}
                <Divider sx={{ my: 2 }} />
                <Box mt={2} display="flex" justifyContent="center">
                    <Typography variant="h6" className={styles.emailText}>
                        {resetPasswordMode ? "Enter your new password." : otpMode ? "Enter the OTP sent to your email." : "Check Your Email Inbox!"}
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default ForgetPasswordModal;
