import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { DEPOIMENTOS } from '../data/content'
import { SectionHeader } from './shared'

export default function Depoimentos() {
  const { ref, inView } = useReveal(0.1)
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)

  const scrollTo = (i) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[i]
    if (!card) return
    const offset = card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2
    track.scrollTo({ left: offset, behavior: 'smooth' })
    setCurrent(i)
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track || !track.children[0]) return
    const cardW = track.children[0].offsetWidth + 24
    setCurrent(Math.round(track.scrollLeft / cardW))
  }

  return (
    <section style={{ background: T.navy, padding: 'clamp(60px,8vw,120px) 0', overflow: 'hidden' }}>

      {/* Título */}
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
        onScroll={handleScroll}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 24,
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          padding: '8px clamp(24px,5vw,80px) 24px',
          cursor: 'grab',
        }}
      >
        {DEPOIMENTOS.map((d, i) => (
          <DepoCard key={i} d={d} active={i === current} />
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 36 }}>
        {DEPOIMENTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
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

      {/* Setas */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
        <NavBtn onClick={() => scrollTo(Math.max(0, current - 1))} disabled={current === 0} dir="left" />
        <NavBtn onClick={() => scrollTo(Math.min(DEPOIMENTOS.length - 1, current + 1))} disabled={current === DEPOIMENTOS.length - 1} dir="right" />
      </div>

      <style>{`
        [data-depo-track]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}

/* ── Card ──────────────────────────────────────────────── */
function DepoCard({ d, active }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.55, scale: active ? 1 : 0.96 }}
      transition={{ duration: 0.35 }}
      style={{
        width: 280,
        minWidth: 280,
        scrollSnapAlign: 'center',
        flexShrink: 0,
        background: T.cream,
        borderRadius: 24,
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: active
          ? '0 24px 64px rgba(0,0,0,0.35)'
          : '0 8px 24px rgba(0,0,0,0.2)',
        border: `1px solid ${active ? 'rgba(201,168,76,0.5)' : 'transparent'}`,
      }}
    >
      {/* Aspas decorativas */}
      <div style={{
        fontFamily: T.fontDisplay, fontSize: 60,
        color: T.gold, lineHeight: 0.7,
        marginBottom: 20, opacity: 0.25,
        userSelect: 'none',
      }}>
        "
      </div>

      {/* Texto */}
      <p style={{
        fontFamily: T.fontBody,
        fontSize: 13,
        fontWeight: 400, lineHeight: 1.85,
        color: T.navy, fontStyle: 'italic',
        margin: '0 0 32px',
      }}>
        {d.text}
      </p>

      {/* Separador */}
      <div style={{
        width: 32, height: 2,
        background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
        borderRadius: 2, marginBottom: 18,
      }} />

      {/* Autor */}
      <div style={{
        fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: T.navy,
      }}>
        {d.author}
      </div>

      {/* Círculo decorativo no canto */}
      <div style={{
        position: 'absolute', bottom: -32, right: -32,
        width: 96, height: 96, borderRadius: '50%',
        background: 'rgba(201,168,76,0.07)',
        pointerEvents: 'none',
      }} />
    </motion.div>
  )
}

/* ── Botão de navegação ────────────────────────────────── */
function NavBtn({ onClick, disabled, dir }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.08, borderColor: T.gold, color: T.gold } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      style={{
        width: 44, height: 44, borderRadius: '50%',
        border: `1.5px solid ${disabled ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.4)'}`,
        background: 'transparent',
        color: disabled ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.75)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, transition: 'border-color 0.25s, color 0.25s',
      }}
    >
      {dir === 'left' ? '←' : '→'}
    </motion.button>
  )
}
