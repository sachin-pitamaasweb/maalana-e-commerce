import React, { useEffect, useState } from 'react';
import {
    Box, Avatar, Button, TextField, RadioGroup, FormControlLabel, Radio, Typography, MenuItem, Select, useMediaQuery, useTheme, IconButton
} from '@mui/material';
import { AccountCircle, ShoppingBag, LocationOn, Edit } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.scss';

import MyOrdersTable from '../../components/MyOrdersTable';
import AddressSection from '../../components/AddressSection';
import WishListSection from '../../components/WishListSection';



const ProfilePage = () => {
    const [selectedMenu, setSelectedMenu] = useState('My Account');
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: ''
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleSave = () => {
        console.log('Profile Saved', profile);
    };

    return (
        <Box className="profile-page-container">
            <Box className="filter-section">
                {isMobile ? (
                    <Select
                        className="filter-dropdown"
                        value={selectedMenu}
                        onChange={(e) => handleMenuClick(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Select Menu' }}
                    >
                        <MenuItem value="My Account">
                            <AccountCircle sx={{ marginRight: '8px' }} /> My Account
                        </MenuItem>
                        <MenuItem value="My Orders">
                            <ShoppingBag sx={{ marginRight: '8px' }} /> My Orders
                        </MenuItem>
                        <MenuItem value="My Address">
                            <LocationOn sx={{ marginRight: '8px' }} /> My Address
                        </MenuItem>
                        <MenuItem value="Wishlist">
                            <FavoriteIcon sx={{ marginRight: '8px' }} /> Wishlist
                        </MenuItem>
                    </Select>
                ) : (
                    <Box className="filter-buttons">
                        <Button
                            variant={selectedMenu === 'My Account' ? "contained" : "outlined"}
                            startIcon={<AccountCircle />}
                            onClick={() => handleMenuClick('My Account')}
                            sx={{
                                backgroundColor: selectedMenu === 'My Account' ? '#fff' : '#EAF2B8',
                                color: '#000',
                                '& .MuiButton-startIcon': {
                                    backgroundColor: '#B9D514',
                                    borderRadius: '50%',
                                    p: '4px'
                                },
                                '&:hover': {
                                    backgroundColor: selectedMenu === 'My Orders' ? '#fff' : '#EAF2B8'
                                },
                                border: 'none !important'
                            }}
                        >
                            My Account
                        </Button>
                        <Button
                            variant={selectedMenu === 'My Orders' ? "contained" : "outlined"}
                            startIcon={<ShoppingBag />}
                            onClick={() => handleMenuClick('My Orders')}
                            sx={{
                                backgroundColor: selectedMenu === 'My Orders' ? '#fff' : '#EAF2B8',
                                color: '#000',
                                '& .MuiButton-startIcon': {
                                    backgroundColor: '#B9D514',
                                    borderRadius: '50%',
                                    p: '4px'
                                },
                                '&:hover': {
                                    backgroundColor: selectedMenu === 'My Orders' ? '#fff' : '#EAF2B8'
                                },
                                border: 'none !important'
                            }}
                        >
                            My Orders
                        </Button>
                        <Button
                            variant={selectedMenu === 'My Address' ? "contained" : "outlined"}
                            startIcon={<LocationOn />}
                            onClick={() => handleMenuClick('My Address')}
                            sx={{
                                backgroundColor: selectedMenu === 'My Address' ? '#fff' : '#EAF2B8',
                                color: '#000',
                                '& .MuiButton-startIcon': {
                                    backgroundColor: '#B9D514',
                                    borderRadius: '50%',
                                    p: '4px'
                                },
                                '&:hover': {
                                    backgroundColor: selectedMenu === 'My Address' ? '#fff' : '#EAF2B8'
                                },
                                border: 'none !important'
                            }}
                        >
                            My Address
                        </Button>
                        <Button
                            variant={selectedMenu === 'Wishlist' ? "contained" : "outlined"}
                            startIcon={<FavoriteIcon />}
                            onClick={() => handleMenuClick('Wishlist')}
                            sx={{
                                backgroundColor: selectedMenu === 'Wishlist' ? '#fff' : '#EAF2B8',
                                color: '#000',
                                '& .MuiButton-startIcon': {
                                    backgroundColor: '#B9D514',
                                    borderRadius: '50%',
                                    p: '4px'
                                },
                                '&:hover': {
                                    backgroundColor: selectedMenu === 'Wishlist' ? '#fff' : '#EAF2B8'
                                },
                                border: 'none !important'
                            }}
                        >
                            Wishlist
                        </Button>
                    </Box>
                )}
            </Box>
            <Box className="profile-page">

                {/* Profile Form Section */}
                <Box className="header-section">
                    <Typography variant="h4" className="title">{selectedMenu}</Typography>
                    {selectedMenu === 'My Account' && (
                        <IconButton className="edit-icon" color="primary">
                            <Edit sx={{ color: '#B9D514' }} />
                        </IconButton>
                    )}
                </Box>
                <Box className="profile-form-section">

                    {selectedMenu === 'My Account' && (
                        <Box className="form-container">
                            <Box className="form-header">
                                <Avatar
                                    className="avatar"
                                    src="profile_image_url"
                                    alt="Profile"
                                />
                                <Box>
                                    <Typography variant="h5">Lily</Typography>
                                </Box>
                            </Box>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleChange}
                                className="form-field"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#B9D514'
                                        }
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleChange}
                                className="form-field"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#B9D514'
                                        }
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                name="dateOfBirth"
                                value={profile.dateOfBirth}
                                onChange={handleChange}
                                className="form-field"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#B9D514'
                                        }
                                    }
                                }}
                            />
                            <RadioGroup
                                row
                                name="gender"
                                value={profile.gender}
                                onChange={handleChange}
                                className="form-field gender-group"
                            >
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            </RadioGroup>
                            <TextField
                                fullWidth
                                label="Phone No."
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                className="form-field"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#B9D514'
                                        }
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                className="form-field"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#B9D514'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#B9D514'
                                        }
                                    }
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                className="save-button"
                            >
                                Save Changes
                            </Button>
                        </Box>
                    )}

                    {selectedMenu === 'My Orders' && (
                        <Box className="orders-section">
                            <MyOrdersTable />
                        </Box>
                    )}
                    {selectedMenu === 'My Address' && (
                        <Box className="address-section">
                            <AddressSection />
                        </Box>
                    )}
                    {selectedMenu === 'Wishlist' && (
                        <Box className="wishlist-section">
                            <WishListSection />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
