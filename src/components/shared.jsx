import { motion } from 'framer-motion'
import { T } from '../styles/tokens'

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger = (staggerChildren = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
})

export function SectionHeader({ eyebrow, title, titleSecond, light }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 64 }}>
      <span style={{
        display: 'block', fontSize: 10, fontWeight: 600,
        letterSpacing: '0.45em', textTransform: 'uppercase',
        color: T.gold, marginBottom: 16,
      }}>{eyebrow}</span>
      <h2 style={{
        fontFamily: T.fontDisplay,
        fontSize: 'clamp(38px,6vw,64px)',
        fontWeight: 500,
        color: light ? T.white : T.navy,
        lineHeight: 1.1, margin: 0,
      }}>
        {title}
        {titleSecond && (
          <><br /><em style={{ fontStyle: 'italic' }}>{titleSecond}</em></>
        )}
      </h2>
    </div>
  )
}

export function BtnPrimary({ children, onClick, style }) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: T.gold, color: T.navy,
        border: 'none', padding: '14px 32px',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.22em',
        textTransform: 'uppercase', cursor: 'pointer',
        fontFamily: T.fontBody, borderRadius: 8,
        boxShadow: '0 4px 24px rgba(201,168,76,0.28)',
        ...style,
      }}
      whileHover={{ background: T.goldLight, scale: 1.02, boxShadow: '0 6px 32px rgba(201,168,76,0.4)' }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      <span style={{ fontSize: 14, lineHeight: 1 }}>→</span>
    </motion.button>
  )
}

export function BtnGhost({ children, onClick, href, dark, style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: 'transparent',
    color: dark ? T.gold : T.navy,
    border: dark ? `1.5px solid rgba(201,168,76,0.4)` : `1.5px solid rgba(13,27,62,0.3)`,
    padding: '14px 32px',
    fontSize: 11, fontWeight: 600, letterSpacing: '0.2em',
    textTransform: 'uppercase', cursor: 'pointer',
    fontFamily: T.fontBody, borderRadius: 8,
    textDecoration: 'none',
    ...style,
  }
  const hoverProps = dark
    ? { borderColor: T.gold, color: T.goldLight, background: 'rgba(201,168,76,0.08)' }
    : { borderColor: T.navy, color: T.navy, background: 'rgba(13,27,62,0.05)' }

  if (href) {
    return (
      <motion.a href={href} style={base}
        whileHover={hoverProps}
        whileTap={{ scale: 0.97 }}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button onClick={onClick} style={base}
      whileHover={hoverProps}
      whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  )
}
