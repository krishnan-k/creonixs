import { useState } from 'react'
import { motion } from 'motion/react'
import { docs } from '../data'
import { Arrow, Reveal, ease } from '../ui'
import Cta from '../sections/Cta'

export default function Docs() {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const list = docs.filter((d) => !term || (d.title + ' ' + d.text + ' ' + d.tags.join(' ')).toLowerCase().includes(term))
  return (
    <>
      <section className="wrap docs-page">
        <div className="docs-head">
          <span className="docs-pill">Documentation</span>
          <Reveal as="h1" text="Pick your theme, find your guide" />
          <p>Step-by-step install, demo import and customization guides for every theme. Stuck on something? Contact us and we will help.</p>
          <label className="docs-search">
            <span className="sr">Search themes</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search themes..." />
          </label>
        </div>

        <div className="docs-grid">
          {list.map((d, i) => (
            <motion.a key={d.title} className="doc" href={d.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease }}>
              <div className="doc-img">
                <img src={d.image} alt={d.title.replace(' Docs', '') + ' theme preview'} width="800" height="800" loading="lazy" />
                <span className="doc-tag">Shopify Theme</span>
              </div>
              <div className="doc-body">
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                <div className="doc-foot">
                  <small>{d.tags.join(' • ')}</small>
                  <span className="doc-link">Read docs <i className="arrow"><Arrow size={14} /><Arrow size={14} /></i></span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        {!list.length && <p className="docs-empty">No theme found for “{q}”. Try another name or <a href="#help">contact us</a>.</p>}
      </section>
      <Cta />
    </>
  )
}
