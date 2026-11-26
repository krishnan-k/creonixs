import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

const pageOf = (hash) => (hash.startsWith('#/portfolio') ? 'portfolio' : hash.startsWith('#/docs') ? 'docs' : 'home')
const titles = { portfolio: 'Portfolio | Creonixs', docs: 'Docs & Support | Creonixs', home: 'Creonixs' }

// Chinna hash router + smooth scroll. Server setting ethuvum thevai illa.
export function useRouter() {
  const [page, setPage] = useState(() => pageOf(location.hash))
  const lenis = useRef(null)
  const current = useRef(page)
  const pending = useRef(location.hash)

  const scrollToHash = (hash, immediate) => {
    const el = /^#[\w-]+$/.test(hash) && hash !== '#top' ? document.querySelector(hash) : null
    const y = el ? el.getBoundingClientRect().top + scrollY - 80 : 0
    if (lenis.current) { lenis.current.resize(); lenis.current.scrollTo(y, { immediate }) }
    else scrollTo(0, y)
  }

  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) lenis.current = new Lenis({ autoRaf: true, lerp: 0.09 })
    const go = (hash) => {
      const next = pageOf(hash)
      if (next === current.current) return scrollToHash(hash, false)
      current.current = next; pending.current = hash; setPage(next)
    }
    const click = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const hash = a.getAttribute('href')
      e.preventDefault()
      if (hash === '#top') return scrollToHash(hash, false) // same page la mela
      if (hash !== location.hash) history.pushState(null, '', hash)
      go(hash)
    }
    const back = () => go(location.hash)
    document.addEventListener('click', click)
    addEventListener('popstate', back)
    addEventListener('hashchange', back)
    return () => {
      document.removeEventListener('click', click)
      removeEventListener('popstate', back)
      removeEventListener('hashchange', back)
      lenis.current?.destroy(); lenis.current = null
    }
  }, [])

  // Pudhu page render aanadhum sariyaana edathuku scroll
  useEffect(() => {
    document.title = titles[page]
    const t = setTimeout(() => scrollToHash(pending.current, true), 60)
    return () => clearTimeout(t)
  }, [page])

  return page
}
