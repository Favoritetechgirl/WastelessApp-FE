import api from './api';

const expirationService = {
  /**
   * Get items expiring soon for a user
   * @param {number} userId - User ID
   * @returns {Promise} List of items expiring soon
   */
  getUpcomingExpirations: async (userId) => {
    try {
      const response = await api.get(`/alerts/upcoming?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get user's expiration notification settings
   * @param {number} userId - User ID
   * @returns {Promise} Expiration settings
   */
  getSettings: async (userId) => {
    try {
      const response = await api.get(`/alerts/settings?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update expiration notification settings
   * @param {number} userId - User ID
   * @param {Object} settings - { daysBeforeExpiration, notificationEnabled }
   * @returns {Promise} Updated settings
   */
  updateSettings: async (userId, settings) => {
    try {
      const response = await api.put(`/alerts/settings?userId=${userId}`, settings);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default expirationService;
