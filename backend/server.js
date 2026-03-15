import express from 'express'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const IMAGES_PATH = path.join(__dirname, 'data', 'images.json')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${req.params.slot}-${Date.now()}${ext}`)
  }
})
const upload = multer({ storage })

function readImages() {
  return JSON.parse(fs.readFileSync(IMAGES_PATH, 'utf8'))
}

function writeImages(data) {
  fs.writeFileSync(IMAGES_PATH, JSON.stringify(data, null, 2))
}

// 取得所有圖片配置
app.get('/api/images', (req, res) => {
  res.json(readImages())
})

// 上傳圖片至指定區塊
app.post('/api/images/:slot', upload.single('image'), (req, res) => {
  const { slot } = req.params
  const images = readImages()

  if (!(slot in images)) {
    return res.status(400).json({ error: `區塊 "${slot}" 不存在` })
  }

  // 刪除舊圖
  if (images[slot]) {
    const oldPath = path.join(__dirname, 'uploads', path.basename(images[slot]))
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
  }

  images[slot] = `/uploads/${req.file.filename}`
  writeImages(images)

  res.json({ slot, url: images[slot] })
})

// 更新圖片排列順序（拖拉後儲存）
app.put('/api/images/order', (req, res) => {
  const { order } = req.body
  const images = readImages()
  const updated = { ...images }

  order.forEach(({ slot, url }) => {
    updated[slot] = url
  })

  writeImages(updated)
  res.json({ success: true })
})

// 刪除指定區塊圖片
app.delete('/api/images/:slot', (req, res) => {
  const { slot } = req.params
  const images = readImages()

  if (images[slot]) {
    const oldPath = path.join(__dirname, 'uploads', path.basename(images[slot]))
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
    images[slot] = null
    writeImages(images)
  }

  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`✅ 後台 API 伺服器運行中：http://localhost:${PORT}`)
})
