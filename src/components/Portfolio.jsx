import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { TABS, TAB_COLORS } from '../data/content'
import { SectionHeader } from './shared'

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("Casamentos");
  const { ref, inView } = useReveal(0.1);

  const { bg1, bg2, icon } = TAB_COLORS[activeTab];

  return (
    <section style={{ padding: "120px clamp(24px,5vw,80px)", background: T.navy }}>
      <SectionHeader eyebrow="Nosso Portfólio" title="Eventos que" titleSecond="Realizamos" light />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {/* Tabs */}
        <div style={{
          display: "flex", gap: 0, marginBottom: 48, overflowX: "auto",
          borderBottom: `1px solid rgba(201,168,76,0.2)`,
          scrollbarWidth: "none",
        }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none", border: "none",
                borderBottom: `2px solid ${activeTab === tab ? T.gold : "transparent"}`,
                padding: "12px 22px", marginBottom: -1,
                fontSize: 10, fontWeight: 600, letterSpacing: "0.2em",
                textTransform: "uppercase", whiteSpace: "nowrap",
                color: activeTab === tab ? T.gold : "rgba(255,255,255,0.5)",
                cursor: "pointer", fontFamily: T.fontBody,
                transition: "all 0.3s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 2,
            }}
          >
            {[
              { label: `${activeTab} — Destaque`, tall: true },
              { label: `${activeTab} — Galeria`, tall: false },
              { label: `${activeTab} — Detalhe`, tall: false },
              { label: `${activeTab} — Momento`, tall: false },
            ].map((item, i) => (
              <PortfolioItem
                key={i}
                label={item.label}
                bg1={bg1} bg2={bg2} icon={icon}
                minH={item.tall ? 520 : 260}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function PortfolioItem({ label, bg1, bg2, icon, minH }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
    >
      <motion.div
        style={{
          minHeight: minH, width: "100%",
          background: `linear-gradient(135deg, ${bg1}, ${bg2})`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 12,
          position: "relative",
        }}
        animate={{ scale: hov ? 1.03 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.04), rgba(201,168,76,0.12))" }} />
        <span style={{ fontSize: 44, opacity: 0.25, position: "relative", zIndex: 1 }}>{icon}</span>
        <span style={{ fontFamily: T.fontDisplay, fontSize: 12, color: "rgba(201,168,76,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", position: "relative", zIndex: 1 }}>
          {label}
        </span>
      </motion.div>

      {/* Overlay hover */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(13,27,62,0.95) 0%, rgba(13,27,62,0.3) 50%, transparent 100%)",
          display: "flex", alignItems: "flex-end", padding: 28,
        }}
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <span style={{ fontSize: 9, color: T.gold, letterSpacing: "0.25em", textTransform: "uppercase" }}>{label.split(" — ")[0]}</span>
          <h4 style={{ fontFamily: T.fontDisplay, fontSize: 22, color: T.white, fontWeight: 400, marginTop: 4 }}>
            {label.split(" — ")[1]}
          </h4>
        </div>
      </motion.div>
    </motion.div>
  );
}