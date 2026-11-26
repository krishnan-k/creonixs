import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { faqs } from '../data'
import { Reveal, ease } from '../ui'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="wrap split faq" id="faq">
      <div className="sticky"><span className="icon" aria-hidden="true">?</span><Reveal text="FAQs" /></div>
      <ul>
        {faqs.map(([q, a], i) => (
          <li key={q} className={open === i ? 'open' : ''}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><i /></button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} style={{ overflow: 'hidden' }}>
                  <p>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </section>
  )
}
