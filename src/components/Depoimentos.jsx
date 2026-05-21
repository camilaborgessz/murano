import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { DEPOIMENTOS } from '../data/content'
import { SectionHeader } from './shared'

const base = import.meta.env.BASE_URL
const PHOTOS = [
  `${base}murano1.jpeg`,
  `${base}murano2.jpeg`,
  `${base}murano3.jpeg`,
  `${base}murano4.jpeg`,
  `${base}murano5.jpeg`,
]

export default function Depoimentos() {
  const { ref, inView } = useReveal(0.1)
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)

  /* drag-to-scroll no track */
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const onPointerDown = (e) => {
    const track = trackRef.current
    if (!track) return
    drag.current = { active: true, startX: e.clientX, scrollLeft: track.scrollLeft }
    track.setPointerCapture(e.pointerId)
    setIsDragging(false)
  }
  const onPointerMove = (e) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 4) setIsDragging(true)
    trackRef.current.scrollLeft = drag.current.scrollLeft - dx
  }
  const onPointerUp = () => { drag.current.active = false }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track || !track.children[0]) return
    const cardW = track.children[0].offsetWidth + 24
    setCurrent(Math.round(track.scrollLeft / cardW))
  }

  return (
    <section style={{ background: '#111827', padding: 'clamp(60px,8vw,120px) 0', overflow: 'hidden' }}>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6 }}
        style={{ padding: '0 clamp(24px,5vw,80px)', marginBottom: 56, textAlign: 'center' }}
      >
        <SectionHeader
          eyebrow="O que dizem sobre nós"
          title="Experiências que"
          titleSecond="Ficam na Memória"
          light
        />
      </motion.div>

      {/* Track deslizável */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 24,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          padding: '8px clamp(24px,5vw,80px) 32px',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-x',
        }}
      >
        {DEPOIMENTOS.map((d, i) => (
          <DepoCard
            key={i}
            d={d}
            photoSrc={PHOTOS[i % PHOTOS.length]}
            active={i === current}
            isDragging={isDragging}
          />
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 8 }}>
        {DEPOIMENTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const track = trackRef.current
              if (!track) return
              const card = track.children[i]
              if (!card) return
              const offset = card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2
              track.scrollTo({ left: offset, behavior: 'smooth' })
              setCurrent(i)
            }}
            style={{
              width: i === current ? 28 : 8,
              height: 8, borderRadius: 4, border: 'none',
              background: i === current ? T.gold : 'rgba(201,168,76,0.28)',
              cursor: 'pointer', padding: 0,
              transition: 'width 0.35s ease, background 0.35s ease',
            }}
          />
        ))}
      </div>

      <style>{`
        [data-depo-track]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}

/* ── Card com flip ─────────────────────────────────────── */
function DepoCard({ d, photoSrc, active, isDragging }) {
  const [flipped, setFlipped] = useState(false)
  const pointerStart = useRef(null)

  const onPointerDown = (e) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    if (!pointerStart.current || isDragging) return
    const dx = Math.abs(e.clientX - pointerStart.current.x)
    const dy = Math.abs(e.clientY - pointerStart.current.y)
    if (dx < 8 && dy < 8) setFlipped(f => !f)
    pointerStart.current = null
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{
        width: 280, minWidth: 280, height: 360,
        scrollSnapAlign: 'center',
        flexShrink: 0,
        perspective: 1000,
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: '100%', height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Frente ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: T.cream,
          borderRadius: 24,
          padding: '28px 24px',
          overflow: 'hidden',
          boxShadow: active ? '0 24px 64px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.2)',
          border: `1px solid ${active ? 'rgba(201,168,76,0.5)' : 'transparent'}`,
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            fontFamily: T.fontDisplay, fontSize: 60,
            color: T.gold, lineHeight: 0.7,
            marginBottom: 20, opacity: 0.25, userSelect: 'none',
          }}>"</div>

          <p style={{
            fontFamily: T.fontBody, fontSize: 13,
            fontWeight: 400, lineHeight: 1.85,
            color: T.navy, fontStyle: 'italic',
            margin: '0 0 auto',
            flex: 1, overflow: 'hidden',
          }}>
            {d.text}
          </p>

          <div style={{
            width: 32, height: 2,
            background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
            borderRadius: 2, margin: '20px 0 14px',
          }} />

          <div style={{
            fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: T.navy,
          }}>
            {d.author}
          </div>

          <div style={{
            position: 'absolute', bottom: -32, right: -32,
            width: 96, height: 96, borderRadius: '50%',
            background: 'rgba(201,168,76,0.07)', pointerEvents: 'none',
          }} />
        </div>

        {/* ── Verso (foto) ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }}>
          <img
            src={photoSrc}
            alt="Murano Eventos"
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(13,27,62,0.55) 0%, transparent 50%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 18, left: 20,
            fontFamily: T.fontBody, fontSize: 9, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: T.gold,
          }}>
            {d.author} · Murano Eventos
          </div>
          <div style={{
            position: 'absolute', bottom: 14, right: 18,
            fontFamily: T.fontBody, fontSize: 9, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}>
            ← voltar
          </div>
        </div>
      </motion.div>
    </div>
  )
}
