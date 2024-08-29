// EditAddressModal.js

import React from 'react';
import {
    Dialog,
    DialogContent,
    TextField,
    Button,
    CircularProgress
} from '@mui/material';

import './style.css';

import CloseIcon from '@mui/icons-material/Close';

function EditAddressModal({ open, handleClose, formData, handleInputChange, handleUpdate, loading, selectedAddress }) {
    
    return (
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
    );
}

export default EditAddressModal;
