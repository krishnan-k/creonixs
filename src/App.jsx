import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, MotionConfig, useMotionValue, useSpring } from 'motion/react'
import { useRouter } from './useRouter'
import Portfolio from './pages/Portfolio'
import { me } from './data'
import Header from './Header'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Services from './sections/Services'
import WorkShowcase from './sections/WorkShowcase'
import Contact from './sections/Contact'
import Faq from './sections/Faq'
import Cta from './sections/Cta'
import Footer from './sections/Footer'

function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 35 }), sy = useSpring(y, { stiffness: 500, damping: 35 })
  const [big, setBig] = useState(false)
  useEffect(() => {
    const m = (e) => { if (e.pointerType !== 'mouse') return; x.set(e.clientX); y.set(e.clientY); setBig(!!e.target.closest('a,button')) }
    addEventListener('pointermove', m)
    return () => removeEventListener('pointermove', m)
  }, [x, y])
  return <motion.div className="cursor" style={{ left: sx, top: sy }} animate={{ scale: big ? 3.2 : 1 }} aria-hidden="true" />
}

function Loader({ onDone }) {
  const [n, setN] = useState(0)
  const done = useRef(onDone)
  useEffect(() => {
    const start = performance.now(); let raf
    const tick = (t) => {
      const p = Math.min((t - start) / 1400, 1)
      setN(Math.round((1 - (1 - p) ** 3) * 100))
      if (p < 1) raf = requestAnimationFrame(tick); else done.current()
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <motion.div className="loader" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
      <span>{me.name}</span><b>{n}%</b>
    </motion.div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const page = useRouter()
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Loader onDone={() => setReady(true)} />}</AnimatePresence>
      <Cursor />
      <Header page={page} />
      <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {page === 'portfolio' ? (
          <main><Portfolio /></main>
        ) : (
          <>
            <Hero ready={ready} />
            <main>
              <Marquee />
              <Services />
              <WorkShowcase />
              <Contact />
              <Faq />
              <Cta />
            </main>
          </>
        )}
      </motion.div>
      <Footer />
    </MotionConfig>
  )
}
