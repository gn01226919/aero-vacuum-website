import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

function ShowcaseBlock({ imageUrl, slot, title, desc, reverse, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <motion.div
      ref={ref}
      className={`showcase-block ${reverse ? 'reverse' : ''}`}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="showcase-img-wrap">
        {imageUrl
          ? <img src={`${import.meta.env.VITE_API_URL ?? ''}${imageUrl}`} alt={title} className="showcase-img" />
          : <div className="showcase-placeholder">
              <p>展示圖片 {slot}（待上傳）</p>
            </div>
        }
      </div>
      <div className="showcase-text">
        <p className="eyebrow">展示亮點</p>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </motion.div>
  )
}

export default function Showcase({ images }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bg = useTransform(scrollYProgress, [0, 0.5, 1], ['#000', '#0a0a0a', '#000'])

  return (
    <motion.section id="showcase" ref={ref} className="showcase-section" style={{ background: bg }}>
      <ShowcaseBlock
        imageUrl={images?.showcase1}
        slot="showcase1"
        title="極薄機身，無處不達"
        desc="僅 2.4mm 超薄吸嘴，輕鬆滑入沙發縫隙、床底角落，連最狹小的空間都能徹底清潔。"
        reverse={false}
        delay={0}
      />
      <ShowcaseBlock
        imageUrl={images?.showcase2}
        slot="showcase2"
        title="AI 智能感測系統"
        desc="內建 32 個環境感測器，自動辨識地面材質並即時調整吸力，地毯、木地板、磁磚通通搞定。"
        reverse={true}
        delay={0.1}
      />
    </motion.section>
  )
}
