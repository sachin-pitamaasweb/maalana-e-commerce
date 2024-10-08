import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Box, Typography, Snackbar, Alert, Tooltip, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import styles from './CommonForm.module.scss';
import { validateForm } from '../../utils/validation.js';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

import ForgetPasswordModal from '../ForgetPasswordModal/index.jsx';

const CommonForm = ({ title = "" }) => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Destructure the login function from the useAuth hook
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        password: '',
        message: '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setErrors({});
        setSnackbarMessage('');
        setSnackbarSeverity('success');
        const validationErrors = validateForm(formData, title);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }
        try {
            if (title === "Sign Up") {
                const response = await fetch('https://maalana-backend.onrender.com/api/register-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        mobileNumber: formData.phoneNumber,
                        password: formData.password,
                    }),
                });
                const responseData = await response.json();
                if (responseData.success) {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('User registered successfully. Please check your email for verification.');
                    login(responseData.user._id);
                    navigate(`/profile/${responseData.user._id}`, { state: { id: responseData.user._id } });
                } else {
                    console.error('Error:', responseData);
                    setSnackbarSeverity('error');
                    setSnackbarMessage(responseData.message || 'An error occurred. Please try again later.');
                }
            } else if (title === "Login") {
                const response = await fetch('https://maalana-backend.onrender.com/api/login-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                const responseData = await response.json();
                if (responseData.success) {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Login successful!');
                    login(responseData.user._id); // Mark the user as authenticated
                    // navigate(`/profile/${responseData.user._id}`, { state: { id: responseData.user._id } });
                    navigate('/products');
                } else {
                    setSnackbarSeverity('error');
                    setSnackbarMessage('Invalid credentials. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.message || 'An error occurred. Please try again later.');
        } finally {
            setSnackbarOpen(true);
            setLoading(false);
            setFormData({
                firstName: '',
                lastName: '',
                companyName: '',
                email: '',
                phoneNumber: '',
                password: '',
                message: '',
            });
            setErrors({});
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };

    return (
        <Box className={title === "Humko join karlo!" ? styles.signupFormPartner : styles.signupContainer}>
            <Box component="form" className={styles.signupForm} onSubmit={handleSubmit}>
                <Typography variant="h2" className={styles.title}>{title}</Typography>
                {(title === "Sign Up" || title === "Humko join karlo!") && (
                    <Grid container spacing={2} className={styles.inputGroup}>
                        <Grid item xs={12} sm={6}>
                            <Tooltip
                                title={errors.firstName || ''}
                                open={Boolean(errors.firstName)}
                                placement="top"
                                arrow
                                sx={{
                                    m: 1,
                                    backgroundColor: 'red !important'
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className={`${styles.inputField} ${errors.firstName ? styles.errorInput : ''}`}
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                    maxLength={100}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Tooltip
                                title={errors.lastName || ''}
                                open={Boolean(errors.lastName)}
                                placement="top"
                                arrow
                                sx={{
                                    m: 1,
                                    backgroundColor: 'red !important'
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className={`${styles.inputField} ${errors.lastName ? styles.errorInput : ''}`}
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                    maxLength={100}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                )}
                <Grid container spacing={2}>
                    {title === "Humko join karlo!" && (
                        <Grid item xs={12} className={styles.inputGroup}>
                            <Tooltip
                                title={errors.companyName || ''}
                                open={Boolean(errors.companyName)}
                                placement="top"
                                arrow
                                sx={{
                                    m: 1,
                                    backgroundColor: 'red !important'
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Company name"
                                    className={`${styles.inputField} ${errors.companyName ? styles.errorInput : ''}`}
                                    name='companyName'
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    required
                                    maxLength={100}
                                />
                            </Tooltip>
                        </Grid>
                    )}
                    <Grid item xs={12} className={styles.inputGroup}>
                        <Tooltip
                            title={errors.email || ''}
                            open={Boolean(errors.email)}
                            placement="top"
                            arrow
                            sx={{
                                m: 1,
                                backgroundColor: 'red !important'
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={`${styles.inputField} ${errors.email ? styles.errorInput : ''}`}
                                name='email'
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                maxLength={50}
                            />
                        </Tooltip>
                    </Grid>
                    {(title === "Sign Up" || title === "Humko join karlo!") && (
                        <Grid item xs={12} className={styles.inputGroup}>
                            <Tooltip
                                title={errors.phoneNumber || ''}
                                open={Boolean(errors.phoneNumber)}
                                placement="top"
                                arrow
                                sx={{
                                    m: 1,
                                    backgroundColor: 'red !important'
                                }}
                            >
                                <input
                                    type="tel"
                                    placeholder="Phone No"
                                    className={`${styles.inputField} ${errors.phoneNumber ? styles.errorInput : ''}`}
                                    name='phoneNumber'
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    required
                                    maxLength={10}
                                />
                            </Tooltip>
                        </Grid>
                    )}
                    {(title === "Sign Up" || title === "Login") && (
                       <Grid item xs={12} className={styles.inputGroup}>
                       <Tooltip
                           title={errors.password || ''}
                           open={Boolean(errors.password)}
                           placement="top"
                           sx={{
                               m: 1,
                               backgroundColor: 'red !important'
                           }}
                           arrow
                       >
                           <div className={styles.passwordContainer}>
                               <input
                                   type={showPassword ? 'text' : 'password'}
                                   placeholder="Password"
                                   className={`${styles.inputField} ${errors.password ? styles.errorInput : ''}`}
                                   name='password'
                                   value={formData.password}
                                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                   required
                               />
                               <IconButton
                                   aria-label="toggle password visibility"
                                   onClick={handleTogglePassword}
                                   edge="end"
                                   className={styles.passwordToggle}
                               >
                                   {showPassword ? <VisibilityOff /> : <Visibility />}
                               </IconButton>
                           </div>
                       </Tooltip>
                   </Grid>
                    )}
                    {title === "Humko join karlo!" && (
                        <Grid item xs={12} className={styles.inputGroup}>
                            <Tooltip
                                title={errors.message || ''}
                                open={Boolean(errors.message)}
                                placement="top"
                                arrow
                                sx={{
                                    m: 1,
                                    backgroundColor: 'red !important'
                                }}
                            >
                                <textarea
                                    type="Text"
                                    placeholder="Message"
                                    className={`${styles.inputField} ${errors.message ? styles.errorInput : ''}`}
                                    style={{ height: "120px" }}
                                    multiline
                                    name='message'
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                />
                            </Tooltip>
                        </Grid>
                    )}
                </Grid>
                {title === "Login" &&
                    <Typography
                        className={styles.messageText}
                        sx={{
                            marginTop: "10px",
                            textAlign: "end",
                            cursor: "pointer",
                            marginRight: "30px"
                        }}
                        onClick={handleModalOpen}
                    >
                        Forget Password?
                    </Typography>
                }
                <Box>
                    <Button
                        type='submit'
                        variant="outlined"
                        className={styles.submitButtonCommon}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Box>
                {title === "Sign Up" &&
                    <Box
                        className={styles.footer}
                        sx={{ marginTop: "30px" }}
                    >
                        <Typography
                            className={styles.footerText}>
                            Already have an account? <Typography variant='text' onClick={() => navigate('/login')} sx={{ color: "#000 !important", marginLeft: "5px", cursor: "pointer" }}>Login</Typography>
                        </Typography>
                    </Box>
                }
                {title === "Login" &&
                    <Box className={styles.footer}
                        sx={{ marginTop: "30px" }}>
                        <Typography className={styles.footerText}>Don't have an account?
                            <Typography variant='text' onClick={() => navigate('/signup')} sx={{ color: "#000 !important", marginLeft: "5px", cursor: "pointer" }}>Sign Up</Typography>
                        </Typography>
                    </Box>
                }
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
            {modalOpen && <ForgetPasswordModal open={modalOpen} handleClose={handleModalClose} />}
        </Box>

    );
};

export default CommonForm;
