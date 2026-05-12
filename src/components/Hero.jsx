import { useState, useEffect, useRef } from 'react'        // hooks do React
import { motion, AnimatePresence } from 'framer-motion'    // animações
import { T } from '../styles/tokens'                       // cores e fontes
import { useReveal } from '../hooks/useReveal'             // animação de scroll
import { SECTIONS, DIFERENCIAIS } from '../data/content' // dados
import { stagger, fadeUp, BtnPrimary, BtnGhost } from './shared'

export default function Hero({ scrollTo }) {
  return (
    <section style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      background: `linear-gradient(160deg, ${T.cream} 0%, ${T.cream2} 50%, #e8d5b0 100%)`,
    }}>
      {/* Ornamentos circulares */}
      {[600, 820, 1040].map((size, i) => (
        <motion.div
          key={size}
          style={{
            position: "absolute", width: size, height: size,
            borderRadius: "50%", border: `1px solid rgba(201,168,76,${0.12 - i * 0.03})`,
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Noise texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      {/* Conteúdo */}
      <motion.div
        style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}
        initial="hidden"
        animate="visible"
        variants={stagger(0.18)}
      >
        <motion.p variants={fadeUp} style={{
          fontSize: 10, fontWeight: 600, letterSpacing: "0.45em",
          textTransform: "uppercase", color: T.gold, marginBottom: 28,
        }}>
          Bem-vindo à experiência Murano
        </motion.p>

        <motion.h1 variants={fadeUp} style={{
          fontFamily: T.fontDisplay,
          fontSize: "clamp(64px, 13vw, 140px)",
          fontWeight: 500, lineHeight: 0.9,
          color: T.navy, marginBottom: 12,
        }}>
          Momentos<br />
          <span style={{
            WebkitTextStroke: `1.5px ${T.gold}`,
            color: "transparent",
            fontStyle: "italic",
          }}>
            Eternos
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} style={{
          fontFamily: T.fontDisplay,
          fontSize: "clamp(16px, 2.5vw, 24px)",
          fontStyle: "italic", fontWeight: 400,
          color: T.navy, opacity: 0.6,
          marginBottom: 48, letterSpacing: "0.04em",
        }}>
          onde cada detalhe conta uma história
        </motion.p>

        <motion.div variants={fadeUp} style={{
          width: 60, height: 1, margin: "0 auto 40px",
          background: `linear-gradient(90deg,transparent,${T.gold},transparent)`,
        }} />

        <motion.p variants={fadeUp} style={{
          fontSize: 10, fontWeight: 300, letterSpacing: "0.25em",
          textTransform: "uppercase", color: T.navy, opacity: 0.5,
          marginBottom: 52, lineHeight: 2,
        }}>
          Decoração · Buffet · Locação · Espaço Premium
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <BtnPrimary onClick={(e) => { e.preventDefault(); scrollTo(5); }}>Fale Conosco</BtnPrimary>
          <BtnGhost   onClick={(e) => { e.preventDefault(); scrollTo(3); }}>Ver Portfólio</BtnGhost>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: "absolute", bottom: 40, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, zIndex: 2,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: T.navy, opacity: 0.35 }}>
          Role para explorar
        </span>
        <motion.div
          style={{ width: 1, height: 50, background: `linear-gradient(to bottom, ${T.gold}, transparent)` }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
