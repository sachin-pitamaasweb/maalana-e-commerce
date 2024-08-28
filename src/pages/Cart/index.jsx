import React, { useState, useEffect } from 'react';

import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import './Cart.css';

import { useAuth } from '../../context/AuthContext';

const Cart = () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 4; // Number of items per page
    const { userId, updateAddresses, addresses, updateCartItemCount  } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(1);
    const [orderSummary, setOrderSummary] = useState({
        subTotal: 0,
        discount: 0,
        tax: 0,
        shipping: 'FREE',
        total: 0,
        deliveryDate: 'DD/MM/YY',
    });

    useEffect(() => {
        const fetchCartData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/get-all-cart-by-user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Extract items from all carts
                const items = data.cart.reduce((acc, cart) => {
                    const userId = cart.userId;
                    const cartId = cart._id;
                    const cartItems = cart.items.map(item => ({
                        ...item,
                        quantity: item.quantity,
                        userId,
                        cartId,
                        productId: item.productId._id,
                        cartProducts: item.productId
                    }));
                    
                    return acc.concat(cartItems);
                }, []);
                
                setCartItems(items);

                // Calculate order summary
                const subTotal = items.reduce((sum, item) => sum + item.cartProducts.price * item.quantity, 0);
                const total = subTotal; // Adjust as needed for discounts, taxes, etc.

                setOrderSummary({
                    subTotal,
                    discount: 0, // Replace with actual discount if available
                    tax: 0, // Replace with actual tax if applicable
                    shipping: 'FREE',
                    total,
                    deliveryDate: 'DD/MM/YY',
                });
            } catch (error) {
                console.error('Error fetching cart data:', error);
                setCartItems([]);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchCartData();
    }, [userId]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await fetch(`https://maalana-backend.onrender.com/api/get-my-shiped-address/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data.success) {
                    updateAddresses(data.shipedaddress);
                } else {
                    console.error('Failed to fetch addresses');
                }
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const updateCart = async (newQuantity, cartId, productId) => {
        console.log('newQuantity', newQuantity);
        try {
          const response = await fetch('http://localhost:8000/api/update-cart', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
              productId: productId,
              quantity: newQuantity,
              cartId: cartId,
            }),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          updateCartItemCount(data.numberOfItems);
    
          console.log('Cart updated successfully:', data);
        } catch (error) {
          console.error('Error updating cart:', error);
        }
      };
    

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleIncrement = (cartId, productId) => {
        const newCount = count + 1;
        setCount(newCount);
        updateCart(newCount, cartId, productId);
      };
    
      const handleDecrement = (cartId, productId) => {
        if (count > 1) {
          const newCount = count - 1;
          setCount(newCount);
          updateCart(newCount, cartId, productId);
        }
      };

    const paginatedItems = Array.isArray(cartItems)
        ? cartItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : [];
    return (
        <>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="cart-container">
                    <div className="cart-header">
                        <h1>Your Shopping Cart</h1>
                    </div>
                    <div className="cart-steps">
                        <span className="cart-step">1. Review Cart</span>
                        <span className="cart-step">2. Shipping Details</span>
                        <span className="cart-step">3. Payment</span>
                    </div>
                    <div className="cart-content">
                        <div className="cart-items">
                            {loading ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '20px'
                                    }}
                                >
                                    <CircularProgress />
                                </div>
                            ) : (
                                <>
                                    {paginatedItems.length > 0 ? (
                                        paginatedItems.map((item) => (
                                            <div className="cart-item" key={item.productId}>
                                                <img src={item.cartProducts.images.mainImage || 'https://res.cloudinary.com/dtivafy25/image/upload/v1723530547/image/img-2_nj1zsm.png'} alt={item.productId.name} />
                                                <div className="item-details">
                                                    <h3>{item.cartProducts.name}</h3>
                                                    <p>₹{item.cartProducts.price}</p>
                                                    <div className="item-quantity">
                                                        <button aria-label="Decrease quantity" onClick={() => handleDecrement(item.cartId, item.productId)}>-</button>
                                                        <input type="number" value={item.quantity} min="1" aria-label="Quantity" />
                                                        <button aria-label="Increase quantity" onClick={() => handleIncrement(item.cartId, item.productId)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: '20px',
                                                fontSize: '18px',
                                                color: '#555'
                                            }}
                                        >
                                            No items in the cart.
                                        </div>
                                    )}
                                    {paginatedItems.length > 0 && <Pagination count={Math.ceil(cartItems.length / itemsPerPage)} page={page} onChange={handlePageChange} />}
                                </>
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
                                <span>{orderSummary.discount || 0}</span>
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
                            <a href="shopping-cart" className="checkout-button">Proceed to Checkout</a>
                            <div className="coupon-input">
                                <input type="text" placeholder="Enter coupon code" aria-label="Coupon code" />
                                <button>Apply</button>
                            </div>
                            <div className="shipping-address">
                                <h3>Shipping Addresses</h3>
                                {
                                    addresses.length === 0 ? (
                                        <p>No addresses available. go to profile and click on "MY Address"</p>
                                    ) : (
                                        addresses.map((address, index) => (
                                            <div className="address-box" key={index}>
                                                <input type="radio" id="address2" name="shipping_address" defaultChecked={index === 0} value="address2" />
                                                <div className="address-content">
                                                    <label for="address2">
                                                        <div className="address-details">
                                                            <p>John Doe</p>
                                                            <p>{address.address}</p>
                                                            <p>{address.city}, {address.state}, {address.country}, {address.pincode}</p>
                                                            <p>6239443996</p>
                                                        </div>
                                                    </label>
                                                    <div className="address-actions">
                                                        <button className="btn" aria-label="Edit address">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="btn-icon">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </button>
                                                        <button className="btn" aria-label="Delete address">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="btn-icon">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
