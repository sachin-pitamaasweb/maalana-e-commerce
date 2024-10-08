import React from 'react';
import './ProductCard.css'; // Import the CSS file

const ProductCard = ({ name, price, quantity, imgSrc, onIncrement, onDecrement, onRemove }) => {
    return (
        <div className="cart-product-card">
            <img src={imgSrc} alt={name} className="cart-product-image" />
            <div className="cart-product-details">
                <div className="cart-product-name">{name}</div>
                <div className="cart-product-price">₹{price}</div>
                <div className="cart-quantity-controls">
                    <button
                        className="cart-quantity-btn"
                        onClick={onDecrement}
                        disabled={quantity <= 1} // Disable decrement button if quantity is less than or equal to 1
                    >
                        -
                    </button>
                    <span>{quantity}</span>
                    <button className="cart-quantity-btn" onClick={onIncrement}>
                        +
                    </button>
                </div>
                <button className="cart-remove-btn" onClick={onRemove}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
