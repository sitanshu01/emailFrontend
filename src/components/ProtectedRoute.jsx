import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

// Protected Route Component
export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    switch (user?.role) {
      case 'STUDENT':
        return <Navigate to="/dashboard" replace />;
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      case 'SUPER_ADMIN':
        return <Navigate to="/super-admin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

// Student-only route
export const StudentRoute = ({ children }) => (
  <ProtectedRoute requiredRole="STUDENT">{children}</ProtectedRoute>
);

// Admin-only route
export const AdminRoute = ({ children }) => (
  <ProtectedRoute requiredRole="ADMIN">{children}</ProtectedRoute>
);

// Super Admin-only route
export const SuperAdminRoute = ({ children }) => (
  <ProtectedRoute requiredRole="SUPER_ADMIN">{children}</ProtectedRoute>
);

// Admin or Super Admin route
export const AdminOrSuperAdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
    return children;
  }
  
  return <Navigate to="/" replace />;
};
