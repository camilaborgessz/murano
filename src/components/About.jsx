import { useState } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { stagger, fadeUp, fadeLeft, fadeRight, BtnPrimary } from './shared'

/* ── Palavra destacada com sweep de fundo dourado ─────────── */
function Mark({ children, delay = 0 }) {
  return (
    <span style={{ position: 'relative', display: 'inline', color: T.goldLight, fontWeight: 600 }}>
      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          inset: '1px -4px 0px -4px',
          background: 'rgba(201,168,76,0.14)',
          borderRadius: 3,
          transformOrigin: 'left center',
          zIndex: 0,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  )
}

/* ── Chip de serviço interativo ────────────────────────────── */
const SERVICES = [
  { icon: '✦', label: 'Decoração', desc: 'Projetos exclusivos do zero' },
  { icon: '◈', label: 'Buffet', desc: 'Gastronomia de alto padrão' },
  { icon: '❋', label: 'Locação', desc: 'Mobiliário e iluminação' },
  { icon: '◇', label: 'Espaço', desc: 'Estrutura completa premium' },
]

function ServiceChip({ icon, label, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: hovered ? '14px 20px' : '12px 18px',
        borderRadius: 10,
        border: `1px solid ${hovered ? T.gold : 'rgba(201,168,76,0.2)'}`,
        background: hovered ? 'rgba(201,168,76,0.09)' : 'rgba(255,255,255,0.03)',
        cursor: 'default',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 0 24px rgba(201,168,76,0.15)` : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          color: T.gold, fontSize: 12,
          transition: 'transform 0.3s',
          display: 'inline-block',
          transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>{icon}</span>
        <span style={{
          fontFamily: T.fontBody, fontSize: 11,
          fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: hovered ? T.goldLight : 'rgba(255,255,255,0.7)',
          transition: 'color 0.3s',
        }}>{label}</span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{
          fontFamily: T.fontBody, fontSize: 11,
          color: 'rgba(255,255,255,0.4)', marginTop: 6,
          lineHeight: 1.5, paddingLeft: 20,
        }}>{desc}</p>
      </motion.div>
    </motion.div>
  )
}

/* ── Seção principal ───────────────────────────────────────── */
export default function About({ scrollTo }) {
  const imgReveal = useReveal(0.15)
  const textReveal = useReveal(0.15)

  return (
    <section style={{
      position: 'relative',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 96px)',
      background: T.navy,
      overflow: 'hidden',
    }}>

      {/* ── Textura: grade de pontos dourados ──────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.13) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        zIndex: 0,
      }} />

      {/* ── Textura: noise SVG (grain) ─────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
      }} />

      {/* ── Blob de luz no canto superior direito ──────── */}
      <motion.div
        style={{
          position: 'absolute', top: -120, right: -80,
          width: 480, height: 480, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0,
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Conteúdo ────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="about-eyebrow"
          style={{ marginBottom: 64, display: 'flex', alignItems: 'center', gap: 16 }}
        >
          <span style={{
            display: 'inline-block', width: 36, height: 1.5,
            background: T.gold, flexShrink: 0,
          }} />
          <span style={{
            fontFamily: T.fontBody, fontSize: 10,
            fontWeight: 700, letterSpacing: '0.4em',
            textTransform: 'uppercase', color: T.gold,
          }}>Nossa História</span>
        </motion.div>

        {/* Grid principal */}
        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.15fr)',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'start',
        }}>

          {/* ── ESQUERDA – imagem ─────────────────────── */}
          <motion.div
            className="about-img"
            ref={imgReveal.ref}
            variants={fadeLeft}
            initial="hidden"
            animate={imgReveal.inView ? 'visible' : 'hidden'}
            style={{ position: 'relative' }}
          >
            {/* Borda decorativa deslocada */}
            <div className="about-decor" style={{
              position: 'absolute',
              top: 18, left: 18,
              right: -18, bottom: -18,
              border: `1px solid rgba(201,168,76,0.25)`,
              borderRadius: 20,
              zIndex: 0,
            }} />

            <div style={{
              position: 'relative', zIndex: 1,
              borderRadius: 20, overflow: 'hidden',
              aspectRatio: '4/5',
              boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
            }}>
              <img
                src="/murano1.jpeg"
                alt="Murano Eventos"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Overlay sutil */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(to top, rgba(13,27,62,0.4) 0%, transparent 60%)`,
              }} />
            </div>

            {/* Tag flutuante */}
            <motion.div
              className="about-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={imgReveal.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                position: 'absolute', bottom: 8, left: -12, zIndex: 2,
                background: T.gold, color: T.navy,
                padding: '12px 22px',
                borderRadius: 8,
                fontFamily: T.fontBody,
                fontSize: 10, fontWeight: 800,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 24px rgba(201,168,76,0.35)',
              }}
            >
              Excelência em Eventos
            </motion.div>
          </motion.div>

          {/* ── DIREITA – texto ───────────────────────── */}
          <motion.div
            className="about-text"
            ref={textReveal.ref}
            variants={stagger(0.12)}
            initial="hidden"
            animate={textReveal.inView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            {/* Título */}
            <motion.h2 variants={fadeUp} style={{
              fontFamily: T.fontDisplay,
              fontSize: 'clamp(40px, 5vw, 68px)',
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}>
              Quem<br />
              <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
                Somos
              </span>
            </motion.h2>

            {/* Citação */}
            <motion.blockquote variants={fadeUp} style={{
              borderLeft: `2px solid ${T.gold}`,
              paddingLeft: 24, margin: 0,
              fontFamily: T.fontDisplay,
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              fontStyle: 'italic', fontWeight: 300,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.7,
            }}>
              "Transformamos sonhos em experiências{' '}
              <Mark delay={0.1}>inesquecíveis</Mark>
              {' '} com sofisticação,{' '}
              <Mark delay={0.2}>expertise</Mark>
              {' '}e comprometimento absoluto com cada detalhe."
            </motion.blockquote>

            {/* Parágrafos */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{
                fontFamily: T.fontBody, fontSize: 'clamp(13px, 1.2vw, 15px)',
                fontWeight: 400, lineHeight: 1.85,
                color: 'rgba(255,255,255,0.55)', margin: 0,
              }}>
                A Murano nasceu da paixão por criar momentos que ficam na memória para sempre.
                Com mais de uma década de história, nos consolidamos como{' '}
                <Mark delay={0.15}>referência em excelência</Mark>,
                {' '}oferecendo soluções completas que vão da decoração ao buffet,
                da locação à estrutura do espaço.
              </p>
              <p style={{
                fontFamily: T.fontBody, fontSize: 'clamp(13px, 1.2vw, 15px)',
                fontWeight: 400, lineHeight: 1.85,
                color: 'rgba(255,255,255,0.55)', margin: 0,
              }}>
                De celebrações{' '}<Mark delay={0.2}>intimistas</Mark>{' '}
                a grandes eventos corporativos a Murano está pronta para tornar
                seu evento{' '}<Mark delay={0.25}>verdadeiramente extraordinário</Mark>.
              </p>
            </motion.div>

            {/* Chips de serviço */}
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: T.fontBody, fontSize: 10,
                fontWeight: 600, letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 14,
              }}>O que oferecemos</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 10,
              }}>
                {SERVICES.map(s => (
                  <ServiceChip key={s.label} {...s} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Responsivo ─────────────────────────────────── */}
      <style>{`
        @media (max-width: 860px) {

          .about-eyebrow {
            margin-bottom: 36px !important;
          }

          /* Coluna única */
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          /* Texto primeiro, imagem depois */
          .about-text { order: 1; gap: 24px !important; }
          .about-img  { order: 2; }

          /* Oculta borda decorativa deslocada (causava overflow/altura extra) */
          .about-decor { display: none !important; }

          /* Tag: mantém posição absoluta, só ajusta left para não vazar */
          .about-badge {
            left: 12px !important;
          }

          /* Imagem em proporção paisagem no mobile */
          .about-img > div:nth-child(2) {
            aspect-ratio: 4/3 !important;
          }
        }
      `}</style>
    </section>
  )
}
