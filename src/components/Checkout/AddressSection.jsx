import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddressSection.scss'; // Custom SCSS for AddressSection

const AddressSection = ({ profile, selectedAddress, addresses = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(addresses.findIndex(addr => addr._id === selectedAddress?._id) || 0);
  const navigate = useNavigate();

  // Handle back navigation
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  // Handle address selection
  const handleAddressSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="checkout-address-section">
      {/* Back arrow button */}
      <button className="back-button" onClick={handleBackClick}>
        ← Back
      </button>

      <h3 className="checkout-address-title">Shipping Address:</h3>

      {/* Display a list of addresses */}
      {addresses.length > 0 && (
        <div className="address-list">
          {addresses.map((address, index) => (
            <div
              key={address._id}
              className={`address-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleAddressSelect(index)}
            >
              <p><strong>{address.address}</strong></p>
              <p>{address.city}, {address.state}, {address.country}</p>
              <p>Pincode: {address.pincode}</p>
            </div>
          ))}
        </div>
      )}

      {/* Display the selected address details */}
      <div className="checkout-address-grid">
        <div className="checkout-address-item">
          <label>First Name</label>
          <input type="text" value={profile?.firstName || ''} disabled />
        </div>
        <div className="checkout-address-item">
          <label>Last Name</label>
          <input type="text" value={profile?.lastName || ''} disabled />
        </div>
        <div className="checkout-address-item">
          <label>Phone Number</label>
          <input type="text" value={profile?.phone || ''} disabled />
        </div>
        <div className="checkout-address-item">
          <label>Email Address</label>
          <input type="text" value={profile?.email || ''} disabled />
        </div>
        <div className="checkout-address-item full-width">
          <label>Address</label>
          <textarea value={addresses[selectedIndex]?.address || ''} disabled rows="3" />
        </div>
        <div className="checkout-address-item">
          <label>Pincode</label>
          <input type="text" value={addresses[selectedIndex]?.pincode || ''} disabled />
        </div>
        <div className="checkout-address-item">
          <label>Country</label>
          <input type="text" value={addresses[selectedIndex]?.country || ''} disabled />
        </div>
        <div className="checkout-address-item">
          <label>State</label>
          <input type="text" value={addresses[selectedIndex]?.state || ''} disabled />
        </div>
        <div className="checkout-address-item">
          <label>City</label>
          <input type="text" value={addresses[selectedIndex]?.city || ''} disabled />
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
