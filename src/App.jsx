import { useRef, useEffect } from 'react'
import { useScrollState } from './hooks/useScroll'
import { SECTIONS } from './data/content'

import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Diferenciais from './components/Diferenciais'
import Portfolio from './components/Portfolio'
import Estrutura from './components/Estrutura'
import Depoimentos from './components/Depoimentos'
import Contato from './components/Contato'
import Footer from './components/Footer'
import GlobalStyles from './components/GlobalStyles'
import MuranoBand from './components/MuranoBand'
import SectionIndicator from './components/SectionIndicator'
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
      <div style={{
        position: 'fixed', top: 0, left: 0, height: 2, zIndex: 9999,
        width: `${progress}%`,
        background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight}, ${T.gold})`,
        boxShadow: `0 0 8px ${T.gold}`,
        transition: 'width 0.1s linear',
      }} />

      <Nav scrolled={scrolled} scrollTo={scrollTo} />
      <SectionIndicator active={activeSec} scrollTo={scrollTo} />

      <div ref={setRef(0)}><Hero scrollTo={scrollTo} /></div>
      <div ref={setRef(1)}><Depoimentos /></div>
      <div ref={setRef(2)}><About scrollTo={scrollTo} /></div>
      <div ref={setRef(3)}><Diferenciais /></div>
      <div ref={setRef(4)}><Portfolio /></div>
      <div ref={setRef(5)}><Estrutura /></div>
      <MuranoBand />
      <div ref={setRef(6)}><Contato /></div>
      <Footer scrollTo={scrollTo} />
    </>
  )
}