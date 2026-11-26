import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useVelocity } from 'motion/react'
import { services } from '../data'
import { Arrow, Reveal, ease } from '../ui'

export default function Services() {
  const [active, setActive] = useState(null)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 150, damping: 20 })
  const y = useSpring(my, { stiffness: 150, damping: 20 })
  const rotate = useTransform(useVelocity(x), [-1500, 1500], [-22, 22], { clamp: true })
  return (
    <section className="wrap split" id="services">
      <div className="sticky"><span className="icon" aria-hidden="true">ϟ</span><Reveal text="Ecommerce and theme services from Creonixs" /></div>
      <ul className="services" onPointerMove={(e) => { if (e.pointerType === 'mouse') { mx.set(e.clientX); my.set(e.clientY) } }}
        onPointerLeave={() => setActive(null)}>
        {services.map((s, i) => (
          <motion.li key={s.title} initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.08, ease }}>
            <a href="#help" className={active !== null && active !== i ? 'dim' : ''}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') { mx.jump(e.clientX); my.jump(e.clientY); x.jump(e.clientX); y.jump(e.clientY); setActive(i) } }}>
              <small>({String(i + 1).padStart(2, '0')})</small>
              <span><strong>{s.title}</strong><em>{s.text}</em></span>
              <i className="arrow"><Arrow size={26} /><Arrow size={26} /></i>
            </a>
          </motion.li>
        ))}
      </ul>
      <AnimatePresence>
        {active !== null && (
          <motion.div className="float" style={{ left: x, top: y, rotate }} aria-hidden="true"
            initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }}>
            <motion.div className="board" animate={{ y: `${-active * 100}%` }} transition={{ duration: 0.6, ease }}>
              {services.map((s) => (
                <div key={s.title} className="tile" style={{ '--h': s.hue }}><b /><b /><b /><span>{s.title}</span></div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
