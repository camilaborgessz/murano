import { useRef, useEffect } from 'react'
import { useScrollState } from './hooks/useScroll'
import { SECTIONS } from './data/content'

import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Diferenciais from './components/Diferenciais'
import Portfolio from './components/Portfolio'
import Estrutura from './components/Estrutura'
import Depoimentos from './components/Depoimentos'
import Contato from './components/Contato'
import Footer from './components/Footer'
import SectionIndicator from './components/SectionIndicator'
import GlobalStyles from './components/GlobalStyles'
import { T } from './styles/tokens'

export default function App() {
  const { scrolled, progress, activeSec, setActiveSec } = useScrollState()
  const sectionRefs = useRef([])
  const setRef = (i) => (el) => { sectionRefs.current[i] = el }
  const scrollTo = (i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const onScroll = () => {
      sectionRefs.current.forEach((el, i) => {
        if (!el) return
        const { top, bottom } = el.getBoundingClientRect()
        if (top <= window.innerHeight * 0.5 && bottom >= window.innerHeight * 0.5) {
          setActiveSec(i)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <GlobalStyles />
      <Cursor />

      {/* Barra de progresso topo */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: 2, zIndex: 9999,
        width: `${progress}%`,
        background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight}, ${T.gold})`,
        boxShadow: `0 0 8px ${T.gold}`,
        transition: 'width 0.1s linear',
      }} />

      {/* Barra de scroll lateral – funciona em mobile e desktop */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: 4,
        height: '100vh', zIndex: 9998,
        background: T.navy,
      }}>
        <div style={{
          width: '100%',
          height: `${progress}%`,
          background: `linear-gradient(to bottom, ${T.gold}, ${T.goldLight})`,
          boxShadow: `0 0 6px ${T.gold}`,
          transition: 'height 0.1s linear',
        }} />
      </div>

      <SectionIndicator active={activeSec} scrollTo={scrollTo} />
      <Nav scrolled={scrolled} scrollTo={scrollTo} />

      <div ref={setRef(0)}><Hero scrollTo={scrollTo} /></div>
      <div ref={setRef(1)}><About scrollTo={scrollTo} /></div>
      <div ref={setRef(2)}><Diferenciais /></div>
      <div ref={setRef(3)}><Portfolio /></div>
      <div ref={setRef(4)}><Estrutura /></div>
      <Depoimentos />
      <div ref={setRef(5)}><Contato /></div>
      <Footer scrollTo={scrollTo} />
    </>
  )
}