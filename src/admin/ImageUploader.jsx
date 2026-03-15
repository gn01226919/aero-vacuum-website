import { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL ?? ''

const SLOTS = [
  { key: 'hero', label: 'Hero 主圖' },
  { key: 'feature1', label: '特色 1 - 馬達' },
  { key: 'feature2', label: '特色 2 - 電池' },
  { key: 'feature3', label: '特色 3 - 靜音' },
  { key: 'showcase1', label: '展示 1 - 超薄機身' },
  { key: 'showcase2', label: '展示 2 - AI 感測' },
  { key: 'specs', label: '規格展示圖' },
]

export default function ImageUploader({ images, onUpdate }) {
  const [loading, setLoading] = useState({})
  const [dragOver, setDragOver] = useState(null)

  const handleFile = async (slot, file) => {
    if (!file) return
    setLoading(p => ({ ...p, [slot]: true }))
    const form = new FormData()
    form.append('image', file)
    try {
      await axios.post(`${API}/api/images/${slot}`, form)
      onUpdate()
    } catch (e) {
      alert('上傳失敗：' + e.message)
    }
    setLoading(p => ({ ...p, [slot]: false }))
  }

  const handleDelete = async (slot) => {
    if (!confirm(`確定要刪除「${slot}」的圖片嗎？`)) return
    await axios.delete(`${API}/api/images/${slot}`)
    onUpdate()
  }

  return (
    <div className="uploader-grid">
      {SLOTS.map(({ key, label }) => (
        <div
          key={key}
          className={`upload-card ${dragOver === key ? 'drag-active' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(key) }}
          onDragLeave={() => setDragOver(null)}
          onDrop={e => {
            e.preventDefault()
            setDragOver(null)
            handleFile(key, e.dataTransfer.files[0])
          }}
        >
          <p className="upload-label">{label}</p>

          <div className="upload-preview">
            {images?.[key]
              ? <img src={`${API}${images[key]}`} alt={label} className="preview-img" />
              : <div className="no-img">尚未上傳</div>
            }
          </div>

          <div className="upload-actions">
            <label className={`btn-upload ${loading[key] ? 'loading' : ''}`}>
              {loading[key] ? '上傳中...' : '選擇圖片'}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleFile(key, e.target.files[0])}
                disabled={loading[key]}
              />
            </label>
            {images?.[key] && (
              <button className="btn-delete" onClick={() => handleDelete(key)}>刪除</button>
            )}
          </div>

          <p className="drag-hint">或拖曳圖片至此</p>
        </div>
      ))}
    </div>
  )
}
