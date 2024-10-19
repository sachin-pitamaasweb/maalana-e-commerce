
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

import {
  getSingleUser,
  getUserShippingAddress,
  updateUserProfile,
  updateUserShippingAddress,
  addShippingAddress,
  getUserOrders,
} from '../../utils/apis.js';


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
      getSingleUser(userId)
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
      getUserShippingAddress(userId)
        .then((data) => {
          console.log('data', data);
          setAddressId(data.shipedaddress[0]._id);
          setShippingAddress(data.shipedaddress ? data.shipedaddress[0] : {});
          setAddressExists(data.shipedaddress ? true : false);
        })
        .catch((error) => console.error(error));
    }
  }, [userId]);

  // Fetch orders
  useEffect(() => {
    if (userId) {
      getUserOrders(userId)
        .then((responseData) => {
          setOrders(responseData.data || []); // Ensure orders data is not undefined
        })
        .catch((error) => console.error('Error fetching orders:', error));
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
      const response = await updateUserProfile(userId, {
        firstName: profile.fullName.split(' ')[0],
        lastName: profile.fullName.split(' ')[1],
        dateofbirth: profile.dateofbirth,
        gender: profile.gender,
        mobileNumber: profile.mobileNumber,
        email: profile.email,
        userImage: profileImage,
      });

      if (response.success) {
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
      const response = await updateUserShippingAddress(addressId, shippingAddress);
      console.log(response);
      if (response.success === true) {
        setSnackbarMessage('Address updated successfully!');
        setSnackbarSeverity('success');
        setAddressEdited(false);
      } else {
        setSnackbarMessage('Failed to update address. Please try again.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage('Failed to update address. Please try again.');
      setSnackbarSeverity('error');
      console.error('Error updating address:', error);
    } finally {
      setSnackbarOpen(true);
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
      // Call the API to add the shipping address
      const response = await addShippingAddress({
        ...shippingAddress,
        userId: userId,
      });

      if (response.success) {
        setSnackbarMessage('Address added successfully!');
        setSnackbarSeverity('success');

        // Reset the state after successful addition
        setIsAdded(false);

        // Fetch the user's shipping addresses again to update the list
        const data = await getUserShippingAddress(userId);

        if (data && data.shipedaddress && data.shipedaddress.length > 0) {
          setAddressId(data.shipedaddress[0]._id);
          setShippingAddress(data.shipedaddress[0]); // Set the first address as the selected one
          setAddressExists(true); // Address now exists
        } else {
          setShippingAddress({}); // No addresses found
          setAddressExists(false);
        }
      } else {
        setSnackbarMessage('Failed to add address. Please try again.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      // Handle any errors during the address addition
      setSnackbarMessage('Failed to add address. Please try again.');
      setSnackbarSeverity('error');
      console.error('Error adding address:', error);
    } finally {
      setSnackbarOpen(true); // Show the Snackbar message
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
  console.log('shippingAddress', shippingAddress);
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
