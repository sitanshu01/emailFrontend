import axiosInstance from './axios';

// Student API endpoints
export const studentAPI = {
  // Get student profile
  getProfile: async () => {
    const response = await axiosInstance.get('/student/profile');
    return response.data;
  },

  // Get form by share ID
  getForm: async (shareId) => {
    const response = await axiosInstance.get(`/student/form/${shareId}`);
    return response.data;
  },

  // Submit form
  submitForm: async (shareId, formData) => {
    const response = await axiosInstance.post(`/student/form/${shareId}`, formData);
    return response.data;
  },

  // Get student dashboard summary
  getStudentDashboardSummary: async () => {
    const response = await axiosInstance.get('/student/dashboard/summary');
    return response.data;
  }
};

// Data schemas for student operations
export const studentDataSchemas = {
  formSubmission: {
    response: [] // Array of form responses
  }
};
