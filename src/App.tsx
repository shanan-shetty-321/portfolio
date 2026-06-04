import { useEffect, useRef, useState, type FormEvent } from 'react'
import Background from './Background'
import Sidebar from './Sidebar'
import { about, experience, projects, skills, profile, WEB3FORMS_KEY } from './content'

export default function App() {
  const [active, setActive] = useState('about')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const mainRef = useRef<HTMLElement>(null)

  // scroll-spy + reveal-on-scroll + play videos only while visible
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section'))
    const spy = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive((e.target as HTMLElement).id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(s => spy.observe(s))

    const reveal = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target) } }),
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('.reveal').forEach(n => reveal.observe(n))

    const vids = Array.from(document.querySelectorAll<HTMLVideoElement>('video.demo'))
    const vio = new IntersectionObserver(
      es => es.forEach(e => { const v = e.target as HTMLVideoElement; if (e.isIntersecting) v.play().catch(() => {}); else v.pause() }),
      { threshold: 0.25 },
    )
    vids.forEach(v => vio.observe(v))

    return () => { spy.disconnect(); reveal.disconnect(); vio.disconnect() }
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const name = (f.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (f.elements.namedItem('email') as HTMLInputElement).value.trim()
    const msg = (f.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    if (!name || !email || !msg) return // never send blanks
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio message from ${name}`,
          from_name: name,
          name, email, message: msg,
        }),
      })
      const data = await res.json()
      if (data.success) { setStatus('ok'); f.reset() } else setStatus('err')
    } catch { setStatus('err') }
  }

  return (
    <>
      <Background />
      <div className="app">
        <Sidebar active={active} />
        <main className="main" ref={mainRef}>

          {/* ABOUT */}
          <section id="about" className="about reveal">
            <span className="sec-label">About</span>
            <h2 className="sec-title grad">Hi, I&rsquo;m Shanan</h2>
            <p className="lede">{about.lede}</p>
            <p>{about.passion}</p>
            <p style={{ color: 'var(--muted)' }}>{about.hobbies}</p>
            <div className="edu-row">
              {about.education.map(e => (
                <div className="edu" key={e.degree}><b>{e.degree}</b><span>{e.where}</span></div>
              ))}
            </div>
            <div className="achv"><b>GATE</b> — {about.achievements.replace('GATE — ', '')}</div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="reveal">
            <span className="sec-label">Experience</span>
            <h2 className="sec-title">Where I&rsquo;ve worked</h2>
            {experience.map(xp => (
              <div className="xp" key={xp.company}>
                <div className="head">
                  <b>{xp.role} <span className="co">· {xp.company}</span></b>
                  <span className="when">{xp.when}</span>
                </div>
                {xp.intro && <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginTop: '.2rem' }}>{xp.intro}</p>}
                {xp.projects?.map(p => (
                  <div className="xp-proj" key={p.name}>
                    <div className="pj-name">{p.name}</div>
                    <p>{p.desc}</p>
                    <div className="tags">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                  </div>
                ))}
                {xp.bullets && <ul>{xp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                {xp.bullets && <div className="tags">{xp.tags!.map(t => <span className="tag" key={t}>{t}</span>)}</div>}
              </div>
            ))}
          </section>

          {/* PROJECTS */}
          <section id="projects" className="reveal">
            <span className="sec-label">Projects</span>
            <h2 className="sec-title grad">Selected work</h2>
            {projects.map(p => (
              <article className="proj" key={p.no}>
                <video className="demo" muted loop playsInline preload="none" poster={p.poster}>
                  <source src={p.video} type="video/mp4" />
                </video>
                <h3><span className="no">{p.no}</span> {p.title}</h3>
                <p>{p.desc}</p>
                <div className="tags">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                <div className="links">
                  {p.live && <a className="btn-ghost" href={p.live} target="_blank" rel="noopener">Live Demo</a>}
                  {p.repo && <a className="btn-ghost" href={p.repo} target="_blank" rel="noopener">GitHub</a>}
                </div>
              </article>
            ))}
          </section>

          {/* SKILLS */}
          <section id="skills" className="reveal">
            <span className="sec-label">Skills</span>
            <h2 className="sec-title">Toolbox</h2>
            {skills.map(g => (
              <div className="skill-group" key={g.cat}>
                <div className="cat">{g.cat}</div>
                <div className="chips">{g.items.map(s => <span className="chip" key={s}>{s}</span>)}</div>
              </div>
            ))}
          </section>

          {/* CONTACT */}
          <section id="contact" className="contact reveal">
            <span className="sec-label">Contact</span>
            <h2 className="sec-title grad">Let&rsquo;s talk</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 480 }}>
              Open to AI/ML roles. Drop a message and it&rsquo;ll open in your mail client straight to my inbox.
            </p>
            <div className="row-links">
              <a href={`mailto:${profile.email}`}>✉ {profile.email}</a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>☎ {profile.phone}</a>
              <a href={profile.github} target="_blank" rel="noopener">↗ github.com/shanan-shetty-321</a>
              <a href={profile.linkedin} target="_blank" rel="noopener">↗ linkedin.com/in/shanan-shetty</a>
            </div>
            <form className="form" onSubmit={onSubmit}>
              <input name="name" placeholder="Your name" required />
              <input name="email" type="email" placeholder="Your email" required />
              <textarea name="message" placeholder="Your message" required />
              <button className="btn-contact" type="submit" style={{ alignSelf: 'flex-start' }} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              {status === 'ok' && <p style={{ color: '#7ee0a8', fontSize: '.9rem' }}>Thanks! Your message is on its way to my inbox.</p>}
              {status === 'err' && <p style={{ color: '#e08a8a', fontSize: '.9rem' }}>Something went wrong — please email me directly at {profile.email}.</p>}
            </form>
            <div className="foot">© {profile.name} — AI/ML Engineer</div>
          </section>

        </main>
      </div>
    </>
  )
}
