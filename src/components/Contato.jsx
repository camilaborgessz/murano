import { motion } from 'framer-motion'
import { T } from '../styles/tokens'
import { useReveal } from '../hooks/useReveal'

const WPP_NUMBER = '5569992242374'
const WPP_MSG = encodeURIComponent('Olá! Gostaria de saber mais sobre os eventos da Murano.')

export default function Contato() {
  const { ref, inView } = useReveal(0.2)

  return (
    <section style={{
      background: T.cream,
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      position: 'relative', overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute', top: '-10%', right: '-8%',
        width: 420, height: 420, borderRadius: '50%',
        background: 'rgba(201,168,76,0.06)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-6%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(13,27,62,0.04)', pointerEvents: 'none',
      }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ maxWidth: 660, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >

        <h2 style={{
          fontFamily: T.fontDisplay,
          fontSize: 'clamp(36px,5.5vw,64px)',
          fontWeight: 800, lineHeight: 1.08,
          color: T.navy, margin: '0 0 20px',
          letterSpacing: '-0.02em',
        }}>
          <span style={{ fontWeight: 300, fontStyle: 'italic', color: T.navyLight }}>Vamos criar </span>
          algo especial?
        </h2>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 12, margin: '0 0 28px',
        }}>
          <span style={{ width: 40, height: 1.5, background: `linear-gradient(90deg, transparent, ${T.gold})`, display: 'block' }} />
          <span style={{ color: T.gold, fontSize: 12, opacity: 0.7 }}>✦</span>
          <span style={{ width: 40, height: 1.5, background: `linear-gradient(90deg, ${T.gold}, transparent)`, display: 'block' }} />
        </div>

        <p style={{
          fontFamily: T.fontBody, fontSize: 'clamp(14px,1.4vw,16px)',
          fontWeight: 400, lineHeight: 1.8,
          color: 'rgba(13,27,62,0.55)', margin: '0 0 48px',
        }}>
          Entre em contato pelo WhatsApp e conte-nos sobre o seu evento, vamos transformar sua ideia em realidade.
        </p>

        <motion.a
          href={`https://wa.me/${WPP_NUMBER}?text=${WPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, boxShadow: '0 16px 48px rgba(37,211,102,0.28)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            background: '#25D366',
            color: '#fff',
            padding: '18px 44px',
            borderRadius: 100,
            fontFamily: T.fontBody, fontSize: 13, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(37,211,102,0.2)',
            transition: 'box-shadow 0.3s',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.514 5.84L.057 23.04a.75.75 0 0 0 .904.904l5.2-1.457A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.51-5.162-1.4l-.37-.22-3.085.865.866-3.085-.22-.37A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Chamar no WhatsApp
        </motion.a>
      </motion.div>
    </section>
  )
}
