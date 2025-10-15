import { useState } from 'react';
import { handleApiError, formatSuccessMessage } from '../utils/errorHandler.js';

// Generic hook for API calls
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (apiCall, successCallback = null, errorCallback = null) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall();
      
      const result = formatSuccessMessage(response);
      
      if (successCallback) {
        successCallback(result);
      }
      
      return result;
    } catch (error) {
      const errorInfo = handleApiError(error);
      setError(errorInfo.message);
      
      if (errorCallback) {
        errorCallback(errorInfo);
      }
      
      return { success: false, error: errorInfo.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    execute,
    clearError: () => setError(null)
  };
};

// Hook for form submissions
export const useFormSubmission = (apiCall) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submit = async (data, onSuccess = null, onError = null) => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);
      
      const response = await apiCall(data);
      
      if (response.success !== false) {
        setSubmitSuccess(true);
        if (onSuccess) {
          onSuccess(response);
        }
      } else {
        throw new Error(response.error || 'Submission failed');
      }
      
      return response;
    } catch (error) {
      const errorInfo = handleApiError(error);
      setSubmitError(errorInfo.message);
      
      if (onError) {
        onError(errorInfo);
      }
      
      return { success: false, error: errorInfo.message };
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return {
    submitting,
    submitError,
    submitSuccess,
    submit,
    reset
  };
};
