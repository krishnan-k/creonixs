import { motion } from 'motion/react'
import { me } from '../data'
import { Reveal, ease } from '../ui'
import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section className="wrap contact-section" id="help">
      <div className="contact-head">
        <Reveal text="Contact us" />
        <p>Tell us what’s going on and we’ll get back to you.</p>
      </div>
      <div className="contact">
        <motion.div className="panel info" initial={{ opacity: 0, rotateY: 18, x: -40 }} whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px')
            e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px')
          }}>
          <h3>We’re here to help</h3>
          <p>Fill the form and your message reaches us by email. Please include your store link so we can check quickly.</p>
          <ul>
            <li>✉️ <a href={`mailto:${me.email}`}>{me.email}</a></li>
            <li>📍 {me.location}</li>
            <li>🕘 {me.hours}</li>
            <li>⚡ {me.reply}</li>
          </ul>
        </motion.div>
        <ContactForm />
      </div>
    </section>
  )
}