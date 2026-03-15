import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const FEATURES = [
  { slot: 'feature1', slug: 'motor', icon: '💨', title: '120,000 RPM 數位馬達', desc: '業界最高轉速，提供颶風級吸力，細至 0.3 微米的微粒無所遁形。' },
  { slot: 'feature2', slug: 'battery', icon: '🔋', title: '90 分鐘超長續航', desc: '革命性固態電池技術，單次充電輕鬆完成整棟建築的清潔任務。' },
  { slot: 'feature3', slug: 'silent', icon: '🤫', title: '靜音降噪科技', desc: '58 分貝靜音設計，讓你在清潔時依然保有完整的寧靜空間。' },
]

function FeatureCard({ feature, imageUrl, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()

  return (
    <motion.div
      ref={ref}
      className="feature-card feature-card-clickable"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => navigate(`/feature/${feature.slug}`)}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <div className="feature-img-wrap">
        {imageUrl
          ? <img src={`${import.meta.env.VITE_API_URL ?? ''}${imageUrl}`} alt={feature.title} className="feature-img" />
          : <div className="feature-placeholder">
              <span className="feature-icon">{feature.icon}</span>
              <p className="placeholder-label">待上傳圖片</p>
            </div>
        }
        <div className="feature-card-overlay">
          <span className="feature-card-cta">深入了解 →</span>
        </div>
      </div>
      <div className="feature-text">
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Features({ images }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="features-section">
      <motion.div
        ref={ref}
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">核心技術</p>
        <h2>重新定義<br />清潔的標準</h2>
      </motion.div>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.slot} feature={f} imageUrl={images?.[f.slot]} index={i} />
        ))}
      </div>
    </section>
  )
}
