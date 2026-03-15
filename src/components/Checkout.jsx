import { motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const FIELDS = [
  { name: 'name', label: '姓名', type: 'text', placeholder: '王小明' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'example@email.com' },
  { name: 'phone', label: '手機號碼', type: 'tel', placeholder: '0912-345-678' },
  { name: 'address', label: '收件地址', type: 'text', placeholder: '台北市信義區信義路五段7號' },
]

export default function Checkout() {
  const { setIsCheckout, setIsOpen, total, items } = useCart()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', payment: 'credit' })
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = '請輸入姓名'
    if (!form.email.includes('@')) e.email = '請輸入有效 Email'
    if (form.phone.length < 8) e.phone = '請輸入手機號碼'
    if (!form.address.trim()) e.address = '請輸入收件地址'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setDone(true)
  }

  const handleClose = () => {
    setIsCheckout(false)
    if (done) setIsOpen(false)
  }

  return (
    <motion.div
      className="checkout-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <motion.div
        className="checkout-modal"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        {done ? (
          <div className="checkout-success">
            <motion.div
              className="success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            >
              ✓
            </motion.div>
            <h2>訂單已確認！</h2>
            <p>感謝您的購買，我們將於 3-5 個工作天內出貨。<br />確認信已發送至 {form.email}</p>
            <button className="btn-glass" onClick={handleClose}>返回</button>
          </div>
        ) : (
          <>
            <div className="checkout-header">
              <h2>填寫訂購資料</h2>
              <button className="cart-close" onClick={handleClose}>✕</button>
            </div>

            <div className="checkout-summary">
              {items.map(i => (
                <div key={i.id} className="summary-row">
                  <span>{i.name} × {i.qty}</span>
                  <span>NT$ {(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="summary-total">
                <span>總計</span>
                <span>NT$ {total.toLocaleString()}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              {FIELDS.map(f => (
                <div key={f.name} className="form-group">
                  <label>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={e => { setForm(p => ({ ...p, [f.name]: e.target.value })); setErrors(p => ({ ...p, [f.name]: '' })) }}
                    className={errors[f.name] ? 'error' : ''}
                  />
                  {errors[f.name] && <p className="form-error">{errors[f.name]}</p>}
                </div>
              ))}

              <div className="form-group">
                <label>付款方式</label>
                <div className="payment-options">
                  {[['credit', '💳 信用卡'], ['transfer', '🏦 銀行轉帳'], ['cod', '💵 貨到付款']].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      className={`payment-btn btn-glass ${form.payment === val ? 'active' : ''}`}
                      onClick={() => setForm(p => ({ ...p, payment: val }))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-glass btn-submit">
                確認訂單・NT$ {total.toLocaleString()}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
