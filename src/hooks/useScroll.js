import { useState, useEffect } from 'react'

export function useScrollState() {
  const [scrolled,  setScrolled]  = useState(false)
  const [progress,  setProgress]  = useState(0)
  const [activeSec, setActiveSec] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const sy   = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(sy > 60)
      setProgress((sy / docH) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, progress, activeSec, setActiveSec }
}