import { motion, useScroll, useTransform } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.82)'])
  const blur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(24px)'])
  const { count, setIsOpen } = useCart()

  return (
    <motion.nav style={{ backgroundColor: bg, backdropFilter: blur }} className="navbar">
      <div className="navbar-inner">
        <a href="/" className="nav-logo"><img src="/logo.svg" alt="AERO" height="32" /></a>
        <ul className="nav-links">
          <li><a href="#features">特色</a></li>
          <li><a href="#showcase">展示</a></li>
          <li><a href="#specs">規格</a></li>
          <li><a href="#buy" className="nav-btn btn-glass">立即購買</a></li>
          <li>
            <button className="cart-icon-btn btn-glass" onClick={() => setIsOpen(true)}>
              🛒
              {count > 0 && (
                <motion.span
                  className="cart-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={count}
                >
                  {count}
                </motion.span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </motion.nav>
  )
}
