import { useEffect, useRef, useState } from 'react'

export default function ChatModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I’m your AI guide. Ask me anything about the portfolio, skills, or experience." },
  ])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  async function sendMessage(e) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const text = (formData.get('message') || '').toString().trim()
    if (!text) return

    setError('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    form.reset()
    setPending(true)

    try {
      const res = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-Yq5Cz1mhH2FcgDMbzAf2wvCbAR6mgHRF',
        },
        body: JSON.stringify({
          user_id: 'sumesh13055@gmail.com',
          agent_id: '6910378f13d93e643cb8270e',
          session_id: '6910378f13d93e643cb8270e-m5xk84ybetp',
          message: text,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.message || `Request failed: ${res.status}`)
      }

      const reply = data?.data?.response || data?.response || data?.message || JSON.stringify(data)
      setMessages(prev => [...prev, { role: 'assistant', content: String(reply) }])
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <section aria-modal="true" role="dialog" ref={dialogRef} className="relative w-full sm:max-w-2xl sm:rounded-2xl bg-[#0b0f1a]/80 border border-cyan-400/30 shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)] overflow-hidden">
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40">AI</span>
            <div>
              <h2 className="text-cyan-200 font-semibold tracking-wide leading-none">Ask AI about me</n2>
              <p className="text-xs text-cyan-200/60">Powered by Lyzr Agent</p>
            </div>
          </div>
          <button onClick={onClose} className="group px-3 py-1.5 rounded-md border border-white/10 text-cyan-200/70 hover:text-white hover:border-cyan-400/40 transition-colors" aria-label="Close chat">
            Close
          </button>
        </header>

        <div className="h-[50vh] sm:h-80 overflow-y-auto space-y-4 px-4 sm:px-6 py-4 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.06),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_40%)]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`${m.role === 'user' ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-100' : 'bg-white/5 border-white/10 text-white/90'} max-w-[85%] sm:max-w-[75%] rounded-xl px-3 sm:px-4 py-2 text-sm border shadow-[inset_0_0_10px_rgba(34,211,238,0.15)]`}> 
                {m.content}
              </div>
            </div>
          ))}
          {pending && (
            <div className="flex items-center gap-2 text-cyan-200/70 text-sm">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:150ms]"></span>
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:300ms]"></span>
              <span className="ml-2">AI is thinking…</span>
            </div>
          )}
          {error && (
            <p className="text-red-400/90 text-xs" role="alert">{error}</p>
          )}
        </div>

        <form onSubmit={sendMessage} className="p-3 sm:p-4 bg-black/30 border-t border-white/10">
          <div className="flex items-center gap-2">
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              id="chat-input"
              ref={inputRef}
              name="message"
              autoComplete="off"
              placeholder="Ask about skills, projects, experience…"
              className="flex-1 rounded-lg bg-black/40 border border-cyan-400/30 text-cyan-100 placeholder:text-cyan-200/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            />
            <button
              type="submit"
              disabled={pending}
              className="relative overflow-hidden rounded-lg px-4 py-2 bg-gradient-to-r from-cyan-500/80 to-purple-500/80 text-white font-medium border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition disabled:opacity-60"
            >
              <span className="pointer-events-none relative z-10">Send</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-10 transition" aria-hidden="true"></span>
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
