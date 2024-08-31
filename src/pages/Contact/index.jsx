import React, { useEffect, useState } from "react";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress'; 

import emailjs from 'emailjs-com';

import "./style.css";

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    useEffect(() => {
        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        }
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const errors = {};
        const { name, email, phoneNumber, message } = formData;

        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
        if (!phoneNumber) errors.phoneNumber = 'Phone number is required';
        if (!message) errors.message = 'Message is required';

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        setLoading(true); 
        const serviceId = 'service_vxs5qif';
        const templateId = 'template_hle7emy';
        const publicKey = 'm9JJsOueVsg6UuJGr';

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone_number: formData.phoneNumber,
            message: formData.message,
        };

        try {
            const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
            if (response) {
                setSnackbarMessage('Form submitted successfully!');
                setSnackbarSeverity('success');
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    message: '',
                });
            }
        } catch (error) {
            setSnackbarMessage('Failed to submit the form. Please try again.');
            setSnackbarSeverity('error');
        }
        finally {
            setLoading(false); // Set loading to false regardless of success or failure
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <header className="page-header">
                <h1 className="page-title">Connect with Us</h1>
                <p className="page-subtitle">Let's Chat Sweetness!</p>
            </header>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="container-contact">
                    <div className="content">
                        <section className="form-section">
                            <h2>Get in <span className="accent">Touch</span></h2>
                            <p>Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Name"
                                    required
                                    className="phone-input"
                                />
                                {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="phone-input"
                                />
                                {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="phone-input"
                                />
                                {formErrors.phoneNumber && <p className="error-message">{formErrors.phoneNumber}</p>}
                                <textarea
                                    placeholder="How can we help?"
                                    rows="4"
                                    required
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="phone-input"
                                ></textarea>
                                {formErrors.message && <p className="error-message">{formErrors.message}</p>}
                                <button type="submit" disabled={loading}>
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'SEND'}
                                </button>
                            </form>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <span>+1 (555) 000-0000</span>
                                </div>
                                <div className="contact-item">
                                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>+1 (555) 000-0001</span>
                                </div>
                                <div className="contact-item">
                                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>hello@example.com</span>
                                </div>
                            </div>
                        </section>
                        <section className="map-section">
                            {/* <img src={"https://via.placeholder.com/1900x400?text=Map"} alt="Map" className="map-placeholder" /> */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1637322655685!2d-122.40641728468188!3d37.78583437975665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b1c446df1%3A0x146cd8db3e5e9a19!2sSalesforce%20Tower%2C%20110%20Fremont%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2sin!4v1639219507097!5m2!1sen!2sin"
                                width="600"
                                height="650"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Map"
                            ></iframe>
                            <div className="map-pin"></div>
                        </section>
                    </div>
                </div>
            </div>
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
        </>
    );
};

export default Contact;
