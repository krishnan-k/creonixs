import { motion, useMotionValue, useSpring } from 'motion/react'
import { ease } from './ui'

export default function WorkCard({ p, index }) {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 250, damping: 22 }), y = useSpring(my, { stiffness: 250, damping: 22 })
  return (
    <motion.a className="card" href={p.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease }}>
      <div className="thumb" onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left - r.width / 2); my.set(e.clientY - r.top - r.height / 2)
      }} onPointerLeave={() => { mx.set(0); my.set(0) }}>
        <div className="media"><img src={p.image} alt={p.title + ' store home page'} width="800" height="800" loading="lazy" /></div>
        <motion.span className="view" style={{ x, y }}>View</motion.span>
      </div>
      <small>{p.tags}</small>
      <h3>{p.title}</h3>
      <p>{p.text}</p>
    </motion.a>
  )
}
