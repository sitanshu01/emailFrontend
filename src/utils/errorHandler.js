// Error handling utilities for API calls
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return {
          message: data.errorMessage || data.message || 'Bad Request',
          type: 'validation_error'
        };
      case 401:
        return {
          message: 'Unauthorized access. Please login again.',
          type: 'auth_error'
        };
      case 403:
        return {
          message: 'Access forbidden. You don\'t have permission.',
          type: 'permission_error'
        };
      case 404:
        return {
          message: 'Resource not found.',
          type: 'not_found'
        };
      case 500:
        return {
          message: 'Server error. Please try again later.',
          type: 'server_error'
        };
      default:
        return {
          message: data.message || 'An error occurred',
          type: 'unknown_error'
        };
    }
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error. Please check your connection.',
      type: 'network_error'
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      type: 'client_error'
    };
  }
};

// Success message formatter
export const formatSuccessMessage = (response) => {
  return {
    message: response.data.message || 'Operation completed successfully',
    data: response.data.data || response.data
  };
};

// Validation helper for form data
export const validateFormData = (data, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(key => {
    if (schema[key].required && (!data[key] || data[key].toString().trim() === '')) {
      errors[key] = `${key} is required`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
