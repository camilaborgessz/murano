import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { T } from '../styles/tokens'
import { SECTIONS } from '../data/content'

export default function Nav({ scrolled, scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
    height: 70, padding: '0 40px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'all 0.5s ease',
    ...(scrolled ? {
      background: 'rgba(13,27,62,0.93)',
      backdropFilter: 'blur(18px)',
      borderBottom: `1px solid rgba(201,168,76,0.15)`,
      boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
    } : {}),
  }

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <img
          src="/favicon.ico"
          alt="Murano"
          onClick={() => scrollTo(0)}
          style={{
            height: 50,
            cursor: 'pointer',
            objectFit: 'contain',
          }}
        />

        {/* Links desktop */}
        <ul className="nav-desktop" style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center' }}>
          {SECTIONS.map((s, i) => (
            <li key={s}>
              <motion.button
                onClick={() => scrollTo(i)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)',
                  fontFamily: T.fontBody,
                  ...(i === SECTIONS.length - 1 ? {
                    border: `1px solid ${T.gold}`,
                    color: T.gold, padding: '8px 20px',
                  } : {}),
                }}
                whileHover={{ color: T.gold, opacity: 1 }}
              >
                {s}
              </motion.button>
            </li>
          ))}
        </ul>

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
            <span key={i} style={{ width: 24, height: 1, background: T.gold, display: 'block' }} />
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, background: T.navy,
              zIndex: 1000, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 40,
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute', top: 24, right: 24,
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
                  fontFamily: T.fontDisplay, fontSize: 36, fontWeight: 400,
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
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}