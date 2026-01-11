import React, { useState, useEffect } from 'react'
import { ArrowLeft, Camera, ChevronDown, ChevronRightIcon, Minus, Plus, Scan } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { inventoryService } from '../services'
import { toast } from 'react-toastify'
import BarcodeScanner from '../components/BarcodeScanner'
import openFoodFactsService from '../services/openFoodFactsService'

const ItemEntry = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const fileInputRef = React.useRef(null)

  // Get userId from user object or localStorage as fallback
  const getUserId = () => {
    if (user?.userId) return user.userId
    if (user?.id) return user.id
    // Fallback to localStorage
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const parsed = JSON.parse(storedUser)
        return parsed.userId || parsed.id
      }
    } catch (e) {
      console.error('Error getting userId from localStorage:', e)
    }
    return null
  }

  // Check if we're editing an existing item
  const editingItem = location.state?.item
  const isEditMode = !!editingItem

  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    unit: 'pieces',
    category: 'Produce',
    storageLocation: 'Fridge',
    packageSize: 1,
    packageUnit: 'pieces',
    price: '',
    spoilsAfterOpening: false,
    expirationDate: '',
    isOpened: false,
    dateOpened: '',
    daysUntilSpoilage: '',
    image: null
  })

  // Pre-fill form if editing
  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || '',
        quantity: editingItem.quantity || 1,
        unit: editingItem.unit || 'pieces',
        category: editingItem.category || 'Produce',
        storageLocation: editingItem.storageLocation || 'Fridge',
        packageSize: editingItem.packageSize || 1,
        packageUnit: editingItem.packageUnit || 'pieces',
        price: editingItem.estimatedValue || editingItem.price || '',
        spoilsAfterOpening: editingItem.spoilsAfterOpening !== undefined ? editingItem.spoilsAfterOpening : false,
        expirationDate: editingItem.expiryDate || editingItem.expirationDate || '',
        isOpened: editingItem.isOpened !== undefined ? editingItem.isOpened : false,
        dateOpened: editingItem.dateOpened || '',
        daysUntilSpoilage: editingItem.daysUntilSpoilage !== undefined && editingItem.daysUntilSpoilage !== null ? editingItem.daysUntilSpoilage.toString() : '',
        image: null // Don't pre-fill image file, but we'll keep the imageUrl in editingItem
      })
    }
  }, [editingItem])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleIncrement = (field) => {
    setFormData(prev => ({ ...prev, [field]: prev[field] + 1 }))
  }

  const handleDecrement = (field) => {
    setFormData(prev => ({ ...prev, [field]: Math.max(1, prev[field] - 1) }))
  }

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter item name')
      return
    }

    if (!formData.expirationDate) {
      toast.error('Please select expiration date')
      return
    }

    setLoading(true)

    try {
      // Convert image to Base64 if present
      let imageUrl = null
      if (formData.image) {
        imageUrl = await convertImageToBase64(formData.image)
      } else if (isEditMode && editingItem.imageUrl) {
        // Keep existing image if no new image is uploaded
        imageUrl = editingItem.imageUrl
      }

      const itemData = {
        name: formData.name,
        quantity: formData.quantity,
        unit: formData.unit,
        category: formData.category,
        expiryDate: formData.expirationDate,
        purchaseDate: isEditMode ? (editingItem.purchaseDate || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
        storageLocation: formData.storageLocation,
        estimatedValue: formData.price ? parseFloat(formData.price) : null,
        packageSize: formData.packageSize,
        packageUnit: formData.packageUnit,
        spoilsAfterOpening: formData.spoilsAfterOpening,
        isOpened: formData.isOpened,
        dateOpened: formData.dateOpened || null,
        daysUntilSpoilage: formData.daysUntilSpoilage ? parseInt(formData.daysUntilSpoilage) : null,
        imageUrl: imageUrl
      }

      if (isEditMode) {
        // Update existing item
        await inventoryService.updateItem(editingItem.id, itemData)
        toast.success('Item updated successfully!')
      } else {
        // Add new item
        const userId = getUserId()
        if (!userId) {
          toast.error('User not found. Please log in again.')
          navigate('/login')
          return
        }
        await inventoryService.addItem(userId, itemData)
        toast.success('Item added successfully!')
      }

      navigate('/inventory')
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} item:`, error)

      // Show more detailed error message
      const errorMessage = error?.response?.data?.message || error?.message || `Failed to ${isEditMode ? 'update' : 'add'} item. Please try again.`
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to convert image to Base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleImageCapture = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      toast.success('Image captured successfully!')
    }
  }

  const handleSnapPicClick = () => {
    fileInputRef.current?.click()
  }

  const handleBarcodeClick = () => {
    setShowScanner(true)
  }

  const handleBarcodeScanned = async (barcode) => {
    setShowScanner(false)
    toast.info('Fetching product information...')

    try {
      const productData = await openFoodFactsService.getProductByBarcode(barcode)

      if (productData.found) {
        // Auto-fill form with product data
        const expirationDays = openFoodFactsService.suggestExpirationDays(productData.category)
        const expirationDate = new Date()
        expirationDate.setDate(expirationDate.getDate() + expirationDays)

        setFormData(prev => ({
          ...prev,
          name: productData.name + (productData.brand ? ` (${productData.brand})` : ''),
          category: productData.category,
          storageLocation: openFoodFactsService.suggestStorageLocation(productData.category),
          expirationDate: expirationDate.toISOString().split('T')[0],
          daysUntilSpoilage: expirationDays.toString(),
        }))

        // Fetch image if available
        if (productData.imageUrl) {
          try {
            const response = await fetch(productData.imageUrl)
            const blob = await response.blob()
            const file = new File([blob], 'product-image.jpg', { type: 'image/jpeg' })
            setFormData(prev => ({ ...prev, image: file }))
          } catch (err) {
            console.error('Error fetching product image:', err)
          }
        }

        toast.success(`Product found: ${productData.name}`)
      } else {
        toast.warning('Product not found in database. Please enter details manually.')
      }
    } catch (error) {
      console.error('Error scanning barcode:', error)
      toast.error('Failed to fetch product information')
    }
  }

  return (
    <div className='w-screen lg:flex items-center justify-center bg-gray-200 lg:h-screen'>




      <div className='main h-full w-full lg:w-4xl lg:h-fit lg:max-h-4/5 bg-white p-3 overflow-scroll lg:p-8 rounded-2xl'>

        <div className='flex justify-between items-center mb-6 sticky top-0 py-2 bg-white lg:hidden'>
          <button className='w-6' onClick={handleCancel}>
            <ArrowLeft />
          </button>

          <span className='text-xl'>
            {isEditMode ? 'Edit Item' : 'Add Item'}
          </span>

          <span className='w-6'></span>
        </div>

        <div className='lg:flex gap-8'>
          {/* left inputs */}
          <div className='flex-1'>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-900'>Item name</label>
              <input
                type="text"
                className='px-4 text-sm border border-gray-500 outline-0 w-full h-10 rounded-2xl'
                placeholder='What are you saving?'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            <div
              className='one-input rounded-2xl flex items-center px-4 text-sm bg-gray-100 mb-5 cursor-pointer'
              onClick={handleSnapPicClick}
            >
              {(formData.image || editingItem?.imageUrl) ? (
                <div className='flex items-center py-2 w-full'>
                  <img
                    src={formData.image ? URL.createObjectURL(formData.image) : editingItem.imageUrl}
                    alt="Preview"
                    className='w-12 h-12 object-cover rounded mr-3'
                  />
                  <span className='flex-1 text-start text-gray-700'>
                    {formData.image ? formData.image.name : 'Current image (tap to change)'}
                  </span>
                  <ChevronRightIcon className='text-gray-500' />
                </div>
              ) : (
                <div className='flex items-center py-2 w-full'>
                  <Camera size={20} className='mr-3 text-gray-500' />
                  <span className='flex-1 text-start text-gray-500'>
                    Snap a pic (Optional)
                  </span>
                  <ChevronRightIcon className='text-gray-500' />
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageCapture}
              className="hidden"
            />

            <div
              className='one-input rounded-2xl flex items-center px-4 text-sm bg-green-50 border border-green-300 mb-5 cursor-pointer hover:bg-green-100 transition-colors'
              onClick={handleBarcodeClick}
            >
              <div className='flex items-center py-2 w-full'>
                <Scan size={20} className='mr-3 text-green-600' />
                <span className='flex-1 text-start text-green-700 font-medium'>
                  Scan Barcode
                </span>
                <ChevronRightIcon className='text-green-600' />
              </div>
            </div>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-900' htmlFor="">Quantity</label>

              <div className='flex justify-between gap-3 p-2'>

                <div className='flex flex-1 justify-between text-gray-500 items-center'>
                  <button
                    className='rounded-full bg-gray-100 p-2'
                    onClick={() => handleDecrement('quantity')}
                  >
                    <Minus className='text-gray-500' />
                  </button>

                  <input
                    className='w-20 text-xl text-center'
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                  />

                  <button
                    className='rounded-full bg-gray-100 p-2'
                    onClick={() => handleIncrement('quantity')}
                  >
                    <Plus className='text-gray-500' />
                  </button>
                </div>

                <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-4'>
                  <select
                    className='appearance-none outline-0 flex-1'
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                  >
                    <option value="pieces">Pieces</option>
                    <option value="kg">KG</option>
                    <option value="g">Gram</option>
                    <option value="lbs">Pounds</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

            </div>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-500' htmlFor="">Category</label>

              <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-6 h-12'>
                <select
                  className='appearance-none outline-0 flex-1'
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <option value="Produce">Produce</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Meat">Meat</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Canned">Canned</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown />
              </div>
            </div>


            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-500' htmlFor="">Storage Location</label>

              <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-6 h-12'>
                <select
                  className='appearance-none outline-0 flex-1'
                  value={formData.storageLocation}
                  onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                >
                  <option value="Fridge">Fridge</option>
                  <option value="Freezer">Freezer</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Counter">Counter</option>
                </select>
                <ChevronDown />
              </div>
            </div>


            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-900' htmlFor="">Package Size</label>

              <div className='flex justify-between gap-3 p-2'>

                <div className='flex flex-1 justify-between text-gray-500 items-center'>
                  <button
                    className='rounded-full bg-gray-100 p-2'
                    onClick={() => handleDecrement('packageSize')}
                  >
                    <Minus className='text-gray-500' />
                  </button>

                  <input
                    className='w-20 text-xl text-center'
                    type="number"
                    value={formData.packageSize}
                    onChange={(e) => handleInputChange('packageSize', parseInt(e.target.value) || 1)}
                  />

                  <button
                    className='rounded-full bg-gray-100 p-2'
                    onClick={() => handleIncrement('packageSize')}
                  >
                    <Plus className='text-gray-500' />
                  </button>
                </div>

                <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-4'>
                  <select
                    className='appearance-none outline-0 flex-1'
                    value={formData.packageUnit}
                    onChange={(e) => handleInputChange('packageUnit', e.target.value)}
                  >
                    <option value="pieces">Pieces</option>
                    <option value="kg">KG</option>
                    <option value="g">Gram</option>
                    <option value="lbs">Pounds</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

            </div>







          </div>

          {/* right inputs */}

          <div className='flex-1'>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-900' htmlFor=""> Price</label>
              <div className='flex items-center px-4 text-sm border border-gray-500 outline-0 w-full h-10 rounded-2xl gap-2'>
                <span className='text-gray-500 font-semibold'>₦</span>
                <input
                  type="text"
                  className='flex-1 outline-0'
                  placeholder='How much did this cost?'
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>

            </div>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-500' htmlFor="">Does this spoil after opening?</label>

              <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-6 h-12'>
                <select
                  className='appearance-none outline-0 flex-1'
                  value={formData.spoilsAfterOpening}
                  onChange={(e) => handleInputChange('spoilsAfterOpening', e.target.value === 'true')}
                >
                  <option value={false}>No, it doesn't</option>
                  <option value={true}>Yes, it does</option>
                </select>
                <ChevronDown />
              </div>
            </div>


            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-500' htmlFor="">Expiration Date</label>

              <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-6 h-12'>
                <input
                  className='flex-1 outline-0 bg-transparent'
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                />
              </div>
            </div>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-500' htmlFor="">Is this item already opened?</label>

              <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-6 h-12'>
                <select
                  className='appearance-none outline-0 flex-1'
                  value={formData.isOpened}
                  onChange={(e) => handleInputChange('isOpened', e.target.value === 'true')}
                >
                  <option value={false}>No, it's not</option>
                  <option value={true}>Yes, it is</option>
                </select>
                <ChevronDown />
              </div>
            </div>


            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-500' htmlFor="">Date you opened the item</label>

              <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-6 h-12'>
                <input
                  className='flex-1 outline-0 bg-transparent'
                  type="date"
                  value={formData.dateOpened}
                  onChange={(e) => handleInputChange('dateOpened', e.target.value)}
                  disabled={!formData.isOpened}
                />
              </div>
            </div>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-900' htmlFor="">How many days until spoilage?</label>
              <input
                type="text"
                className='px-4 text-sm border border-gray-500 outline-0 w-full h-10 rounded-2xl'
                placeholder='Enter number of days'
                value={formData.daysUntilSpoilage}
                onChange={(e) => handleInputChange('daysUntilSpoilage', e.target.value)}
              />
            </div>

          </div>
        </div>


        <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>

          <button
            className='py-4 px-10 bg-gray-200 rounded-4xl'
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className='bg-green-500 text-white py-4 px-10 rounded-4xl disabled:opacity-50'
          >
            {loading
              ? (isEditMode ? 'Updating...' : 'Adding...')
              : (isEditMode ? 'Update Item' : 'Add to Inventory')
            }
          </button>
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onScanSuccess={handleBarcodeScanned}
          onClose={() => setShowScanner(false)}
        />
      )}

    </div>
  )
}

export default ItemEntry
