import api from './api';

const impactService = {
  /**
   * Get impact summary (total items saved, wasted, donated)
   * @param {number} userId - User ID (not used, kept for compatibility)
   * @param {string} period - 'month' for current month, '30days' for last 30 days
   * @returns {Promise} Impact summary data
   */
  getSummary: async (userId, period = 'month') => {
    try {
      // Backend uses auth context, no userId in path needed
      // period parameter mapping: 'week', 'month', 'year', 'all'
      let endpoint = '/impact/summary';

      if (period === 'week') {
        endpoint = '/impact/summary/week';
      } else if (period === 'month') {
        endpoint = '/impact/summary';
      } else if (period === 'year') {
        endpoint = '/impact/summary/year';
      } else if (period === 'all') {
        endpoint = '/impact/summary/all';
      } else if (period === '30days') {
        endpoint = '/impact/summary/30days';
      }

      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get impact history over time
   * @param {number} userId - User ID (not used, kept for compatibility)
   * @param {number} months - Number of months to retrieve (default: 6)
   * @returns {Promise} Impact history data
   */
  getHistory: async (userId, months = 6) => {
    try {
      // Backend uses auth context, no userId in path needed
      // Backend uses 'months' parameter instead of 'period'
      const response = await api.get(`/impact/history`, {
        params: { months }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update item status (consumed, wasted, or donated)
   * @param {number} itemId - Item ID
   * @param {Object} data - { status: 'CONSUMED' | 'WASTED' | 'DONATED' }
   * @returns {Promise} Updated impact data
   */
  updateItemStatus: async (itemId, data) => {
    try {
      const response = await api.put(`/impact/items/${itemId}/status`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default impactService;
