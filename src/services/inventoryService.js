import api from './api';

const inventoryService = {
  /**
   * Get all inventory items for a user
   * @param {number} userId - User ID
   * @returns {Promise} List of inventory items
   */
  getAllItems: async (userId) => {
    try {
      const response = await api.get(`/inventory/${userId}/all`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Add a new item to inventory
   * @param {number} userId - User ID
   * @param {Object} itemData - { name, quantity, unit, category, expirationDate, purchaseDate, notes }
   * @returns {Promise} Created item
   */
  addItem: async (userId, itemData) => {
    try {
      const response = await api.post(`/inventory/${userId}/add`, itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get a specific item by ID
   * @param {number} itemId - Item ID
   * @returns {Promise} Item details
   */
  getItemById: async (itemId) => {
    try {
      const response = await api.get(`/inventory/item/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update an inventory item
   * @param {number} itemId - Item ID
   * @param {Object} itemData - Updated item data
   * @returns {Promise} Updated item
   */
  updateItem: async (itemId, itemData) => {
    try {
      const response = await api.put(`/inventory/update/${itemId}`, itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete an inventory item
   * @param {number} itemId - Item ID
   * @returns {Promise}
   */
  deleteItem: async (itemId) => {
    try {
      const response = await api.delete(`/inventory/delete/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default inventoryService;
