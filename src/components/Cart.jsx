import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import Checkout from './Checkout'

export default function Cart() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen, isCheckout, setIsCheckout } = useCart()

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              className="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* 購物車抽屜 */}
            <motion.div
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="cart-header">
                <h2>購物車 {count > 0 && <span className="cart-badge">{count}</span>}</h2>
                <button className="cart-close" onClick={() => setIsOpen(false)}>✕</button>
              </div>

              <div className="cart-body">
                {items.length === 0
                  ? <div className="cart-empty">
                      <p>購物車是空的</p>
                      <button className="btn-glass" onClick={() => setIsOpen(false)}>繼續購物</button>
                    </div>
                  : <>
                      {items.map(item => (
                        <motion.div
                          key={item.id}
                          className="cart-item"
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                        >
                          <div className="cart-item-info">
                            <p className="cart-item-name">{item.name}</p>
                            <p className="cart-item-desc">{item.desc}</p>
                          </div>
                          <div className="cart-item-controls">
                            <div className="qty-control">
                              <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                              <span>{item.qty}</span>
                              <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                            </div>
                            <p className="cart-item-price">NT$ {(item.price * item.qty).toLocaleString()}</p>
                            <button className="cart-item-remove" onClick={() => removeItem(item.id)}>✕</button>
                          </div>
                        </motion.div>
                      ))}
                    </>
                }
              </div>

              {items.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>總計</span>
                    <span className="cart-total-price">NT$ {total.toLocaleString()}</span>
                  </div>
                  <p className="cart-note">免費配送・30 天退換</p>
                  <button
                    className="btn-glass btn-checkout"
                    onClick={() => setIsCheckout(true)}
                  >
                    前往結帳
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCheckout && <Checkout />}
      </AnimatePresence>
    </>
  )
}
