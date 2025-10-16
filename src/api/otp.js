import axiosInstance from './axios';

// OTP API endpoints
export const otpAPI = {
  // Verify OTP
  verifyOTP: async (otpData) => {
    const response = await axiosInstance.post('/otp/verify_otp', otpData);
    return response.data;
  },

  // Resend OTP
  resendOtp: async () => {
    const response = await axiosInstance.post('/otp/resend');
    return response.data;
  }
};

// OTP data structure
export const otpDataSchema = {
  email: '',
  otp: ''
};
