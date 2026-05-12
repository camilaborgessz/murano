import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { stagger, fadeUp, BtnPrimary, BtnGhost } from './shared'

export default function CTA({ scrollTo }) {
  const { ref, inView } = useReveal(0.2);

  return (
    <section style={{
      background: T.cream, padding: "120px clamp(24px,5vw,80px)",
      textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      {/* Watermark */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: T.fontDisplay, fontSize: "clamp(80px,15vw,200px)",
        fontWeight: 700, color: "rgba(201,168,76,0.055)",
        whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
        letterSpacing: "0.15em",
      }}>MURANO</div>

      <motion.div
        ref={ref}
        variants={stagger(0.15)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto" }}
      >
        <motion.span variants={fadeUp} style={{
          display: "block", fontSize: 10, fontWeight: 600,
          letterSpacing: "0.45em", textTransform: "uppercase",
          color: T.gold, marginBottom: 20,
        }}>Pronto para começar?</motion.span>

        <motion.h2 variants={fadeUp} style={{
          fontFamily: T.fontDisplay,
          fontSize: "clamp(38px,6vw,66px)",
          fontWeight: 500, color: T.navy, lineHeight: 1.1, marginBottom: 28,
        }}>
          Vamos Criar Algo<br />
          <em style={{ fontStyle: "italic" }}>Extraordinário</em><br />
          Juntos
        </motion.h2>

        <motion.p variants={fadeUp} style={{
          fontSize: 13, fontWeight: 300, color: "#888",
          lineHeight: 1.95, letterSpacing: "0.04em", marginBottom: 52,
        }}>
          Entre em contato com nossa equipe e descubra como a Murano pode transformar seu evento em uma experiência verdadeiramente inesquecível.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <BtnPrimary onClick={(e) => { e.preventDefault(); scrollTo(5); }}>Solicitar Orçamento</BtnPrimary>
          <BtnGhost href="https://wa.me/5511999999999" style={{ borderColor: "rgba(13,27,62,0.25)" }}>WhatsApp</BtnGhost>
        </motion.div>
      </motion.div>
    </section>
  );
}
