import { useState, useEffect, useRef } from 'react'
import { T } from '../styles/tokens'

function useCursor() {
  const [pos,     setPos]     = useState({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })
  const cur  = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf  = useRef(null)

  useEffect(() => {
    const move = (e) => {
      cur.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', move)

    const animate = () => {
      ring.current.x += (cur.current.x - ring.current.x) * 0.12
      ring.current.y += (cur.current.y - ring.current.y) * 0.12
      setRingPos({ x: ring.current.x, y: ring.current.y })
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return { pos, ringPos }
}

export default function Cursor() {
  const { pos, ringPos } = useCursor()

  return (
    <>
      <div id="murano-cursor" style={{
        position: 'fixed', top: pos.y, left: pos.x, zIndex: 99999,
        width: 10, height: 10, borderRadius: '50%', background: T.gold,
        pointerEvents: 'none', transform: 'translate(-50%,-50%)',
      }} />
      <div id="murano-cursor-ring" style={{
        position: 'fixed', top: ringPos.y, left: ringPos.x, zIndex: 99998,
        width: 34, height: 34, borderRadius: '50%',
        border: `1px solid ${T.gold}`, opacity: 0.55,
        pointerEvents: 'none', transform: 'translate(-50%,-50%)',
      }} />
    </>
  )
}