import apiClient from "./config";

// Admin API endpoints
export const adminAPI = {
    getProfile: async () => {
        const response = await apiClient.get("/admin/profile");
        return response.data;
    },

    getForms: async () => {
        const response = await apiClient.get("/admin/forms");
        return response.data;
    },

    getForm: async (formId) => {
        const response = await apiClient.get(`/admin/form/${formId}`);
        return response.data;
    },
    // Form Management
    createForm: async (formData) => {
        const response = await apiClient.post("/admin/create/form", formData);
        return response.data;
    },

    deleteForm: async (formId) => {
        const response = await apiClient.delete(`/admin/form/${formId}`);
        return response.data;
    },

    updateForm: async (formId, formData) => {
        const response = await apiClient.put(`/admin/update/form/${formId}`, formData);
        return response.data;
    },

    publishForm: async (formId) => {
        const response = await apiClient.put(`/admin/form/publish/${formId}`);
        return response.data;
    },

    unpublishForm: async (formId) => {
        const response = await apiClient.put(`/admin/form/unpublish/${formId}`);
        return response.data;
    },

    getSubmissions: async (formId) => {
        const response = await apiClient.get(`/admin/submissions/${formId}`);
        return response.data;
    }
}