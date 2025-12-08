import { ArrowLeft, Pen, Trash } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { inventoryService, impactService } from '../services'

const ItemDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [item, setItem] = useState(location.state?.item || null)
  const [status, setStatus] = useState('EATEN')
  const [loading, setLoading] = useState(false)

  // Get itemId from query params
  const searchParams = new URLSearchParams(location.search)
  const itemId = searchParams.get('id')

  const fetchItemDetails = useCallback(async () => {
    try {
      const data = await inventoryService.getItemById(itemId)
      setItem(data)
    } catch (error) {
      console.error('Error fetching item:', error)
      toast.error('Failed to load item details')
    }
  }, [itemId])

  useEffect(() => {
    if (!item && itemId) {
      fetchItemDetails()
    }
  }, [item, itemId, fetchItemDetails])

  const calculateDaysLeft = (expirationDate) => {
    const today = new Date()
    const expDate = new Date(expirationDate)
    const diffTime = expDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this item?')) return

    try {
      await inventoryService.deleteItem(item.id)
      toast.success('Item deleted successfully')
      navigate('/inventory')
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete item')
    }
  }

  const handleUpdateStatus = async () => {
    setLoading(true)
    try {
      await impactService.updateItemStatus(item.id, { status })
      const statusText = status === 'EATEN' ? 'used' : status === 'WASTED' ? 'wasted' : 'donated'
      toast.success(`Item marked as ${statusText}!`)
      navigate('/inventory')
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    } finally {
      setLoading(false)
    }
  }

  const handleFindRecipes = () => {
    navigate('/recipes')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  if (!item) {
    return (
      <div className='w-screen p-8 text-center'>
        <p className='text-gray-500'>Loading item details...</p>
      </div>
    )
  }

  const daysLeft = calculateDaysLeft(item.expiryDate || item.expirationDate)
  const isExpiringSoon = daysLeft <= 7
  const isExpired = daysLeft < 0

  return (
    // THE WHOLE PAGE
    <div>
      {/* Mobile Screen */}
      <div className='w-screen border-4 border-green-500'>

        <div className='flex items-center justify-between p-3 py-4 sticky top-0 bg-white'>
          <ArrowLeft className='cursor-pointer' onClick={handleGoBack} />

          <span>Item Details</span>

          <Trash className='text-red-500 cursor-pointer' onClick={handleDelete} />
        </div>

        <div className='p-3 text-start'>

          <img
            className='border-2 border-gray-300 rounded-2xl w-full h-48 object-cover bg-gray-100'
            src={item.imageUrl || '/assets/placeholder.png'}
            alt={item.name}
            onError={(e) => {
              e.target.src = '/assets/placeholder.png'
            }}
          />

          <p className='text-3xl font-semibold my-3'>{item.name}</p>

          <div className='flex justify-between text-xs mb-8'>
            <span className={`p-3 px-5 rounded-3xl ${
              isExpired
                ? 'bg-red-200 text-red-600'
                : isExpiringSoon
                ? 'bg-orange-100 text-orange-600'
                : 'bg-green-100 text-green-600'
            }`}>
              {isExpired
                ? `Expired ${Math.abs(daysLeft)} days ago`
                : `Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
            </span>

            <button
              className='flex items-center gap-2 p-3 px-5 border border-gray-300 rounded-3xl hover:bg-gray-50'
              onClick={() => navigate(`/itementry`, { state: { item } })}
            >
              <Pen size={15} />
              Edit Item
            </button>
          </div>

          <div className='py-4 text-sm'>

            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Quantity</span>
              <span className='flex-2 text-gray-700'>{item.quantity} {item.unit || ''}</span>
            </div>
            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Category</span>
              <span className='flex-2 text-gray-700'>{item.category}</span>
            </div>
            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Location</span>
              <span className='flex-2 text-gray-700'>{item.storageLocation || 'N/A'}</span>
            </div>
            {item.estimatedValue && (
              <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
                <span className='flex-1'>Price</span>
                <span className='flex-2 text-gray-700'>₦{item.estimatedValue.toLocaleString()}</span>
              </div>
            )}
            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Purchase Date</span>
              <span className='flex-2 text-gray-700'>{formatDate(item.purchaseDate)}</span>
            </div>
            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Expiry Date</span>
              <span className='flex-2 text-gray-700'>{formatDate(item.expiryDate || item.expirationDate)}</span>
            </div>

          </div>

          <div className='space-y-3 mb-6'>
            <button
              className='w-full p-3 border border-gray-300 rounded-3xl hover:bg-gray-50'
              onClick={handleFindRecipes}
            >
              What can I make?
            </button>

            <button
              className='w-full p-3 border border-green-600 text-green-600 rounded-3xl hover:bg-green-50'
              onClick={() => navigate('/donations')}
            >
              Find Donation Centers
            </button>
          </div>


          <div className='my-6'>
            <p className='text-lg'>How was the rescue Mission?</p>
            <p className='text-sm text-gray-700 mb-3'>Did you use it, waste it, or donate it? Select one outcome below to update the item's status.</p>


            <RadioGroup.Root
              className="flex flex-col gap-4"
              value={status}
              onValueChange={setStatus}
            >

              {/* OPTION 1 - Used */}
              <label
                htmlFor="r1"
                className="flex items-center gap py-4 justify-between cursor-pointer border-b border-gray-300"
              >
                <div>
                  <span className="text-sm font-medium">Used it! ✅</span>
                  <p className="text-xs text-gray-500">I consumed or cooked with this item</p>
                </div>

                <RadioGroup.Item
                  value="EATEN"
                  id="r1"
                  className="w-5 h-5 rounded-full border border-gray-400
                     data-[state=checked]:border-green-400
                     data-[state=checked]:bg-green-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-green-400" />
                </RadioGroup.Item>
              </label>

              {/* OPTION 2 - Wasted */}
              <label
                htmlFor="r2"
                className="flex items-center gap py-4 justify-between cursor-pointer border-b border-gray-300"
              >
                <div>
                  <span className="text-sm font-medium">Wasted it 😔</span>
                  <p className="text-xs text-gray-500">Unfortunately, it went bad</p>
                </div>

                <RadioGroup.Item
                  value="WASTED"
                  id="r2"
                  className="w-5 h-5 rounded-full border border-gray-400
                     data-[state=checked]:border-green-400
                     data-[state=checked]:bg-green-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-green-400" />
                </RadioGroup.Item>
              </label>

              {/* OPTION 3 - Donated */}
              <label
                htmlFor="r3"
                className="flex items-center gap py-4 justify-between cursor-pointer border-b border-gray-300"
              >
                <div>
                  <span className="text-sm font-medium">Donated it 🎁</span>
                  <p className="text-xs text-gray-500">I gave it to someone who needed it</p>
                </div>

                <RadioGroup.Item
                  value="DONATED"
                  id="r3"
                  className="w-5 h-5 rounded-full border border-gray-400
                     data-[state=checked]:border-green-400
                     data-[state=checked]:bg-green-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-green-400" />
                </RadioGroup.Item>
              </label>


            </RadioGroup.Root>

          </div>

          <button
            className='bg-green-500 text-white py-3 px-10 rounded-full w-full hover:bg-green-600 disabled:opacity-50'
            onClick={handleUpdateStatus}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Status'}
          </button>

        </div>

      </div>

      {/* DESKTOP SCREEN */}
      <div>

      </div>
    </div>
  )
}

export default ItemDetails
