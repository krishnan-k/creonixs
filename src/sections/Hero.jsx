import { motion } from 'motion/react'
import { me } from '../data'
import { Button, ease } from '../ui'

export default function Hero({ ready }) {
  const rise = (d) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, delay: d, ease } })
  return (
    <header className="hero">
      <h1 aria-label={me.headline.join(' ')}>
        {me.headline.map((line, l) => (
          <span key={l} className="line" aria-hidden="true">
            {[...line].map((ch, i) => (
              <motion.span key={i} className="ch" initial={{ y: '115%' }} animate={ready ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1 + l * 0.15 + i * 0.02, ease }}>
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>
      <motion.p {...rise(0.6)}>
        Creonixs creates <strong>ecommerce websites</strong> and <strong>Shopify themes</strong>, and helps you with{' '}
        <strong>installation, customization</strong> and <strong>bug fixes</strong>.
      </motion.p>
      <motion.div className="row" {...rise(0.75)}>
        <Button href="#/portfolio">View our work</Button>
        <Button ghost href="#/docs">Docs &amp; Support</Button>
      </motion.div>
    </header>
  )
}
