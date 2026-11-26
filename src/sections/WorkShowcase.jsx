import { motion } from 'motion/react'
import { workCards } from '../data'
import { Button, Reveal, ease } from '../ui'

// Screenshot mela mithakkura chinna UI panels
const panels = {
  sections: (
    <ul><li>Header</li><li className="on">Slideshow</li><li>Collections</li><li>Footer</li></ul>
  ),
  style: (
    <><span>Colours</span><div className="swatches">{['#1f4634', '#a67c45', '#e8590c', '#3448ff', '#111111'].map((c) => <i key={c} style={{ background: c }} />)}</div><span>Heading font</span><b>Aa Serif</b></>
  ),
  support: (
    <><span>Support request</span><b>Bug report</b><span>Screenshot attached</span><em>Reply within 24 hours</em></>
  ),
}

export default function WorkShowcase() {
  return (
    <section className="wrap showcase" id="work">
      <div className="showcase-head">
        <Reveal text="Work we do for your store" />
        <p>From the first setup to fixes after launch.</p>
      </div>
      <div className="showcase-grid">
        {workCards.map((c, i) => (
          <motion.article key={c.title} initial="rest" whileInView="show" whileHover="hover" viewport={{ once: true, amount: 0.3 }}
            variants={{ rest: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: i * 0.12, ease } } }}>
            <div className="art" style={{ background: c.color }} aria-hidden="true">
              <motion.img src={c.image} alt="" loading="lazy" variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.6, ease }} />
              <motion.div className={'chip ' + c.kind} variants={{ hover: { y: -12 } }} transition={{ duration: 0.5, ease }}>{panels[c.kind]}</motion.div>
            </div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </motion.article>
        ))}
      </div>
      <div className="more"><h3>Want to see the stores we have worked on?</h3><Button href="#/portfolio">View portfolio</Button></div>
    </section>
  )
}
