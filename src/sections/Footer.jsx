import { me, menu } from '../data'
import Logo from '../Logo'

export default function Footer() {
  return (
    <footer className="wrap">
      <div className="foot">
        <Logo />
        <div className="foot-right">
          <ul className="foot-menu">{menu.map((m) => <li key={m.label}><a href={m.url}>{m.label}</a></li>)}</ul>
          <address>
            <span>{me.location}</span>
            <a href={`mailto:${me.email}`}>{me.email}</a>
            <span>{me.hours}</span>
          </address>
          <ul className="foot-social">
            {me.socials.map((s) => <li key={s.label}><a href={s.url} target={s.url === '#' ? undefined : '_blank'} rel="noreferrer">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="legal"><span>© {new Date().getFullYear()} {me.name}. All rights reserved.</span><a href="#top">Back to top ↑</a></div>
    </footer>
  )
}
