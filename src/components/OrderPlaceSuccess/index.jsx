import React, { useEffect } from "react";

import axios from 'axios';

import { Link, useLocation } from 'react-router-dom';

import { useAuth } from "../../context/AuthContext";

import './style.css';

const OrderPlaceSuccess = () => {
    const { profile } = useAuth();
    const location = useLocation();
    const { result } = location.state || {};
    const { order } = result || {};
    const {  createdAt, orderNumber, orderSummary, address } = order || {};

 // Function to format date
 const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const orderDate = formatDate(createdAt);

const estimatedDeliveryDate = formatDate(new Date(new Date(createdAt).getTime() + 7 * 24 * 60 * 60 * 1000)); // Adding 7 days for estimated delivery

console.log(profile);

 // Function to call the API
 const sendOrderDetailsEmail = async () => {
    try {
        await axios.post('https://maalana-backend.onrender.com/api/send-order-details-email', {
            email: profile?.email, // Assuming `user` object has an `email` property
            order: {
                orderNumber,
                createdAt,
                orderSummary,
                address,
                userName: profile?.firstName + ' ' + profile?.lastName // Assuming `user` object has a `name` property
            }
        });
        console.log('Order details email sent successfully');
    } catch (error) {
        console.error('Error sending order details email:', error);
    }
};

// Call the API when the component mounts
useEffect(() => {
    const timer = setTimeout(() => {
        sendOrderDetailsEmail();
    }, 120000); // 2 minutes in milliseconds

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [order]);



    return (
        <>
           <div className="order-place-success-container">
           <div className="confirmation-container">
                <div className="success-icon">&#10004;</div>
                <h1>Order Placed Successfully!</h1>
                <p>Thank you for your purchase. Your order has been received and is being processed.</p>
                <div className="order-details">
                    <h2>Order Details</h2>
                    <p><strong>Order Number:</strong> {orderNumber || ''}</p>
                    <p><strong>Date:</strong> {orderDate || ''}</p>
                    <p><strong>Total Amount:</strong>₹{orderSummary?.total || 0}.00</p>
                    <p><strong>Estimated Delivery:</strong> {estimatedDeliveryDate || ''}</p>
                </div>
                <p>We'll send you an email with your order details and tracking information once your package has shipped.</p>
                <Link to="/products" className="btn">Continue Shopping</Link>
            </div>
           </div>
        </>
    );
};

export default OrderPlaceSuccess;