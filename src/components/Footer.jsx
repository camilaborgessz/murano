import { motion } from 'framer-motion'
import { T } from '../styles/tokens'

const NAV_LINKS = [
  { label: 'Início',       idx: 0 },
  { label: 'Depoimentos',  idx: 1 },
  { label: 'Sobre',        idx: 2 },
  { label: 'Diferenciais', idx: 3 },
  { label: 'Eventos',      idx: 4 },
  { label: 'Espaço',       idx: 5 },
  { label: 'Contato',      idx: 6 },
]

const WPP = 'https://wa.me/5569992242374'
const INSTA = 'https://www.instagram.com/muranoeventos_/'
const MAPS = 'https://maps.google.com/?q=Av.+Rogerio+Weber,+1867,+Centro,+Porto+Velho+-+RO'

export default function Footer({ scrollTo }) {
  return (
    <footer style={{
      background: '#060e22',
      borderTop: `1px solid rgba(201,168,76,0.12)`,
      padding: 'clamp(56px,8vw,88px) clamp(24px,5vw,80px) 32px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'clamp(36px,5vw,60px)',
        marginBottom: 56,
      }}>

        <div>
          <img
            src={`${import.meta.env.BASE_URL}favicon.ico`}
            alt="Murano Eventos"
            style={{ height: 56, width: 'auto', marginBottom: 20, display: 'block' }}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <SocialBtn href={INSTA} label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
            </SocialBtn>
            <SocialBtn href={WPP} label="WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.514 5.84L.057 23.04a.75.75 0 0 0 .904.904l5.2-1.457A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.51-5.162-1.4l-.37-.22-3.085.865.866-3.085-.22-.37A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </SocialBtn>
          </div>
        </div>

        <div>
          <ColTitle>Localização</ColTitle>
          <a
            href={MAPS}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 20 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span style={{
                fontFamily: T.fontBody, fontSize: 13, fontWeight: 300,
                color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
              }}>
                Av. Rogério Weber, 1867<br />
                Centro, Porto Velho – RO<br />
                CEP 76801-030
              </span>
            </div>
          </a>
        </div>

        <div>
          <ColTitle>Contato</ColTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <FooterLink href={WPP} target="_blank">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.514 5.84L.057 23.04a.75.75 0 0 0 .904.904l5.2-1.457A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.51-5.162-1.4l-.37-.22-3.085.865.866-3.085-.22-.37A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              +55 69 99224-2374
            </FooterLink>
            <FooterLink href={INSTA} target="_blank">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
              @muranoeventos_
            </FooterLink>
          </div>
        </div>

        <div>
          <ColTitle>Navegação</ColTitle>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NAV_LINKS.map(({ label, idx }) => (
              <motion.button
                key={label}
                onClick={() => scrollTo?.(idx)}
                whileHover={{ color: T.gold, x: 4 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'none', border: 'none', padding: 0,
                  fontFamily: T.fontBody, fontSize: 13, fontWeight: 300,
                  color: 'rgba(255,255,255,0.45)', cursor: 'pointer',
                  textAlign: 'left', letterSpacing: '0.03em',
                }}
              >
                {label}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 24,
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: T.fontBody, fontSize: 11, fontWeight: 300,
          color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em',
          textTransform: 'uppercase', margin: 0,
        }}>
          Murano Eventos · Todos os direitos reservados · © {new Date().getFullYear()}
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

function ColTitle({ children }) {
  return (
    <p style={{
      fontFamily: T.fontBody, fontSize: 9, fontWeight: 700,
      letterSpacing: '0.3em', textTransform: 'uppercase',
      color: T.gold, margin: '0 0 20px',
    }}>
      {children}
    </p>
  )
}

function FooterLink({ href, target, children }) {
  return (
    <motion.a
      href={href}
      target={target}
      rel="noopener noreferrer"
      whileHover={{ color: T.gold }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: T.fontBody, fontSize: 13, fontWeight: 300,
        color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
      }}
    >
      {children}
    </motion.a>
  )
}

function SocialBtn({ href, label, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      whileHover={{ borderColor: T.gold, color: T.gold }}
      transition={{ duration: 0.2 }}
      style={{
        width: 36, height: 36, borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
      }}
    >
      {children}
    </motion.a>
  )
}
