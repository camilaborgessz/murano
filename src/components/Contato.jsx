import { useState } from 'react'
import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'
import { fadeLeft, fadeRight } from './shared'

export default function Contato() {
  const leftReveal  = useReveal(0.2);
  const rightReveal = useReveal(0.2);
  const [form, setForm] = useState({
    nome: "", whatsapp: "", email: "",
    tipo: "", convidados: "", data: "", mensagem: "",
  });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    if (!form.nome || !form.email) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ nome: "", whatsapp: "", email: "", tipo: "", convidados: "", data: "", mensagem: "" });
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)", border: `1px solid rgba(201,168,76,0.2)`,
    padding: "12px 16px", fontSize: 12, fontWeight: 300, color: T.white,
    outline: "none", width: "100%",
    fontFamily: T.fontBody,
  };
  const labelStyle = {
    fontSize: 9, fontWeight: 600, letterSpacing: "0.22em",
    textTransform: "uppercase", color: T.gold, marginBottom: 8, display: "block",
  };

  return (
    <section style={{ background: T.navy, padding: "100px clamp(24px,5vw,80px)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "clamp(40px,6vw,80px)", alignItems: "start",
      }}>
        {/* Info */}
        <motion.div
          ref={leftReveal.ref}
          variants={fadeLeft}
          initial="hidden"
          animate={leftReveal.inView ? "visible" : "hidden"}
        >
          <span style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.45em", textTransform: "uppercase", color: T.gold, marginBottom: 16 }}>
            Fale Conosco
          </span>
          <h3 style={{ fontFamily: T.fontDisplay, fontSize: "clamp(32px,4vw,44px)", fontWeight: 500, color: T.white, marginBottom: 40, lineHeight: 1.15 }}>
            Entre em<br />Contato
          </h3>

          {[
            { icon: "📍", label: "Localização",           text: "Rua das Magnólias, 1200 — Jardim Nobre\nSão Paulo, SP" },
            { icon: "📞", label: "Telefone & WhatsApp",   text: "(11) 9 9999-9999" },
            { icon: "✉",  label: "E-mail",                text: "contato@muranoevents.com.br" },
            { icon: "🕐", label: "Horário de Atendimento",text: "Seg – Sex: 9h às 18h\nSáb: 9h às 14h" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 36, height: 36, border: `1px solid rgba(201,168,76,0.3)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, flexShrink: 0,
              }}>{item.icon}</div>
              <div>
                <strong style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, display: "block", marginBottom: 4 }}>
                  {item.label}
                </strong>
                <span style={{ fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, whiteSpace: "pre-line" }}>
                  {item.text}
                </span>
              </div>
            </div>
          ))}

          {/* Redes sociais */}
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {[["📷","Instagram"],["💼","LinkedIn"],["▶","YouTube"]].map(([icon, name]) => (
              <motion.a
                key={name} href="#" title={name}
                style={{
                  width: 40, height: 40,
                  border: `1px solid rgba(201,168,76,0.3)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: T.gold, textDecoration: "none",
                }}
                whileHover={{ background: T.gold, color: T.navy }}
                transition={{ duration: 0.25 }}
              >{icon}</motion.a>
            ))}
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.div
          ref={rightReveal.ref}
          variants={fadeRight}
          initial="hidden"
          animate={rightReveal.inView ? "visible" : "hidden"}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid rgba(201,168,76,0.15)`,
            padding: "clamp(28px,4vw,48px)",
          }}
        >
          <span style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, marginBottom: 28 }}>
            Solicite seu Orçamento
          </span>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[
              { field: "nome",     label: "Nome",     ph: "Seu nome completo",   type: "text" },
              { field: "whatsapp", label: "WhatsApp", ph: "(11) 9 9999-9999",    type: "tel" },
            ].map(({ field, label, ph, type }) => (
              <div key={field}>
                <label style={labelStyle}>{label}</label>
                <input type={type} placeholder={ph} value={form[field]} onChange={update(field)} style={inputStyle} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>E-mail</label>
            <input type="email" placeholder="seu@email.com" value={form.email} onChange={update("email")} style={inputStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Tipo de Evento</label>
              <select value={form.tipo} onChange={update("tipo")} style={{ ...inputStyle, appearance: "none" }}>
                <option value="">Selecione...</option>
                {["Casamento","Formatura","Corporativo","15 Anos","Aniversário","Outro"].map(o => (
                  <option key={o} value={o} style={{ background: T.navy }}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Nº de Convidados</label>
              <input type="text" placeholder="Ex: 200 pessoas" value={form.convidados} onChange={update("convidados")} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Data Pretendida</label>
            <input type="date" value={form.data} onChange={update("data")} style={inputStyle} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Mensagem</label>
            <textarea rows={4} placeholder="Conte-nos mais sobre o seu evento..." value={form.mensagem} onChange={update("mensagem")} style={{ ...inputStyle, resize: "none" }} />
          </div>

          <motion.button
            onClick={handleSubmit}
            style={{
              width: "100%", background: sent ? "#2a6e3a" : T.gold,
              color: sent ? T.white : T.navy, border: "none",
              padding: "16px", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: T.fontBody,
              transition: "background 0.4s, color 0.4s",
            }}
            whileHover={!sent ? { background: T.goldLight } : {}}
            whileTap={{ scale: 0.98 }}
          >
            {sent ? "✓ Mensagem Enviada!" : "Enviar Solicitação"}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
