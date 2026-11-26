import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { me } from '../data'
import { Button, Reveal } from '../ui'

export default function Cta() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  return (
    <section className="wrap">
      <motion.div ref={ref} className="cta" style={{ scale }} onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px')
        e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px')
      }}>
        {me.available && <span className="status"><i />Available for new projects</span>}
        <Reveal text="Interested in working together?" />
        <p>Tell us about your store or theme. Send the contact form or mail us directly.</p>
        <div className="row">
          <Button href="#help">Contact us</Button>
          <Button ghost href={`mailto:${me.email}`}>Mail us</Button>
        </div>
      </motion.div>
    </section>
  )
}
