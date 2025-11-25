import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Onboarding from './components/Onboarding'
import ItemEntry from './components/ItemEntry'
import SortAndFilter from './components/SortAndFilter'
import ItemDetails from './components/ItemDetails'

import FoodHero from './components/Modals'
import DeleteModal from './components/DeleteModal'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <DeleteModal />
    </>
  )
  
}

export default App
