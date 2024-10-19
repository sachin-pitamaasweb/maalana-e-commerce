// src/api.js

// Base URLs for production and local environments
const productionBaseUrl = 'https://maalana-backend.onrender.com/';
const localBaseUrl = 'http://localhost:8000';

// Choose the base URL based on the environment
const API_BASE_URL = process.env.NODE_ENV === 'production' ? productionBaseUrl : localBaseUrl;

// API Endpoints
const endpoints = {
    registerUser: `${API_BASE_URL}/api/register-user`,
    loginUser: `${API_BASE_URL}/api/login-user`,
    getSingleUser: `${API_BASE_URL}/api/get-single-user`,
    getUserShippingAddress: `${API_BASE_URL}/api/get-my-shiped-address`,
    updateUserProfile: `${API_BASE_URL}/api/update-user-by-id`,
    updateUserShippingAddress: `${API_BASE_URL}/api/update-shiped-address`,
    addShippingAddress: `${API_BASE_URL}/api/create-shiped-address`,
    getUserOrders: `${API_BASE_URL}/api/get-orders-by-user-id`,
    getCartByUser: `${API_BASE_URL}/api/get-all-cart-by-user`,
    updateCart: `${API_BASE_URL}/api/update-cart`,
    deleteCartProduct: `${API_BASE_URL}/api/delete-cart-product`,
    applyCoupon: `${API_BASE_URL}/api/apply-coupon`,
    removeUserShippingAddress: `${API_BASE_URL}/api/delete-shiped-address`,
    getAllProduct: `${API_BASE_URL}/api/admin/get-all-products`,
    addToCart: `${API_BASE_URL}/api/add-to-cart`,
};

/**
 * Function to handle the API request with appropriate endpoint and method.
 * @param {string} url - The endpoint URL
 * @param {string} method - HTTP method (e.g., 'GET', 'POST')
 * @param {object} [data] - Request body data (optional)
 * @returns {Promise} - Promise resolving to the API response
 */
const apiRequest = async (url, method, data = {}) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: method !== 'GET' ? JSON.stringify(data) : null,
        });

        // Parse response JSON
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'An error occurred');
        }
        return responseData;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

// Register User API call
export const registerUser = (userData) => {
    return apiRequest(endpoints.registerUser, 'POST', userData);
};

// Login User API call
export const loginUser = (loginData) => {
    return apiRequest(endpoints.loginUser, 'POST', loginData);
};
export const getSingleUser = (userId) => apiRequest(`${endpoints.getSingleUser}/${userId}`, 'GET');

export const getUserShippingAddress = (userId) =>
    apiRequest(`${endpoints.getUserShippingAddress}/${userId}`, 'GET');

export const updateUserProfile = (userId, data) =>
    apiRequest(`${endpoints.updateUserProfile}/${userId}`, 'PUT', data);

export const updateUserShippingAddress = (addressId, data) =>
    apiRequest(`${endpoints.updateUserShippingAddress}/${addressId}`, 'PUT', data);

export const addShippingAddress = (data) => apiRequest(endpoints.addShippingAddress, 'POST', data);

export const getUserOrders = (userId) => apiRequest(`${endpoints.getUserOrders}/${userId}`, 'GET');

export const getCartByUser = (userId) => apiRequest(`${endpoints.getCartByUser}/${userId}`, 'GET');

export const updateCartApi = (data) => apiRequest(endpoints.Api, 'PUT', data);

export const deleteCartProduct = (data) =>
    apiRequest(endpoints.deleteCartProduct, 'DELETE', data);

export const applyCoupon = (data) => apiRequest(endpoints.applyCoupon, 'POST', data);

export const removeUserShippingAddress = (addressId) =>
    apiRequest(`${endpoints.removeUserShippingAddress}/${addressId}`, 'DELETE');

export const getAllProducts = () => apiRequest(endpoints.getAllProduct, 'GET');

export const addToCart = (data) => apiRequest(endpoints.addToCart, 'POST', data);
