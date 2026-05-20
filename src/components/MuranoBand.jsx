import { T } from '../styles/tokens'

const ITEMS = Array.from({ length: 12 }, (_, i) => i % 3 === 1 ? '✦' : 'MURANO')

export default function MuranoBand() {
  return (
    <div style={{
      background: T.navy,
      borderTop: `1px solid rgba(201,168,76,0.14)`,
      borderBottom: `1px solid rgba(201,168,76,0.14)`,
      overflow: 'hidden',
      padding: '14px 0',
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'bandScroll 18s linear infinite',
        gap: 48,
      }}>
        {[...ITEMS, ...ITEMS].map((word, i) => (
          <span
            key={i}
            style={{
              fontFamily: T.fontDisplay,
              fontSize: 13,
              fontWeight: word === '✦' ? 400 : 700,
              letterSpacing: word === '✦' ? 0 : '0.38em',
              textTransform: 'uppercase',
              color: word === '✦' ? T.gold : 'rgba(255,255,255,0.18)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {word}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes bandScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
