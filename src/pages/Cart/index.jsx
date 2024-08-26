import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

import CartItem from '../../components/CartItem/CartItem.jsx';
import OrderSummary from '../../components/OrderSummary/index.jsx';
import CouponSection from '../../components/CouponSection/index.jsx';
import AddressSection from '../../components/AddressSection1/index.jsx';

// import Cart1 from '../../assets/product-cate/img-1.png';

import { useAuth } from '../../context/AuthContext.js';

import './Cart.scss';

// const cartItems = [
//     { id: 1, img: Cart1, name: 'Orange Fruit Katli', weight: 250, price: 150 },
//     { id: 2, img: Cart1, name: 'Orange Fruit Katli', weight: 250, price: 150 },
//     { id: 3, img: Cart1, name: 'Orange Fruit Katli', weight: 250, price: 150 },
// ];

// const orderSummary = {
//     subTotal: 398,
//     discount: 302,
//     tax: 0,
//     shipping: 'FREE',
//     total: 398,
//     deliveryDate: 'DD/MM/YY',
// };

// const addresses = [
//     { id: 1, details: '7297, STREET NO 6, 22FT ROAD, DURGA PURI, HADDONKALAN, NEAR BEAM FASHION POINT, LUDHIANA, PUNJAB, 141001', phone: '9501987577' },
//     { id: 2, details: '7297, STREET NO 6, 22FT ROAD, DURGA PURI, HADDONKALAN, NEAR BEAM FASHION POINT, LUDHIANA, PUNJAB, 141001', phone: '9501987577sss' },
// ];

const Cart = () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 4; // Number of items per page
    const { userId,  updateAddresses,addresses } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    // const [addresses, setAddresses] = useState([]);
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
                // console.log('Response data:', data);

                // Extract items from all carts
                const items = data.cart.reduce((acc, cart) => acc.concat(cart.items), []);
                setCartItems(items);
            } catch (error) {
                console.error('Error fetching cart data:', error);
                setCartItems([]);
            }
        };

        fetchCartData();
    }, [userId]);

    useEffect(() => {
        const fetchCartData = async () => {
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
                const items = data.cart.reduce((acc, cart) => acc.concat(cart.items), []);
                setCartItems(items);

                // Calculate order summary
                const subTotal = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
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
            }
        };

        fetchCartData();
    }, [userId]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/get-my-shiped-address/${userId}`, {
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
                    // setAddresses(data.shipedaddress);
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
    }, []);

    const handleAddressUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/get-my-shiped-address/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

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


    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedItems = Array.isArray(cartItems) 
    ? cartItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];


    
    return (
        <div className="cart-container">
            <div className="cart-items">
                <h1>Cart</h1>
                <div className="steps">
                    <span>1. Cart</span>
                    <span>2. Checkout</span>
                    <span>3. Payment</span>
                </div>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        {paginatedItems.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                        <Pagination
                            count={Math.ceil(cartItems.length / itemsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            variant="outlined"
                            color="primary"
                        />
                    </>
                )}
            </div>
            <div className="summary-and-coupon">
                {Object.keys(orderSummary).length === 0 ? (
                    <p>Order summary is not available.</p>
                ) : (
                    <OrderSummary summary={orderSummary} />
                )}
                <CouponSection />
                {addresses.length === 0 ? (
                    <p>
                        No addresses available. go to profile and click on "MY Address"
                    </p>
                ) : (
                    <AddressSection addresses={addresses} onAddressUpdate={handleAddressUpdate} />
                )}
            </div>
        </div>
    );
};

export default Cart;
