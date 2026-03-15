import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCart } from '../context/CartContext'

export default function BuyCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { addItem, products } = useCart()

  return (
    <section id="buy" className="buy-section" ref={ref}>
      <motion.div
        className="buy-inner"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">AERO Pro</p>
        <h2>從 NT$ 29,900 起</h2>
        <p className="buy-desc">免費配送・30 天無條件退換・一年保固</p>

        <div className="buy-products">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              className="buy-product-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            >
              <p className="buy-product-name">{p.name}</p>
              <p className="buy-product-desc">{p.desc}</p>
              <p className="buy-product-price">NT$ {p.price.toLocaleString()}</p>
              <button
                className="btn-glass btn-primary-glass"
                onClick={() => addItem(p)}
              >
                加入購物車
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
