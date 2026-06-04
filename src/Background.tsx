import { useEffect, useRef } from 'react'

// Full-page constellation behind everything (blue-white on the dark side).
export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const x = c.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0, h = 0, pts: { x: number; y: number; vx: number; vy: number }[] = []
    let raf = 0, running = true
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    function size() {
      w = c!.width = window.innerWidth * dpr
      h = c!.height = window.innerHeight * dpr
      c!.style.width = window.innerWidth + 'px'
      c!.style.height = window.innerHeight + 'px'
      const n = window.innerWidth < 700 ? 28 : 60
      pts = []
      for (let i = 0; i < n; i++)
        pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.22 * dpr, vy: (Math.random() - 0.5) * 0.22 * dpr })
    }
    function frame() {
      if (!running) return
      x.clearRect(0, 0, w, h)
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1 }
      const m = (130 * dpr) * (130 * dpr)
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy
        if (d < m) { x.strokeStyle = `rgba(200,214,224,${(1 - d / m) * 0.46})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke() }
      }
      x.shadowColor = 'rgba(199,217,229,.9)'; x.shadowBlur = 6 * dpr
      x.fillStyle = 'rgba(233,242,248,.95)'
      for (const p of pts) { x.beginPath(); x.arc(p.x, p.y, 1.5 * dpr, 0, 7); x.fill() }
      x.shadowBlur = 0
      raf = requestAnimationFrame(frame)
    }
    function onVis() { running = !document.hidden && !reduced; if (running) { cancelAnimationFrame(raf); frame() } }

    size()
    window.addEventListener('resize', size)
    document.addEventListener('visibilitychange', onVis)
    if (!reduced) frame()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  return <canvas id="bg" ref={ref} />
}
