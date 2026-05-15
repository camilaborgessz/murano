import { T } from '../styles/tokens'

/**
 * MuranoLogo – SVG inline, sem dependência de arquivo externo.
 * variant: 'dark' | 'light' | 'gold'
 * size: largura em px (altura proporcional)
 */
export default function MuranoLogo({ width = 160, variant = 'dark', style = {} }) {
  const primary = variant === 'light' ? '#ffffff' : T.navy
  const accent  = T.gold

  return (
    <svg
      width={width}
      height={width * 0.44}
      viewBox="0 0 200 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* ── M mark ──────────────────────────────────────── */}
      {/* perna esquerda */}
      <path d="M6 70 L6 18" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
      {/* diagonal esquerda */}
      <path d="M6 18 L26 52" stroke={accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* diagonal direita */}
      <path d="M26 52 L46 18" stroke={accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* perna direita */}
      <path d="M46 18 L46 70" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
      {/* base horizontal decorativa */}
      <line x1="2" y1="70" x2="50" y2="70" stroke={accent} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />

      {/* ── Wordmark ─────────────────────────────────────── */}
      <text
        x="66"
        y="48"
        fontFamily="Outfit, sans-serif"
        fontSize="28"
        fontWeight="600"
        letterSpacing="5"
        fill={primary}
      >
        MURANO
      </text>

      {/* ── Subtítulo ─────────────────────────────────────── */}
      <text
        x="67"
        y="68"
        fontFamily="DM Sans, sans-serif"
        fontSize="9"
        fontWeight="400"
        letterSpacing="5.5"
        fill={accent}
        opacity="0.85"
      >
        EVENTOS
      </text>
    </svg>
  )
}
