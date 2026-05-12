import { useRef } from 'react'
import { useScroll } from './hooks/useScroll'
import { SECTIONS } from './data/content'

import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Diferenciais from './components/Diferenciais'
import Portfolio from './components/Portfolio'
import GlassSection from './components/GlassSection'
import Estrutura from './components/Estrutura'
import Depoimentos from './components/Depoimentos'
import CTA from './components/CTA'
import Contato from './components/Contato'
import Footer from './components/Footer'

export default function App() {
  const { scrolled, progress } = useScroll()
  const sectionRefs = useRef([])
  const setRef = (i) => (el) => { sectionRefs.current[i] = el }
  const scrollTo = (i) => sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Cursor />

      {/* Barra de progresso */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: 2, zIndex: 9999,
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #c9a84c, #e2c06a, #c9a84c)',
        boxShadow: '0 0 8px #c9a84c',
        transition: 'width 0.1s linear'
      }} />

      <Nav scrolled={scrolled} sections={SECTIONS} scrollTo={scrollTo} />

      <section ref={setRef(0)}><Hero scrollTo={scrollTo} /></section>
      <Stats />
      <section ref={setRef(1)}><About scrollTo={scrollTo} /></section>
      <section ref={setRef(2)}><Diferenciais /></section>
      <section ref={setRef(3)}><Portfolio /></section>
      <GlassSection />
      <section ref={setRef(4)}><Estrutura /></section>
      <Depoimentos />
      <CTA scrollTo={scrollTo} />
      <section ref={setRef(5)}><Contato /></section>
      <Footer />
    </>
  )
}