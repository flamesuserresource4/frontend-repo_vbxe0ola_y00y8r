import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import ChatModal from './ChatModal'

function App() {
  const [openChat, setOpenChat] = useState(false)

  // Typing effect for subtitle
  const [typed, setTyped] = useState('')
  useEffect(() => {
    const text = 'Futuristic Frontend • Creative Code • Sci‑Fi Interfaces'
    let i = 0
    const id = setInterval(() => {
      setTyped(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [])

  function downloadResume() {
    const blob = new Blob([`Resume\nName: Your Name\nRole: Frontend Developer\nEmail: you@example.com`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Resume.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-[#05070d]">
      {/* Techy grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,255,0.05),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />

      {/* Spline 3D scene */}
      <div className="absolute inset-0" aria-hidden="true">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Content layer */}
      <section className="relative z-10 container mx-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-black/30 px-3 py-1 text-xs sm:text-sm text-cyan-200/80 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          Available for freelance projects
        </div>

        <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight [text-shadow:0_0_20px_rgba(34,211,238,0.35)]">
          <span className="block font-[Orbitron]">Sci‑Fi Web Experiences</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">that feel alive</span>
        </h1>

        <p className="mt-5 max-w-2xl text-cyan-100/80 font-mono">
          {typed}
          <span className="inline-block w-3 h-5 align-[-2px] bg-cyan-300/80 animate-pulse ml-1" />
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button onClick={() => setOpenChat(true)} className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-purple-500 transition shadow-[0_0_30px_rgba(34,211,238,0.35)] border border-white/10">
            <span className="relative z-10 font-semibold tracking-wide">ask AI about me</span>
            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition" />
            <span className="absolute -inset-px rounded-xl ring-2 ring-cyan-300/40 group-hover:ring-purple-300/40 animate-[pulse_2s_infinite]" aria-hidden="true" />
          </button>

          <button onClick={downloadResume} className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl backdrop-blur-md bg-white/5 hover:bg-white/10 border border-cyan-400/30 text-cyan-100 transition">
            <span className="relative z-10 font-semibold tracking-wide">download resume</span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition" />
          </button>
        </div>

        {/* Floating badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-cyan-200/70">
          <div className="glass-tile">WebGL</div>
          <div className="glass-tile">Framer Motion</div>
          <div className="glass-tile">Three.js</div>
          <div className="glass-tile">React + FastAPI</div>
        </div>
      </section>

      {/* Glass gradient corner accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </main>
  )
}

export default App
