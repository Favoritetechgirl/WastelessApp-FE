import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000, // 90 second timeout for Render.com cold starts (increased from 60s)
});

// Retry configuration for cold starts (Render.com free tier can take 15-30s to wake up)
const RETRY_CONFIG = {
  maxRetries: 5,
  baseDelay: 5000, // 5 seconds base delay (increased for Render cold starts)
  maxDelay: 30000, // Max 30 seconds delay (increased for Render cold starts)
};

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to calculate exponential backoff delay
const getRetryDelay = (retryCount) => {
  const exponentialDelay = RETRY_CONFIG.baseDelay * Math.pow(2, retryCount);
  return Math.min(exponentialDelay, RETRY_CONFIG.maxDelay);
};

// Helper function to check if error is retryable (network/timeout errors typical of cold starts)
const isRetryableError = (error) => {
  // Network errors or timeouts are retryable
  if (!error.response) {
    return error.code === 'ECONNABORTED' ||
           error.code === 'ERR_NETWORK' ||
           error.code === 'ETIMEDOUT' ||
           error.message.includes('timeout') ||
           error.message.includes('Network Error');
  }
  // 502, 503, 504 errors are often due to cold starts
  return [502, 503, 504].includes(error.response.status);
};

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add retry count to config
    config.retryCount = config.retryCount || 0;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors, token expiration, and retries
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;

    // Handle retryable errors (cold starts, network issues)
    if (isRetryableError(error) && config && config.retryCount < RETRY_CONFIG.maxRetries) {
      config.retryCount += 1;
      const retryDelay = getRetryDelay(config.retryCount - 1);

      console.log(`[API Retry] Request to ${config.url} failed, retrying (${config.retryCount}/${RETRY_CONFIG.maxRetries}) in ${retryDelay/1000}s...`);
      console.log('[API Retry] Backend may be waking up from sleep mode (Render.com free tier cold start - can take 15-30s)');
      console.log(`[API Retry] Error: ${error.code || error.response?.status || error.message}`);

      await delay(retryDelay);
      return api(config);
    }

    // Handle network errors (backend not running, timeout, etc.)
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout - Backend may be starting up or not running');
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
