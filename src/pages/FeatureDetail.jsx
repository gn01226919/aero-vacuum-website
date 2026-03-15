import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const API = import.meta.env.VITE_API_URL ?? ''

const FEATURE_DATA = {
  motor: {
    slot: 'feature1',
    eyebrow: '核心技術',
    title: '120,000 RPM 數位馬達',
    tagline: '業界最強吸力，重新定義清潔的極限',
    heroDesc: '我們花費 6 年研發這顆馬達。每分鐘旋轉 12 萬次，產生超過 230AW 的強勁吸力，是一般吸塵器的 3 倍以上。',
    color: '#0071e3',
    sections: [
      {
        title: '奈米碳纖維葉片',
        desc: '每片葉片僅重 0.03 克，卻能承受超過 30,000 次重力的離心力。採用航太等級材料，確保在極端轉速下依然保持結構完整。',
        stat: '0.03g',
        statLabel: '單葉片重量',
      },
      {
        title: '磁浮軸承系統',
        desc: '告別傳統滾珠軸承的摩擦損耗。磁浮設計讓轉子在無接觸狀態下旋轉，摩擦力趨近於零，同時大幅延長馬達壽命。',
        stat: '10年+',
        statLabel: '預計使用壽命',
      },
      {
        title: '智慧熱管理',
        desc: '內建 8 個熱感測器，即時監控馬達溫度，自動調節散熱。即使連續工作 90 分鐘，馬達溫度也不超過 45°C。',
        stat: '45°C',
        statLabel: '最高工作溫度',
      },
    ],
    specs: [
      { label: '最高轉速', value: '120,000 RPM' },
      { label: '吸力', value: '230 AW' },
      { label: '馬達效率', value: '92.4%' },
      { label: '葉片數量', value: '11 片' },
      { label: '馬達重量', value: '98g' },
      { label: '噪音', value: '58 dB' },
    ],
  },
  battery: {
    slot: 'feature2',
    eyebrow: '電源系統',
    title: '90 分鐘超長續航',
    tagline: '一次充電，完成整個家的清潔任務',
    heroDesc: '革命性固態鋰電池技術，能量密度比傳統電池高出 40%。告別充電焦慮，讓清潔工作從頭到尾一氣呵成。',
    color: '#30d158',
    sections: [
      {
        title: '固態電池技術',
        desc: '採用固態電解質取代傳統液態，不僅能量密度大幅提升，更徹底消除電池膨脹與自燃的安全隱患。每顆電池通過 UL 認證與 3,000 次充放電測試。',
        stat: '+40%',
        statLabel: '能量密度提升',
      },
      {
        title: '3 段智慧功率',
        desc: '根據地面狀況自動切換 Eco / Standard / Max 三種模式。日常模式可達 90 分鐘；全速清潔最大吸力模式也有 25 分鐘。',
        stat: '90min',
        statLabel: 'Eco 模式續航',
      },
      {
        title: '快速充電技術',
        desc: '支援 45W 快充，僅需 3.5 小時即可充滿。充電底座採用 Qi 無線充電設計，放上去就能充，告別繁瑣插線。',
        stat: '3.5hr',
        statLabel: '完整充電時間',
      },
    ],
    specs: [
      { label: '電池容量', value: '7,200 mAh' },
      { label: '電壓', value: '25.2V' },
      { label: 'Eco 續航', value: '90 分鐘' },
      { label: 'Max 續航', value: '25 分鐘' },
      { label: '充電時間', value: '3.5 小時' },
      { label: '充電週期', value: '3,000 次' },
    ],
  },
  silent: {
    slot: 'feature3',
    eyebrow: '聲學工程',
    title: '58 dB 靜音科技',
    tagline: '清潔時，依然保有完整的生活品質',
    heroDesc: '58 分貝，相當於安靜的辦公室背景音。AERO Pro 讓你在寶寶睡覺、開著視訊會議時，也能從容不迫地清潔每個角落。',
    color: '#bf5af2',
    sections: [
      {
        title: '雙層隔音腔體',
        desc: '馬達艙採用航太等級隔音棉與雙層金屬腔體設計，將馬達噪音在源頭阻斷。聲音在到達外殼前已衰減超過 60%。',
        stat: '-60%',
        statLabel: '噪音衰減率',
      },
      {
        title: '主動降噪算法',
        desc: '內建麥克風陣列持續監測工作噪音，透過 DSP 晶片即時產生反向聲波，主動抵消剩餘噪音，實現真正的安靜清潔。',
        stat: '32bit',
        statLabel: 'DSP 處理器',
      },
      {
        title: '流體動力學設計',
        desc: '吸嘴與風道採用計算流體力學（CFD）模擬優化，氣流路徑更順暢，減少湍流噪音的同時，反而提升了吸力效率。',
        stat: 'CFD',
        statLabel: '氣流優化設計',
      },
    ],
    specs: [
      { label: '噪音值', value: '58 dB' },
      { label: '隔音材質', value: '航太隔音棉' },
      { label: 'DSP 晶片', value: '32-bit ARM' },
      { label: '麥克風數量', value: '4 個陣列' },
      { label: '降噪效果', value: '-60%' },
      { label: '認證', value: 'ISO 11203' },
    ],
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

export default function FeatureDetail({ images }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem, products } = useCart()
  const data = FEATURE_DATA[slug]

  if (!data) return (
    <div style={{ color: '#fff', padding: 80, textAlign: 'center' }}>
      <h2>找不到此頁面</h2>
      <button className="btn-glass" onClick={() => navigate('/')}>返回首頁</button>
    </div>
  )

  const imgUrl = images?.[data.slot]

  return (
    <motion.div
      className="detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 返回按鈕 */}
      <motion.button
        className="detail-back btn-glass"
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        ← 返回
      </motion.button>

      {/* Hero 區塊 */}
      <div className="detail-hero">
        <div className="detail-hero-img">
          {imgUrl
            ? <img src={`${API}${imgUrl}`} alt={data.title} />
            : <div className="detail-img-placeholder" />
          }
          <div className="detail-hero-glow" style={{ background: `radial-gradient(circle, ${data.color}33 0%, transparent 70%)` }} />
        </div>
        <div className="detail-hero-text">
          <motion.p className="eyebrow" variants={fadeUp} custom={0} initial="hidden" animate="show"
            style={{ color: data.color }}>{data.eyebrow}</motion.p>
          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="show">{data.title}</motion.h1>
          <motion.p className="detail-tagline" variants={fadeUp} custom={2} initial="hidden" animate="show">{data.tagline}</motion.p>
          <motion.p className="detail-hero-desc" variants={fadeUp} custom={3} initial="hidden" animate="show">{data.heroDesc}</motion.p>
          <motion.div className="detail-actions" variants={fadeUp} custom={4} initial="hidden" animate="show">
            <button className="btn-glass btn-primary-glass" onClick={() => addItem(products[0])}
              style={{ '--accent': data.color }}>
              加入購物車
            </button>
            <button className="btn-glass" onClick={() => navigate('/#buy')}>了解定價</button>
          </motion.div>
        </div>
      </div>

      {/* 三段特色 */}
      <div className="detail-sections">
        {data.sections.map((sec, i) => (
          <motion.div
            key={sec.title}
            className="detail-section-card"
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="detail-stat" style={{ color: data.color }}>
              <span className="stat-num">{sec.stat}</span>
              <span className="stat-label">{sec.statLabel}</span>
            </div>
            <h3>{sec.title}</h3>
            <p>{sec.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 規格表 */}
      <motion.div
        className="detail-specs"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow" style={{ color: data.color, textAlign: 'center' }}>技術規格</p>
        <h2 style={{ textAlign: 'center', marginBottom: 48 }}>數字說明一切</h2>
        <div className="detail-specs-grid">
          {data.specs.map((s, i) => (
            <motion.div
              key={s.label}
              className="detail-spec-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span className="spec-value" style={{ color: data.color }}>{s.value}</span>
              <span className="spec-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="detail-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>準備好體驗了嗎？</h2>
        <p>AERO Pro 從 NT$ 29,900 起</p>
        <div className="detail-actions" style={{ justifyContent: 'center' }}>
          <button className="btn-glass btn-primary-glass" onClick={() => addItem(products[0])}>
            加入購物車
          </button>
          <button className="btn-glass" onClick={() => navigate('/')}>回到首頁</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
