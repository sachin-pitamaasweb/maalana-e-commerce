import React from 'react';
import './OrderSummary.scss';

const OrderSummary = ({ summary }) => {
    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
                <p>SUB TOTAL <span>₹{summary.subTotal}</span></p>
                <p>DISCOUNT <span>₹{summary.discount}</span></p>
                <p>TAX <span>₹{summary.tax}</span></p>
                <p>SHIPPING <span>{summary.shipping}</span></p>
                <p>TOTAL <span>₹{summary.total}</span></p>
            </div>
            <button className="checkout-btn">PROCEED TO CHECKOUT</button>
            <p className='delivery'>ESTIMATED DELIVERY BY {summary.deliveryDate}</p>
        </div>
    );
};

export default OrderSummary;
