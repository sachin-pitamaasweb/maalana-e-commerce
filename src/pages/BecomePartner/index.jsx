import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import emailjs from 'emailjs-com'; // Import EmailJS
import { useFormik } from 'formik'; // Import Formik
import * as Yup from 'yup'; // Import Yup
import './style.css'; // Custom CSS file

export default function HumkoJoinKarlo() {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const [loading, setLoading] = useState(false);

    // Validation schema
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        companyName: Yup.string().required('Company Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string().required('Phone Number is required'),
        message: Yup.string().required('Message is required'),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            companyName: '',
            email: '',
            phone: '',
            message: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const serviceId = 'service_vxs5qif';
                const templateId = 'template_hle7emy';
                const publicKey = 'm9JJsOueVsg6UuJGr';

                // Prepare the email parameters
                const templateParams = {
                    from_name: `${values.firstName} ${values.lastName}`,
                    company_name: values.companyName,
                    email: values.email,
                    phone: values.phone,
                    message: values.message,
                };

                const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

                if (response.status === 200) {
                    setSnackbar({
                        open: true,
                        message: 'Message sent successfully!',
                        severity: 'success',
                    });
                    formik.resetForm(); // Reset the form after successful submission
                } else {
                    setSnackbar({
                        open: true,
                        message: 'Failed to send message. Please try again.',
                        severity: 'error',
                    });
                }
            } catch (error) {
                console.error('Error sending message:', error);
                setSnackbar({
                    open: true,
                    message: 'An error occurred while sending the message.',
                    severity: 'error',
                });
            } finally {
                setLoading(false);
            }
        }
    });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <Card className="custom-card">
            <CardHeader
                title={<Typography variant="h4" className="custom-title">Humko join karlo!</Typography>}
            />
            <CardContent>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div className="form-grid">
                        <TextField
                            id="firstName"
                            placeholder='First Name'
                            variant="outlined"
                            fullWidth
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} // Trigger validation on blur
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { border: "none" },
                                    "&:hover fieldset": { border: "none" },
                                    "&.Mui-focused fieldset": { border: "none" },
                                },
                            }}
                            InputProps={{
                                disableUnderline: true,
                                className: "input-bg",
                            }}
                        />
                        <TextField
                            id="lastName"
                            placeholder='Last Name'
                            variant="outlined"
                            fullWidth
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} // Trigger validation on blur
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { border: "none" },
                                    "&:hover fieldset": { border: "none" },
                                    "&.Mui-focused fieldset": { border: "none" },
                                },
                            }}
                            InputProps={{
                                disableUnderline: true,
                                className: "input-bg",
                            }}
                        />
                    </div>
                    <TextField
                        id="companyName"
                        placeholder='Company Name'
                        variant="outlined"
                        fullWidth
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} // Trigger validation on blur
                        error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                        helperText={formik.touched.companyName && formik.errors.companyName}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                            },
                        }}
                        InputProps={{
                            disableUnderline: true,
                            className: "input-bg",
                        }}
                    />
                    <TextField
                        id="email"
                        placeholder='Email'
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} // Trigger validation on blur
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                            },
                        }}
                        InputProps={{
                            disableUnderline: true,
                            className: "input-bg",
                        }}
                    />
                    <TextField
                        id="phone"
                        placeholder='Phone Number'
                        type="tel"
                        variant="outlined"
                        fullWidth
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} // Trigger validation on blur
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                            },
                        }}
                        InputProps={{
                            disableUnderline: true,
                            className: "input-bg",
                        }}
                    />
                    <TextField
                        id="message"
                        placeholder='Message'
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} // Trigger validation on blur
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                            },
                        }}
                        InputProps={{
                            disableUnderline: true,
                            className: "input-bg",
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                    </Button>
                </form>
            </CardContent>

            {/* Snackbar with Alert */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}

            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Card>
    );
}
