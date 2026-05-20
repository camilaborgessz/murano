import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { DIFERENCIAIS } from '../data/content'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Diferenciais() {
  const { ref, inView } = useReveal(0.1)
  const imgRef = useReveal(0.15)
  const titleRef = useReveal(0.2)

  return (
    <section style={{
      padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px) 80px',
      background: T.cream,
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* ── Background: MURANO repetido diagonal ── */}
      <MuranoPattern />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Título customizado ── */}
        <motion.div
          ref={titleRef.ref}
          initial={{ opacity: 0, y: 28 }}
          animate={titleRef.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <p style={{
            fontFamily: T.fontBody, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: T.gold, margin: '0 0 20px',
          }}>
            Por que nos escolher
          </p>

          <h2 style={{
            fontFamily: T.fontDisplay,
            fontSize: 'clamp(38px, 5.8vw, 74px)',
            lineHeight: 1.06, margin: 0,
            letterSpacing: '-0.02em',
          }}>
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: T.navyLight }}>
              Nossos{' '}
            </span>
            <span style={{ fontWeight: 800, color: T.navy }}>Diferenciais</span>
          </h2>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 12, marginTop: 20,
          }}>
            <span style={{ width: 40, height: 1.5, background: `linear-gradient(90deg, transparent, ${T.gold})` }} />
            <span style={{ color: T.gold, fontSize: 12, opacity: 0.7 }}>✦</span>
            <span style={{ width: 40, height: 1.5, background: `linear-gradient(90deg, ${T.gold}, transparent)` }} />
          </div>
        </motion.div>

        {/* ── Badges ── */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            maxWidth: 940, margin: '0 auto 52px',
            display: 'flex', flexWrap: 'wrap',
            gap: 12, justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {DIFERENCIAIS.map(d => (
            <motion.div key={d.num} variants={fadeIn} style={{ display: 'inline-flex' }}>
              <Badge d={d} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Imagem ── */}
        <motion.div
          ref={imgRef.ref}
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={imgRef.inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          style={{
            maxWidth: 1100, margin: '0 auto',
            borderRadius: 'clamp(16px,2vw,28px)', overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(13,27,62,0.18)',
            position: 'relative',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}murano6.jpeg`}
            alt="Equipe Murano Eventos"
            style={{
              width: '100%', display: 'block',
              height: 'clamp(280px,45vw,520px)',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(13,27,62,0.72) 0%, rgba(13,27,62,0.08) 55%, transparent 100%)',
            display: 'flex', alignItems: 'flex-end',
            padding: 'clamp(20px,4vw,48px)',
          }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={imgRef.inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              {/* linha decorativa dourada */}
              <div style={{
                width: 36, height: 2, borderRadius: 2, marginBottom: 14,
                background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
              }} />

              <p style={{
                fontFamily: T.fontDisplay,
                fontSize: 'clamp(22px, 3.2vw, 42px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.2,
                color: 'rgba(255,255,255,0.92)',
                margin: '0 0 4px',
                letterSpacing: '-0.01em',
              }}>
                Eventos que traduzem a{' '}
                <span style={{
                  fontWeight: 700,
                  fontStyle: 'normal',
                  color: T.goldLight,
                }}>essência</span>
                {' '}e o{' '}
                <span style={{
                  fontWeight: 700,
                  fontStyle: 'normal',
                  color: T.goldLight,
                }}>prestígio</span>
              </p>
              <p style={{
                fontFamily: T.fontDisplay,
                fontSize: 'clamp(22px, 3.2vw, 42px)',
                fontWeight: 800,
                lineHeight: 1.2,
                color: '#fff',
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
                da sua marca.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────
   Padrão diagonal de fundo: "MURANO" repetido
───────────────────────────────────────────────── */
function MuranoPattern() {
  const cols = 6
  const rows = 7
  const total = cols * rows

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden', pointerEvents: 'none', userSelect: 'none',
    }}>
      <motion.div
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear', repeatType: 'mirror' }}
        style={{
          position: 'absolute',
          top: '-25%', left: '-15%',
          width: '130%', height: '150%',
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '0px 0px',
          rowGap: 32,
          transform: 'rotate(-18deg)',
          opacity: 0.055,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: T.fontDisplay,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '0.35em',
              color: T.navy,
              whiteSpace: 'nowrap',
              display: 'block',
              paddingRight: 48,
              marginTop: Math.floor(i / cols) % 2 === 0 ? (i % cols) * 0 : 0,
            }}
          >
            {i % 3 === 1 ? '✦' : 'MURANO'}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   Badge — decorativo, sem clique
───────────────────────────────────────────────── */
function Badge({ d }) {
  return (
    <motion.div
      whileHover={{
        backgroundColor: T.navy,
        borderColor: T.gold,
        color: T.gold,
        y: -4,
        boxShadow: '0 10px 32px rgba(13,27,62,0.16)',
      }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 9,
        padding: 'clamp(10px,1.4vw,14px) clamp(18px,2.8vw,28px)',
        borderRadius: 100,
        border: '1.5px solid rgba(13,27,62,0.22)',
        fontFamily: T.fontDisplay,
        fontSize: 'clamp(12px,1.6vw,14px)',
        fontWeight: 500,
        letterSpacing: '0.01em',
        lineHeight: 1,
        color: T.navy,
        backgroundColor: 'rgba(0,0,0,0)',
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{d.icon}</span>
      <span style={{ whiteSpace: 'nowrap' }}>{d.title}</span>
    </motion.div>
  )
}
