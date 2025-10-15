import apiClient from './config.js';

// Auth API endpoints
export const authAPI = {
  // Student signup
  signup: async (userData) => {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },

  // User signin (all roles)
  signin: async (credentials) => {
    const response = await apiClient.post('/auth/signin', credentials);
    return response.data;
  },

  // Refresh access token
  refreshToken: async () => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  },

  // Logout (clear cookies on client side)
  logout: () => {
    // Clear any stored tokens or user data
    localStorage.removeItem('user');
    sessionStorage.clear();
    // Note: Server-side cookies will be cleared by the backend
  }
};

// User data structure for signup
export const signupDataSchema = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
  branch: '', // Should be one of the enum values from backend
  rollNumber: '',
  role: 'STUDENT' // Only students can signup
};

// User data structure for signin
export const signinDataSchema = {
  email: '',
  password: '',
  role: '' // STUDENT, ADMIN, or SUPER_ADMIN
};
