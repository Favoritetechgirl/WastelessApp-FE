import axios from 'axios'

const OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/v2'

/**
 * Fetch product information by barcode from Open Food Facts
 * @param {string} barcode - The product barcode
 * @returns {Promise<Object>} Product information
 */
export const getProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${OPEN_FOOD_FACTS_API}/product/${barcode}.json`)

    if (response.data.status === 1 && response.data.product) {
      const product = response.data.product

      // Extract relevant information
      return {
        found: true,
        name: product.product_name || product.product_name_en || 'Unknown Product',
        brand: product.brands || '',
        category: mapCategory(product.categories_tags || []),
        imageUrl: product.image_url || product.image_front_url || null,
        quantity: product.quantity || '',
        barcode: barcode,
        // Additional info that might be useful
        ingredients: product.ingredients_text || '',
        allergens: product.allergens || '',
        nutritionGrade: product.nutrition_grades || null,
      }
    }

    return {
      found: false,
      barcode: barcode
    }
  } catch (error) {
    console.error('Error fetching product from Open Food Facts:', error)
    throw new Error('Failed to fetch product information')
  }
}

/**
 * Map Open Food Facts categories to our app categories
 * @param {Array} categories - Array of category tags from Open Food Facts
 * @returns {string} Mapped category
 */
const mapCategory = (categories) => {
  if (!categories || categories.length === 0) return 'Other'

  const categoryStr = categories.join(' ').toLowerCase()

  if (categoryStr.includes('dairy') || categoryStr.includes('milk') || categoryStr.includes('cheese') || categoryStr.includes('yogurt')) {
    return 'Dairy'
  }
  if (categoryStr.includes('meat') || categoryStr.includes('poultry') || categoryStr.includes('beef') || categoryStr.includes('chicken')) {
    return 'Meat'
  }
  if (categoryStr.includes('fruit') || categoryStr.includes('vegetable') || categoryStr.includes('produce')) {
    return 'Produce'
  }
  if (categoryStr.includes('bread') || categoryStr.includes('bakery') || categoryStr.includes('pastries')) {
    return 'Bakery'
  }
  if (categoryStr.includes('canned') || categoryStr.includes('preserved')) {
    return 'Canned'
  }
  if (categoryStr.includes('beverage') || categoryStr.includes('drink') || categoryStr.includes('juice')) {
    return 'Beverages'
  }

  return 'Other'
}

/**
 * Suggest storage location based on product category
 * @param {string} category - Product category
 * @returns {string} Suggested storage location
 */
export const suggestStorageLocation = (category) => {
  switch (category) {
    case 'Dairy':
    case 'Meat':
    case 'Produce':
      return 'Fridge'
    case 'Beverages':
      return 'Fridge'
    case 'Bakery':
      return 'Counter'
    case 'Canned':
      return 'Pantry'
    default:
      return 'Pantry'
  }
}

/**
 * Suggest expiration days based on category
 * @param {string} category - Product category
 * @returns {number} Suggested days until expiration
 */
export const suggestExpirationDays = (category) => {
  switch (category) {
    case 'Dairy':
      return 7
    case 'Meat':
      return 3
    case 'Produce':
      return 5
    case 'Bakery':
      return 5
    case 'Beverages':
      return 30
    case 'Canned':
      return 365
    default:
      return 30
  }
}

const openFoodFactsService = {
  getProductByBarcode,
  suggestStorageLocation,
  suggestExpirationDays
}

export default openFoodFactsService
