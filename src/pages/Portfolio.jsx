import { projects } from '../data'
import { Reveal } from '../ui'
import WorkCard from '../WorkCard'
import Cta from '../sections/Cta'

export default function Portfolio() {
  return (
    <>
      <section className="wrap portfolio">
        <div className="portfolio-head">
          <Reveal as="h1" text="Recent works" />
          <p>Online stores and websites from Creonixs. Open any project to visit the live store.</p>
        </div>
        <div className="grid">{projects.map((p, i) => <WorkCard key={p.title} p={p} index={i} />)}</div>
      </section>
      <Cta />
    </>
  )
}
