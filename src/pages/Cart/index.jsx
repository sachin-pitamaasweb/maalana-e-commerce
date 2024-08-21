import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';

import CartItem from '../../components/CartItem/CartItem.jsx';
import OrderSummary from '../../components/OrderSummary/index.jsx';
import CouponSection from '../../components/CouponSection/index.jsx';
import AddressSection from '../../components/AddressSection1/index.jsx';

import Cart1 from '../../assets/product-cate/img-1.png';

import './Cart.scss';

const cartItems = [
    { id: 1, img: Cart1, name: 'Orange Fruit Katli', weight: 250, price: 150 },
    { id: 2, img: Cart1, name: 'Orange Fruit Katli', weight: 250, price: 150 },
    { id: 3, img: Cart1, name: 'Orange Fruit Katli', weight: 250, price: 150 },
];

const orderSummary = {
    subTotal: 398,
    discount: 302,
    tax: 0,
    shipping: 'FREE',
    total: 398,
    deliveryDate: 'DD/MM/YY',
};

const addresses = [
    { id: 1, details: '7297, STREET NO 6, 22FT ROAD, DURGA PURI, HADDONKALAN, NEAR BEAM FASHION POINT, LUDHIANA, PUNJAB, 141001', phone: '9501987577' },
    { id: 2, details: '7297, STREET NO 6, 22FT ROAD, DURGA PURI, HADDONKALAN, NEAR BEAM FASHION POINT, LUDHIANA, PUNJAB, 141001', phone: '9501987577sss' },
];

const Cart = () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedItems = cartItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
                    <AddressSection addresses={addresses} />
                )}
            </div>
        </div>
    );
};

export default Cart;
