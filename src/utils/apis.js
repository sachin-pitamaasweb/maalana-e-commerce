export const productionBaseUrl = 'https://maalana-backend.onrender.com/api';
export const  baseUrlDevelopment = 'http://localhost:8000/api';

export const endPoints ={
    login: `${baseUrlDevelopment}/login-user`,
    register: `${baseUrlDevelopment}/register-user`,
    forgotPassword: `${baseUrlDevelopment}/forgot-password`,
    resetPassword: `${baseUrlDevelopment}/reset-password`,
    verifyEmail: `${baseUrlDevelopment}/verify-email`,
    getProducts: `${baseUrlDevelopment}/admin/get-all-products`,
    getCategories: `${baseUrlDevelopment}/admin/get-all-categories`,
    getAllCartByUserId: `${baseUrlDevelopment}/get-all-cart-by-user-id/:userId`,
}