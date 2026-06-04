import { useEffect, useRef, useState } from 'react'
import { profile, nav } from './content'

function LeftConstellation() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const x = c.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const GOLD = '238,222,176' // cream-gold, reads on the dark-gold panel
    let w = 0, h = 0, pts: { x: number; y: number; vx: number; vy: number }[] = []
    let raf = 0, running = true
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    function size() {
      const r = c!.getBoundingClientRect()
      w = c!.width = Math.max(1, r.width * dpr)
      h = c!.height = Math.max(1, r.height * dpr)
      const n = Math.max(12, Math.min(30, Math.round((r.width * r.height) / 22000)))
      pts = []
      for (let i = 0; i < n; i++)
        pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.18 * dpr, vy: (Math.random() - 0.5) * 0.18 * dpr })
    }
    function frame() {
      if (!running) return
      x.clearRect(0, 0, w, h)
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1 }
      const m = (120 * dpr) * (120 * dpr)
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy
        if (d < m) { x.strokeStyle = `rgba(${GOLD},${(1 - d / m) * 0.3})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke() }
      }
      x.fillStyle = `rgba(${GOLD},.85)`
      for (const p of pts) { x.beginPath(); x.arc(p.x, p.y, 1.5 * dpr, 0, 7); x.fill() }
      raf = requestAnimationFrame(frame)
    }
    function onVis() { running = !document.hidden && !reduced; if (running) { cancelAnimationFrame(raf); frame() } }

    size()
    window.addEventListener('resize', size)
    document.addEventListener('visibilitychange', onVis)
    if (!reduced) frame()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); document.removeEventListener('visibilitychange', onVis) }
  }, [])
  return <canvas id="bg-left" ref={ref} />
}

function useRotatingRole() {
  const [i, setI] = useState(0)
  const [swap, setSwap] = useState(false)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      setSwap(true)
      setTimeout(() => { setI(p => (p + 1) % profile.roles.length); setSwap(false) }, 350)
    }, 2200)
    return () => clearInterval(t)
  }, [])
  return { role: profile.roles[i], swap }
}

export default function Sidebar({ active }: { active: string }) {
  const { role, swap } = useRotatingRole()
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <aside className="sidebar">
      <LeftConstellation />
      <div className="avatar"><img src={profile.avatar} alt={profile.name} /></div>
      <div>
        <div className="name">{profile.name.split(' ')[0]}<br />{profile.name.split(' ')[1]}</div>
        <div className="role-wrap"><span className="arrow">▸</span><span id="role" className={swap ? 'swap' : ''}>{role}</span></div>
        <div className="tagline">{profile.tagline}<br />{profile.taglineSub}</div>
      </div>

      <nav className="side-nav">
        {nav.map(n => (
          <a key={n.id} onClick={() => go(n.id)} className={active === n.id ? 'active' : ''}>
            <span className="bar" />{n.label}
          </a>
        ))}
      </nav>

      <div className="side-bottom">
        <div className="socials">
          <a href={`mailto:${profile.email}`} title="Email" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="M3 6l9 7 9-7" /></svg>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href={profile.github} target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.465-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.221 0 4.609-2.805 5.624-5.475 5.921.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </a>
          <a href={profile.cv} target="_blank" rel="noopener" title="View CV" aria-label="CV" className="cv">CV</a>
        </div>
        <button className="btn-contact" onClick={() => go('contact')}>Contact Me</button>
      </div>
    </aside>
  )
}
