import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import {
    Box, Avatar, Button, TextField, RadioGroup, FormControlLabel, Radio, Typography, MenuItem, Select, useMediaQuery, useTheme, IconButton
} from '@mui/material';
import { AccountCircle, ShoppingBag, LocationOn, Edit } from '@mui/icons-material';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import InputMask from 'react-input-mask';
import axios from 'axios';

import './style.scss';

import MyOrdersTable from '../../components/MyOrdersTable';
import AddressSection from '../../components/AddressSection';
// import WishListSection from '../../components/WishListSection';

import { useAuth } from '../../context/AuthContext'

const ProfilePage = () => {
    const [selectedMenu, setSelectedMenu] = useState('My Account');
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        profileImage: '',
    });
    const [isEditable, setIsEditable] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const staticImage = 'https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=';

    const { userId } = useAuth();
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        // Trigger the file input click
        fileInputRef.current.click();
    };

    const handleImageChange = async (event) => {
        try {
            const file = event.target.files[0];

            if (file) {
                console.log('Selected file:', file);

                const compressedFile = await file; // Placeholder for compression logic if needed

                const data = new FormData();
                data.append("file", compressedFile);
                data.append("upload_preset", "eq5btcc4");

                await axios
                    .post(
                        `https://api.cloudinary.com/v1_1/dtivafy25/image/upload`,
                        data
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            const imageURL = response.data.url;
                            setProfile((prevProfile) => ({
                                ...prevProfile,
                                profileImage: imageURL
                            }));
                        }
                    });
            }
        } catch (error) {
            console.log("image upload error", error);
        }
    };


    useEffect(() => {
        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString); // Parse the date string

        const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with leading zero
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month and pad with leading zero
        const year = date.getUTCFullYear(); // Get full year

        return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
    };
    useEffect(() => {
        if (userId) {
            // Fetch user data on component load
            fetch(`https://maalana-backend.onrender.com/api/get-single-user/${userId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setProfile({
                            firstName: data.user.firstName || '',
                            lastName: data.user.lastName || '',
                            dateOfBirth: formatDate(data.user.dateofbirth) || '',
                            gender: data.user.gender || '',
                            phone: data.user.mobileNumber || '',
                            email: data.user.email || '',
                            profileImage: data.user.userImage || ''
                        });
                    }
                    if (data.user.userImage === staticImage && data.user.dateOfBirth === undefined) {
                        setIsEditable(true);
                    } else {
                        setIsEditable(false);
                    }
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [userId]);

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

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `https://maalana-backend.onrender.com/api/update-user-by-id/${userId}`,
                {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    dateofbirth: profile.dateOfBirth,
                    gender: profile.gender,
                    mobileNumber: profile.phone,
                    email: profile.email,
                    userImage: profile.profileImage,
                }
            );

            if (response.status === 200) {
                console.log('Profile updated successfully', response.data);
                setIsEditable(false);
                setSelectedMenu('My Address');
            } else {
                console.error('Error updating profile', response);
            }
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };


    const handleEditClick = () => {
        setIsEditable(true); // Enable edit mode
    };

    return (
        <Box className="profile-page-container">
             <Helmet>
                <title>Maalana-profile</title>
            </Helmet>
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
                        {/* <MenuItem value="Wishlist">
                            <FavoriteIcon sx={{ marginRight: '8px' }} /> Wishlist
                        </MenuItem> */}
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
                        {/* <Button
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
                        </Button> */}
                    </Box>
                )}
            </Box>
            <Box className="profile-page">

                {/* Profile Form Section */}
                <Box className="header-section">
                    <Typography variant="h4" className="title">{selectedMenu}</Typography>
                    {selectedMenu === 'My Account' && (
                        <IconButton className="edit-icon" color="primary" onClick={handleEditClick}>
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
                                    src={profile.profileImage || "profile_image_url"}
                                    alt="Profile"
                                />
                                <Box>
                                    <Typography variant="h5">{profile.firstName + " " + profile.lastName || "N/A"}</Typography>
                                    <input
                                        type='file'
                                        name='profile_image'
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        disabled={!isEditable}
                                    />
                                    {profile.profileImage === staticImage ?
                                        (<Button
                                            color="primary"
                                            onClick={handleButtonClick}
                                            disabled={!isEditable}
                                            sx={{ textTransform: 'capitalize' }}
                                        >
                                            Add Photo
                                        </Button>)
                                        : (<Button
                                            color="primary"
                                            onClick={handleButtonClick}
                                            disabled={!isEditable}
                                            sx={{ textTransform: 'capitalize' }}
                                        >
                                            Change Photo
                                        </Button>)
                                    }
                                </Box>
                            </Box>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleChange}
                                className="form-field"
                                disabled={!isEditable}
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
                                disabled={!isEditable}
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
                            <InputMask
                                mask="99/99/9999" 
                                value={profile.dateOfBirth}
                                onChange={handleChange}
                                disabled={!isEditable}
                            >
                                {() => (
                                    <TextField
                                        fullWidth
                                        label="Date of Birth"
                                        name="dateOfBirth"
                                        className="form-field"
                                        disabled={!isEditable}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#B9D514',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#B9D514',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#B9D514',
                                                },
                                            },
                                        }}
                                    />
                                )}
                            </InputMask>
                            <RadioGroup
                                row
                                name="gender"
                                value={profile.gender}
                                onChange={handleChange}
                                className="form-field gender-group"
                                disabled={!isEditable}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" disabled={!isEditable} />
                                <FormControlLabel value="female" control={<Radio />} label="Female" disabled={!isEditable} />
                            </RadioGroup>
                            <TextField
                                fullWidth
                                label="Phone No."
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                className="form-field"
                                disabled={!isEditable}
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
                                disabled={!isEditable}
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
                                disabled={!isEditable}
                                sx={{ textTransform: 'capitalize' }}
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
                            <AddressSection firstName={profile.firstName} lastName={profile.lastName} phone={profile.phone} />
                        </Box>
                    )}
                    {/* {selectedMenu === 'Wishlist' && (
                        <Box className="wishlist-section">
                            <WishListSection />
                        </Box>
                    )} */}
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
