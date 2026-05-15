import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { ESTRUTURA } from '../data/content'
import { stagger, fadeUp, fadeLeft, fadeRight } from './shared'

/* ── Marca texto igual ao About ─────────────────────── */
function Mark({ children, delay = 0 }) {
  return (
    <motion.span
      style={{
        color: T.gold, fontWeight: 800,
        display: 'inline',
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.18), rgba(201,168,76,0.18))',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        padding: '2px 5px', borderRadius: 3,
        WebkitBoxDecorationBreak: 'clone',
        boxDecorationBreak: 'clone',
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

/* ── Ícones por item ────────────────────────────────── */
const ICONS = [
  /* Banheiros — banheira */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 9 12"/><path d="M9 6a2 2 0 0 1 4 0v1"/><path d="M2 12h20v2a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6v-2z"/><path d="M6 20v2M18 20v2"/></svg>,
  /* Cozinha */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>,
  /* Salão */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  /* Área Externa — sol */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
]

/* ── Instagram embed ────────────────────────────────── */
function InstagramEmbed({ url }) {
  useEffect(() => {
    const load = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const s = document.createElement('script')
      s.src = 'https://www.instagram.com/embed.js'
      s.async = true
      s.onload = load
      document.body.appendChild(s)
    } else {
      load()
    }
  }, [url])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#fff', border: 0, borderRadius: 16,
          margin: 0, padding: 0,
          width: '100%', maxWidth: 420,
          boxShadow: '0 16px 48px rgba(13,27,62,0.13)',
        }}
      />
    </div>
  )
}

/* ── Componente principal ───────────────────────────── */
export default function Estrutura() {
  const leftReveal  = useReveal(0.15)
  const rightReveal = useReveal(0.15)

  return (
    <section style={{
      padding: 'clamp(60px,8vw,120px) clamp(24px,5vw,80px)',
      background: T.cream,
    }}>

      {/* ── Título ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ textAlign: 'center', marginBottom: 72 }}
      >
        <span style={{
          display: 'block', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.45em', textTransform: 'uppercase',
          color: T.gold, marginBottom: 20,
        }}>
          Infraestrutura
        </span>
        <h2 style={{
          fontFamily: T.fontDisplay,
          fontSize: 'clamp(36px,5.5vw,68px)',
          lineHeight: 1.1, margin: 0,
          letterSpacing: '-0.02em',
        }}>
          <span style={{ fontWeight: 300, fontStyle: 'italic', color: T.navyLight }}>Cada detalhe foi</span>
          {/* <span style={{ fontWeight: 800, color: T.navy }}>foi</span> */}
          <br />
          <Mark delay={0.3}>pensado para você</Mark>
        </h2>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 12, marginTop: 20,
        }}>
          <span style={{ width: 40, height: 1.5, background: `linear-gradient(90deg, transparent, ${T.gold})`, display: 'block' }} />
          <span style={{ color: T.gold, fontSize: 12, opacity: 0.7 }}>✦</span>
          <span style={{ width: 40, height: 1.5, background: `linear-gradient(90deg, ${T.gold}, transparent)`, display: 'block' }} />
        </div>
      </motion.div>

      {/* ── Grid principal ── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(32px,5vw,64px)',
        alignItems: 'center',
      }}>

        {/* Cards 2×2 */}
        <motion.div
          ref={leftReveal.ref}
          variants={stagger(0.1)}
          initial="hidden"
          animate={leftReveal.inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          {ESTRUTURA.map((item, i) => (
            <EstruturCard key={item.num} item={item} icon={ICONS[i]} />
          ))}
        </motion.div>

        {/* Instagram embed */}
        <motion.div
          ref={rightReveal.ref}
          variants={fadeRight}
          initial="hidden"
          animate={rightReveal.inView ? 'visible' : 'hidden'}
        >
          <InstagramEmbed url="https://www.instagram.com/p/DVytQ-rADvO/" />
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          .estrutura-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

/* ── Card ───────────────────────────────────────────── */
function EstruturCard({ item, icon }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        padding: '28px 22px',
        borderRadius: 20,
        background: hov ? T.navy : '#ffffff',
        boxShadow: hov
          ? '0 24px 56px rgba(13,27,62,0.22)'
          : '0 4px 28px rgba(13,27,62,0.07)',
        border: `1px solid ${hov ? 'rgba(201,168,76,0.25)' : 'rgba(13,27,62,0.06)'}`,
        transition: 'background 0.38s, box-shadow 0.38s, border-color 0.38s',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
    >
      {/* Número */}
      <div style={{
        fontFamily: T.fontDisplay, fontSize: 10, fontWeight: 700,
        letterSpacing: '0.14em',
        color: hov ? 'rgba(201,168,76,0.4)' : 'rgba(13,27,62,0.15)',
        marginBottom: 18, transition: 'color 0.38s',
      }}>
        {item.num}
      </div>

      {/* Ícone */}
      <div style={{
        color: hov ? T.gold : T.navy,
        marginBottom: 14,
        transition: 'color 0.38s, transform 0.38s',
        transform: hov ? 'scale(1.1)' : 'scale(1)',
        display: 'inline-block',
      }}>
        {icon}
      </div>

      {/* Linha dourada */}
      <div style={{
        width: hov ? 36 : 24, height: 2,
        background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
        borderRadius: 2, marginBottom: 14,
        transition: 'width 0.38s',
        flexShrink: 0,
      }} />

      {/* Título */}
      <h4 style={{
        fontFamily: T.fontDisplay,
        fontSize: 15, fontWeight: 700,
        color: hov ? '#ffffff' : T.navy,
        marginBottom: 8, lineHeight: 1.3,
        transition: 'color 0.38s', margin: '0 0 8px',
      }}>
        {item.title}
      </h4>

      {/* Descrição */}
      <p style={{
        fontSize: 12, fontWeight: 300, lineHeight: 1.8,
        color: hov ? 'rgba(255,255,255,0.6)' : '#888',
        margin: 0, transition: 'color 0.38s',
      }}>
        {item.desc}
      </p>

      {/* Círculo decorativo */}
      <div style={{
        position: 'absolute', bottom: -20, right: -20,
        width: 72, height: 72, borderRadius: '50%',
        background: hov ? 'rgba(201,168,76,0.07)' : 'rgba(13,27,62,0.03)',
        transition: 'background 0.38s',
        pointerEvents: 'none',
      }} />

      {/* Linha inferior dourada no hover */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
          transformOrigin: 'left',
        }}
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}
