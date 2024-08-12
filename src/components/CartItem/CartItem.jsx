import React from 'react';
import IncrementDecrementButton from '../IncrementDecrementButton/index';
import './CartItem.scss';

const CartItem = ({ item }) => {
    return (
        <div className="cart-item">
            <img src={item.img} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
                <p className="cart-item-name">{item.name} - {item.weight} g</p>
                <IncrementDecrementButton />
                <p className="cart-item-price">₹{item.price}</p>
            </div>
        </div>
    );
};

export default CartItem;
