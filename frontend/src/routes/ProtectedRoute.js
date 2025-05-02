import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

  if (!token) {
    // If no token exists, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // If token exists, allow access to the protected route
  return children;
};

export default ProtectedRoute;
