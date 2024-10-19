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

function AddAddressModal({ open, handleClose, formData, handleInputChange, handleAdd, loading }) {
    
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <div className="modal-title">
                Add New Address
                <button className="modal-close-button" onClick={handleClose}><CloseIcon /></button>
            </div>
            <DialogContent className="modal-content">
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
            </DialogContent>
            <div className="modal-actions">
                <Button onClick={handleClose} className="modal-button cancel-button">
                    Cancel
                </Button>
                <Button onClick={handleAdd} className="modal-button add-button">
                    {loading ? <CircularProgress size={24} /> : 'Add Address'}
                </Button>
            </div>
        </Dialog>
    );
}

export default AddAddressModal;
