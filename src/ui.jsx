import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export const ease = [0.16, 1, 0.3, 1]

export const Arrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 13 13 3M5 3h8v8" />
  </svg>
)

// Cursor pakkam izhukkum premium button
export function Button({ children, href, ghost, type, onClick, disabled }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const Tag = href ? motion.a : motion.button
  return (
    <Tag ref={ref} href={href} type={href ? undefined : type || 'button'} onClick={onClick} disabled={disabled}
      className={'btn' + (ghost ? ' ghost' : '')} style={{ x, y }}
      onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }} whileTap={{ scale: 0.96 }}>
      <span className="roll"><span>{children}</span><span aria-hidden="true">{children}</span></span>
      <i className="arrow"><Arrow /><Arrow /></i>
    </Tag>
  )
}

// Heading word by word mela varum
export function Reveal({ text, as: Tag = 'h2', className }) {
  return (
    <Tag className={className} aria-label={text}>
      <motion.span aria-hidden="true" initial="hide" whileInView="show" viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.06 }} style={{ display: 'block' }}>
        {text.split(' ').map((w, i) => (
          <span key={i}><span className="mask"><motion.span variants={{ hide: { y: '110%' }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease }}>{w}</motion.span></span>{' '}</span>
        ))}
      </motion.span>
    </Tag>
  )
}
