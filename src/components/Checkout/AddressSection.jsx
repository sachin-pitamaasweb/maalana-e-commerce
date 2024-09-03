import React from 'react';
import './AddressSection.scss'; // Custom SCSS for AddressSection

const AddressSection = ({ profile, selectedAddress }) => {
  return (
    <div className="checkout-address-section">
      <h3 className="checkout-address-title">Shipping Address:</h3>
      <div className="checkout-address-grid">
        <div className="checkout-address-item">
          <label>First Name</label>
          <input type="text" value={profile?.firstName} disabled />
        </div>
        <div className="checkout-address-item">
          <label>Last Name</label>
          <input type="text" value={profile?.lastName} disabled />
        </div>
        <div className="checkout-address-item">
          <label>Phone Number</label>
          <input type="text" value={profile?.phone} disabled />
        </div>
        <div className="checkout-address-item">
          <label>Email Address</label>
          <input type="text" value={profile?.email} disabled />
        </div>
        <div className="checkout-address-item full-width">
          <label>Address</label>
          <textarea value={selectedAddress?.address} disabled rows="3" />
        </div>
        <div className="checkout-address-item">
          <label>Pincode</label>
          <input type="text" value={selectedAddress?.pincode} disabled />
        </div>
        <div className="checkout-address-item">
          <label>Country</label>
          <input type="text" value={selectedAddress?.country} disabled />
        </div>
        <div className="checkout-address-item">
          <label>State</label>
          <input type="text" value={selectedAddress?.state} disabled />
        </div>
        <div className="checkout-address-item">
          <label>City</label>
          <input type="text" value={selectedAddress?.city} disabled />
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
