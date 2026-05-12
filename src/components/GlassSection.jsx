import { useState } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { GLASS_CARDS } from '../data/content'
import { SectionHeader, stagger, fadeUp } from './shared'

export default function GlassSection() {
  const { ref, inView } = useReveal(0.1);

  return (
    <section style={{ background: T.navy, padding: "120px clamp(24px,5vw,80px)", position: "relative", overflow: "hidden" }}>
      {/* Orbs de fundo */}
      {[
        { w: 500, h: 500, top: "-100px", left: "-100px", c: "rgba(201,168,76,0.07)" },
        { w: 400, h: 400, bottom: "-80px", right: "-80px", c: "rgba(201,168,76,0.05)" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", width: o.w, height: o.h,
          borderRadius: "50%", filter: "blur(80px)",
          background: o.c, top: o.top, left: o.left,
          bottom: o.bottom, right: o.right, pointerEvents: "none",
        }} />
      ))}

      <SectionHeader eyebrow="Nosso Espaço" title="Estrutura Pensada" titleSecond="para a Excelência" light />

      <motion.div
        ref={ref}
        variants={stagger(0.15)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2,
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {GLASS_CARDS.map((c) => (
          <GlassCard key={c.title} c={c} />
        ))}
      </motion.div>
    </section>
  );
}

function GlassCard({ c }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={{
        background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        y: hov ? -6 : 0,
      }}
      style={{
        border: `1px solid ${hov ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.18)"}`,
        padding: "40px 32px", position: "relative", overflow: "hidden",
        transition: "border-color 0.4s",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Linha topo */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)`,
      }} />
      <span style={{ fontSize: 32, marginBottom: 20, display: "block" }}>{c.icon}</span>
      <h3 style={{
        fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500,
        color: T.gold, marginBottom: 12,
      }}>{c.title}</h3>
      <p style={{ fontSize: 12, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,0.65)" }}>
        {c.text}
      </p>
    </motion.div>
  );
}