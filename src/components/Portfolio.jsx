import { useState } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './shared'

/* Cada imagem tem um aspect-ratio para variar o ritmo visual */
const IMAGES = [
  { src: '/murano1.jpeg', ratio: '4/3'  },
  { src: '/murano2.jpeg', ratio: '3/4'  },
  { src: '/murano3.jpeg', ratio: '16/9' },
  { src: '/murano4.jpeg', ratio: '4/3'  },
  { src: '/murano5.jpeg', ratio: '3/4'  },
  { src: '/murano6.jpeg', ratio: '1/1'  },
  { src: '/murano7.jpeg', ratio: '16/9' },
]

/* Linhas com ordem diferente para não ficarem idênticas */
const ROW1 = IMAGES
const ROW2 = [...IMAGES].reverse()

export default function Portfolio() {
  const { ref, inView } = useReveal(0.15)

  return (
    <section style={{ background: T.navy, overflow: 'hidden', paddingBottom: 80 }}>

      {/* Título */}
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

      {/* Link Instagram */}
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
          {/* ícone Instagram SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
          </svg>
          Ver mais no Instagram
        </motion.a>
      </motion.div>

      {/* Faixas */}
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

/* ── Faixa de marquee ─────────────────────────────────── */
function MarqueeRow({ images, direction, speed, height }) {
  const [paused, setPaused] = useState(false)
  /* duplica para o loop sem costura */
  const doubled = [...images, ...images]
  const anim = direction === 'left' ? 'mqLeft' : 'mqRight'

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Fade lateral esquerdo */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 120, zIndex: 2,
        background: `linear-gradient(to right, ${T.navy}, transparent)`,
        pointerEvents: 'none',
      }} />
      {/* Fade lateral direito */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 120, zIndex: 2,
        background: `linear-gradient(to left, ${T.navy}, transparent)`,
        pointerEvents: 'none',
      }} />

      {/* Track */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: 'flex',
          gap: 14,
          width: 'max-content',
          animation: `${anim} ${speed}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((img, i) => (
          <Card key={i} src={img.src} ratio={img.ratio} height={height} />
        ))}
      </div>
    </div>
  )
}

/* ── Card individual ──────────────────────────────────── */
function Card({ src, ratio, height }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height,
        aspectRatio: ratio,
        borderRadius: 16,
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
        cursor: 'pointer',
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
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transform: hov ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />

      {/* Overlay no hover */}
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

      {/* Borda dourada no hover */}
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
