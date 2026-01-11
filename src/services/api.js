import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout (increased for Render.com cold starts)
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_BASE = 2000; // 2 seconds base delay

// Helper function to determine if error is retryable
const isRetryableError = (error) => {
  // Retry on timeout
  if (error.code === 'ECONNABORTED') return true;
  // Retry on network errors (backend not reachable)
  if (error.code === 'ERR_NETWORK') return true;
  // Retry on 503 (service unavailable) or 502 (bad gateway) - common during cold starts
  if (error.response?.status === 503 || error.response?.status === 502) return true;
  return false;
};

// Helper function to sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add retry count to config if not present
    if (config._retryCount === undefined) {
      config._retryCount = 0;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors, retries, and token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;

    // Handle retryable errors
    if (isRetryableError(error) && config._retryCount < MAX_RETRIES) {
      config._retryCount += 1;
      const delay = RETRY_DELAY_BASE * Math.pow(2, config._retryCount - 1); // Exponential backoff

      console.log(`Request failed, retrying (${config._retryCount}/${MAX_RETRIES}) in ${delay}ms...`);
      console.log(`Backend may be waking up from sleep mode (Render.com free tier cold start)`);

      await sleep(delay);
      return api(config);
    }

    // Handle network errors (backend not running, timeout, etc.)
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout - Backend may still be starting up. Please try again in a moment.');
      } else if (error.code === 'ERR_NETWORK') {
        console.error('Network error - Backend not reachable at', api.defaults.baseURL);
        console.error('The backend may be sleeping (Render.com free tier). Please wait and try again.');
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

      // Handle 502/503 - Backend starting up
      if (error.response.status === 502 || error.response.status === 503) {
        console.error('Backend is starting up. Please try again in a moment.');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
