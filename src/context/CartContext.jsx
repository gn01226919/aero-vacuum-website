import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

const PRODUCTS = [
  { id: 'aero-pro', name: 'AERO Pro', price: 29900, desc: '標準版・含充電座' },
  { id: 'aero-pro-plus', name: 'AERO Pro+', price: 36900, desc: '進階版・含全配件組' },
]

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)

  const addItem = (product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return removeItem(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty,
      total, count, isOpen, setIsOpen,
      isCheckout, setIsCheckout,
      products: PRODUCTS
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
