import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  SECTION_ASSETS as A,
  testimonials,
  steps,
  services,
  features,
  posts,
} from '../data/content.js'
import Footer from './Footer.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

function ActionLink({ children, className = '', dark = false }) {
  return (
    <a className={`section-action ${dark ? 'section-action-light' : ''} ${className}`} href="#footer">
      <span>{children}</span>
      <ArrowIcon />
    </a>
  )
}

function WhyFind() {
  return (
    <section id="why-find" className="why-find section-light">
      <div className="page-container">
        <div className="why-find-intro section-grid">
          <h2 className="section-label">Why Nidus</h2>
          <p className="why-find-copy">
            Your life’s changing. Don’t just find a place — find what’s next.{' '}
            <span data-tone>
              We help you move forward with clarity, confidence, and the right agent by your side.
            </span>
          </p>
        </div>
        <div className="why-find-media" data-media-reveal>
          <video src={`${A}/why-us.mp4`} autoPlay playsInline loop muted preload="metadata" />
        </div>
      </div>
    </section>
  )
}

function Identity() {
  return (
    <section className="identity-section section-light">
      <div className="page-container identity-inner">
        <h2>
          This isn’t just <span data-tone>about real estate.</span>
        </h2>
        <div className="identity-arrows" aria-hidden="true" data-media-reveal>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`identity-arrow identity-arrow-${n}`}>
              <img src={`${A}/arrow-0${n}.jpg`} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <p>
          It’s about identity. Progress. Getting unstuck. You’re not just looking for a place.{' '}
          <span data-tone>You’re looking for alignment. That’s what we help you find.</span>
        </p>
      </div>
    </section>
  )
}

function Rewired() {
  return (
    <section id="search" className="rewired-section section-light">
      <div className="page-container section-grid rewired-grid">
        <div className="rewired-lead">
          <h2>
            Real Estate,
            <br />
            <span data-tone>Rewired.</span>
          </h2>
          <ActionLink>Start Your Search</ActionLink>
        </div>
        <div className="rewired-process">
          <p className="rewired-label">Steps:</p>
          <ol>
            {steps.map(([title, copy], i) => (
              <li key={title}>
                <span className="step-number">0{i + 1}</span>
                <p>
                  <strong>{title}</strong> <span data-tone>{copy}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Agents() {
  return (
    <section id="agents" className="agents-section section-light">
      <div className="page-container agents-grid">
        <div className="agents-aside">
          <p className="section-label">For Agents</p>
          <img src={`${A}/agents-small.jpg`} alt="Agent standing outside a modern building" loading="lazy" />
        </div>
        <div className="agents-content">
          <h2>
            Don’t Rent Your Career. <span data-tone>Own It.</span>
          </h2>
          <img
            className="agents-main-image"
            src={`${A}/agents-main.jpg`}
            alt="Homes surrounded by mature trees"
            loading="lazy"
            data-media-reveal
          />
          <p className="agents-copy">
            At Nidus Estate, our agents don’t just work for the brand—they own a part of it.{' '}
            <span data-tone>
              We give top performers real equity, so they’re invested in more than just your
              transaction—they're invested in your outcome. Agents are certified, supported, and
              equipped to deliver five-star service—because their success is tied to yours. You’re not
              just here to close deals — you’re building a career, a life, a legacy. We help agents
              find the company that gives them the support, tools, and leadership to thrive.
            </span>
          </p>
          <ActionLink>Join The Movement</ActionLink>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  return (
    <section className="testimonials-section">
      <div className="page-container">
        <h2>
          Don’t Take <span>Our Word for It.</span>
        </h2>
        <div className="testimonial-layout">
          <img
            className="testimonial-image"
            src={`${A}/testimonial.jpg`}
            alt="Two real estate clients talking over coffee"
            loading="lazy"
          />
          <div className="testimonial-panel" aria-live="polite">
            <div className="testimonial-controls">
              <div className="testimonial-pagination" aria-label="Choose testimonial">
                {testimonials.map((t, i) => (
                  <button
                    key={t.author}
                    type="button"
                    className={i === active ? 'is-active' : ''}
                    aria-label={`Show testimonial ${i + 1} by ${t.author}`}
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <span className="quote-mark" aria-hidden="true">
                ”
              </span>
            </div>
            <blockquote key={current.author}>{current.quote}</blockquote>
            <p className="testimonial-author">
              {current.author} <span>/</span> <span aria-label="Five stars">★★★★★</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="services-section dark-section">
      <div className="page-container services-heading section-grid">
        <p className="section-label">Services</p>
        <h2>
          How Nidus
          <br />
          <span data-tone>Can Help You</span>
        </h2>
      </div>
      <div className="service-list">
        {services.map((s) => (
          <a key={s.label} className={`service-row service-row-${s.number}`} href="#footer">
            <img src={`${A}/${s.image}`} alt="" loading="lazy" />
            <div className="page-container service-row-inner">
              <span className="service-number">{s.number}</span>
              <p>{s.copy}</p>
              <span className="service-name">{s.label}</span>
              {s.number === '3' && <ArrowIcon />}
            </div>
          </a>
        ))}
      </div>
      <div className="page-container service-closing">
        <p>
          Our certified agents guide you through every stage of real estate{' '}
          <span data-tone>with expert knowledge and reliable support.</span>
        </p>
        <ActionLink dark>Get Started with Nidus</ActionLink>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="features-section dark-section">
      <div className="page-container">
        <div className="features-intro section-grid">
          <h2>
            Support
            <br />
            Beyond{' '}
            <span data-tone>
              Buying
              <br />
              and Selling
            </span>
          </h2>
          <div>
            <p>
              The real estate market never stands still — and neither do we.{' '}
              <span data-tone>
                Our experts offer continued support beyond the sale, helping you maximize your
                investment.
              </span>
            </p>
            <ActionLink dark>Discover Our Services</ActionLink>
          </div>
        </div>
        <div className="feature-cards">
          {features.map((f) => (
            <article key={f.title} className="feature-card">
              <img src={`${A}/${f.image}`} alt={f.title} loading="lazy" />
              <div className="feature-card-content">
                <h3>{f.title}</h3>
                <p>{f.copy}</p>
                <a href="#footer">
                  Learn More <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Blog() {
  return (
    <section id="resources" className="blog-section">
      <div className="page-container">
        <div className="blog-intro section-grid">
          <h2>
            Blog &amp;
            <br />
            <span>Resources</span>
          </h2>
          <div>
            <p>See how we’ve helped clients achieve their real estate dreams, one successful move at a time.</p>
            <ActionLink>Visit Our Blog</ActionLink>
          </div>
        </div>
        <div className="post-list">
          {posts.map((post) => (
            <article key={post.title} className="post-item">
              <div className="post-copy">
                <time dateTime={post.date}>{post.date}</time>
                <h3>{post.title}</h3>
                <p>{post.copy}</p>
                <ActionLink className="section-action-outline">Read More</ActionLink>
              </div>
              <img src={`${A}/${post.image}`} alt={post.title} loading="lazy" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function OutroAndFooter() {
  return (
    <>
      <section className="outro-section">
        <img src={`${A}/outro-bg.jpg`} alt="" loading="lazy" />
        <div className="outro-content">
          <h2>Find You. We’ll Help You Get There.</h2>
          <ActionLink className="section-action-glass">Let’s Get Started</ActionLink>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default function LandingSections() {
  const scopeRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // Grey "toned" text darkens (or brightens on dark sections) as it scrolls through.
      gsap.utils.toArray('[data-tone]').forEach((el) => {
        const onDark = Boolean(el.closest('.dark-section'))
        gsap.to(el, {
          color: onDark ? '#ffffff' : '#151717',
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 15%', end: 'bottom -20%', scrub: 0.35 },
        })
      })

      // Media wipes in from the top as it enters the viewport.
      gsap.utils.toArray('[data-media-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 58%', scrub: 0.4 },
          },
        )
      })
    },
    { scope: scopeRef },
  )

  return (
    <div ref={scopeRef} className="landing-sections">
      <WhyFind />
      <Identity />
      <Rewired />
      <Agents />
      <Testimonials />
      <Services />
      <Features />
      <Blog />
      <OutroAndFooter />
    </div>
  )
}
