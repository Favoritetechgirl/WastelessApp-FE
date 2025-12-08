import api from './api';

const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { fullName, email, password }
   * @returns {Promise} Response with token and user data
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);

      // Store token and user data in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }

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
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
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
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      return { message: 'Logged out successfully' };
    } catch (error) {
      // Still clear localStorage even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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
    const token = localStorage.getItem('token');
    return !!token;
  },

  /**
   * Get stored user data from localStorage
   * @returns {Object|null} User data or null
   */
  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
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
        const currentUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        const updatedUser = {
          ...JSON.parse(currentUser),
          ...response.data,
          token: token
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
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
      const currentUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (currentUser) {
        const updatedUser = {
          ...JSON.parse(currentUser),
          onboardingCompleted: true,
          token: token
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
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
  }
};

export default authService;
