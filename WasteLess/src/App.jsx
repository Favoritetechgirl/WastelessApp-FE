import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Onboarding from './components/Onboarding'
import ItemEntry from './components/ItemEntry'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ItemEntry />
    </>
  )
}

export default App
