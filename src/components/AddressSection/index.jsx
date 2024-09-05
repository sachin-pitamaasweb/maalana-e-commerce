import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Grid, Snackbar, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import './style.scss';

import { useAuth } from '../../context/AuthContext'

const AddressSection = ({ firstName, lastName, phone }) => {
    const navigate = useNavigate();
    const [useSameAddress, setUseSameAddress] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: firstName || '',
        lastName: lastName || '',
        phoneNumber: phone || '',
        address: '',
        pincode: '',
        country: '',
        state: '',
        city: '',
    });

    const [billingAddress, setBillingAddress] = useState({
        name: firstName || '',
        phoneNumber: phone || '',
        address: '',
        pincode: '',
        country: '',
        state: '',
        city: '',
        gstNumber: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [addressId, setAddressId] = useState(null);

    const { userId } = useAuth();

    useEffect(() => {
        const fetchShippingAddress = async () => {
            try {
                const response = await axios.get(`https://maalana-backend.onrender.com/api/get-my-shiped-address/${userId}`);
                if (response.status === 200 && response.data.success) {
                    const addressData = response.data.shipedaddress;
                    setAddressId(addressData[0]._id);
                     if(addressData[0]._id === null){
                        setIsEditable(true);
                     } else {
                        setIsEditable(false);
                     }
                    setShippingAddress({
                        address: addressData[0].address,
                        pincode: addressData[0].pincode,
                        country: addressData[0].country,
                        state: addressData[0].state,
                        city: addressData[0].city,
                    });
                    // If you want to initially use the same address for billing
                    setBillingAddress({
                        name: `${firstName} ${lastName}` || '',
                        phoneNumber: phone || '',
                        address: addressData[0].address,
                        pincode: addressData[0].pincode,
                        country: addressData[0].country,
                        state: addressData[0].state,
                        city: addressData[0].city,
                        gstNumber: '',
                    });
                }
            } catch (error) {
                console.error('Error fetching shipping address:', error);
            }
        };

        fetchShippingAddress();
    }, [userId]);

    const handleCheckboxChange = () => {
        setUseSameAddress(!useSameAddress);
    };

    const handleInputChange = (e, setAddress) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditable(true); // Enable all fields for editing
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://maalana-backend.onrender.com/api/create-shiped-address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    address: shippingAddress.address,
                    city: shippingAddress.city,
                    state: shippingAddress.state,
                    pincode: shippingAddress.pincode,
                    country: shippingAddress.country
                }),
            });
            const data = await response.json();

            setShippingAddress({
                address: data.address,
                pincode: data.pincode,
                country: data.country,
                state: data.state,
                city: data.city,
            });
             setIsEditable(false);
            setSnackbarMessage('Address saved successfully');
            setSnackbarSeverity('success');
            navigate('/products');

        } catch (error) {
            setSnackbarMessage('Error saving address');
            setSnackbarSeverity('error');
            console.error('Error saving shipping address:', error);
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
            setIsEditable(false);
        }
    };


    const handleUpdate = async () => {
        if (!shippingAddress) {
            console.error('No address data available');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.put(`https://maalana-backend.onrender.com/api/update-shiped-address/${addressId}`, {
                ...shippingAddress,
            });

            if (response.data.success) {
                setShippingAddress(response.data.shipedaddress);
                setIsEditable(false);
                setSnackbarMessage('Address updated successfully');
                setSnackbarSeverity('success');
                navigate('/products');
            } else {
                setSnackbarMessage('Error updating address');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage('Error updating address');
            setSnackbarSeverity('error');
            console.error('Error updating shipping address:', error);
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
            setIsEditable(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    console.log('addressId', addressId);

    return (
        <div className="address-section">
            <div className="address-form">
                <div className="shipping-header">
                    <h3>Shipping Address:</h3>
                    <Button className="edit-button" onClick={handleEditClick}>Edit</Button>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            // label="First Name"
                            name="firstName"
                            placeholder="Enter your first name"
                            variant="outlined"
                            fullWidth
                            value={shippingAddress.firstName}
                            onChange={(e) => handleInputChange(e, setShippingAddress)}
                            disabled={!isEditable}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="lastname"
                            placeholder="Enter your last name"
                            variant="outlined"
                            fullWidth
                            value={shippingAddress.lastName}
                            onChange={(e) => handleInputChange(e, setShippingAddress)}
                            disabled={!isEditable}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="phone"
                            placeholder="Enter your phone number"
                            variant="outlined"
                            fullWidth
                            value={shippingAddress.phoneNumber}
                            onChange={(e) => handleInputChange(e, setShippingAddress)}
                            disabled={!isEditable}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="address"
                            placeholder="Enter your address"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={shippingAddress.address}
                            onChange={(e) => handleInputChange(e, setShippingAddress)}
                            disabled={!isEditable}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="pincode"
                            placeholder='Enter your pincode'
                            variant="outlined"
                            fullWidth
                            value={shippingAddress.pincode}
                            onChange={(e) => handleInputChange(e, setShippingAddress)}
                            disabled={!isEditable}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="country"
                            placeholder="Enter your country"
                            variant="outlined"
                            fullWidth
                            value={shippingAddress.country}
                            onChange={(e) => handleInputChange(e, setShippingAddress)}
                            disabled={!isEditable}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="state"
                            placeholder="Enter your state"
                            variant="outlined"
                            fullWidth
                            value={shippingAddress.state}
                            onChange={(e) => handleInputChange(e, setShippingAddress)}
                            disabled={!isEditable}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="city"
                            placeholder="Enter your city"
                            variant="outlined"
                            fullWidth
                            value={shippingAddress.city}
                            onChange={(e) => handleInputChange(e, setShippingAddress)}
                            disabled={!isEditable}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            label="GST Number"
                            name="gstNumber"
                            variant="outlined"
                            fullWidth
                            value={billingAddress.gstNumber}
                            onChange={(e) => handleInputChange(e, setBillingAddress)}
                            disabled={!isEditable}
                        />
                    </Grid> */}
                </Grid>

                <h3>Billing Address:</h3>
                <FormControlLabel
                    control={<Checkbox checked={useSameAddress} onChange={handleCheckboxChange} />}
                    label="Use same as shipping address"
                />

                {!useSameAddress && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="name"
                                placeholder='Enter your name'
                                variant="outlined"
                                fullWidth
                                value={billingAddress.name}
                                onChange={(e) => handleInputChange(e, setBillingAddress)}
                                disabled={!isEditable}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                                variant="outlined"
                                fullWidth
                                value={billingAddress.phoneNumber}
                                onChange={(e) => handleInputChange(e, setBillingAddress)}
                                disabled={!isEditable}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="address"
                                placeholder="Enter your address"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={3}
                                value={billingAddress.address}
                                onChange={(e) => handleInputChange(e, setBillingAddress)}
                                disabled={!isEditable}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="pincode"
                                placeholder='Enter your pincode'
                                variant="outlined"
                                fullWidth
                                value={billingAddress.pincode}
                                onChange={(e) => handleInputChange(e, setBillingAddress)}
                                disabled={!isEditable}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="country"
                                placeholder='Enter your country'
                                variant="outlined"
                                fullWidth
                                value={billingAddress.country}
                                onChange={(e) => handleInputChange(e, setBillingAddress)}
                                disabled={!isEditable}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="state"
                                placeholder='Enter your state'
                                variant="outlined"
                                fullWidth
                                value={billingAddress.state}
                                onChange={(e) => handleInputChange(e, setBillingAddress)}
                                disabled={!isEditable}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="city"
                                placeholder='Enter your city'
                                variant="outlined"
                                fullWidth
                                value={billingAddress.city}
                                onChange={(e) => handleInputChange(e, setBillingAddress)}
                                disabled={!isEditable}
                            />
                        </Grid>
                    </Grid>
                )}

                <div className="action-buttons">
                    {isEditable ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdate}
                                sx={{ 
                                    textTransform: 'capitalize',
                                    marginRight: '10px',
                                    width: '48%',
                                    backgroundColor: '#B9D514 !important',
                                    color: '#000',
                                }}
                                disabled={loading}
                                startIcon={loading && <CircularProgress size={20} />}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{
                                    textTransform: 'capitalize',
                                    width: '48%'

                                }}
                                onClick={() => setIsEditable(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            className="save-button"
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={20} />}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </Button>
                    )}
                </div>
                {/* <Button className="save-button" disabled={!isEditable} onClick={handleSave}> {loading ? <CircularProgress size={24} /> : 'Save'}</Button> */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default AddressSection;
