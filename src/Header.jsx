import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'motion/react'
import { me, menu } from './data'
import Logo from './Logo'
import { Button, ease } from './ui'

export default function Header({ page }) {
  const { scrollYProgress } = useScroll()
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  const drawer = useRef(null)

  useEffect(() => {
    if (!open) return
    const button = toggle.current
    document.documentElement.style.overflow = 'hidden'
    drawer.current.querySelector('button').focus()
    const key = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key !== 'Tab') return
      const items = drawer.current.querySelectorAll('a,button')
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    addEventListener('keydown', key)
    return () => {
      removeEventListener('keydown', key)
      document.documentElement.style.overflow = ''
      button.focus({ preventScroll: true })
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.div className="bar" style={{ scaleX: scrollYProgress }} />
      {/* Page mela naduvula logo */}
      <div className="top-logo"><Logo stacked /></div>

      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="drawer" onClick={() => setOpen(true)}>
        <i aria-hidden="true" /><span>Menu</span>
      </button>
      <a className="top-cta" href="#help">Contact us</a>
      <a className="help-fab" href="#help" aria-label="Need help?"><b aria-hidden="true">?</b>Need help?</a>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="overlay" data-lenis-prevent onClick={close}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside ref={drawer} id="drawer" className="drawer" role="dialog" aria-modal="true" aria-label="Menu" data-lenis-prevent
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.55, ease }}>
              <div className="drawer-head">
                <span onClick={close}><Logo /></span>
                <button className="close" aria-label="Close menu" onClick={close}>✕</button>
              </div>
              <ul>
                {menu.map((m, i) => (
                  <motion.li key={m.label} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease }}>
                    <a href={m.url} aria-current={m.url === '#/' + page ? 'page' : undefined} onClick={close}>{m.label}</a>
                  </motion.li>
                ))}
              </ul>
              <Button href="#help" onClick={close}>Contact us</Button>
              <a className="mail" href={`mailto:${me.email}`}>{me.email}</a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
