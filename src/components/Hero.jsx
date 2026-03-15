import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero({ imageUrl }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="hero">
      <motion.div className="hero-bg" style={{ y }}>
        {imageUrl
          ? <img src={`${import.meta.env.VITE_API_URL ?? ''}${imageUrl}`} alt="AERO Pro" className="hero-img" />
          : <div className="hero-placeholder">
              <div className="placeholder-icon">⬜</div>
              <p>Hero 主圖（待上傳）</p>
            </div>
        }
        <div className="hero-overlay" />
      </motion.div>

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          全新登場
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          AERO Pro
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          吸力極致。設計純粹。
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a href="#buy" className="btn-glass btn-primary-glass">立即購買</a>
          <a href="#features" className="btn-glass">了解更多 ›</a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{ opacity }}
      >
        <div className="scroll-dot" />
      </motion.div>
    </section>
  )
}
