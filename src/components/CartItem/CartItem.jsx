import React from 'react';
import IncrementDecrementButton from '../IncrementDecrementButton/index';
import './CartItem.scss';

const CartItem = ({ item }) => {
    // console.log('item', item.productId);
    return (
        <div className="cart-item">
            <img src={item.productId.images.mainImage} alt={item.productId.name} className="cart-item-image" />
            <div className="cart-item-info">
                <p className="cart-item-name">{item.productId.name} - {item.productId.weight} g</p>
                <IncrementDecrementButton productId={item.productId._id} />
                <p className="cart-item-price">₹{item.productId.price}</p>
            </div>
        </div>
    );
};

export default CartItem;
