import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const OrderDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderNumber } = location.state || {}; // Ensure this is passed correctly

    const [items, setItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState({}); // Initialize as an empty object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://maalana.ritaz.in/api/get-order-details-by-order-number/${orderNumber}`);
                console.log(response.data.data); // Log the response to check its structure

                // Access the relevant parts of the response
                setOrderDetails(response.data.data || {});
                setItems(response.data.data.cartItems || []); // Fallback to empty array if cartItems is not defined
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch order details');
                setLoading(false);
            }
        };

        if (orderNumber) {
            fetchOrderDetails();
        } else {
            setError('Order number is required');
            setLoading(false);
        }

        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [orderNumber]);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Check if items are defined before calculating totalPages
    const totalPages = Math.ceil((items && items.length) ? items.length : 0 / itemsPerPage);

    const displayItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Update the handleBack function
    const handleBack = () => {
        navigate(-1);
        window.scrollTo(0, 0);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    console.log('orderDetails', orderDetails);
    return (
        <div className="order-details-container">
            <button onClick={handleBack} className="btn-back">Back</button>
            <div className="order-details-grid">
                <div className="order-details-card">
                    <h2 className="order-details-card-title">Order #{orderDetails.orderNumber}</h2>
                    <p className="text-muted">Ordered on {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                    <h3 className="order-details-card-title">Items</h3>
                    <ul className="item-list">
                        {displayItems().map((item) => (
                            <li key={item._id} className="item"> {/* Use item._id for unique key */}
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <p className="item-name">{item.name}</p>
                                    <p className="text-muted">Quantity: {item.quantity} x ₹{item.price}</p>
                                </div>
                                <span className="item-price">₹{item.quantity * item.price}</span>
                            </li>
                        ))}
                    </ul>
                    {itemsPerPage > 5 && <div className="pagination">
                        <button onClick={handlePrev} className="btn-order-details" disabled={currentPage === 1}>Previous</button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button onClick={handleNext} className="btn-order-details" disabled={currentPage === totalPages}>Next</button>
                    </div>}
                </div>
                <div>
                    <div className="order-details-card">
                        <h3 className="order-details-card-title">Delivery Address</h3>
                        <p>{`${orderDetails.address?.address}, ${orderDetails.address?.city}, ${orderDetails.address?.state} - ${orderDetails.address?.pincode}, ${orderDetails.address?.country}`}</p>
                    </div>
                    <div className="order-details-card">
                        <h3 className="order-details-card-title">Payment Method</h3>
                        <p>{orderDetails.paymentMethod}</p>
                    </div>
                    <div className="order-details-card">
                        <h3 className="order-details-card-title">Order Summary</h3>
                        <div className="summary-item">
                            <span>Subtotal</span>
                            <span>₹{orderDetails.orderSummary?.subTotal}</span>
                        </div>
                        <div className="summary-item">
                            <span>Discount</span>
                            <span>₹{orderDetails.orderSummary?.discount}</span>
                        </div>
                        <div className="summary-item">
                            <span>Shipping</span>
                            <span>{orderDetails.orderSummary?.shipping}</span>
                        </div>
                        <div className="summary-item summary-total">
                            <span>Total</span>
                            <span>₹{orderDetails.orderSummary?.total}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-details-card" style={{ marginTop: '2rem' }}>
                <h3 className="order-details-card-title">Delivery Status</h3>
                <p>{orderDetails.deliveryStatus}</p>
            </div>
        </div>
    );
};

export default OrderDetails;
