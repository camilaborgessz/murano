import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { ESTRUTURA } from '../data/content'

function Mark({ children, delay = 0 }) {
  return (
    <motion.span
      style={{
        color: T.gold, fontWeight: 800, display: 'inline',
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.18), rgba(201,168,76,0.18))',
        backgroundRepeat: 'no-repeat', backgroundPosition: 'left center',
        padding: '2px 5px', borderRadius: 3,
        WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone',
      }}
      initial={{ backgroundSize: '0% 100%' }}
      whileInView={{ backgroundSize: '100% 100%' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )
}

function InstagramEmbed({ url }) {
  useEffect(() => {
    const load = () => { if (window.instgrm) window.instgrm.Embeds.process() }
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const s = document.createElement('script')
      s.src = 'https://www.instagram.com/embed.js'
      s.async = true; s.onload = load
      document.body.appendChild(s)
    } else { load() }
  }, [url])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#fff', border: 0, borderRadius: 16,
          margin: 0, padding: 0, width: '100%', maxWidth: 420,
          boxShadow: '0 16px 48px rgba(13,27,62,0.13)',
        }}
      />
    </div>
  )
}

export default function Estrutura() {
  const titleReveal = useReveal(0.15)
  const bodyReveal  = useReveal(0.1)
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)
  const [dragX, setDragX] = useState(0)
  const dragStart = useRef(null)

  const go = (next) => {
    setDir(next > current ? 1 : -1)
    setCurrent(next)
  }
  const prev = () => current > 0 && go(current - 1)
  const next = () => current < ESTRUTURA.length - 1 && go(current + 1)

  const onCardPointerDown = (e) => {
    dragStart.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onCardPointerMove = (e) => {
    if (dragStart.current === null) return
    setDragX(e.clientX - dragStart.current)
  }
  const onCardPointerUp = () => {
    if (dragStart.current === null) return
    if (dragX < -50) next()
    else if (dragX > 50) prev()
    setDragX(0)
    dragStart.current = null
  }

  return (
    <section style={{
      padding: 'clamp(60px,8vw,120px) clamp(24px,5vw,80px)',
      background: T.cream,
    }}>

      {/* Título */}
      <motion.div
        ref={titleReveal.ref}
        initial={{ opacity: 0, y: 28 }}
        animate={titleReveal.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ textAlign: 'center', marginBottom: 56 }}
      >
        <h2 style={{
          fontFamily: T.fontDisplay,
          fontSize: 'clamp(36px,5.5vw,68px)',
          lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em',
        }}>
          <span style={{ fontWeight: 300, fontStyle: 'italic', color: T.navyLight }}>Cada detalhe foi</span>
          <br />
          <Mark delay={0.3}>pensado para você</Mark>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 20 }}>
          <span style={{ width: 40, height: 1.5, background: `linear-gradient(90deg,transparent,${T.gold})`, display: 'block' }} />
          <span style={{ color: T.gold, fontSize: 12, opacity: 0.7 }}>✦</span>
          <span style={{ width: 40, height: 1.5, background: `linear-gradient(90deg,${T.gold},transparent)`, display: 'block' }} />
        </div>
      </motion.div>

      {/* Layout: slider (esquerda) + Instagram (direita) */}
      <motion.div
        ref={bodyReveal.ref}
        initial={{ opacity: 0, y: 24 }}
        animate={bodyReveal.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6 }}
        className="estrutura-outer"
        style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: 'clamp(32px,5vw,64px)',
          alignItems: 'center',
        }}
      >
        {/* Slider */}
        <div style={{ position: 'relative' }}>

          {/* Plano de fundo decorativo */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            top: -32, left: -32, right: -32, bottom: -32,
            borderRadius: 28,
            background: `radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 65%),
                         radial-gradient(ellipse at 80% 20%, rgba(13,27,62,0.05) 0%, transparent 55%)`,
            pointerEvents: 'none',
          }} />

          {/* Card com setas nas laterais */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            <NavBtn onClick={prev} disabled={current === 0} dir="left" />

            {/* Card */}
            <div
              onPointerDown={onCardPointerDown}
              onPointerMove={onCardPointerMove}
              onPointerUp={onCardPointerUp}
              onPointerLeave={onCardPointerUp}
              style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: 20, minHeight: 260,
                background: `linear-gradient(135deg, #ffffff 0%, ${T.cream} 100%)`,
                border: `1px solid rgba(201,168,76,0.22)`,
                boxShadow: '0 12px 48px rgba(13,27,62,0.1)',
                transform: `translateX(${dragX * 0.35}px) rotate(${dragX * 0.015}deg)`,
                transition: dragStart.current ? 'none' : 'transform 0.3s ease',
                cursor: dragX !== 0 ? (dragX > 0 ? 'w-resize' : 'e-resize') : 'grab',
                touchAction: 'pan-y',
                userSelect: 'none',
              }}>

              {/* Número gigante de fundo */}
              <div aria-hidden="true" style={{
                position: 'absolute', bottom: -20, right: 16,
                fontFamily: T.fontDisplay, fontSize: 'clamp(90px,14vw,140px)',
                fontWeight: 800, lineHeight: 1,
                color: 'rgba(13,27,62,0.045)',
                userSelect: 'none', pointerEvents: 'none',
                letterSpacing: '-0.04em',
              }}>
                {ESTRUTURA[current].num}
              </div>

              {/* Canto dourado superior esquerdo */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: 48, height: 48, pointerEvents: 'none',
                background: `linear-gradient(135deg, rgba(201,168,76,0.18) 0%, transparent 60%)`,
                borderRadius: '20px 0 0 0',
              }} />

              {/* Linha dourada lateral esquerda */}
              <div style={{
                position: 'absolute', top: 24, bottom: 24, left: 0,
                width: 3, borderRadius: '0 2px 2px 0',
                background: `linear-gradient(to bottom, ${T.gold}, ${T.goldLight}, transparent)`,
              }} />

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={current}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -32 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ padding: 'clamp(24px,3.5vw,36px) clamp(24px,3.5vw,36px) clamp(24px,3.5vw,36px) clamp(28px,4vw,40px)', position: 'relative', zIndex: 1 }}
                >
                  {/* Número + contador */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{
                      fontFamily: T.fontDisplay, fontSize: 10, fontWeight: 700,
                      letterSpacing: '0.24em', color: T.gold,
                    }}>
                      {ESTRUTURA[current].num}
                    </span>
                    <span style={{
                      fontFamily: T.fontBody, fontSize: 10,
                      color: 'rgba(13,27,62,0.28)', letterSpacing: '0.1em',
                    }}>
                      {current + 1} / {ESTRUTURA.length}
                    </span>
                  </div>

                  {/* Linha dourada */}
                  <div style={{
                    width: 28, height: 2, borderRadius: 2, marginBottom: 16,
                    background: `linear-gradient(90deg,${T.gold},${T.goldLight})`,
                  }} />

                  {/* Título */}
                  <h4 style={{
                    fontFamily: T.fontDisplay,
                    fontSize: 'clamp(15px,1.8vw,19px)',
                    fontWeight: 700, lineHeight: 1.3,
                    color: T.navy, margin: '0 0 12px',
                  }}>
                    {ESTRUTURA[current].title}
                  </h4>

                  {/* Descrição */}
                  <p style={{
                    fontFamily: T.fontBody,
                    fontSize: 'clamp(12px,1.1vw,13px)',
                    fontWeight: 300, lineHeight: 1.8,
                    color: 'rgba(13,27,62,0.52)', margin: 0,
                  }}>
                    {ESTRUTURA[current].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <NavBtn onClick={next} disabled={current === ESTRUTURA.length - 1} dir="right" />
          </div>

          {/* Dots abaixo */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' }}>
            {ESTRUTURA.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  width: i === current ? 20 : 6, height: 6,
                  borderRadius: 3, border: 'none', padding: 0, cursor: 'pointer',
                  background: i === current ? T.navy : 'rgba(13,27,62,0.18)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Instagram */}
        <div style={{ position: 'sticky', top: 100 }}>
          <InstagramEmbed url="https://www.instagram.com/p/DVytQ-rADvO/" />
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 760px) {
          .estrutura-outer {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

function NavBtn({ onClick, disabled, dir }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.08, borderColor: T.gold } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      style={{
        width: 40, height: 40, borderRadius: '50%',
        border: `1.5px solid ${disabled ? 'rgba(13,27,62,0.12)' : 'rgba(13,27,62,0.25)'}`,
        background: 'transparent',
        color: disabled ? 'rgba(13,27,62,0.2)' : T.navy,
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, transition: 'border-color 0.2s',
      }}
    >
      {dir === 'left' ? '←' : '→'}
    </motion.button>
  )
}
