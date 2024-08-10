// src/utils/validation.js

export const validateForm = (formData, title) => {
    const errors = {};

    if ((title === "Sign Up" || title === "Become a Partner") && !formData.firstName) {
        errors.firstName = 'First name is required';
    }
    if ((title === "Sign Up" || title === "Become a Partner") && !formData.lastName) {
        errors.lastName = 'Last name is required';
    }
    if (title === "Become a Partner" && !formData.companyName) {
        errors.companyName = 'Company name is required';
    }
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid';
    }
    if ((title === "Sign Up" || title === "Become a Partner") && !formData.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
        errors.phoneNumber = 'Phone number is invalid';
    }
    if ((title === "Sign Up" || title === "Login") && !formData.password) {
        errors.password = 'Password is required';
    }
    if (title === "Become a Partner" && !formData.message) {
        errors.message = 'Message is required';
    }
    return errors;
};
