import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL ?? ''

const SLOT_LABELS = {
  hero: 'Hero 主圖',
  feature1: '特色 1',
  feature2: '特色 2',
  feature3: '特色 3',
  showcase1: '展示 1',
  showcase2: '展示 2',
  specs: '規格圖',
}

function SortableCard({ id, url, label }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="dnd-card" {...attributes} {...listeners}>
      <div className="dnd-preview">
        {url
          ? <img src={`${API}${url}`} alt={label} className="dnd-img" />
          : <div className="dnd-empty">無圖片</div>
        }
      </div>
      <p className="dnd-label">{label}</p>
      <div className="dnd-handle">⠿</div>
    </div>
  )
}

export default function DragDropEditor({ images, onUpdate }) {
  const allSlots = Object.keys(SLOT_LABELS)
  const [slots, setSlots] = useState(allSlots)
  const [activeId, setActiveId] = useState(null)
  const [saved, setSaved] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null)
    if (!over || active.id === over.id) return
    setSlots(prev => arrayMove(prev, prev.indexOf(active.id), prev.indexOf(over.id)))
    setSaved(false)
  }

  const handleSave = async () => {
    const order = slots.map(slot => ({ slot, url: images?.[slot] || null }))
    await axios.put(`${API}/api/images/order`, { order })
    setSaved(true)
    onUpdate()
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="dnd-editor">
      <div className="dnd-toolbar">
        <p className="dnd-hint">拖曳卡片來調整圖片在頁面上的顯示順序</p>
        <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
          {saved ? '✓ 已儲存' : '儲存順序'}
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={slots} strategy={rectSortingStrategy}>
          <div className="dnd-grid">
            {slots.map(slot => (
              <SortableCard
                key={slot}
                id={slot}
                url={images?.[slot]}
                label={SLOT_LABELS[slot]}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId && (
            <div className="dnd-card overlay">
              <div className="dnd-preview">
                {images?.[activeId]
                  ? <img src={`${API}${images[activeId]}`} alt="" className="dnd-img" />
                  : <div className="dnd-empty">無圖片</div>
                }
              </div>
              <p className="dnd-label">{SLOT_LABELS[activeId]}</p>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
