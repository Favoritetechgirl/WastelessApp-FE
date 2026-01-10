import api from './api';

// Safe localStorage helpers
const safeGetItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn('localStorage not available:', e.message);
    return null;
  }
};

const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('localStorage not available:', e.message);
  }
};

const safeRemoveItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('localStorage not available:', e.message);
  }
};

const authService = {
  /**
   * Register a new user (and auto-login)
   * @param {Object} userData - { fullName, email, password }
   * @returns {Promise} Response with token and user data
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);

      // Store token and user data in localStorage
      if (response.data.token) {
        safeSetItem('token', response.data.token);
        safeSetItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Register a new user WITHOUT auto-login
   * User must login manually after registration
   * @param {Object} userData - { fullName, email, password }
   * @returns {Promise} Response with success message
   */
  registerOnly: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      // Do NOT store token - user must login manually
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Response with token and user data
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);

      // Store token and user data in localStorage
      if (response.data.token) {
        safeSetItem('token', response.data.token);
        safeSetItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');

      // Clear localStorage
      safeRemoveItem('token');
      safeRemoveItem('user');

      return { message: 'Logged out successfully' };
    } catch (error) {
      // Still clear localStorage even if API call fails
      safeRemoveItem('token');
      safeRemoveItem('user');
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get current user profile
   * @returns {Promise} User data
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    const token = safeGetItem('token');
    return !!token;
  },

  /**
   * Get stored user data from localStorage
   * @returns {Object|null} User data or null
   */
  getStoredUser: () => {
    const userStr = safeGetItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - { fullName, phone, profilePicture }
   * @returns {Promise} Updated user data
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);

      // Update user data in localStorage
      if (response.data) {
        const currentUser = safeGetItem('user');
        const token = safeGetItem('token');

        const updatedUser = {
          ...(currentUser ? JSON.parse(currentUser) : {}),
          ...response.data,
          token: token
        };

        safeSetItem('user', JSON.stringify(updatedUser));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Save onboarding preferences (storage locations and reminders)
   * @param {Object} preferences - { locations, reminders, username, profilePicture }
   * @returns {Promise} Response with success message
   */
  saveOnboardingPreferences: async (preferences) => {
    try {
      const response = await api.put('/auth/onboarding-preferences', preferences);

      // Update user data in localStorage with preferences
      const currentUser = safeGetItem('user');
      const token = safeGetItem('token');
      if (currentUser) {
        const updatedUser = {
          ...JSON.parse(currentUser),
          preferences: preferences,
          token: token
        };
        safeSetItem('user', JSON.stringify(updatedUser));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get user settings (notification preferences, storage locations, etc.)
   * @returns {Promise} User settings object
   */
  getSettings: async () => {
    try {
      const response = await api.get('/auth/settings');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update notification settings
   * @param {Object} settings - { oneDayBefore, threeDaysBefore, onExpiry, emailNotifications, pushNotifications }
   * @returns {Promise} Updated settings
   */
  updateNotificationSettings: async (settings) => {
    try {
      const response = await api.put('/auth/notification-settings', settings);

      // Update user data in localStorage with new settings
      const currentUser = safeGetItem('user');
      const token = safeGetItem('token');
      if (currentUser) {
        const updatedUser = {
          ...JSON.parse(currentUser),
          notificationSettings: settings,
          token: token
        };
        safeSetItem('user', JSON.stringify(updatedUser));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Mark onboarding as completed
   * @returns {Promise} Response with success message
   */
  completeOnboarding: async () => {
    try {
      const response = await api.put('/auth/complete-onboarding');

      // Update user data in localStorage
      const currentUser = safeGetItem('user');
      const token = safeGetItem('token');
      if (currentUser) {
        const updatedUser = {
          ...JSON.parse(currentUser),
          onboardingCompleted: true,
          token: token
        };
        safeSetItem('user', JSON.stringify(updatedUser));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Change user password
   * @param {Object} passwordData - { currentPassword, newPassword }
   * @returns {Promise} Response with success message
   */
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Request password reset email
   * @param {string} email - User's email address
   * @returns {Promise} Response with success message
   */
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Reset password with token
   * @param {Object} resetData - { token, newPassword }
   * @returns {Promise} Response with success message
   */
  resetPassword: async (resetData) => {
    try {
      const response = await api.post('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete user account
   * @returns {Promise} Response with success message
   */
  deleteAccount: async () => {
    try {
      const response = await api.delete('/auth/account');
      // Clear localStorage after account deletion
      safeRemoveItem('token');
      safeRemoveItem('user');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default authService;
