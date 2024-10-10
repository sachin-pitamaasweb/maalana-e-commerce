import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useTheme, useMediaQuery, IconButton, Snackbar, Alert, Pagination, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './Cart.css';
import { useAuth } from '../../context/AuthContext';
import EditAddressModal from '../../components/EditAddressModal';

const Cart = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const itemsPerPage = 4; // Number of items per page
    const { userId, updateAddresses, addresses, updateCartItemCount, profile } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [orderSummary, setOrderSummary] = useState({
        subTotal: 0,
        discount: 0,
        tax: 0,
        shipping: 'FREE',
        total: 0,
        deliveryDate: 'DD/MM/YY',
    });
    const [open, setOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [formData, setFormData] = useState({
        address: '',
        pincode: '',
        country: '',
        state: '',
        city: ''
    });
    const [couponCode, setCouponCode] = useState('');
    const [page, setPage] = useState(1);

    const fetchCartData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://maalana-backend.onrender.com/api/get-all-cart-by-user/${userId}`);
            const data = response.data;

            if (data.cart) {
                const items = data.cart.reduce((acc, cart) => {
                    const cartItems = cart.items.map(item => ({
                        ...item,
                        userId: cart.userId,
                        cartId: cart._id,
                        productId: item.productId._id,
                        cartProducts: item.productId,
                    }));
                    return acc.concat(cartItems);
                }, []);
                setCartItems(items);

                // Calculate order summary
                const subTotal = items.reduce((sum, item) => sum + item.cartProducts.price * item.quantity, 0);
                setOrderSummary(prev => ({
                    ...prev,
                    subTotal,
                    total: subTotal, // Adjust as needed for discounts, taxes, etc.
                }));
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            setSnackbarMessage('Failed to fetch cart data');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) fetchCartData();
    }, [userId, fetchCartData]);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`https://maalana-backend.onrender.com/api/get-my-shiped-address/${userId}`);
            const data = response.data;

            if (data.success) {
                updateAddresses(data.shipedaddress);
                setSelectedAddress(data.shipedaddress[0]);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    useEffect(() => {
        if (userId) fetchAddresses();
    }, [userId]);

    const updateCart = async (newQuantity, cartId, productId) => {
        try {
            setLoading(true);
            const response = await axios.put(`https://maalana-backend.onrender.com/api/update-cart`, {
                userId,
                productId,
                quantity: newQuantity,
                cartId,
            });

            const data = response.data;
            updateCartItemCount(data.totalQuantity);
            setOrderSummary(prev => ({
                ...prev,
                total: data.totalPrice,
                subTotal: data.totalPrice
            }));
        } catch (error) {
            console.error('Error updating cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (cartId, productId) => {
        try {
            setLoading(true);
            const response = await axios.delete(`https://maalana-backend.onrender.com/api/delete-cart-product`, {
                data: { userId, productId, cartId }
            });

            if (response.data.success) {
                const updatedItems = cartItems.filter(item => !(item.cartId === cartId && item.productId === productId));
                setCartItems(updatedItems);

                // If no items left in the cart, clear the state and trigger re-fetch
                if (updatedItems.length === 0) {
                    await fetchCartData(); // Re-fetch data to ensure it syncs with the backend
                }

                updateCartItemCount(response.data.totalQuantity);
                setOrderSummary(prev => ({
                    ...prev,
                    total: response.data.totalPrice,
                    subTotal: response.data.totalPrice
                }));
                setSnackbarMessage('Item removed successfully');
                setSnackbarSeverity('success');
                // Reload the entire website to reflect changes
                window.location.reload();
            } else {
                setSnackbarMessage('Failed to remove item');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            console.error('Error removing item:', error);
            setSnackbarMessage('Error removing item');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            setLoading(false);
        }
    };

    const handlePageChange = (_, value) => setPage(value);

    const handleIncrement = (cartId, productId) => {
        const updatedItems = cartItems.map(item => {
            if (item.cartId === cartId && item.productId === productId) {
                const newQuantity = item.quantity + 1;
                updateCart(newQuantity, cartId, productId);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    // const handleDecrement = (cartId, productId) => {
    //     const updatedItems = cartItems.map(item => {
    //         if (item.cartId === cartId && item.productId === productId && item.quantity > 1) {
    //             const newQuantity = item.quantity - 1;
    //             updateCart(newQuantity, cartId, productId);
    //             return { ...item, quantity: newQuantity };
    //         }
    //         return item;
    //     });
    //     setCartItems(updatedItems);
    // };

    const handleDecrement = (cartId, productId) => {
        const updatedItems = cartItems.map(item => {
            if (item.cartId === cartId && item.productId === productId) {
                // If the quantity is 1 and the decrement button is clicked, remove the item from the cart
                if (item.quantity === 1) {
                    // Remove the item from the cart
                    handleRemove(cartId, productId); // Call handleRemove to remove the item
                } else {
                    const newQuantity = item.quantity - 1;
                    updateCart(newQuantity, cartId, productId); // Update the quantity in the cart
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        });

        // Update the local cart items state, this will also handle the case when an item is removed
        const filteredItems = updatedItems.filter(item => item.quantity > 0); // Remove items with 0 quantity
        setCartItems(filteredItems);
    };


    const handleCheckout = () => navigate('/payment', { state: { selectedAddress, cartItems, profile, orderSummary } });

    const handleApplyCoupon = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`https://maalana-backend.onrender.com/api/apply-coupon`, {
                couponCode
            });

            const data = response.data;
            if (data.success) {
                const discountPercentage = Number(data.coupon.discount);
                const discountedPrice = orderSummary.subTotal - (orderSummary.subTotal * (discountPercentage / 100));
                setOrderSummary(prev => ({
                    ...prev,
                    total: discountedPrice,
                    discount: discountPercentage,
                }));
                setSnackbarMessage('Coupon applied successfully');
                setSnackbarSeverity('success');
            } else {
                setSnackbarMessage('Coupon code has already been used or is invalid');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
            setSnackbarMessage('Error applying coupon');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            setCouponCode('');
            setLoading(false);
        }
    };

    const paginatedItems = cartItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    return (
        <>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Helmet>
                    <title>Maalana - Cart</title>
                </Helmet>
                <div className="cart-container">
                    <div className="cart-header">
                        <IconButton onClick={() => navigate('/products')}>
                            <ArrowBackIcon />
                        </IconButton>
                        <h1>Your Shopping Cart</h1>
                    </div>
                    <div className="cart-content">
                        <div className="cart-items">
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                                    <CircularProgress />
                                </div>
                            ) : paginatedItems.length > 0 ? (
                                paginatedItems.map(item => (
                                    <div className="cart-item" key={item.productId}>
                                        <div onClick={() => navigate(`/products-details/${item.cartProducts._id}`, { state: { product: item.cartProducts } })}>
                                            <img
                                                src={item.cartProducts.images.mainImage || 'https://res.cloudinary.com/dtivafy25/image/upload/v1723530547/image/img-2_nj1zsm.png'}
                                                alt={item.productId.name}
                                            />
                                        </div>
                                        <div className="item-details">
                                            <h3>{item.cartProducts.name.slice(0, 20)}</h3>
                                            <p>₹{item.cartProducts.price * item.quantity}</p>
                                            {isMobile ? (
                                                <div>
                                                    <div className="item-quantity">
                                                        <button aria-label="Decrease quantity" onClick={() => handleDecrement(item.cartId, item.productId)}>-</button>
                                                        <input type="number" value={item.quantity} readOnly min="1" aria-label="Quantity" />
                                                        <button aria-label="Increase quantity" onClick={() => handleIncrement(item.cartId, item.productId)}>+</button>
                                                    </div>
                                                    <button aria-label="Remove item from cart" className="remove-button" onClick={() => handleRemove(item.cartId, item.productId)}>
                                                        <DeleteIcon />
                                                    </button>
                                                </div>
                                            )
                                                :
                                                (
                                                    <>
                                                        <div className="item-quantity">
                                                            <button aria-label="Decrease quantity" onClick={() => handleDecrement(item.cartId, item.productId)}>-</button>
                                                            <input type="number" value={item.quantity} readOnly min="1" aria-label="Quantity" />
                                                            <button aria-label="Increase quantity" onClick={() => handleIncrement(item.cartId, item.productId)}>+</button>
                                                        </div>
                                                        <button aria-label="Remove item from cart" className="remove-button" onClick={() => handleRemove(item.cartId, item.productId)}>
                                                            <DeleteIcon />
                                                        </button>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', fontSize: '18px', color: '#555' }}>
                                    No items in the cart.
                                </div>
                            )}
                            {paginatedItems.length > 0 && (
                                <Pagination count={Math.ceil(cartItems.length / itemsPerPage)} page={page} onChange={handlePageChange} />
                            )}
                        </div>
                        <div className="cart-summary">
                            <h2>Order Summary</h2>
                            <div className="summary-item">
                                <span>Subtotal</span>
                                <span>₹{orderSummary.subTotal || 0}</span>
                            </div>
                            <div className="summary-item">
                                <span>Discount</span>
                                <span>{orderSummary.discount || 0}%</span>
                            </div>
                            <div className="summary-item">
                                <span>Tax</span>
                                <span>{orderSummary.tax || 0}</span>
                            </div>
                            <div className="summary-item">
                                <span>Shipping</span>
                                <span>{orderSummary.shipping || 'Free'}</span>
                            </div>
                            <div className="summary-item summary-total">
                                <span>Total</span>
                                <span>₹{orderSummary.total || 0}</span>
                            </div>
                            <button className="checkout-button" onClick={handleCheckout} disabled={paginatedItems.length === 0 && addresses.length === 0}>
                                Proceed to Checkout
                            </button>
                            <div className="coupon-input">
                                <input
                                    type="text"
                                    name="coupon"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter coupon code"
                                    aria-label="Coupon code"
                                />
                                <button onClick={handleApplyCoupon}>Apply</button>
                            </div>
                            <div className="shipping-address">
                                <h3>Shipping Addresses</h3>
                                {addresses.length === 0 ? (
                                    <p>No addresses available. Go to profile and click on "My Address".</p>
                                ) : (
                                    addresses.map((address, index) => (
                                        <div className="address-box" key={index}>
                                            <input
                                                type="radio"
                                                name="shipping_address"
                                                checked={selectedAddress?._id === address._id}
                                                onChange={() => setSelectedAddress(address)}
                                            />
                                            <div className="address-content">
                                                <label>
                                                    <div className="address-details">
                                                        <p>{profile.firstName} {profile.lastName}</p>
                                                        <p>{address.address}</p>
                                                        <p>{address.city}, {address.state}, {address.country}, {address.pincode}</p>
                                                        <p>{profile.phone}</p>
                                                    </div>
                                                </label>
                                                <div className="address-actions">
                                                    <button className="btn" aria-label="Edit address" onClick={() => setFormData(address) || setOpen(true)}>
                                                        Edit
                                                    </button>
                                                    <button className="btn" aria-label="Delete address" onClick={() => handleRemove(address)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditAddressModal
                open={open}
                handleClose={() => setOpen(false)}
                formData={formData}
                handleInputChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                handleUpdate={() => { }} // Pass your update address function here
                loading={loading}
                selectedAddress={selectedAddress}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Cart;


