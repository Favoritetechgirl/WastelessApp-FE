import api from './api';

const recipeService = {
  /**
   * Get recipe suggestions based on user's inventory
   * @param {number} userId - User ID
   * @param {Object} params - { maxMissingIngredients, dietaryPreferences }
   * @returns {Promise} List of suggested recipes
   */
  getSuggestions: async (userId, params = {}) => {
    try {
      const response = await api.post(`/recipes/suggest?userId=${userId}`, params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Search recipes by ingredients or name
   * @param {Object} searchData - { ingredients, query, cuisine, diet, intolerances }
   * @returns {Promise} Search results
   */
  searchRecipes: async (searchData) => {
    try {
      const response = await api.post('/recipes/search', searchData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Mark a recipe as cooked
   * @param {number} userId - User ID
   * @param {Object} data - { spoonacularId, ingredientsUsed }
   * @returns {Promise} Updated impact data
   */
  markAsCooked: async (userId, data) => {
    try {
      const response = await api.post(`/recipes/mark-as-cooked?userId=${userId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default recipeService;
