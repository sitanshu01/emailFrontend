import apiClient from './config.js';

// OTP API endpoints
export const otpAPI = {
  // Verify OTP for email verification
  verifyOTP: async (otpData) => {
    const response = await apiClient.post('/otp/verify_otp', otpData);
    return response.data;
  }
};

// OTP data structure
export const otpDataSchema = {
  email: '',
  otp: ''
};
