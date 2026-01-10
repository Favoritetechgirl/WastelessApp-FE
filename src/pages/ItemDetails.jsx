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
    if (!window.confirm('Remove this item from your inventory?')) return

    try {
      await inventoryService.deleteItem(item.id)
      toast.success('Item removed from inventory')
      navigate('/inventory')
    } catch (error) {
      console.error('Error removing item:', error)
      toast.error('Failed to remove item')
    }
  }

  const handleUpdateStatus = async () => {
    setLoading(true)
    try {
      await impactService.updateItemStatus(item.id, { status })
      let message = 'Mission logged!';
      if (status === 'EATEN') {
        message = '🎉 Food Rescued! Great job, Climate Hero!';
      } else if (status === 'WASTED') {
        message = 'Mission logged. We\'ll help you rescue more next time!';
      } else if (status === 'DONATED') {
        message = '💚 Donation logged! You\'re making a difference!';
      }
      toast.success(message)
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
    <div className='min-h-screen bg-surface-bg'>
      {/* Mobile Screen */}
      <div className='w-full'>

        <div className='flex items-center justify-between px-5 py-4 sticky top-0 bg-surface-bg border-b border-utility-border z-10'>
          <ArrowLeft className='cursor-pointer hover:text-brand-500 transition-colors' onClick={handleGoBack} />

          <span className='font-poppins font-medium text-mobile-h3 text-slate-500'>Item Details</span>

          <Trash className='text-danger-500 cursor-pointer hover:text-danger-600 transition-colors' onClick={handleDelete} />
        </div>

        <div className='px-5 py-4 text-start'>

          <img
            className='border-2 border-utility-border rounded-wasteless w-full h-48 object-cover bg-surface-accent shadow-wasteless'
            src={item.imageUrl || '/assets/placeholder.png'}
            alt={item.name}
            onError={(e) => {
              e.target.src = '/assets/placeholder.png'
            }}
          />

          <h1 className='text-mobile-h1 md:text-desktop-h1 font-poppins font-medium text-slate-500 my-4'>{item.name}</h1>

          <div className='flex justify-between items-center mb-6'>
            <span className={`px-4 py-2 rounded-wasteless-lg font-inter text-mobile-body-sm font-medium ${
              isExpired
                ? 'bg-danger-100 text-danger-600'
                : isExpiringSoon
                ? 'bg-alert-100 text-alert-600'
                : 'bg-brand-100 text-brand-600'
            }`}>
              {isExpired
                ? `Expired ${Math.abs(daysLeft)} days ago`
                : `Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
            </span>

            <button
              className='flex items-center gap-2 px-4 py-2 border border-utility-border rounded-wasteless hover:bg-surface-accent transition-colors font-inter text-mobile-body-sm'
              onClick={() => navigate(`/itementry`, { state: { item } })}
            >
              <Pen size={15} />
              Edit Item
            </button>
          </div>

          <div className='py-4'>

            <div className='flex border-b border-utility-border py-3'>
              <span className='flex-1 font-inter text-mobile-body-sm text-utility-text'>Quantity</span>
              <span className='flex-2 font-inter text-mobile-body-sm text-slate-500 font-medium'>{item.quantity} {item.unit || 'pieces'}</span>
            </div>
            <div className='flex border-b border-utility-border py-3'>
              <span className='flex-1 font-inter text-mobile-body-sm text-utility-text'>Category</span>
              <span className='flex-2 font-inter text-mobile-body-sm text-slate-500 font-medium'>{item.category}</span>
            </div>
            <div className='flex border-b border-utility-border py-3'>
              <span className='flex-1 font-inter text-mobile-body-sm text-utility-text'>Location</span>
              <span className='flex-2 font-inter text-mobile-body-sm text-slate-500 font-medium'>{item.storageLocation || 'N/A'}</span>
            </div>
            {item.estimatedValue && (
              <div className='flex border-b border-utility-border py-3'>
                <span className='flex-1 font-inter text-mobile-body-sm text-utility-text'>Price</span>
                <span className='flex-2 font-inter text-mobile-body-sm text-slate-500 font-medium'>₦{item.estimatedValue.toLocaleString()}</span>
              </div>
            )}
            <div className='flex border-b border-utility-border py-3'>
              <span className='flex-1 font-inter text-mobile-body-sm text-utility-text'>Purchase Date</span>
              <span className='flex-2 font-inter text-mobile-body-sm text-slate-500 font-medium'>{formatDate(item.purchaseDate)}</span>
            </div>
            <div className='flex border-b border-utility-border py-3'>
              <span className='flex-1 font-inter text-mobile-body-sm text-utility-text'>Expiry Date</span>
              <span className='flex-2 font-inter text-mobile-body-sm text-slate-500 font-medium'>{formatDate(item.expiryDate || item.expirationDate)}</span>
            </div>

          </div>

          <div className='space-y-3 mb-6'>
            <button
              className='w-full px-6 py-3 border border-utility-border rounded-wasteless hover:bg-surface-accent transition-colors font-poppins font-medium text-mobile-button text-slate-500'
              onClick={handleFindRecipes}
            >
              What can I make?
            </button>

            <button
              className='w-full px-6 py-3 border-2 border-brand-500 text-brand-600 rounded-wasteless hover:bg-brand-50 transition-colors font-poppins font-medium text-mobile-button'
              onClick={() => navigate('/donations')}
            >
              Find Donation Centers
            </button>
          </div>


          <div className='my-6'>
            <p className='text-lg font-poppins font-medium'>How Was the Rescue Mission?</p>
            <p className='text-sm text-utility-text mb-3 font-inter'>Log what happened to help track your impact and plan better!</p>


            <RadioGroup.Root
              className="flex flex-col gap-4"
              value={status}
              onValueChange={setStatus}
            >

              {/* OPTION 1 - Rescued/Used */}
              <label
                htmlFor="r1"
                className="flex items-center gap py-4 justify-between cursor-pointer border-b border-utility-border hover:bg-brand-50 px-2 rounded-wasteless-sm transition-colors"
              >
                <div>
                  <span className="text-sm font-medium font-poppins text-brand-600">Food Rescued! ✅</span>
                  <p className="text-xs text-utility-text font-inter">I consumed or cooked with this item</p>
                </div>

                <RadioGroup.Item
                  value="EATEN"
                  id="r1"
                  className="w-5 h-5 rounded-full border border-utility-border
                     data-[state=checked]:border-brand-500
                     data-[state=checked]:bg-brand-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-brand-500" />
                </RadioGroup.Item>
              </label>

              {/* OPTION 2 - Item Spoiled */}
              <label
                htmlFor="r2"
                className="flex items-center gap py-4 justify-between cursor-pointer border-b border-utility-border hover:bg-danger-50 px-2 rounded-wasteless-sm transition-colors"
              >
                <div>
                  <span className="text-sm font-medium font-poppins text-danger-600">Item Spoiled</span>
                  <p className="text-xs text-utility-text font-inter">It went bad before I could use it</p>
                </div>

                <RadioGroup.Item
                  value="WASTED"
                  id="r2"
                  className="w-5 h-5 rounded-full border border-utility-border
                     data-[state=checked]:border-danger-500
                     data-[state=checked]:bg-danger-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-danger-500" />
                </RadioGroup.Item>
              </label>

              {/* OPTION 3 - Donated */}
              <label
                htmlFor="r3"
                className="flex items-center gap py-4 justify-between cursor-pointer border-b border-utility-border hover:bg-impact-50 px-2 rounded-wasteless-sm transition-colors"
              >
                <div>
                  <span className="text-sm font-medium font-poppins text-impact-600">Donated! 🎁</span>
                  <p className="text-xs text-utility-text font-inter">I gave it to someone who needed it</p>
                </div>

                <RadioGroup.Item
                  value="DONATED"
                  id="r3"
                  className="w-5 h-5 rounded-full border border-utility-border
                     data-[state=checked]:border-impact-500
                     data-[state=checked]:bg-impact-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-impact-500" />
                </RadioGroup.Item>
              </label>


            </RadioGroup.Root>

          </div>

          <button
            className='bg-brand-500 text-white py-3 px-6 rounded-wasteless w-full hover:bg-brand-600 active:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md font-poppins font-medium text-mobile-button'
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
