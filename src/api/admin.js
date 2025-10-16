import axiosInstance from './axios';

// Admin API endpoints
export const adminAPI = {
  // Create a new form
  createForm: async (formData) => {
    const response = await axiosInstance.post('/admin/form', formData);
    return response.data;
  },

  // Get all forms for the admin
  getForms: async () => {
    const response = await axiosInstance.get('/admin/form');
    return response.data;
  },

  // Get a single form by ID
  getFormById: async (formId) => {
    const response = await axiosInstance.get(`/admin/form/${formId}`);
    return response.data;
  },

  // Update a form by ID
  updateForm: async (formId, formData) => {
    const response = await axiosInstance.put(`/admin/form/${formId}`, formData);
    return response.data;
  },

  // Delete a form by ID
  deleteForm: async (formId) => {
    const response = await axiosInstance.delete(`/admin/form/${formId}`);
    return response.data;
  },

  // Enable Share ID for a form
  enableShareId: async (formId) => {
    const response = await axiosInstance.put(`/admin/form/publish/${formId}`);
    return response.data;
  },

  // Get submissions for a form
  getSubmissions: async (formId) => {
    const response = await axiosInstance.get(`/admin/submissions/${formId}`);
    return response.data;
  },

  // Update submission status
  updateSubmissionStatus: async (submissionId, status) => {
    const response = await axiosInstance.patch(`/admin/submissions/${submissionId}/status`, { status });
    return response.data;
  },

  // Get admin dashboard summary
  getAdminDashboardSummary: async () => {
    const response = await axiosInstance.get('/admin/dashboard/summary');
    return response.data;
  }
};