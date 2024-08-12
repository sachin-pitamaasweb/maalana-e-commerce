import React from 'react';
import './AddressSection.scss';

const AddressSection = ({ addresses }) => {
    return (
        <div className="address-section">
            <h2>MY ADDRESSES</h2>
            {addresses.map(address => (
                <>
                    <div key={address.id} className="address-item">
                        <input type="radio" name="address" value={address.id} defaultChecked className="address-radio" />
                        <div className="address-buttons">
                            <button className="edit-btn">EDIT</button>
                            <button className="delete-btn">DELETE</button>
                        </div>
                    </div>
                    <p className='address'>{address.details}</p>
                    <p className='phone'>{address.phone}</p>
                </>
            ))}
        </div>
    );
};

export default AddressSection;
