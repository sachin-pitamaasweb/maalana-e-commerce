import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, TextField } from '@mui/material';
import { Phone, LocationOn, Email } from '@mui/icons-material';
import './style.scss'; // For custom styling like background images

const Contact = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        }
    })
    return (
        <>
            <Box className="contact-section">
                <Typography variant="h4" gutterBottom color="white">
                    Connect with Us :
                </Typography>
                <Typography variant="subtitle1" gutterBottom color="white" className="sub-title">
                    Let's Chat Sweetness!
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={4}>
                        <Paper className="contact-item" elevation={4}>
                            <Phone fontSize="large" sx={{ color: '#B9D514'}}/>
                            <Typography variant="h6">+91 93170-05000</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className="contact-item" elevation={4}>
                            <LocationOn fontSize="large" sx={{ color: '#B9D514'}} />
                            <Typography variant="h6">Ludhiana, Punjab, India</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className="contact-item" elevation={4}>
                            <Email fontSize="large" sx={{ color: '#B9D514'}} />
                            <Typography variant="h6">123@gmail.com</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box className="write-section" sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom className='title-write' align="center">
                    Write to Us
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                className="input-field"
                                InputProps={{
                                    sx: {
                                        borderRadius: '50px',
                                        backgroundColor: '#fff',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                className="input-field"
                                InputProps={{
                                    sx: {
                                        borderRadius: '50px',
                                        backgroundColor: '#fff',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        fullWidth
                        label="Phone No."
                        variant="outlined"
                        className="input-field"
                        InputProps={{
                            sx: {
                                borderRadius: '50px',
                                backgroundColor: '#fff',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        className="input-field"
                        InputProps={{
                            sx: {
                                borderRadius: '50px',
                                backgroundColor: '#fff',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={4}
                        className="input-field"
                        InputProps={{
                            sx: {
                                borderRadius: '20px',
                                backgroundColor: '#fff',
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: '50px',
                            padding: '10px 30px',
                            backgroundColor: '#fff',
                            color: '#B9D514',
                            boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
                            '&:hover': {
                                backgroundColor: '#f1f1f1',
                            },
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Contact;
