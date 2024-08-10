import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import './style.scss';

const AddressSection = () => {
    const [useSameAddress, setUseSameAddress] = useState(false);

    const handleCheckboxChange = () => {
        setUseSameAddress(!useSameAddress);
    };

    return (
        <div className="address-section">
            {/* <div className="address-header">
                <h2>My address</h2>
                <span>DEFAULT ADDRESSES LISTED BELOW</span>
                <Button className="add-button">ADD</Button>
            </div> */}
            <div className="address-form">
                <div className="shipping-header">
                    <h3>Shipping Address:</h3>
                    <Button className="edit-button">Edit</Button>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="First Name" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Last Name" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Phone Number" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Address" variant="outlined" fullWidth multiline rows={3} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Pincode" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Country" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="State" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="City" variant="outlined" fullWidth />
                    </Grid>
                </Grid>
                
                <h3>Billing Address:</h3>
                <FormControlLabel
                    control={<Checkbox checked={useSameAddress} onChange={handleCheckboxChange} />}
                    label="Use same as shipping address"
                />
                
                {!useSameAddress && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField label="Name" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Phone Number" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Address" variant="outlined" fullWidth multiline rows={3} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Pincode" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Country" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="State" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="City" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="GST Number" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                )}
                
                <Button className="save-button">Save</Button>
            </div>
        </div>
    );
};

export default AddressSection;
