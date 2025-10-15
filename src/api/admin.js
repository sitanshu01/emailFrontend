// import apiClient from './config.js';

// // Admin API endpoints
// export const adminAPI = {
//   getProfile :  async()=>{
//     const response = await apiClient.get('/admin/profile');
//     return response.data;
//   },

//   // Form Management
//   createForm: async (formData) => {
//     const response = await apiClient.post('/admin/create/form', formData);
//     return response.data;
//   },

//   deleteForm: async (formId) => {
//     const response = await apiClient.delete(`/admin/delete/form/${formId}`);
//     return response.data;
//   },

//   publishForm: async (formId) => {
//     const response = await apiClient.put(`/admin/publish/${formId}`);
//     return response.data;
//   },

//   unpublishForm: async (formId) => {
//     const response = await apiClient.put(`/admin/unpublish/${formId}`);
//     return response.data;
//   },

//   getSubmissions: async (formId) => {
//     const response = await apiClient.get(`/admin/submissions/${formId}`);
//     return response.data;
//   },

//   // Question Management
//   addQuestion: async (formId) => {
//     const response = await apiClient.post(`/admin/add/question/${formId}`);
//     return response.data;
//   },

//   updateQuestion: async (questionId, questionData) => {
//     const response = await apiClient.put(`/admin/question/${questionId}`, questionData);
//     return response.data;
//   },

//   deleteQuestion: async (questionId) => {
//     const response = await apiClient.delete(`/admin/question/${questionId}`);
//     return response.data;
//   },

//   // Option Management
//   addOption: async (questionId) => {
//     const response = await apiClient.post(`/admin/add/option/${questionId}`);
//     return response.data;
//   },

//   updateOption: async (optionId, optionData) => {
//     const response = await apiClient.put(`/admin/option/${optionId}`, optionData);
//     return response.data;
//   },

//   deleteOption: async (optionId) => {
//     const response = await apiClient.delete(`/admin/option/${optionId}`);
//     return response.data;
//   },

//   // Question Settings
//   updateQuestionType: async (questionId, typeData) => {
//     const response = await apiClient.put(`/admin/type/${questionId}`, typeData);
//     return response.data;
//   },

//   updateRequired: async (questionId, requiredData) => {
//     const response = await apiClient.put(`/admin/required/${questionId}`, requiredData);
//     return response.data;
//   },

//   // Submission Management
//   approveSubmission: async (studentId, formId) => {
//     const response = await apiClient.put(`/admin/submission/approve/${studentId}/${formId}`);
//     return response.data;
//   },

//   rejectSubmission: async (studentId, formId) => {
//     const response = await apiClient.put(`/admin/submission/reject/${studentId}/${formId}`);
//     return response.data;
//   }
// };

// // Data schemas for admin operations
// export const adminDataSchemas = {
//   createForm: {
//     formName: ''
//   },
//   updateQuestion: {
//     question: ''
//   },
//   updateOption: {
//     option: ''
//   },
//   updateType: {
//     type: '' // TEXT, MULTIPLE_CHOICE, etc.
//   },
//   updateRequired: {
//     required: false
//   }
// };
