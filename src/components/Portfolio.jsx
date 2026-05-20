import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './shared'

const base = import.meta.env.BASE_URL
const IMAGES = [
  { src: `${base}murano1.jpeg`, ratio: '4/3'  },
  { src: `${base}murano2.jpeg`, ratio: '3/4'  },
  { src: `${base}murano3.jpeg`, ratio: '16/9' },
  { src: `${base}murano4.jpeg`, ratio: '4/3'  },
  { src: `${base}murano5.jpeg`, ratio: '3/4'  },
  { src: `${base}murano6.jpeg`, ratio: '1/1'  },
  { src: `${base}murano7.jpeg`, ratio: '16/9' },
]

const ROW1 = IMAGES
const ROW2 = [...IMAGES].reverse()

export default function Portfolio() {
  const { ref, inView } = useReveal(0.15)

  return (
    <section style={{ background: T.navy, overflow: 'hidden', paddingBottom: 80 }}>

      <div style={{ padding: 'clamp(60px,8vw,80px) clamp(24px,5vw,80px) 0' }}>
        <div style={{ marginBottom: -40 }}>
          <SectionHeader
            eyebrow="Nosso Portfólio"
            title="Eventos que"
            titleSecond="Realizamos"
            light
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ textAlign: 'center', marginBottom: 36 }}
      >
        <motion.a
          href="https://www.instagram.com/muranoeventos_/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, borderColor: T.gold, color: T.gold }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '13px 32px',
            border: `1.5px solid rgba(201,168,76,0.35)`,
            borderRadius: 100,
            color: 'rgba(255,255,255,0.7)',
            fontFamily: T.fontBody, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'border-color 0.25s, color 0.25s',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
          </svg>
          Ver mais
        </motion.a>
      </motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <MarqueeRow images={ROW1} direction="left"  speed={55} height={300} />
        <MarqueeRow images={ROW2} direction="right" speed={70} height={260} />
      </motion.div>

      <style>{`
        @keyframes mqLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mqRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}

/* ── Faixa de marquee com drag ───────────────────────── */
function MarqueeRow({ images, direction, speed, height }) {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startTx: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const doubled = [...images, ...images]
  const anim = direction === 'left' ? 'mqLeft' : 'mqRight'

  const getTx = () => {
    const track = trackRef.current
    if (!track) return 0
    const matrix = new DOMMatrix(window.getComputedStyle(track).transform)
    return matrix.m41
  }

  const onPointerDown = (e) => {
    const track = trackRef.current
    if (!track) return
    e.preventDefault()
    const tx = getTx()
    drag.current = { active: true, startX: e.clientX, startTx: tx }
    track.style.animation = 'none'
    track.style.transform = `translateX(${tx}px)`
    track.setPointerCapture(e.pointerId)
    setIsDragging(true)
  }

  const onPointerMove = (e) => {
    if (!drag.current.active) return
    const track = trackRef.current
    if (!track) return
    const newX = drag.current.startTx + (e.clientX - drag.current.startX)
    track.style.transform = `translateX(${newX}px)`
  }

  const onPointerUp = (e) => {
    if (!drag.current.active) return
    drag.current.active = false
    setIsDragging(false)
    const track = trackRef.current
    if (!track) return

    const endX = drag.current.startTx + (e.clientX - drag.current.startX)
    const halfWidth = track.scrollWidth / 2

    // Calcula animation-delay para retomar do ponto onde o usuário soltou
    let delay
    if (direction === 'left') {
      // mqLeft: translateX(0) → translateX(-halfWidth)
      let pos = endX % halfWidth
      if (pos > 0) pos -= halfWidth   // normaliza para [-halfWidth, 0]
      delay = (pos / halfWidth) * speed // delay negativo = começa desse ponto
    } else {
      // mqRight: translateX(-halfWidth) → translateX(0)
      let pos = endX % halfWidth
      if (pos > 0) pos -= halfWidth
      const frac = 1 - Math.abs(pos) / halfWidth
      delay = -frac * speed
    }

    track.style.transform = ''
    track.style.animation = `${anim} ${speed}s linear infinite`
    track.style.animationDelay = `${delay}s`
  }

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      {/* Fade esquerdo */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 120, zIndex: 2,
        background: `linear-gradient(to right, ${T.navy}, transparent)`,
        pointerEvents: 'none',
      }} />
      {/* Fade direito */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 120, zIndex: 2,
        background: `linear-gradient(to left, ${T.navy}, transparent)`,
        pointerEvents: 'none',
      }} />

      {/* Track */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          display: 'flex',
          gap: 14,
          width: 'max-content',
          animation: `${anim} ${speed}s linear infinite`,
          touchAction: 'pan-y',
        }}
      >
        {doubled.map((img, i) => (
          <Card key={i} src={img.src} ratio={img.ratio} height={height} isDragging={isDragging} />
        ))}
      </div>
    </div>
  )
}

/* ── Card individual ──────────────────────────────────── */
function Card({ src, ratio, height, isDragging }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => !isDragging && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height,
        aspectRatio: ratio,
        borderRadius: 16,
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
        transform: hov ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        boxShadow: hov
          ? '0 20px 60px rgba(0,0,0,0.5)'
          : '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      <img
        src={src}
        alt="Evento Murano"
        draggable={false}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transform: hov ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        background: hov
          ? 'linear-gradient(to top, rgba(13,27,62,0.75) 0%, transparent 60%)'
          : 'transparent',
        transition: 'background 0.4s ease',
      }}>
        {hov && (
          <div style={{
            position: 'absolute', bottom: 18, left: 20,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              fontFamily: T.fontBody, fontSize: 9, fontWeight: 600,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: T.gold,
            }}>
              Murano Eventos
            </span>
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 16,
        border: `1.5px solid ${hov ? 'rgba(201,168,76,0.45)' : 'transparent'}`,
        transition: 'border-color 0.35s ease',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
