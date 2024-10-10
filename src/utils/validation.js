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

// Utility function to format the date
export const formatDate = (dateString) => {
    console.log('dateString', dateString);
    if (!dateString) return 'N/A'; // Handle empty date strings
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date'; // Handle invalid date strings
  
    const day = String(date.getDate()).padStart(2, '0'); // Get day and add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and add leading zero
    const year = date.getFullYear(); // Get year
  
    return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
  };
  