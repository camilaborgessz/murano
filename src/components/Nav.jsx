import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { T } from '../styles/tokens'
import { SECTIONS } from '../data/content'

export default function Nav({ scrolled, scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = SECTIONS.slice(0, SECTIONS.length - 1)
  const contactLabel = SECTIONS[SECTIONS.length - 1]

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
    height: 64, padding: '0 clamp(16px, 4vw, 48px)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'all 0.4s ease',
    background: scrolled ? 'rgba(13,27,62,0.96)' : 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(18px)',
    borderBottom: scrolled
      ? `1px solid rgba(201,168,76,0.18)`
      : `1px solid rgba(13,27,62,0.08)`,
    boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.25)' : '0 2px 16px rgba(0,0,0,0.06)',
  }

  const linkColor = scrolled ? 'rgba(255,255,255,0.78)' : 'rgba(13,27,62,0.72)'
  const linkHover = scrolled ? T.goldLight : T.navy

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <img
          src="/favicon.ico"
          alt="Murano"
          onClick={() => scrollTo(0)}
          style={{ height: 46, cursor: 'pointer', objectFit: 'contain' }}
        />

        {/* Links desktop – centro */}
        <ul className="nav-desktop" style={{
          display: 'flex', gap: 36, listStyle: 'none',
          alignItems: 'center', margin: 0, padding: 0,
        }}>
          {navLinks.map((s, i) => (
            <li key={s}>
              <motion.button
                onClick={() => scrollTo(i)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: linkColor,
                  fontFamily: T.fontBody, padding: 0,
                }}
                whileHover={{ color: linkHover }}
              >
                {s}
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Botão Contato – direita */}
        <motion.button
          className="nav-cta"
          onClick={() => scrollTo(SECTIONS.length - 1)}
          style={{
            background: T.navy, color: T.white,
            border: `2px solid ${T.navy}`,
            padding: '10px 26px',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', cursor: 'pointer',
            fontFamily: T.fontBody, borderRadius: 4,
          }}
          whileHover={{ background: T.navyLight, borderColor: T.navyLight }}
          whileTap={{ scale: 0.97 }}
        >
          {contactLabel}
        </motion.button>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', flexDirection: 'column', gap: 5,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: 24, height: 2, display: 'block',
              background: scrolled ? T.gold : T.navy,
            }} />
          ))}
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, background: T.navy,
              zIndex: 1000, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 36,
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute', top: 24, right: 28,
                background: 'none', border: 'none',
                color: T.gold, fontSize: 28, cursor: 'pointer',
              }}
            >✕</button>

            {SECTIONS.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => { scrollTo(i); setMenuOpen(false) }}
                style={{
                  background: 'none', border: 'none',
                  fontFamily: T.fontDisplay, fontSize: 34, fontWeight: 400,
                  color: T.white, cursor: 'pointer', letterSpacing: '0.05em',
                }}
                whileHover={{ color: T.gold }}
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .nav-desktop  { display: none !important; }
          .nav-cta      { display: none !important; }
          .nav-hamburger {
            display: flex !important;
            padding: 8px !important;
            margin-right: 4px;
          }
        }
      `}</style>
    </>
  )
}
