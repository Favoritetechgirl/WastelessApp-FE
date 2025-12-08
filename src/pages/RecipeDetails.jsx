import React, { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft, Clock, TicketCheck, CheckCircle } from 'lucide-react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import PageTop from '../components/modals/PageTop'
import { useAuth } from '../context/AuthContext'
import { recipeService } from '../services'


const RecipeDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [recipe] = useState(location.state?.recipe || null)
  const [loading, setLoading] = useState(false)

  const handleMarkAsCooked = async () => {
    if (!recipe) return

    setLoading(true)
    try {
      const ingredientsUsed = recipe.usedIngredients?.map(ing => ing.name) || []
      await recipeService.markAsCooked(user.userId, {
        spoonacularId: recipe.id,
        ingredientsUsed
      })
      toast.success('Recipe marked as cooked! Ingredients removed from inventory.')
      navigate('/inventory')
    } catch (error) {
      console.error('Error marking recipe as cooked:', error)
      toast.error('Failed to mark recipe as cooked')
    } finally {
      setLoading(false)
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  if (!recipe) {
    return (
      <div className='w-screen lg:flex items-center justify-center bg-gray-200 lg:h-screen'>
        <div className='main h-full w-full lg:w-4xl lg:h-fit bg-white p-8 rounded-2xl text-center'>
          <p className='text-gray-500'>No recipe data available</p>
          <button
            onClick={handleGoBack}
            className='mt-4 text-green-500 underline'
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='w-screen border-4 border-red-600 lg:flex items-center justify-center bg-gray-200 lg:h-screen'>




      <div className='main h-full w-full lg:w-4xl lg:h-fit lg:max-h-4/5 bg-white p-3 overflow-scroll lg:p-8 rounded-2xl'>

        <PageTop
          left={<ArrowLeft onClick={handleGoBack} className='cursor-pointer' />}
          title={'Recipe Details'}
          right={''}
        />


        <div className=''>
          <div className='h-48 w-full rounded-2xl overflow-hidden bg-gray-100'>
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className='w-full h-full object-cover'
              />
            )}
          </div>

          <p className='text-3xl mt-4'>{recipe.title}</p>
          <span className='text-sm text-gray-600'>
            Servings: {recipe.servings || 'N/A'}
          </span>
          <div className='flex items-center gap-2 mb-4'>
            <Clock size={15} color='orange' />
            <span className='text-sm text-gray-600'>
              Ready in: {recipe.readyInMinutes || 'N/A'} min
            </span>
          </div>


          <div>
            <p className='text-orange-600 font-semibold mb-3'>Ingredients</p>

            {/* INGREDIENTS LIST */}

            <div className='mb-6'>
              {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
                <>
                  <p className='text-sm text-green-600 font-semibold mb-2'>You Have:</p>
                  {recipe.usedIngredients.map((ingredient, index) => (
                    <div key={index} className='flex border-b-2 mb-3 items-center justify-between py-3 gap-3 text-sm'>
                      <span className='flex-1'>{ingredient.name}</span>
                      <span className='text-gray-600 flex-1'>{ingredient.amount} {ingredient.unit}</span>
                      <CheckCircle size={15} className='text-green-600' />
                    </div>
                  ))}
                </>
              )}

              {recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
                <>
                  <p className='text-sm text-orange-600 font-semibold mb-2 mt-4'>You Need:</p>
                  {recipe.missedIngredients.map((ingredient, index) => (
                    <div key={index} className='flex border-b-2 mb-3 items-center justify-between py-3 gap-3 text-sm'>
                      <span className='flex-1'>{ingredient.name}</span>
                      <span className='text-gray-600 flex-1'>{ingredient.amount} {ingredient.unit}</span>
                    </div>
                  ))}
                </>
              )}

              {(!recipe.usedIngredients && !recipe.missedIngredients) && (
                <p className='text-gray-500 text-sm'>No ingredient information available</p>
              )}
            </div>



            <p className='text-orange-600 font-semibold mb-3'>Preparation Instructions</p>
            <div className='mb-6'>
              {recipe.instructions ? (
                <p className='text-gray-600 whitespace-pre-wrap'>{recipe.instructions}</p>
              ) : recipe.summary ? (
                <div
                  className='text-gray-600'
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                />
              ) : (
                <p className='text-gray-500'>
                  No instructions available. Visit the recipe source for more details.
                </p>
              )}
            </div>

            <button
              onClick={handleMarkAsCooked}
              disabled={loading}
              className='bg-green-500 text-white py-3 px-10 rounded-full w-full mb-3 disabled:opacity-50 hover:bg-green-600 transition-colors'
            >
              {loading ? 'Processing...' : 'Mark as Cooked'}
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default RecipeDetails
