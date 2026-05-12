import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { STATS } from '../data/content'

export default function Stats() {
  const { ref, inView } = useReveal(0.3);
  return (
    <div ref={ref} style={{
      background: T.navy, padding: "36px 40px",
      display: "flex", justifyContent: "center", gap: "clamp(32px,6vw,80px)",
      flexWrap: "wrap",
    }}>
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.12, duration: 0.7 }}
          style={{ textAlign: "center" }}
        >
          <div style={{
            fontFamily: T.fontDisplay, fontSize: "clamp(32px,5vw,44px)",
            fontWeight: 500, color: T.gold, lineHeight: 1,
          }}>{s.num}</div>
          <div style={{
            fontSize: 9, fontWeight: 500, letterSpacing: "0.25em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
            marginTop: 8,
          }}>{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
