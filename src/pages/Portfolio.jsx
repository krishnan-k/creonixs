import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { projects } from '../data'
import { Reveal } from '../ui'
import WorkCard from '../WorkCard'
import Cta from '../sections/Cta'

// Mouse wheel (vertical scroll) -> cards horizontal ah move aagum.
// Section sticky ah nikkum, ella cards-um paathu mudinjadhum page thirumba normal ah scroll aagum.
export default function Portfolio() {
  const area = useRef(null), track = useRef(null)
  const [dist, setDist] = useState(0)   // track evlo dhooram nagaranum
  const [vh, setVh] = useState(() => window.innerHeight)
  const [pv, setPv] = useState(4)      // oru screen la ethana cards theriyum
  const [last, setLast] = useState(4)   // kadaisiya theriyra card number

  // Scroll progress (0 -> 1) namma ye calculate pannrom, so layout maariyum correct ah irukkum
  const scrollYProgress = useMotionValue(0)
  useEffect(() => {
    const update = () => {
      if (!area.current) return
      const r = area.current.getBoundingClientRect()
      const range = r.height - window.innerHeight
      scrollYProgress.set(range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0)
    }
    const measure = () => {
      if (!track.current) return
      setVh(window.innerHeight)
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth)
      setDist(d)
      const cs = getComputedStyle(track.current), first = track.current.firstElementChild
      const gap = parseFloat(cs.columnGap) || 0, pad = parseFloat(cs.paddingLeft) || 0
      if (first) setPv(Math.min(projects.length, Math.max(1, Math.round((window.innerWidth - pad * 2 + gap) / (first.offsetWidth + gap)))))
      requestAnimationFrame(update)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    addEventListener('resize', measure)
    addEventListener('scroll', update, { passive: true })
    return () => { ro.disconnect(); removeEventListener('resize', measure); removeEventListener('scroll', update) }
  }, [scrollYProgress])

  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setLast(Math.min(projects.length, pv + Math.round(v * (projects.length - pv)))))

  return (
    <>
      <section className="hscroll" ref={area} style={{ height: dist * 2 + vh }}>
        <div className="hpin">
          <div className="hhead">
            <Reveal as="h1" text="Recent works" />
            <p>Online stores and websites from Creonixs. Open any project to visit the live store.</p>
          </div>
          <motion.div className="htrack" ref={track} style={{ x }}>
            {projects.map((p, i) => <WorkCard key={p.title} p={p} index={i} />)}
          </motion.div>
          <div className="hbar" aria-hidden="true">
            <b>{String(Math.max(last, pv)).padStart(2, '0')} <em>/ {String(projects.length).padStart(2, '0')}</em></b>
            <span><motion.i style={{ scaleX: scrollYProgress }} /></span>
            <small>Scroll to explore →</small>
          </div>
        </div>
      </section>
      <Cta />
    </>
  )
}
