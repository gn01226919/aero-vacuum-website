import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,           // 滾動持續時間（秒）
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 指數緩動，有彈性感
      smooth: true,
      smoothTouch: false,      // 手機不啟用（避免衝突）
      touchMultiplier: 2,
    })

    // 整合 Framer Motion 的 RAF
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}
