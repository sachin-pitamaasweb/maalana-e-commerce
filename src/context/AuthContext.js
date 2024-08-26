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
    useEffect(() => {
        // Update sessionStorage whenever isUserAuthenticated changes
        sessionStorage.setItem('isUserAuthenticated', isUserAuthenticated);
        sessionStorage.setItem('userId', userId);
    }, [isUserAuthenticated, userId]);

    useEffect(() => {
        const fetchCartItemCount = async () => {
            if (userId) {
                try {
                    const response = await fetch(`https://maalana-backend.onrender.com/api/get-all-cart-by-user/${userId}`);
                    const data = await response.json();
                    if (data.success) {
                        // Calculate the total number of items in the cart
                        const totalItems = data.cart.reduce((acc, cartItem) => acc + cartItem.items.length, 0);
                        setCartItemCount(totalItems);
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
                    const response = await fetch(`https://maalana-backend.onrender.com/api/get-my-shiped-address/${userId}`);
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
               addresses
               }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication context
export const useAuth = () => useContext(AuthContext);
