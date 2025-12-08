import api from './api';

const donationService = {
  /**
   * Find nearby donation centers
   * @param {Object} params - { latitude, longitude, radius }
   * @returns {Promise} List of nearby donation centers
   */
  findNearbyCenters: async (params) => {
    try {
      const response = await api.get('/donations/nearby', {
        params
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Find donation centers by city
   * @param {string} city - City name
   * @param {number} latitude - User's latitude (optional)
   * @param {number} longitude - User's longitude (optional)
   * @returns {Promise} List of donation centers
   */
  findByCity: async (city, latitude, longitude) => {
    try {
      const response = await api.get(`/donations/city/${city}`, {
        params: { latitude, longitude }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get all donation centers
   * @param {number} latitude - User's latitude (optional)
   * @param {number} longitude - User's longitude (optional)
   * @returns {Promise} List of all donation centers
   */
  getAllCenters: async (latitude, longitude) => {
    try {
      const response = await api.get('/donations/all', {
        params: { latitude, longitude }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get a specific donation center by ID
   * @param {number} id - Donation center ID
   * @param {number} latitude - User's latitude (optional)
   * @param {number} longitude - User's longitude (optional)
   * @returns {Promise} Donation center details
   */
  getById: async (id, latitude, longitude) => {
    try {
      const response = await api.get(`/donations/${id}`, {
        params: { latitude, longitude }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default donationService;
