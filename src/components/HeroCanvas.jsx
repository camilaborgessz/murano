import { useEffect, useRef } from 'react'

const NAVY  = { r: 13,  g: 27,  b: 62  }
const GOLD  = { r: 201, g: 168, b: 76  }

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const onResize = () => resize()
    const onMove   = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)

    const N = 65
    const particles = Array.from({ length: N }, (_, i) => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      vx:   (Math.random() - 0.5) * 0.35,
      vy:   (Math.random() - 0.5) * 0.35,
      r:    Math.random() * 1.8 + 0.8,
      type: i % 3 === 0 ? 'gold' : 'navy',
    }))

    const CONNECT = 140
    const REPEL   = 170

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const t = Date.now() / 6000
      ;[
        { cx: 0.75 + 0.12 * Math.sin(t),       cy: 0.18 + 0.08 * Math.cos(t),       c: GOLD,  a: 0.07 },
        { cx: 0.15 + 0.08 * Math.cos(t * 0.7), cy: 0.80 + 0.10 * Math.sin(t * 0.7), c: NAVY,  a: 0.06 },
        { cx: 0.50 + 0.10 * Math.sin(t * 1.3), cy: 0.45 + 0.09 * Math.cos(t * 1.1), c: GOLD,  a: 0.04 },
      ].forEach(({ cx, cy, c, a }) => {
        const grd = ctx.createRadialGradient(
          cx * canvas.width, cy * canvas.height, 0,
          cx * canvas.width, cy * canvas.height, canvas.width * 0.45,
        )
        grd.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${a})`)
        grd.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`)
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      for (const p of particles) {
        const dx   = p.x - mouse.x
        const dy   = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        if (dist < REPEL) {
          const f = ((REPEL - dist) / REPEL) ** 2 * 1.2
          p.vx += (dx / dist) * f
          p.vy += (dy / dist) * f
        }

        p.vx *= 0.96
        p.vy *= 0.96

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 2.2) { p.vx = p.vx / spd * 2.2; p.vy = p.vy / spd * 2.2 }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width)  p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const c = p.type === 'gold' ? GOLD : NAVY
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${p.type === 'gold' ? 0.55 : 0.22})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT) {
            const alpha = (1 - d / CONNECT) * 0.28
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            g.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`)
            g.addColorStop(1, `rgba(${NAVY.r},${NAVY.g},${NAVY.b},${alpha * 0.5})`)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = g
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
