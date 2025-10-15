import { useState, useEffect, useContext, createContext } from 'react';
import { authAPI } from '../api/auth.js';
import { handleApiError } from '../utils/errorHandler.js';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      // You might want to add an endpoint to get current user info
      // For now, we'll just check if we have user data in localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setError('Failed to check authentication status');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.signup(userData);
      
      if (response.message === 'otp sent') {
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      const errorInfo = handleApiError(error);
      setError(errorInfo.message);
      return { success: false, error: errorInfo.message };
    } finally {
      setLoading(false);
    }
  };

  const signin = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.signin(credentials);
      
      if (response.message === 'signin success') {
        // Store user data (you might want to get this from the response)
        const userData = {
          email: credentials.email,
          role: credentials.role
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, message: response.message };
      } else {
        throw new Error(response.error || 'Signin failed');
      }
    } catch (error) {
      const errorInfo = handleApiError(error);
      setError(errorInfo.message);
      return { success: false, error: errorInfo.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      authAPI.logout();
      setUser(null);
      setError(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authAPI.refreshToken();
      return { success: true, message: response.message };
    } catch (error) {
      const errorInfo = handleApiError(error);
      // If refresh fails, logout user
      logout();
      return { success: false, error: errorInfo.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    logout,
    refreshToken,
    isAuthenticated: !!user,
    isStudent: user?.role === 'STUDENT',
    isAdmin: user?.role === 'ADMIN',
    isSuperAdmin: user?.role === 'SUPER_ADMIN'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
