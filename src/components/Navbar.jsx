import { useEffect, useRef, useState } from 'react'
import { brand, navLinks, contact } from '../data/content.js'
import LogoMark from './LogoMark.jsx'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 3.5h2.6l1.5 4-2 1.3a11 11 0 0 0 6.5 6.5l1.3-2 4 1.5v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })
  const linksRef = useRef(null)

  // Glass → solid after leaving the top; hide while scrolling down, reveal on scroll up.
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > window.innerHeight * 0.6)
        lastY = y
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const onResize = () => window.innerWidth > 900 && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const moveIndicator = (e) => {
    const link = e.currentTarget
    setIndicator({ left: link.offsetLeft, width: link.offsetWidth, visible: true })
  }

  const hideIndicator = () => setIndicator((prev) => ({ ...prev, visible: false }))

  const classes = [
    'navbar',
    scrolled && 'is-scrolled',
    hidden && !menuOpen && 'is-hidden',
    menuOpen && 'is-open',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={classes}>
      <div className="nav-pill">
        <a className="nav-brand" href="#top" aria-label={`${brand.name} ${brand.suffix} home`}>
          <LogoMark />
          <span className="nav-brand-text">
            {brand.name} <span>{brand.suffix}</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main menu" ref={linksRef} onMouseLeave={hideIndicator}>
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
            }}
          />
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onMouseEnter={moveIndicator} onFocus={moveIndicator} onBlur={hideIndicator}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-phone" href={contact.phoneHref} aria-label={`Call us at ${contact.phone}`}>
            <PhoneIcon />
          </a>
          <a className="nav-cta" href={brand.cta.href}>
            <span>{brand.cta.label}</span>
            <ArrowIcon />
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-panel"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="nav-panel" className="nav-panel" aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Mobile menu">
          {navLinks.map((link, i) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{ '--i': i }}>
              <span className="nav-panel-index">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-panel-footer">
          <a className="nav-cta" href={brand.cta.href} onClick={() => setMenuOpen(false)}>
            <span>{brand.cta.label}</span>
            <ArrowIcon />
          </a>
          <a className="nav-panel-phone" href={contact.phoneHref}>
            {contact.phone}
          </a>
        </div>
      </div>
    </header>
  )
}
