import { motion } from 'framer-motion'
import { SECTIONS } from '../data/content'
import { T } from '../styles/tokens'

export default function SectionIndicator({ active, scrollTo }) {
  return (
    <>
      <div className="section-indicator">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s}
            className="section-dot"
            title={s}
            onClick={() => scrollTo(i)}
            animate={{
              background: active === i ? T.gold : 'rgba(201,168,76,0.25)',
              scale: active === i ? 1.5 : 1,
            }}
            whileHover={{ scale: 1.6, background: T.gold }}
            style={{
              borderRadius: '50%',
              border: `1px solid ${T.gold}`, cursor: 'pointer',
              boxShadow: active === i ? `0 0 6px ${T.gold}` : 'none',
            }}
          />
        ))}
      </div>

      <style>{`
        .section-indicator {
          position: fixed;
          top: 50%;
          right: 16px;
          transform: translateY(-50%);
          z-index: 900;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .section-dot {
          width: 6px;
          height: 6px;
        }
        @media (max-width: 768px) {
          .section-indicator {
            right: 10px;
            gap: 14px;
          }
          .section-dot {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </>
  )
}