import React, { useState } from 'react';
import { Dialog, DialogContent, Button, TextField, CircularProgress  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

import './AddressSection.scss';

const AddressSection = ({ addresses, onAddressUpdate }) => {
    const [open, setOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [formData, setFormData] = useState({
        address: '',
        pincode: '',
        country: '',
        state: '',
        city: ''
    });
    const [loading, setLoading] = useState(false);

    const handleEditClick = (address) => {
        if (address) {
            setSelectedAddress(address);
            setFormData({
                address: address.address,
                pincode: address.pincode,
                country: address.country,
                state: address.state,
                city: address.city
            });
            setOpen(true);
        } else {
            console.error('Address is not defined');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        if (!selectedAddress) {
            console.error('No address selected');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put(
                `http://localhost:8000/api/update-shiped-address/${selectedAddress._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                console.log('Address updated successfully:', response.data.shipedaddress);
                await onAddressUpdate();
                setOpen(false);
            } else {
                console.error('Failed to update address:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating address:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className="address-section">
                <h2>MY ADDRESSES</h2>
                {addresses.map(address => (
                    <>
                        <div key={address.id} className="address-item">
                            <input type="radio" name="address" value={address.id} defaultChecked className="address-radio" />
                            <div className="address-buttons">
                                <button className="edit-btn" onClick={() => handleEditClick(address)}>EDIT</button>
                                <button className="delete-btn">DELETE</button>
                            </div>
                        </div>
                        <p className='address'>{address.address} {address.city} {address.state} {address.country} {address.pincode}</p>
                        <p className='phone'>{address.phone}</p>
                    </>
                ))}
            </div>
            {/* Modal for editing address */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <div className="modal-title">
                    Edit Address
                    <button className="modal-close-button" onClick={handleClose}><CloseIcon /></button>
                </div>
                <DialogContent className="modal-content">
                    {selectedAddress ? (
                        <>
                            <TextField
                                name="address"
                                label="Address"
                                fullWidth
                                margin="normal"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            <TextField
                                name="pincode"
                                label="Pincode"
                                fullWidth
                                margin="normal"
                                value={formData.pincode}
                                onChange={handleInputChange}
                            />
                            <TextField
                                name="country"
                                label="Country"
                                fullWidth
                                margin="normal"
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                            <TextField
                                name="state"
                                label="State"
                                fullWidth
                                margin="normal"
                                value={formData.state}
                                onChange={handleInputChange}
                            />
                            <TextField
                                name="city"
                                label="City"
                                fullWidth
                                margin="normal"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </>
                    ) : (
                        <p>No address selected</p>
                    )}
                </DialogContent>
                <div className="modal-actions">
                    <Button onClick={handleClose} className="modal-button cancel-button">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} className="modal-button update-button">
                    {loading ? <CircularProgress size={24} /> : 'Update'}
                    </Button>
                </div>
            </Dialog>

        </>
    );
};

export default AddressSection;
