import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, useReducedMotion } from 'motion/react'
import { skills } from '../data'

// Scroll speed ku etha maadhiri vegam + direction maarum
export default function Marquee() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const skew = useTransform(v, [-2000, 2000], [8, -8], { clamp: true })
  const dir = useRef(-1)
  useAnimationFrame((_, delta) => {
    if (reduce) return
    const s = v.get()
    if (Math.abs(s) > 20) dir.current = s > 0 ? -1 : 1
    let n = x.get() + dir.current * (delta / 1000) * (2 + Math.min(Math.abs(s) / 250, 10))
    if (n <= -50) n += 50
    if (n > 0) n -= 50
    x.set(n)
  })
  const tx = useTransform(x, (n) => `${n}%`)
  const list = [...skills, ...skills, ...skills, ...skills]
  return (
    <div className="marquee" aria-label={'Skills: ' + skills.join(', ')}>
      <motion.ul style={{ x: tx, skewX: skew }} aria-hidden="true">
        {list.map((s, i) => <li key={i}><b>✦</b>{s}</li>)}
      </motion.ul>
    </div>
  )
}
