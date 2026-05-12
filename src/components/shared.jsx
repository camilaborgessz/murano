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

export function BtnPrimary({ children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        background: T.gold, color: T.navy,
        border: 'none', padding: '16px 44px',
        fontSize: 10, fontWeight: 700, letterSpacing: '0.3em',
        textTransform: 'uppercase', cursor: 'pointer',
        fontFamily: T.fontBody,
      }}
      whileHover={{ background: T.goldLight }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}

export function BtnGhost({ children, onClick, href, style }) {
  const base = {
    background: 'transparent', color: T.navy,
    border: `1px solid rgba(13,27,62,0.4)`,
    padding: '16px 44px',
    fontSize: 10, fontWeight: 600, letterSpacing: '0.25em',
    textTransform: 'uppercase', cursor: 'pointer',
    fontFamily: T.fontBody, textDecoration: 'none',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    ...style,
  }
  if (href) {
    return (
      <motion.a href={href} style={base}
        whileHover={{ borderColor: T.gold, color: T.gold }}
        whileTap={{ scale: 0.97 }}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button onClick={onClick} style={base}
      whileHover={{ borderColor: T.gold, color: T.gold }}
      whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  )
}
