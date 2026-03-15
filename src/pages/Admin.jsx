import { useState } from 'react'
import ImageUploader from '../admin/ImageUploader'
import DragDropEditor from '../admin/DragDropEditor'

export default function Admin({ images, onUpdate }) {
  const [tab, setTab] = useState('upload')

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-title-wrap">
          <a href="/" className="admin-back">← 返回網站</a>
          <h1 className="admin-title">AERO 後台管理</h1>
        </div>
        <div className="admin-tabs">
          <button
            className={`tab-btn ${tab === 'upload' ? 'active' : ''}`}
            onClick={() => setTab('upload')}
          >
            圖片上傳
          </button>
          <button
            className={`tab-btn ${tab === 'editor' ? 'active' : ''}`}
            onClick={() => setTab('editor')}
          >
            拖拉式編輯
          </button>
        </div>
      </div>

      <div className="admin-body">
        {tab === 'upload'
          ? <ImageUploader images={images} onUpdate={onUpdate} />
          : <DragDropEditor images={images} onUpdate={onUpdate} />
        }
      </div>
    </div>
  )
}
