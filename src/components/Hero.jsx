import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { stagger, fadeUp, fadeRight } from './shared'
import HeroCanvas from './HeroCanvas'

export default function Hero({ scrollTo }) {
  const goContact = () => scrollTo(5)
  const bars = [0.45, 0.65, 0.52, 0.85, 0.7, 0.92, 1, 0.78, 0.88, 0.6]

  return (
    <section className="hero-section" style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      background: '#fafbfd',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <HeroCanvas />

      {/* Linha dourada no topo */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 1,
        background: `linear-gradient(90deg,transparent,${T.gold} 40%,${T.goldLight} 60%,transparent)`,
      }} />

      {/*
        hero-layout: 2 áreas no desktop (esquerda = texto+botões, direita = cards)
        no mobile vira 3 linhas: texto → cards → botões
      */}
      <div className="hero-layout">

        {/* ── TEXTO (badge + headline + descrição + divider) ── */}
        <motion.div
          className="hero-text"
          initial="hidden"
          animate="visible"
          variants={stagger(0.13)}
          style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 32, height: 2, background: T.gold, flexShrink: 0 }} />
            <span style={{
              fontFamily: T.fontBody, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.28em', textTransform: 'uppercase', color: T.gold,
            }}>
              Há mais de 10 anos criando memórias
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: T.fontDisplay,
            fontSize: 'clamp(40px, 5.6vw, 80px)',
            fontWeight: 800, lineHeight: 1.06,
            color: T.navy, margin: 0, letterSpacing: '-0.02em',
          }}>
            Transformamos<br />
            seu evento em<br />
            <span style={{ fontWeight: 300, color: T.navyLight, fontStyle: 'italic', letterSpacing: '0.01em' }}>
              algo eterno.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.3vw, 16px)',
            fontWeight: 400, lineHeight: 1.8,
            color: 'rgba(13,27,62,0.58)', margin: 0, maxWidth: 460,
          }}>
            Da decoração exclusiva ao buffet de alto padrão, a Murano cuida de
            cada detalhe para que você viva momentos inesquecíveis — com
            estrutura completa, equipe especializada e atenção total à sua história.
          </motion.p>

          <motion.div variants={fadeUp} style={{
            width: 48, height: 2,
            background: `linear-gradient(90deg,${T.gold},${T.goldLight})`,
          }} />
        </motion.div>

        {/* ── CARDS (grid 2×2 de imagens/stats) ──────────── */}
        <motion.div
          className="hero-cards"
          initial="hidden"
          animate="visible"
          variants={stagger(0.1)}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.45fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 14,
            height: 'clamp(380px, 45vw, 500px)',
          }}
        >
          {/* murano2.jpeg */}
          <motion.div className="hero-card" variants={fadeRight} style={{
            borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(13,27,62,0.13)',
          }}>
            <img src="/murano2.jpeg" alt="Evento Murano"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </motion.div>

          {/* 10+ Anos */}
          <motion.div className="hero-card" variants={fadeUp} style={{
            borderRadius: 18, background: '#ffffff',
            boxShadow: '0 8px 32px rgba(13,27,62,0.08)',
            border: `1px solid rgba(201,168,76,0.18)`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 6, padding: 20,
          }}>
            <span style={{
              fontFamily: T.fontDisplay, fontWeight: 800,
              fontSize: 'clamp(36px, 4vw, 54px)',
              color: T.navy, lineHeight: 1, letterSpacing: '-0.03em',
            }}>10+</span>
            <span style={{
              fontFamily: T.fontBody, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(13,27,62,0.45)', textAlign: 'center', lineHeight: 1.5,
            }}>Anos no<br />Mercado</span>
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ marginTop: 8 }}>
              <circle cx="18" cy="18" r="14" stroke={T.gold} strokeWidth="1.4" opacity="0.5" />
              <ellipse cx="18" cy="18" rx="7" ry="14" stroke={T.gold} strokeWidth="1.4" opacity="0.35" />
              <line x1="4" y1="18" x2="32" y2="18" stroke={T.gold} strokeWidth="1.2" opacity="0.3" />
              <line x1="7" y1="11" x2="29" y2="11" stroke={T.gold} strokeWidth="1" opacity="0.2" />
              <line x1="7" y1="25" x2="29" y2="25" stroke={T.gold} strokeWidth="1" opacity="0.2" />
            </svg>
          </motion.div>

          {/* 500+ Eventos */}
          <motion.div className="hero-card" variants={fadeUp} style={{
            borderRadius: 18, background: T.navy,
            boxShadow: '0 12px 40px rgba(13,27,62,0.22)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', padding: '22px 24px',
          }}>
            <span style={{
              fontFamily: T.fontBody, fontSize: 9, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}>Eventos Realizados</span>
            <div>
              <span style={{
                fontFamily: T.fontDisplay, fontWeight: 800,
                fontSize: 'clamp(30px, 3.5vw, 48px)',
                color: '#fff', lineHeight: 1, letterSpacing: '-0.02em',
              }}>500+</span>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'flex-end', gap: 3, height: 32 }}>
                {bars.map((h, i) => (
                  <motion.div key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.6 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      flex: 1, height: `${h * 100}%`, borderRadius: 3,
                      background: i === 6
                        ? `linear-gradient(to top,${T.gold},${T.goldLight})`
                        : `rgba(255,255,255,${0.14 + h * 0.2})`,
                      transformOrigin: 'bottom',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* murano3.jpeg */}
          <motion.div className="hero-card" variants={fadeRight} style={{
            borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(13,27,62,0.13)',
          }}>
            <img src="/murano3.jpeg" alt="Murano Espaço"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </motion.div>
        </motion.div>

        {/* ── BOTÕES (área separada para controle de ordem no mobile) ── */}
        <motion.div
          className="hero-cta"
          initial="hidden"
          animate="visible"
          variants={stagger(0.1)}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <motion.button
              onClick={goContact}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: T.navy, color: '#fff', border: 'none',
                padding: '14px 32px', fontFamily: T.fontBody,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.24em',
                textTransform: 'uppercase', cursor: 'pointer', borderRadius: 8,
                boxShadow: '0 4px 20px rgba(13,27,62,0.18)',
              }}
              whileHover={{ background: T.navyLight, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Entrar em Contato <span style={{ fontSize: 14 }}>→</span>
            </motion.button>

            <motion.button
              onClick={() => scrollTo(3)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'transparent', color: T.navy,
                border: `1.5px solid rgba(13,27,62,0.25)`,
                padding: '14px 32px', fontFamily: T.fontBody,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.2em',
                textTransform: 'uppercase', cursor: 'pointer', borderRadius: 8,
              }}
              whileHover={{ borderColor: T.gold, color: T.gold, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver Eventos
            </motion.button>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll hint – só desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="hero-scroll-hint"
        style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8, zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: T.fontBody, fontSize: 9,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: T.navy, opacity: 0.3,
        }}>Role para explorar</span>
        <motion.div
          style={{ width: 1, height: 40, background: `linear-gradient(to bottom,${T.gold},transparent)` }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── CSS layout ────────────────────────────────────── */}
      <style>{`
        /* ── Desktop ──────────────────────────────────────── */
        .hero-layout {
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 2;
          padding: 100px 48px 64px;

          display: grid;
          grid-template-areas:
            "text  cards"
            "cta   cards";
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr auto;
          gap: 0 5vw;
          align-items: start;
        }

        .hero-text  { grid-area: text; padding-bottom: 28px; }
        .hero-cta   { grid-area: cta; }
        .hero-cards {
          grid-area: cards;
          align-self: stretch;
        }

        /* ── Mobile (≤ 860px) ─────────────────────────────── */
        @media (max-width: 860px) {
          /* align-items: center (inline) centraliza verticalmente e causa
             sobreposição quando o conteúdo ultrapassa 100vh */
          .hero-section {
            align-items: flex-start !important;
          }

          .hero-layout {
            display: flex !important;
            flex-direction: column !important;
            padding: 84px 20px 44px !important;
            gap: 24px !important;
          }

          .hero-text  { order: 1; padding-bottom: 0 !important; }
          .hero-cards {
            order: 2;
            height: clamp(220px, 56vw, 310px) !important;
            gap: 10px !important;
          }
          .hero-cta   { order: 3; margin-top: 50px; }

          .hero-scroll-hint { display: none !important; }
        }

        /* ── Tablet (861 – 1080px) ────────────────────────── */
        @media (min-width: 861px) and (max-width: 1080px) {
          .hero-layout {
            padding: 100px 32px 48px;
          }
        }
      `}</style>
    </section>
  )
}
