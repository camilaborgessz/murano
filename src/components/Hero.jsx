import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { stagger, fadeUp, fadeRight } from './shared'
import HeroCanvas from './HeroCanvas'
import MuranoLogo from './Logo'

export default function Hero({ scrollTo }) {
  const goContact = () => scrollTo(6)

  return (
    <section className="hero-section" style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      background: '#eef2fa',
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
          {/* ── Logo ── */}
          <motion.div variants={fadeUp}>
            <img src={`${import.meta.env.BASE_URL}favicon.ico`} alt="Murano Eventos" style={{ height: 64, width: 'auto', display: 'block' }} />
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: T.fontDisplay,
            fontSize: 'clamp(28px, 4vw, 58px)',
            fontWeight: 800, lineHeight: 1.06,
            color: T.navy, margin: 0, letterSpacing: '-0.02em',
          }}>
            Transformamos o evento da sua marca<br />
            em uma experiência memorável,<br />
            <span style={{ fontWeight: 300, color: T.navyLight, fontStyle: 'italic', letterSpacing: '0.01em' }}>
              capaz de conectar pessoas e eternizar sua história.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.3vw, 16px)',
            fontWeight: 400, lineHeight: 1.8,
            color: 'rgba(13,27,62,0.58)', margin: 0, maxWidth: 460,
          }}>
            Cuidamos de cada detalhe do seu evento com excelência e planejamento completo. Unimos buffet, decoração e espaço, conduzidos por equipes especializadas que cuidam de cada detalhe.
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
            <img src={`${import.meta.env.BASE_URL}murano2.jpeg`} alt="Evento Murano"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </motion.div>

          {/* Card — Nossa essência */}
          <motion.div className="hero-card" variants={fadeUp} style={{
            borderRadius: 18, background: '#ffffff',
            boxShadow: '0 8px 32px rgba(13,27,62,0.08)',
            border: `1px solid rgba(201,168,76,0.18)`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10, padding: 20,
          }}>
            <div style={{ width: 28, height: 2, borderRadius: 2, background: `linear-gradient(90deg,${T.gold},${T.goldLight})` }} />

            <p style={{
              fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 400,
              fontStyle: 'italic', lineHeight: 1.65,
              color: T.navy, textAlign: 'center', margin: 0,
            }}>
              Assinamos eventos para{' '}
              <span style={{ fontWeight: 700, fontStyle: 'normal' }}>empresas e marcas</span>
              {' '}de referência
            </p>
          </motion.div>

          {/* Card — Nossa visão */}
          <motion.div className="hero-card" variants={fadeUp} style={{
            borderRadius: 18, background: T.navy, overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(13,27,62,0.22)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', gap: 10, padding: '22px 24px',
          }}>

            <p style={{
              fontFamily: T.fontBody, fontSize: 12, fontWeight: 400,
              lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', margin: 0,
            }}>
              Grandes empresas não promovem apenas eventos —{' '}
              <span style={{ color: T.goldLight, fontWeight: 600 }}>criam conexões</span>,{' '}
              <span style={{ color: T.goldLight, fontWeight: 600 }}>fortalecem culturas</span>{' '}
              e{' '}
              <span style={{ color: T.goldLight, fontWeight: 600 }}>transformam encontros em resultados</span>.
            </p>
          </motion.div>

          {/* murano3.jpeg */}
          <motion.div className="hero-card" variants={fadeRight} style={{
            borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(13,27,62,0.13)',
          }}>
            <img src={`${import.meta.env.BASE_URL}murano3.jpeg`} alt="Murano Espaço"
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
              onClick={() => scrollTo(4)}
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
          align-self: center;
        }

        /* ── Mobile (≤ 860px) ─────────────────────────────── */
        @media (max-width: 860px) {
          .hero-section {
            align-items: flex-start !important;
            /* clip: não cria BFC (a seção cresce com o conteúdo) e bloqueia
               overflow decorativo horizontal, eliminando a barra branca lateral */
            overflow: clip !important;
            min-height: 100svh !important;
          }

          .hero-layout {
            display: flex !important;
            flex-direction: column !important;
            padding: 80px 20px 40px !important;
            gap: 18px !important;
          }

          .hero-text  { order: 1; padding-bottom: 0 !important; gap: 14px !important; }
          .hero-cta   { order: 2; }
          .hero-cards {
            order: 3;
            /* altura automática + linhas explícitas garante as 2 linhas visíveis */
            height: auto !important;
            grid-template-rows: 130px 130px !important;
            gap: 10px !important;
          }

          /* reduz logo no mobile para economizar altura */
          .hero-section .hero-text img {
            height: 48px !important;
          }
          .hero-section .hero-text p {
            font-size: 14px !important;
          }

          .hero-scroll-hint { display: none !important; }

          /* cards de texto: fonte menor + overflow contido no mobile */
          .hero-card p {
            font-size: 10px !important;
            line-height: 1.55 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 4 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          /* esconde a linha decorativa dourada no card branco no mobile */
          .hero-card > div[style*="height: 2px"],
          .hero-card > div[style*="height:2px"] {
            display: none !important;
          }
        }

        /* ── iPhone SE e telas muito pequenas (≤ 400px) ──── */
        @media (max-width: 400px) {
          .hero-layout {
            padding: 68px 16px 32px !important;
            gap: 14px !important;
          }
          .hero-text { gap: 10px !important; }
          .hero-section .hero-text img { height: 40px !important; }
          .hero-section h1 { font-size: 26px !important; }
          .hero-section .hero-text p {
            font-size: 13px !important;
          }
          /* linhas menores no SE para caber no viewport */
          .hero-cards {
            grid-template-rows: 105px 105px !important;
          }
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
