import { T } from '../styles/tokens'

export default function Footer() {
  return (
    <footer style={{
      background: "#060e22", padding: "48px 40px",
      borderTop: `1px solid rgba(201,168,76,0.1)`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          fontFamily: T.fontDisplay, fontSize: 28, fontWeight: 500,
          color: T.gold, letterSpacing: "0.3em",
          textTransform: "uppercase", marginBottom: 16,
        }}>Murano</div>
        <div style={{ width: 40, height: 1, background: T.gold, margin: "0 auto 20px", opacity: 0.4 }} />
        <p style={{
          fontSize: 10, fontWeight: 300, letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.2)", lineHeight: 1.9,
        }}>
          © 2025 Murano Eventos — Todos os direitos reservados<br />
          Sofisticação · Excelência · Experiência
        </p>
      </div>
    </footer>
  );
}
