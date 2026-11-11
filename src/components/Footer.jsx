import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { brand, contact, footer } from '../data/content.js'
import LogoMark from './LogoMark.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SOCIAL_ICONS = {
  Facebook: <path d="M15.5 3.5h-2.2a4 4 0 0 0-4 4V10H7v3.5h2.3V21h3.5v-7.5h2.5l.5-3.5h-3V8a1 1 0 0 1 1-1h1.7z" />,
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.4" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13a2.5 2.5 0 0 1 5 0v3" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" />
    </>
  ),
}

function ArrowIcon({ up = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={up ? { transform: 'rotate(-90deg)' } : undefined}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function Newsletter() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // Hook this up to your email provider (Brevo, Mailchimp, etc.).
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <div className="footer-newsletter">
      <h3>{footer.newsletter.title}</h3>
      <p>{footer.newsletter.copy}</p>
      <form onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <div className="footer-field">
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Your email address"
            autoComplete="email"
            onChange={() => sent && setSent(false)}
          />
          <button type="submit">
            <span>Subscribe</span>
            <ArrowIcon />
          </button>
        </div>
        <p className="footer-form-status" role="status">
          {sent ? 'Thanks — you’re on the list.' : ''}
        </p>
      </form>
    </div>
  )
}

export default function Footer() {
  const footerRef = useRef(null)
  const wordmark = `${brand.name} ${brand.suffix}`

  // Wordmark letters rise into place as the footer scrolls into view.
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.footer-wordmark-char', {
        yPercent: 105,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: '.footer-wordmark',
          start: 'top bottom',
          end: 'bottom 92%',
          scrub: 0.6,
        },
      })
    },
    { scope: footerRef },
  )

  return (
    <footer id="footer" ref={footerRef} className="site-footer">
      <div className="page-container">
        <div className="footer-top">
          <h2 className="footer-headline">
            {footer.headline[0]} <span>{footer.headline[1]}</span>
          </h2>
          <Newsletter />
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-logo" href="#top" aria-label={`${wordmark} home`}>
              <LogoMark className="footer-logo-mark" />
              <span>
                {brand.name} <span>{brand.suffix}</span>
              </span>
            </a>
            <p>{footer.tagline}</p>
            <div className="footer-socials">
              {footer.socials.map((s) => (
                <a key={s.name} href={s.href} aria-label={s.name}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {SOCIAL_ICONS[s.name]}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} className="footer-col" aria-label={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <address className="footer-col footer-contact">
            <h4>Get in touch</h4>
            <a className="footer-contact-big" href={contact.phoneHref}>
              {contact.phone}
            </a>
            <a className="footer-contact-big" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <p>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="footer-hours">{contact.hours}</p>
          </address>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          {[...wordmark].map((char, i) => (
            <span key={i} className="footer-wordmark-char">
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {wordmark}. All rights reserved.
          </p>
          <nav className="footer-legal" aria-label="Legal">
            {footer.legal.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="footer-top-link" href="#top">
            Back to top
            <span>
              <ArrowIcon up />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
