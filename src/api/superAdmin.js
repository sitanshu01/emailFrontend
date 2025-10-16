import axiosInstance from './axios';

// Super Admin API endpoints
export const superAdminAPI = {
  // Create a new admin
  createAdmin: async (adminData) => {
    const response = await axiosInstance.post('/super_admin/admin', adminData);
    return response.data;
  },

  // Get all admins
  getAdmins: async () => {
    const response = await axiosInstance.get('/super_admin/admin');
    return response.data;
  },

  // Get a single admin by ID
  getAdminById: async (adminId) => {
    const response = await axiosInstance.get(`/super_admin/admin/${adminId}`);
    return response.data;
  },

  // Update an admin by ID
  updateAdmin: async (adminId, adminData) => {
    const response = await axiosInstance.put(`/super_admin/admin/${adminId}`, adminData);
    return response.data;
  },

  // Delete an admin by ID
  deleteAdmin: async (adminId) => {
    const response = await axiosInstance.delete(`/super_admin/admin/${adminId}`);
    return response.data;
  }
};
