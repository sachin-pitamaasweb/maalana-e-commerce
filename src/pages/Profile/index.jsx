// import React, { useEffect, useState, useRef } from 'react';
// import { Helmet } from 'react-helmet';
// import {
//     Box, Avatar, Button, TextField, RadioGroup, FormControlLabel, Radio, Typography, MenuItem, Select, useMediaQuery, useTheme, IconButton
// } from '@mui/material';
// import { AccountCircle, ShoppingBag, LocationOn, Edit } from '@mui/icons-material';
// // import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// import InputMask from 'react-input-mask';
// import axios from 'axios';

// import './style.scss';

// import MyOrdersTable from '../../components/MyOrdersTable';
// import AddressSection from '../../components/AddressSection';
// // import WishListSection from '../../components/WishListSection';

// import { useAuth } from '../../context/AuthContext'

// const ProfilePage = () => {
//     const [selectedMenu, setSelectedMenu] = useState('My Account');
//     const [profile, setProfile] = useState({
//         firstName: '',
//         lastName: '',
//         dateOfBirth: '',
//         gender: '',
//         phone: '',
//         email: '',
//         profileImage: '',
//     });
//     const [isEditable, setIsEditable] = useState(false);
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const staticImage = 'https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=';

//     const { userId } = useAuth();
//     const fileInputRef = useRef(null);

//     const handleButtonClick = () => {
//         // Trigger the file input click
//         fileInputRef.current.click();
//     };

//     const handleImageChange = async (event) => {
//         try {
//             const file = event.target.files[0];

//             if (file) {
//                 console.log('Selected file:', file);

//                 const compressedFile = await file; // Placeholder for compression logic if needed

//                 const data = new FormData();
//                 data.append("file", compressedFile);
//                 data.append("upload_preset", "eq5btcc4");

//                 await axios
//                     .post(
//                         `https://api.cloudinary.com/v1_1/dtivafy25/image/upload`,
//                         data
//                     )
//                     .then((response) => {
//                         if (response.status === 200) {
//                             const imageURL = response.data.url;
//                             setProfile((prevProfile) => ({
//                                 ...prevProfile,
//                                 profileImage: imageURL
//                             }));
//                         }
//                     });
//             }
//         } catch (error) {
//             console.log("image upload error", error);
//         }
//     };


//     useEffect(() => {
//         document.body.style.backgroundColor = '#B9D514';
//         return () => {
//             document.body.style.backgroundColor = '';
//         };
//     }, []);

//     const formatDate = (dateString) => {
//         const date = new Date(dateString); // Parse the date string

//         const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with leading zero
//         const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month and pad with leading zero
//         const year = date.getUTCFullYear(); // Get full year

//         return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
//     };
//     useEffect(() => {
//         if (userId) {
//             // Fetch user data on component load
//             fetch(`https://maalana-backend.onrender.com/api/get-single-user/${userId}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.success) {
//                         setProfile({
//                             firstName: data.user.firstName || '',
//                             lastName: data.user.lastName || '',
//                             dateOfBirth: formatDate(data.user.dateofbirth) || '',
//                             gender: data.user.gender || '',
//                             phone: data.user.mobileNumber || '',
//                             email: data.user.email || '',
//                             profileImage: data.user.userImage || ''
//                         });
//                     }
//                     if (data.user.userImage === staticImage && data.user.dateOfBirth === undefined) {
//                         setIsEditable(true);
//                     } else {
//                         setIsEditable(false);
//                     }
//                 })
//                 .catch(error => console.error('Error fetching user data:', error));
//         }
//     }, [userId]);

//     const handleMenuClick = (menu) => {
//         setSelectedMenu(menu);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProfile({
//             ...profile,
//             [name]: value
//         });
//     };

//     const handleSave = async () => {
//         try {
//             const response = await axios.put(
//                 `https://maalana-backend.onrender.com/api/update-user-by-id/${userId}`,
//                 {
//                     firstName: profile.firstName,
//                     lastName: profile.lastName,
//                     dateofbirth: profile.dateOfBirth,
//                     gender: profile.gender,
//                     mobileNumber: profile.phone,
//                     email: profile.email,
//                     userImage: profile.profileImage,
//                 }
//             );

//             if (response.status === 200) {
//                 console.log('Profile updated successfully', response.data);
//                 setIsEditable(false);
//                 setSelectedMenu('My Address');
//             } else {
//                 console.error('Error updating profile', response);
//             }
//         } catch (error) {
//             console.error('Error updating profile', error);
//         }
//     };


//     const handleEditClick = () => {
//         setIsEditable(true); // Enable edit mode
//     };

//     return (
//         <Box className="profile-page-container">
//             <Helmet>
//                 <title>Maalana-profile</title>
//             </Helmet>
//             <Box className="filter-section">
//                 {isMobile ? (
//                     <Select
//                         className="filter-dropdown"
//                         value={selectedMenu}
//                         onChange={(e) => handleMenuClick(e.target.value)}
//                         displayEmpty
//                         inputProps={{ 'aria-label': 'Select Menu' }}
//                     >
//                         <MenuItem value="My Account">
//                             <AccountCircle sx={{ marginRight: '8px' }} /> My Account
//                         </MenuItem>
//                         <MenuItem value="My Orders">
//                             <ShoppingBag sx={{ marginRight: '8px' }} /> My Orders
//                         </MenuItem>
//                         <MenuItem value="My Address">
//                             <LocationOn sx={{ marginRight: '8px' }} /> My Address
//                         </MenuItem>
//                         {/* <MenuItem value="Wishlist">
//                             <FavoriteIcon sx={{ marginRight: '8px' }} /> Wishlist
//                         </MenuItem> */}
//                     </Select>
//                 ) : (
//                     <Box className="filter-buttons">
//                         <Button
//                             variant={selectedMenu === 'My Account' ? "contained" : "outlined"}
//                             startIcon={<AccountCircle />}
//                             onClick={() => handleMenuClick('My Account')}
//                             sx={{
//                                 backgroundColor: selectedMenu === 'My Account' ? '#fff' : '#EAF2B8',
//                                 color: '#000',
//                                 '& .MuiButton-startIcon': {
//                                     backgroundColor: '#B9D514',
//                                     borderRadius: '50%',
//                                     p: '4px'
//                                 },
//                                 '&:hover': {
//                                     backgroundColor: selectedMenu === 'My Orders' ? '#fff' : '#EAF2B8'
//                                 },
//                                 border: 'none !important'
//                             }}
//                         >
//                             My Account
//                         </Button>
//                         <Button
//                             variant={selectedMenu === 'My Orders' ? "contained" : "outlined"}
//                             startIcon={<ShoppingBag />}
//                             onClick={() => handleMenuClick('My Orders')}
//                             sx={{
//                                 backgroundColor: selectedMenu === 'My Orders' ? '#fff' : '#EAF2B8',
//                                 color: '#000',
//                                 '& .MuiButton-startIcon': {
//                                     backgroundColor: '#B9D514',
//                                     borderRadius: '50%',
//                                     p: '4px'
//                                 },
//                                 '&:hover': {
//                                     backgroundColor: selectedMenu === 'My Orders' ? '#fff' : '#EAF2B8'
//                                 },
//                                 border: 'none !important'
//                             }}
//                         >
//                             My Orders
//                         </Button>
//                         <Button
//                             variant={selectedMenu === 'My Address' ? "contained" : "outlined"}
//                             startIcon={<LocationOn />}
//                             onClick={() => handleMenuClick('My Address')}
//                             sx={{
//                                 backgroundColor: selectedMenu === 'My Address' ? '#fff' : '#EAF2B8',
//                                 color: '#000',
//                                 '& .MuiButton-startIcon': {
//                                     backgroundColor: '#B9D514',
//                                     borderRadius: '50%',
//                                     p: '4px'
//                                 },
//                                 '&:hover': {
//                                     backgroundColor: selectedMenu === 'My Address' ? '#fff' : '#EAF2B8'
//                                 },
//                                 border: 'none !important'
//                             }}
//                         >
//                             My Address
//                         </Button>
//                         {/* <Button
//                             variant={selectedMenu === 'Wishlist' ? "contained" : "outlined"}
//                             startIcon={<FavoriteIcon />}
//                             onClick={() => handleMenuClick('Wishlist')}
//                             sx={{
//                                 backgroundColor: selectedMenu === 'Wishlist' ? '#fff' : '#EAF2B8',
//                                 color: '#000',
//                                 '& .MuiButton-startIcon': {
//                                     backgroundColor: '#B9D514',
//                                     borderRadius: '50%',
//                                     p: '4px'
//                                 },
//                                 '&:hover': {
//                                     backgroundColor: selectedMenu === 'Wishlist' ? '#fff' : '#EAF2B8'
//                                 },
//                                 border: 'none !important'
//                             }}
//                         >
//                             Wishlist
//                         </Button> */}
//                     </Box>
//                 )}
//             </Box>
//             <Box className="profile-page">

//                 {/* Profile Form Section */}
//                 <Box className="header-section">
//                     <Typography variant="h4" className="title">{selectedMenu}</Typography>
//                     {selectedMenu === 'My Account' && (
//                         <IconButton className="edit-icon" color="primary" onClick={handleEditClick}>
//                             <Edit sx={{ color: '#B9D514' }} />
//                         </IconButton>
//                     )}
//                 </Box>
//                 <Box className="profile-form-section">

//                     {selectedMenu === 'My Account' && (
//                         <Box className="form-container">
//                             <Box className="form-header">
//                                 <Avatar
//                                     className="avatar"
//                                     src={profile.profileImage || "profile_image_url"}
//                                     alt="Profile"
//                                 />
//                                 <Box>
//                                     <Typography variant="h5">{profile.firstName + " " + profile.lastName || "N/A"}</Typography>
//                                     <input
//                                         type='file'
//                                         name='profile_image'
//                                         onChange={handleImageChange}
//                                         ref={fileInputRef}
//                                         style={{ display: 'none' }}
//                                         disabled={!isEditable}
//                                     />
//                                     {profile.profileImage === staticImage ?
//                                         (<Button
//                                             color="primary"
//                                             onClick={handleButtonClick}
//                                             disabled={!isEditable}
//                                             sx={{ textTransform: 'capitalize' }}
//                                         >
//                                             Add Photo
//                                         </Button>)
//                                         : (<Button
//                                             color="primary"
//                                             onClick={handleButtonClick}
//                                             disabled={!isEditable}
//                                             sx={{ textTransform: 'capitalize' }}
//                                         >
//                                             Change Photo
//                                         </Button>)
//                                     }
//                                 </Box>
//                             </Box>
//                             <TextField
//                                 fullWidth
//                                 label="First Name"
//                                 name="firstName"
//                                 value={profile.firstName}
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 disabled={!isEditable}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         '& fieldset': {
//                                             borderColor: '#B9D514'
//                                         },
//                                         '&:hover fieldset': {
//                                             borderColor: '#B9D514'
//                                         },
//                                         '&.Mui-focused fieldset': {
//                                             borderColor: '#B9D514'
//                                         }
//                                     }
//                                 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Last Name"
//                                 name="lastName"
//                                 value={profile.lastName}
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 disabled={!isEditable}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         '& fieldset': {
//                                             borderColor: '#B9D514'
//                                         },
//                                         '&:hover fieldset': {
//                                             borderColor: '#B9D514'
//                                         },
//                                         '&.Mui-focused fieldset': {
//                                             borderColor: '#B9D514'
//                                         }
//                                     }
//                                 }}
//                             />
//                             <InputMask
//                                 mask="99/99/9999"
//                                 value={profile.dateOfBirth}
//                                 onChange={handleChange}
//                                 disabled={!isEditable}
//                             >
//                                 {() => (
//                                     <TextField
//                                         fullWidth
//                                         label="Date of Birth"
//                                         name="dateOfBirth"
//                                         className="form-field"
//                                         disabled={!isEditable}
//                                         sx={{
//                                             '& .MuiOutlinedInput-root': {
//                                                 '& fieldset': {
//                                                     borderColor: '#B9D514',
//                                                 },
//                                                 '&:hover fieldset': {
//                                                     borderColor: '#B9D514',
//                                                 },
//                                                 '&.Mui-focused fieldset': {
//                                                     borderColor: '#B9D514',
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 )}
//                             </InputMask>
//                             <RadioGroup
//                                 row
//                                 name="gender"
//                                 value={profile.gender}
//                                 onChange={handleChange}
//                                 className="form-field gender-group"
//                                 disabled={!isEditable}
//                             >
//                                 <FormControlLabel value="male" control={<Radio />} label="Male" disabled={!isEditable} />
//                                 <FormControlLabel value="female" control={<Radio />} label="Female" disabled={!isEditable} />
//                             </RadioGroup>
//                             <TextField
//                                 fullWidth
//                                 label="Phone No."
//                                 name="phone"
//                                 value={profile.phone}
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 disabled={!isEditable}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         '& fieldset': {
//                                             borderColor: '#B9D514'
//                                         },
//                                         '&:hover fieldset': {
//                                             borderColor: '#B9D514'
//                                         },
//                                         '&.Mui-focused fieldset': {
//                                             borderColor: '#B9D514'
//                                         }
//                                     }
//                                 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Email Address"
//                                 name="email"
//                                 value={profile.email}
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 disabled={!isEditable}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         '& fieldset': {
//                                             borderColor: '#B9D514'
//                                         },
//                                         '&:hover fieldset': {
//                                             borderColor: '#B9D514'
//                                         },
//                                         '&.Mui-focused fieldset': {
//                                             borderColor: '#B9D514'
//                                         }
//                                     }
//                                 }}
//                             />
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleSave}
//                                 className="save-button"
//                                 disabled={!isEditable}
//                                 sx={{ textTransform: 'capitalize' }}
//                             >
//                                 Save Changes
//                             </Button>
//                         </Box>
//                     )}

//                     {selectedMenu === 'My Orders' && (
//                         <Box className="orders-section">
//                             <MyOrdersTable />
//                         </Box>
//                     )}
//                     {selectedMenu === 'My Address' && (
//                         <Box className="address-section">
//                             <AddressSection firstName={profile.firstName} lastName={profile.lastName} phone={profile.phone} />
//                         </Box>
//                     )}
//                     {/* {selectedMenu === 'Wishlist' && (
//                         <Box className="wishlist-section">
//                             <WishListSection />
//                         </Box>
//                     )} */}
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default ProfilePage;


import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';
import CityIcon from '@mui/icons-material/LocationCity';
import Pagination from '@mui/material/Pagination';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/validation';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Profile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [profile, setProfile] = useState({
    fullName: '',
    dateofbirth: '',
    gender: '',
    mobileNumber: '',
    email: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    pincode: '',
    country: '',
    state: '',
    city: '',
  });
  const [profileEdited, setProfileEdited] = useState(false);
  const [addressEdited, setAddressEdited] = useState(false);
  const { userId } = useAuth();
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [addressExists, setAddressExists] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    document.body.style.backgroundColor = '#B9D514';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Fetch profile data
  useEffect(() => {
    if (userId) {
      fetch(`https://maalana-backend.onrender.com/api/get-single-user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setProfile({
            ...data.user,
            fullName: `${data.user.firstName} ${data.user.lastName}`,
          });
          setProfileImage(data.user.userImage);
        })
        .catch((error) => console.error(error));
    }
  }, [userId]);

  // Fetch shipping address
  useEffect(() => {
    if (userId) {
      fetch(`https://maalana-backend.onrender.com/api/get-my-shiped-address/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setAddressId(data.shipedaddress[0]._id);
          setShippingAddress(data.shipedaddress ? data.shipedaddress[0] : {});
          setAddressExists(data.shipedaddress ? true : false);
        })
        .catch((error) => console.error(error));
    }
  }, [userId]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-orders-by-user-id/${userId}`);
        if (response.data.success) {
          setOrders(response.data.data || []); // Ensure orders data is not undefined
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  // Function to handle profile image change and upload to Cloudinary
  const changeProfileImage = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        console.log('Selected file:', file);

        // Create a new FormData instance to hold the file for upload
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'eq5btcc4'); // Your Cloudinary upload preset

        // Make the POST request to Cloudinary
        const response = await axios.post('https://api.cloudinary.com/v1_1/dtivafy25/image/upload', data);

        if (response.status === 200) {
          const imageURL = response.data.url; // Get the image URL from the response
          setProfileImage(imageURL); // Update the profile image in the state
          setProfile((prevProfile) => ({
            ...prevProfile,
            profileImage: imageURL, // Update the profile image in the profile state
          }));
          console.log('Image uploaded successfully:', imageURL);
        }
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  // Handle profile edit state
  const handleEdit = () => {
    setProfileEdited(true);
  };

  // Handle profile save and update API call
  const handleSave = async () => {
    try {
      setProfileEdited(false);
      const response = await axios.put(
        `https://maalana-backend.onrender.com/api/update-user-by-id/${userId}`,
        {
          firstName: profile.fullName.split(' ')[0],
          lastName: profile.fullName.split(' ')[1],
          dateofbirth: profile.dateofbirth,
          gender: profile.gender,
          mobileNumber: profile.mobileNumber,
          email: profile.email,
          userImage: profileImage,
        }
      );

      if (response.data.success) {
        setSnackbarMessage('Profile updated successfully!');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage('Failed to update profile.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage('An error occurred while updating the profile.');
      setSnackbarSeverity('error');
      console.error('An error occurred while updating the profile:', error);
    } finally {
      setSnackbarOpen(true); // Show the snackbar
    }
  };


  // Handle address save function
  const handleSaveAddress = async () => {
    try {
      // Make API call to update the shipping address
      const response = await axios.put(
        `https://maalana-backend.onrender.com/api/update-shiped-address/${addressId}`,
        {
          ...shippingAddress,
        }
      );

      if (response.status === 200) {
        console.log('Address updated successfully:', response.data);
        setSnackbarMessage('Address updated successfully!');
        setSnackbarSeverity('success');
        setAddressEdited(false);
      } else {
        setSnackbarMessage('Failed to update address. Please try again.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      setSnackbarMessage('Failed to update address. Please try again.');
      setSnackbarSeverity('error');
    }
  };



  // Handle page change for pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle input changes and update the profile state
  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    // Update profile state
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));

    // If the changed input is the pincode and its length is 6, call the API
    if (name === 'pincode' && value.length === 6) {
      console.log("Fetching pincode details for:", value);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await response.json();

        if (data && data.length > 0 && data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];

          // Update the shipping address state based on the fetched data
          setShippingAddress((prevAddress) => ({
            ...prevAddress,
            pincode: value,
            country: postOffice.Country,
            state: postOffice.State,
            city: postOffice.District,
          }));
        } else {
          console.error("Pincode not found or API response was unsuccessful.");
        }
      } catch (error) {
        console.error("Error fetching pincode details:", error);
      }
    }
  };

  const handleOrderDetails = (orderNumber) => {
    navigate(`/order-details/${orderNumber}`, { state: { orderNumber } });
  }
  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  }

  const handleSaveNewAddress = async () => {
    try {
      const response = await axios.post(
        'https://maalana-backend.onrender.com/api/add-shipping-address',
        shippingAddress
      );
      if (response.status === 200) {
        console.log('Address added successfully:', response.data);
        setSnackbarMessage('Address added successfully!');
        setSnackbarSeverity('success');
        setIsAdded(false); // Reset to initial state after successful addition
      } else {
        setSnackbarMessage('Failed to add address. Please try again.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      setSnackbarMessage('Failed to add address. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true); // Open the snackbar with the result message
    }
  };

  const handleAddButtonClick = () => {
    setIsAdded(true);
    setAddressEdited(true);
  };

  const ordersPerPage = 3; // Number of orders to display per page
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Calculate the orders to display based on the current page
  const displayedOrders = orders.slice((page - 1) * ordersPerPage, page * ordersPerPage);

  return (
    <div className="user-profile-container">
      {/* User Profile Section */}
      <div className="user-profile-card">
        <div className="user-profile-card-header">
          <h2>Profile Information</h2>
          {!profileEdited ? (
            <button className="user-profile-button" onClick={handleEdit}>
              <EditIcon /> Edit
            </button>
          ) : (
            <button className="user-profile-button" onClick={handleSave}>
              Save
            </button>
          )}
        </div>
        <div className="user-profile-card-content">
          <div className="user-profile-flex">
            <div>
              <img
                src={profileImage || 'https://via.placeholder.com/150'}
                alt="User profile"
                className="user-profile-image"
                onClick={() => document.getElementById('file-input').click()}
              />
              <input
                type="file"
                id="file-input"
                className="user-profile-file-input"
                accept="image/*"
                disabled={!profileEdited}
                onChange={changeProfileImage}
              />
            </div>
            <div className="user-profile-form-grid">
              <div className="user-profile-form-group">
                <label htmlFor="fullName">
                  <AccountCircleIcon /> Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={profile.fullName || ''}
                  name="fullName"
                  disabled={!profileEdited}
                  onChange={handleInputChange}
                />
              </div>
              <div className="user-profile-form-group">
                <label htmlFor="dob">
                  <CalendarTodayIcon /> Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  value={profile.dateofbirth ? profile.dateofbirth.split('T')[0] : 'N/A'}
                  name="dateofbirth"
                  disabled={!profileEdited}
                  onChange={handleInputChange}
                />
              </div>
              <div className="user-profile-form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={profile.gender || ''}
                  name="gender"
                  disabled={!profileEdited}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div className="user-profile-form-group">
                <label htmlFor="phone">
                  <PhoneIcon /> Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={profile.mobileNumber || ''}
                  name="mobileNumber"
                  disabled={!profileEdited}
                  onChange={handleInputChange}
                />
              </div>
              <div className="user-profile-form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="email">
                  <EmailIcon /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={profile.email || ''}
                  name="email"
                  disabled={!profileEdited}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Orders Section */}
      <div className="user-profile-card">
        <div className="user-profile-card-header">
          <h2>My Orders</h2>
        </div>
        <div className="user-profile-card-content">
          <table className="user-profile-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td style={{ position: 'relative' }}>
                    {order.cartItems && order.cartItems.length > 0 ? (
                      <>
                        {order.cartItems.slice(0, 3).map((item, index) => (
                          <img
                            key={index} // Use a unique key for each image
                            src={item.productImage || 'https://via.placeholder.com/150'}
                            alt={`Product ${index + 1}`} // Alt text for accessibility
                            className="user-profile-table-image"
                            style={{
                              width: '50px', // Adjust the width as needed
                              height: '50px', // Adjust the height as needed
                              marginRight: '5px', // Gap between images
                              borderRadius: '4px', // Optional: Rounded corners
                              objectFit: 'cover', // Ensure the image covers the area
                              position: 'relative', // Relative positioning for overlay
                            }}
                          />
                        ))}
                        {order.cartItems.length > 3 && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '98px', // Default for desktop
                              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
                              color: '#fff',
                              borderRadius: '4px',
                              padding: '2px 5px',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '40px',
                              height: '48px',
                            }}
                          >
                            +{order.cartItems.length - 3} {/* Remaining count */}
                          </div>
                        )}
                      </>
                    ) : (
                      'No Product Image'
                    )}

                    <style>
                      {`
      /* Mobile display: show only the first image with the overlay */
      @media (max-width: 768px) {
        .user-profile-table-image {
          display: ${order.cartItems.length > 0 ? 'inline-block' : 'none'};
          width: 60px; /* Adjust the size for mobile */
          height: 60px;
          margin-right: 0; /* No margin for single image */
        }

        /* Hide extra images on mobile */
        .user-profile-table-image:nth-child(n+2) {
          display: none;
        }

        /* Adjust overlay positioning for mobile */
        div[style] {
          top: 15px;
          right: 22px !important; /* Adjusted for mobile */
          width: 50px;
          height: 50px;
          font-size: 14px;
        }
      }
    `}
                    </style>
                  </td>


                  <td>{order.OrderDate ? formatDate(order.OrderDate) : 'N/A'}</td>
                  <td>{order.deliveryStatus ? order.deliveryStatus : 'N/A'}</td>
                  <td>{order.totalPrice ? `₹${order.totalPrice}` : 'N/A'}</td>
                  <td>
                    <button className="user-profile-button" onClick={() => handleOrderDetails(order.orderNumber)}>
                      <InfoIcon /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              className="user-profile-pagination"
            />
          </div>
        </div>
      </div>

      {/* My Address Section */}
      <div className="user-profile-card">
        <div className="user-profile-card-header">
          <h2>My Address</h2>
          {addressExists ? <>
            {!addressEdited ? <button
              className="user-profile-button"
              onClick={() => setAddressEdited(true)}
            >
              <EditIcon /> Edit
            </button>
              : <button className="user-profile-button" onClick={handleSaveAddress}>
                Save
              </button>
            }
          </> :
            <>
              {
                !isAdded ? <button
                  className="user-profile-button"
                  onClick={handleAddButtonClick}
                >
                  Add New
                </button> :
                  <button className="user-profile-button" onClick={handleSaveNewAddress}>
                    Save
                  </button>}
            </>
          }
        </div>
        <div className="user-profile-card-content">
          <div className="user-profile-form-grid">
            <div className="user-profile-form-group">
              <label htmlFor="addressFullName">
                <AccountCircleIcon /> Full Name
              </label>
              <input
                type="text"
                id="addressFullName"
                name="fullName"
                disabled={true}
                value={profile.fullName || ''}
              />
            </div>
            <div className="user-profile-form-group">
              <label htmlFor="addressPhone">
                <PhoneIcon /> Phone
              </label>
              <input
                type="tel"
                id="addressPhone"
                name="mobileNumber"
                disabled={true}
                value={profile.mobileNumber || ''}
                pattern="[0-9]{10}"
              />
            </div>
            <div className="user-profile-form-group">
              <label htmlFor="addressEmail">
                <EmailIcon /> Email
              </label>
              <input
                type="email"
                id="addressEmail"
                name="email"
                disabled={true}
                value={profile.email || ''}
                onChange={handleAddressInputChange}

              />
            </div>
            <div className="user-profile-form-group">
              <label htmlFor="addressAddress">
                <HomeIcon /> Address
              </label>
              <input
                type="text"
                id="addressAddress"
                name="address"
                disabled={!addressEdited}
                value={shippingAddress.address || ''}
                onChange={handleAddressInputChange}
              />
            </div>
            <div className="user-profile-form-group">
              <label htmlFor="addressPincode">
                <LocationOnIcon /> Pincode
              </label>
              <input
                type="text"
                id="addressPincode"
                name="pincode"
                disabled={!addressEdited}
                value={shippingAddress.pincode || ''}
                onChange={handleAddressInputChange}
              />
            </div>
            <div className="user-profile-form-group">
              <label htmlFor="addressCountry">
                <PublicIcon /> Country
              </label>
              <input
                type="text"
                id="addressCountry"
                name="country"
                disabled={!addressEdited}
                value={shippingAddress.country || ''}
                onChange={handleAddressInputChange}
              />
            </div>
            <div className="user-profile-form-group">
              <label htmlFor="addressState">
                <MapIcon /> State
              </label>
              <input
                type="text"
                id="addressState"
                name="state"
                disabled={!addressEdited}
                value={shippingAddress.state || ''}
                onChange={handleAddressInputChange}
              />
            </div>
            <div className="user-profile-form-group">
              <label htmlFor="addressCity">
                <CityIcon /> City
              </label>
              <input
                type="text"
                id="addressCity"
                name="city"
                disabled={!addressEdited}
                value={shippingAddress.city || ''}
                onChange={handleAddressInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar for showing messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
