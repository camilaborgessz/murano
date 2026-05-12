import { useState } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { ESTRUTURA } from '../data/content'
import { SectionHeader, stagger, fadeUp, fadeRight } from './shared'

export default function Estrutura() {
  const leftReveal  = useReveal(0.2);
  const rightReveal = useReveal(0.2);

  return (
    <section style={{ padding: "120px clamp(24px,5vw,80px)", background: T.cream }}>
      <SectionHeader eyebrow="Infraestrutura" title="Cada Detalhe foi" titleSecond="Pensado para Você" />

      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "clamp(40px,5vw,60px)", alignItems: "center",
      }}>
        {/* Lista */}
        <motion.div
          ref={leftReveal.ref}
          variants={stagger(0.12)}
          initial="hidden"
          animate={leftReveal.inView ? "visible" : "hidden"}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {ESTRUTURA.map((item) => (
            <EstruturItem key={item.num} item={item} />
          ))}
        </motion.div>

        {/* Painel visual */}
        <motion.div
          ref={rightReveal.ref}
          variants={fadeRight}
          initial="hidden"
          animate={rightReveal.inView ? "visible" : "hidden"}
          style={{
            background: T.navy, padding: "56px 48px", textAlign: "center",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 14,
            border: `1px solid rgba(201,168,76,0.2)`, pointerEvents: "none",
          }} />
          {[
            { num: "500+", label: "Eventos Realizados" },
            { num: "100%", label: "Satisfação Garantida" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i === 0 ? 32 : 0 }}>
              <div style={{
                fontFamily: T.fontDisplay, fontSize: "clamp(52px,7vw,80px)",
                fontWeight: 500, color: T.gold, lineHeight: 1,
              }}>{item.num}</div>
              <div style={{
                fontSize: 9, fontWeight: 600, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
                marginTop: 6,
              }}>{item.label}</div>
              {i === 0 && (
                <div style={{ width: 40, height: 1, background: T.gold, margin: "24px auto 28px" }} />
              )}
            </div>
          ))}
          <p style={{
            fontSize: 12, color: "rgba(255,255,255,0.4)",
            lineHeight: 1.85, letterSpacing: "0.04em", marginTop: 32,
          }}>
            Nosso compromisso é com a excelência em cada evento, do mais intimista ao mais grandioso.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function EstruturItem({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={{ borderColor: hov ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.1)" }}
      style={{
        display: "flex", alignItems: "flex-start", gap: 20,
        padding: 20, border: "1px solid rgba(201,168,76,0.1)",
        background: hov ? "rgba(201,168,76,0.03)" : "transparent",
        transition: "background 0.3s",
      }}
    >
      <span style={{
        fontFamily: T.fontDisplay, fontSize: 32, fontWeight: 400,
        color: T.gold, opacity: 0.35, minWidth: 50,
      }}>{item.num}</span>
      <div>
        <h4 style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 500, color: T.navy, marginBottom: 6 }}>
          {item.title}
        </h4>
        <p style={{ fontSize: 12, fontWeight: 300, lineHeight: 1.75, color: "#777" }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}