import apiClient from './config.js';

// Super Admin API endpoints
export const superAdminAPI = {
  // Create admin
  createAdmin: async (adminData) => {
    const response = await apiClient.post('/super_admin/create/admin', adminData);
    return response.data;
  },

  //get all admins
  getAllAdmins: async ()=>{
    const response = await apiClient.get('/super_admin/get/admins');
    return response.data;
  },

  // Delete admin
  deleteAdmin: async (adminData) => {
    const response = await apiClient.post('/super_admin/delete/admin', adminData);
    return response.data;
  }
};

// Data schemas for super admin operations
export const superAdminDataSchemas = {
  createAdmin: {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    branch: ''
  },
  deleteAdmin: {
    email: ''
  }
};
