import React, { useState } from 'react';
 
// mui icon
import DeleteIcon from '@mui/icons-material/Delete';


import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, setCartItems, onIncrement, onDecrement }) => {

    return (
        <div className="cart">
            {/* <div className="cart-header">
                <h2>Shopping cart</h2>
                <p>You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
            </div> */}
            <div className="cart-items-container">
                {cartItems.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <img src={item.cartProducts.images.mainImage || 'https://res.cloudinary.com/dtivafy25/image/upload/v1723530547/image/img-2_nj1zsm.png'} alt={item.name} />
                        <div className="item-details">
                            <h3 className="item-name">{item.cartProducts.name}</h3>
                            {/* <p className="item-description">{item.cartProducts.description}</p> */}
                        </div>
                        <div className="item-controls">
                            <div className="quantity-control">
                                <button onClick={() => onIncrement(index, 1)}>&#9650;</button>
                                <span className="quantity">{item.quantity}</span>
                                <button onClick={() => onIncrement(index, -1)}>&#9660;</button>
                            </div>
                            <span className="price">₹{(item.cartProducts.price * item.quantity).toFixed(2)}</span>
                            <button className="delete-btn"><DeleteIcon /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShoppingCart;
