import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming AuthProvider is in the same directory

const ProtectedRoute = ({ children }) => {
  const { isUserAuthenticated } = useAuth();

  if (isUserAuthenticated) {
    // If authenticated, render the children (protected component)
    return children;
  }

  if (!isUserAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;
