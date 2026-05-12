
import { useState, useEffect, useRef } from 'react'        // hooks do React
import { motion, AnimatePresence } from 'framer-motion'    // animações
import { T } from '../styles/tokens'                       // cores e fontes
import { useReveal } from '../hooks/useReveal'             // animação de scroll
import { SectionHeader, BtnPrimary, fadeLeft, fadeRight } from './shared'


export default function About({ scrollTo }) {
  const leftReveal = useReveal(0.2);
  const rightReveal = useReveal(0.2);

  return (
    <section style={{ padding: "120px clamp(24px,5vw,80px)", background: T.navy }}>
      <SectionHeader eyebrow="Nossa História" title="Quem Somos" light />

      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "clamp(40px,6vw,80px)", alignItems: "center",
      }}>
        {/* Visual */}
        <motion.div
          ref={leftReveal.ref}
          variants={fadeLeft}
          initial="hidden"
          animate={leftReveal.inView ? "visible" : "hidden"}
          style={{ position: "relative" }}
        >
          <div style={{
            width: "100%", paddingTop: "110%", position: "relative",
            overflow: "hidden",
            border: `1px solid ${T.glassBdr}`,
          }}>
            <img
              src="/murano1.jpeg"
              alt="Murano Eventos"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>

          {/* Tag dourada */}
          <div style={{
            position: "absolute", bottom: -20, left: -16,
            background: T.gold, color: T.navy, padding: "18px 28px",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            Excelência em Eventos
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div
          ref={rightReveal.ref}
          variants={fadeRight}
          initial="hidden"
          animate={rightReveal.inView ? "visible" : "hidden"}
        >
          <blockquote style={{
            fontFamily: T.fontDisplay, fontSize: "clamp(17px,2vw,22px)",
            fontStyle: "italic", fontWeight: 400, color: T.goldLight,
            borderLeft: `2px solid ${T.gold}`, paddingLeft: 24,
            marginBottom: 32, lineHeight: 1.6,
          }}>
            "Transformamos sonhos em experiências inesquecíveis — com sofisticação, expertise e comprometimento absoluto com cada detalhe."
          </blockquote>

          {[
            "A Murano nasceu da paixão por criar momentos que ficam na memória para sempre. Com anos de experiência, nos consolidamos como referência em excelência, oferecendo soluções completas que vão da decoração ao buffet, da locação de materiais à estrutura do espaço.",
            "Nosso espaço foi projetado para superar expectativas: banheiros amplos e impecáveis, cozinha industrial de alto padrão, salão versátil para qualquer ocasião — tudo pensado para que você se preocupe apenas em celebrar.",
            "De celebrações intimistas a grandes eventos corporativos — a Murano está pronta para tornar seu evento extraordinário.",
          ].map((p, i) => (
            <p key={i} style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.9, color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>
              {p}
            </p>
          ))}

          <div style={{ marginTop: 40 }}>
            <BtnPrimary onClick={(e) => { e.preventDefault(); scrollTo(5); }}>
              Fale com a Murano
            </BtnPrimary>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
