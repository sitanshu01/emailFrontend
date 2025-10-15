// Main API export file
export { authAPI, signupDataSchema, signinDataSchema } from './auth.js';
export { otpAPI, otpDataSchema } from './otp.js';
export { adminAPI, adminDataSchemas } from './admin.js';
export { studentAPI, studentDataSchemas } from './student.js';
export { superAdminAPI, superAdminDataSchemas } from './superAdmin.js';
export { default as apiClient } from './config.js';

// API constants
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    REFRESH: '/auth/refresh'
  },
  OTP: {
    VERIFY: '/otp/verify_otp'
  },
  ADMIN: {
    CREATE_FORM: '/admin/create/form',
    DELETE_FORM: '/admin/delete/form',
    PUBLISH_FORM: '/admin/publish',
    UNPUBLISH_FORM: '/admin/unpublish',
    SUBMISSIONS: '/admin/submissions',
    ADD_QUESTION: '/admin/add/question',
    UPDATE_QUESTION: '/admin/question',
    DELETE_QUESTION: '/admin/question',
    ADD_OPTION: '/admin/add/option',
    UPDATE_OPTION: '/admin/option',
    DELETE_OPTION: '/admin/option',
    UPDATE_TYPE: '/admin/type',
    UPDATE_REQUIRED: '/admin/required',
    APPROVE_SUBMISSION: '/admin/submission/approve',
    REJECT_SUBMISSION: '/admin/submission/reject'
  },
  STUDENT: {
    PROFILE: '/student/profile',
    GET_FORM: '/student/form',
    SUBMIT_FORM: '/student/form'
  },
  SUPER_ADMIN: {
    CREATE_ADMIN: '/super_admin/create/admin',
    DELETE_ADMIN: '/super_admin/delete/admin'
  }
};

// User roles from backend
export const USER_ROLES = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

// Branch options (you may need to update these based on your backend enum)
export const BRANCH_OPTIONS = [
  'CSE',
  'ECE',
  'EEE',
  'ME',
  'CE',
  'IT'
  // Add more branches as needed
];

// Question types (you may need to update these based on your backend enum)
export const QUESTION_TYPES = [
  'TEXT',
  'MULTIPLE_CHOICE',
  'CHECKBOX',
  'RADIO'
  // Add more types as needed
];
