import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(() => {
        // Retrieve the authentication status from sessionStorage
        const savedAuthStatus = sessionStorage.getItem('isUserAuthenticated');
        return savedAuthStatus === 'true' ? true : false;
    });
    const [userId, setUserId] = useState(() => {
        // Retrieve the user id from sessionStorage
        return sessionStorage.getItem('userId') || null;
    });

    const [cartItemCount, setCartItemCount] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        profileImage: '',
    });
    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        // Update sessionStorage whenever isUserAuthenticated changes
        sessionStorage.setItem('isUserAuthenticated', isUserAuthenticated);
        sessionStorage.setItem('userId', userId);
    }, [isUserAuthenticated, userId]);

    useEffect(() => {
        const fetchCartItemCount = async () => {
            if (userId) {
                try {
                    const response = await fetch(`https://maalana.ritaz.in/api/get-all-cart-by-user/${userId}`);
                    const data = await response.json();
                    if (data.success) {
                        setCartItem(data.cart);
                        setCartItemCount(data.numberOfItems);
                    }
                } catch (error) {
                    console.error('Failed to fetch cart item count', error);
                }
            }
        };
        fetchCartItemCount();
    }, [userId]);

    // Fetch addresses when userId changes
    useEffect(() => {
        const fetchAddresses = async () => {
            if (userId) {
                try {
                    const response = await fetch(`https://maalana.ritaz.in/api/get-my-shiped-address/${userId}`);
                    const data = await response.json();
                    if (data.success) {
                        setAddresses(data.shipedaddress);
                    }
                } catch (error) {
                    console.error('Failed to fetch addresses', error);
                }
            }
        };

        fetchAddresses();
    }, [userId]);


    useEffect(() => {
        if (userId) {
            // Fetch user data on component load
            fetch(`https://maalana.ritaz.in/api/get-single-user/${userId}`)
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
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [userId]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    // Method to update cart item count
    const updateCartItemCount = (count) => {
        setCartItemCount(count);
    };

    const updateAddresses = (newAddresses) => {
        setAddresses(newAddresses);
    };

    const login = (id) => {
        setIsUserAuthenticated(true);
        setUserId(id);
    };

    const logout = () => {
        setIsUserAuthenticated(false);
        setUserId(null);
    };

   // Method to remove an item from the cart
    const handleRemove = async (cartId, productId) => {
        try {
            const response = await fetch(`https://maalana.ritaz.in/api/delete-cart-product`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId,
                    cartId,
                }),
            });
            const data = await response.json();
            if (data.success) {
                // Update cart item count or perform other necessary actions
                setCartItem((prevCart) => prevCart.filter(item => item.productId !== productId));
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            isUserAuthenticated,
            userId,
            login,
            logout,
            cartItemCount,
            updateCartItemCount,
            updateAddresses,
            addresses,
            profile,
            cartItem,
            setCartItem,
            handleRemove
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication context
export const useAuth = () => useContext(AuthContext);
