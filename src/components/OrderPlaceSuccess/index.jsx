import React, { useEffect } from "react";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import './style.css';

const OrderPlaceSuccess = () => {
    const { profile } = useAuth();
    const location = useLocation();
    const { result } = location.state || {};
    const { order } = result || {};
    const { createdAt, orderNumber, orderSummary, address, cartItems } = order || {};

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const orderDate = formatDate(createdAt);

    const estimatedDeliveryDate = formatDate(new Date(new Date(createdAt).getTime() + 7 * 24 * 60 * 60 * 1000)); // Adding 7 days for estimated delivery

    console.log('order', order);

    // Function to call the API
    const sendOrderDetailsEmail = async () => {
        try {
            await axios.post('https://maalana.ritaz.in/api/send-order-details-email', {
                email: profile?.email,
                order: {
                    orderNumber,
                    createdAt,
                    orderSummary,
                    address,
                    cartItems,
                    userName: profile?.firstName + ' ' + profile?.lastName
                }
            });
            console.log('Order details email sent successfully');
        } catch (error) {
            console.error('Error sending order details email:', error);
        }
    };

    // Call the API when the component mounts
    useEffect(() => {
        if (order) {
            sendOrderDetailsEmail();
        }
    }, [order]);

    // Function to reload the page and navigate to products
    const handleContinueShopping = () => {
        window.location.href = '/products';
    };

    return (
        <>
            <div className="order-place-success-container">
                <Helmet>
                    <title>Maalana-Order Place Success</title>
                </Helmet>
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
                    <Link to="/products" className="btn-primary" onClick={handleContinueShopping}>Continue Shopping</Link>
                </div>
            </div>
        </>
    );
};

export default OrderPlaceSuccess;
