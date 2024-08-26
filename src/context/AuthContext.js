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
    useEffect(() => {
        // Update sessionStorage whenever isUserAuthenticated changes
        sessionStorage.setItem('isUserAuthenticated', isUserAuthenticated);
        sessionStorage.setItem('userId', userId);
    }, [isUserAuthenticated, userId]);

 // Method to update cart item count
 const updateCartItemCount = (count) => {
    setCartItemCount(count);
};


    const login = (id) => {
        setIsUserAuthenticated(true);
        setUserId(id);
    };

    const logout = () => {
        setIsUserAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isUserAuthenticated, userId, login, logout,  cartItemCount, updateCartItemCount }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication context
export const useAuth = () => useContext(AuthContext);
