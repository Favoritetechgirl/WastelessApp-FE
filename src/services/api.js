import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors (backend not running, timeout, etc.)
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout - Backend may not be running');
      } else if (error.code === 'ERR_NETWORK') {
        console.error('Network error - Backend not reachable at', api.defaults.baseURL);
      } else {
        console.error('Network error:', error.message);
      }
      return Promise.reject(error);
    }

    if (error.response) {
      // Handle 401 Unauthorized - Token expired or invalid
      // Only clear auth and redirect for actual auth failures, not for login attempts
      if (error.response.status === 401) {
        const isAuthEndpoint = error.config?.url?.includes('/auth/login') ||
                               error.config?.url?.includes('/auth/register');

        // Only auto-logout for 401 on protected endpoints, not on login/register failures
        if (!isAuthEndpoint) {
          console.error('Authentication expired or invalid');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }

      // Handle 403 Forbidden - Don't auto-logout, just log the error
      // 403 can mean many things besides token issues (missing endpoint, permissions, etc.)
      if (error.response.status === 403) {
        console.error('Access denied:', error.config?.url);
        // Don't automatically clear auth - this could be a permissions issue, not a token issue
      }

      // Handle 404 Not Found
      if (error.response.status === 404) {
        console.error('Resource not found:', error.config?.url);
      }

      // Handle 500 Internal Server Error
      if (error.response.status === 500) {
        console.error('Server error occurred');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
