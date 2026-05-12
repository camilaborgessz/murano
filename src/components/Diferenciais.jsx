import { useState } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { DIFERENCIAIS } from '../data/content'
import { SectionHeader, stagger, fadeUp } from './shared'

export default function Diferenciais() {
  const { ref, inView } = useReveal(0.1);

  return (
    <section style={{ padding: "120px clamp(24px,5vw,80px)", background: T.cream }}>
      <SectionHeader eyebrow="Por que nos escolher" title="Nossos Diferenciais" />

      <motion.div
        ref={ref}
        variants={stagger(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 2,
        }}
      >
        {DIFERENCIAIS.map((d) => (
          <DiferencialCard key={d.num} d={d} />
        ))}
      </motion.div>
    </section>
  );
}

function DiferencialCard({ d }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ background: hovered ? T.navy : T.cream }}
      style={{
        padding: "44px 36px",
        border: `1px solid rgba(201,168,76,0.1)`,
        cursor: "default", position: "relative", overflow: "hidden",
        transition: "background 0.4s",
      }}
    >
      {/* barra inferior */}
      <motion.div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
          transformOrigin: "left",
        }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <div style={{
        fontFamily: T.fontDisplay, fontSize: 44, fontWeight: 400,
        color: hovered ? "rgba(201,168,76,0.2)" : "rgba(13,27,62,0.08)",
        lineHeight: 1, marginBottom: 20,
        transition: "color 0.4s",
      }}>{d.num}</div>
      <div style={{ fontSize: 26, marginBottom: 14 }}>{d.icon}</div>
      <h3 style={{
        fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 500,
        color: hovered ? T.gold : T.navy, marginBottom: 12,
        transition: "color 0.4s",
      }}>{d.title}</h3>
      <p style={{
        fontSize: 12, fontWeight: 300, lineHeight: 1.85,
        color: hovered ? "rgba(255,255,255,0.65)" : "#777",
        transition: "color 0.4s",
      }}>{d.desc}</p>
    </motion.div>
  );
}