import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { DEPOIMENTOS } from '../data/content'
import { SectionHeader, stagger, fadeUp } from './shared'

export default function Depoimentos() {
  const { ref, inView } = useReveal(0.1);

  return (
    <section style={{ background: T.navyMid, padding: "120px clamp(24px,5vw,80px)" }}>
      <SectionHeader eyebrow="O que dizem sobre nós" title="Experiências que" titleSecond="Ficam na Memória" light />

      <motion.div
        ref={ref}
        variants={stagger(0.15)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {DEPOIMENTOS.map((d, i) => (
          <DepoCard key={i} d={d} />
        ))}
      </motion.div>
    </section>
  );
}

function DepoCard({ d }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        border: `1px solid rgba(201,168,76,0.15)`,
        padding: "36px 32px", position: "relative",
      }}
      whileHover={{ borderColor: "rgba(201,168,76,0.35)", y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ color: T.gold, fontSize: 12, letterSpacing: 3, marginBottom: 12 }}>
        {"★".repeat(5)}
      </div>
      <div style={{
        fontFamily: T.fontDisplay, fontSize: 56, color: T.gold,
        lineHeight: 0.6, marginBottom: 16, opacity: 0.4,
      }}>"</div>
      <p style={{
        fontSize: 13, fontWeight: 300, lineHeight: 1.85,
        color: "rgba(255,255,255,0.7)", fontStyle: "italic",
        marginBottom: 28,
      }}>{d.text}</p>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold }}>
        — {d.author}
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4, letterSpacing: "0.1em" }}>
        {d.role}
      </div>
    </motion.div>
  );
}