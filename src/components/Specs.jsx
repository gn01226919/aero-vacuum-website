import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const SPECS = [
  { label: '馬達轉速', value: '120,000 RPM' },
  { label: '吸力', value: '230 AW' },
  { label: '噪音', value: '58 dB' },
  { label: '續航時間', value: '90 分鐘' },
  { label: '集塵容量', value: '0.76 公升' },
  { label: '過濾效率', value: 'HEPA 99.97%' },
  { label: '重量', value: '1.9 公斤' },
  { label: '充電時間', value: '3.5 小時' },
]

export default function Specs({ imageUrl }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="specs" className="specs-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">技術規格</p>
        <h2>每一個數字<br />都是承諾</h2>
      </motion.div>

      <div className="specs-layout">
        <motion.div
          className="specs-img-wrap"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          {imageUrl
            ? <img src={`${import.meta.env.VITE_API_URL ?? ''}${imageUrl}`} alt="規格展示" className="specs-img" />
            : <div className="specs-placeholder">
                <p>規格展示圖（待上傳）</p>
              </div>
          }
        </motion.div>

        <div className="specs-table">
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="spec-row"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
            >
              <span className="spec-label">{spec.label}</span>
              <span className="spec-value">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
