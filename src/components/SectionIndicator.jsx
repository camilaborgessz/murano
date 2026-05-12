import { motion } from 'framer-motion'
import { SECTIONS } from '../data/content'
import { T } from '../styles/tokens'

export default function SectionIndicator({ active, scrollTo }) {
  return (
    <div style={{
      position: 'fixed', top: '50%', right: 20,
      transform: 'translateY(-50%)', zIndex: 900,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {SECTIONS.map((s, i) => (
        <motion.div
          key={s}
          title={s}
          onClick={() => scrollTo(i)}
          animate={{
            background: active === i ? T.gold : 'rgba(201,168,76,0.25)',
            scale: active === i ? 1.5 : 1,
          }}
          whileHover={{ scale: 1.6, background: T.gold }}
          style={{
            width: 6, height: 6, borderRadius: '50%',
            border: `1px solid ${T.gold}`, cursor: 'pointer',
            boxShadow: active === i ? `0 0 6px ${T.gold}` : 'none',
          }}
        />
      ))}
    </div>
  )
}