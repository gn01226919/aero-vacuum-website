import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart'
import Home from './pages/Home'
import Admin from './pages/Admin'
import FeatureDetail from './pages/FeatureDetail'
import useLenis from './hooks/useLenis'
import './styles/main.css'

const API = import.meta.env.VITE_API_URL ?? ''

function AnimatedRoutes({ images, fetchImages }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home images={images} />} />
        <Route path="/feature/:slug" element={<FeatureDetail images={images} />} />
        <Route path="/admin" element={<Admin images={images} onUpdate={fetchImages} />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useLenis()
  const [images, setImages] = useState({})

  const fetchImages = async () => {
    try {
      const url = API ? `${API}/api/images` : '/images.json'
      const res = await axios.get(url)
      setImages(res.data)
    } catch { }
  }

  useEffect(() => { fetchImages() }, [])

  return (
    <BrowserRouter>
      <CartProvider>
        <AnimatedRoutes images={images} fetchImages={fetchImages} />
        <Cart />
      </CartProvider>
    </BrowserRouter>
  )
}
