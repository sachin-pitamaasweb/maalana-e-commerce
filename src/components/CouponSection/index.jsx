import React from 'react';
import './CouponSection.scss';

const CouponSection = () => {
    return (
        <div className="coupon-section">
            <button className="coupon-btn">HAVE A COUPON?</button>
            <input type="text" className="coupon-input" placeholder="Enter coupon code" />
        </div>
    );
};

export default CouponSection;
