import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HERO_IMAGES = [
  '/assets/hero-sky.webp',
  '/assets/hero-house.webp',
  '/assets/hero-cloud.webp',
  '/assets/hero-smoke.webp',
]

const TITLE_WORDS = ['Find', 'What', 'Moves', 'You']

function preloadImages() {
  return Promise.all(
    HERO_IMAGES.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = resolve
          img.src = src
        }),
    ),
  )
}

export default function Hero() {
  const shellRef = useRef(null)
  const stickyRef = useRef(null)
  const skyRef = useRef(null)
  const houseRef = useRef(null)
  const compositeHouseRef = useRef(null)
  const compositeRef = useRef(null)
  const cloudLeftRef = useRef(null)
  const cloudRightRef = useRef(null)
  const smokeRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const copyRef = useRef(null)
  const actionsRef = useRef(null)
  const outlineRef = useRef(null)

  const [ready, setReady] = useState(false)
  const [logoSvg, setLogoSvg] = useState('')

  // Wait for images, fonts and the inline logo SVG before animating.
  useEffect(() => {
    let active = true
    Promise.all([
      preloadImages(),
      document.fonts?.ready ?? Promise.resolve(),
      fetch('/assets/nidus-logo.svg').then((r) => r.text()),
    ]).then(([, , svg]) => {
      if (!active) return
      setLogoSvg(svg)
      setReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  useGSAP(
    () => {
      if (!ready || !logoSvg) return

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const outlinePaths = outlineRef.current.querySelectorAll('path')

      outlinePaths.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      })
      gsap.set(smokeRef.current, { yPercent: 70 })

      if (reducedMotion) {
        gsap.set(stickyRef.current, { autoAlpha: 1 })
        return
      }

      // Intro animation on load
      gsap
        .timeline({ defaults: { overwrite: 'auto' } })
        .fromTo(stickyRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0)
        .from(
          titleRef.current.querySelectorAll('.hero-word'),
          { yPercent: 115, duration: 1.25, stagger: 0.07, ease: 'expo.out' },
          0.12,
        )
        .from(
          [copyRef.current, actionsRef.current],
          { y: 28, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out' },
          0.35,
        )
        .from(skyRef.current, { scale: 1.1, duration: 5, ease: 'expo.out' }, 0)
        .from(cloudLeftRef.current, { yPercent: 50, duration: 3, ease: 'expo.out' }, 0)
        .from(cloudRightRef.current, { yPercent: 100, duration: 4, ease: 'expo.out' }, 0.1)
        .from(
          [houseRef.current, compositeHouseRef.current],
          { yPercent: 10, autoAlpha: 0, duration: 3, ease: 'expo.out' },
          0.2,
        )

      // Scroll-scrubbed transition: house rises, clouds part, logo outline draws,
      // then the house is revealed through the Nidus Estate logo mask.
      const scrollTl = gsap.timeline({ defaults: { ease: 'none' } })
      scrollTl
        .to([houseRef.current, compositeHouseRef.current], { yPercent: -40, scale: 1.3, duration: 1 }, 0)
        .to(smokeRef.current, { yPercent: 0, duration: 1 }, 0)
        .to(cloudLeftRef.current, { xPercent: -15, duration: 1 }, 0)
        .to(cloudRightRef.current, { xPercent: 15, duration: 1 }, 0)
        .to(contentRef.current, { yPercent: 20, scale: 0.9, duration: 1 }, 0)
        .to(contentRef.current, { autoAlpha: 0, duration: 0.2 }, 0)
        .to(outlineRef.current, { autoAlpha: 1, duration: 0.01 }, 0.1)
        .to(outlinePaths, { strokeDashoffset: 0, duration: 0.3 }, 0.1)
        .to(outlineRef.current, { autoAlpha: 0, duration: 0.2 }, 0.28)
        .to(compositeRef.current, { autoAlpha: 1, duration: 0.1 }, 0.3)
        .to(houseRef.current, { autoAlpha: 0, duration: 0.1 }, 0.3)

      ScrollTrigger.create({
        trigger: shellRef.current,
        animation: scrollTl,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.1,
        invalidateOnRefresh: true,
      })
    },
    { scope: shellRef, dependencies: [ready, logoSvg], revertOnUpdate: true },
  )

  return (
    <section ref={shellRef} className="hero-shell" aria-labelledby="hero-title">
      <div ref={stickyRef} className="hero-sticky">
        <div className="hero-background" aria-hidden="true">
          <div ref={skyRef} className="hero-sky">
            <img src="/assets/hero-sky.webp" alt="" />
          </div>

          <div ref={houseRef} className="hero-house hero-house-primary">
            <img src="/assets/hero-house.webp" alt="" />
          </div>

          <div ref={compositeRef} className="hero-composite">
            <div ref={compositeHouseRef} className="hero-house">
              <img src="/assets/hero-house.webp" alt="" />
            </div>
          </div>

          <div className="hero-clouds">
            <div ref={cloudLeftRef} className="hero-cloud hero-cloud-left">
              <img src="/assets/hero-cloud.webp" alt="" />
            </div>
            <div ref={cloudRightRef} className="hero-cloud hero-cloud-right">
              <img src="/assets/hero-cloud.webp" alt="" />
            </div>
          </div>

          <div
            ref={outlineRef}
            className="hero-outline-logo"
            dangerouslySetInnerHTML={{ __html: logoSvg }}
          />

          <div ref={smokeRef} className="hero-smoke">
            <img src="/assets/hero-smoke.webp" alt="" />
          </div>

          <div className="hero-bottom-fade" />
        </div>

        <div ref={contentRef} className="hero-content">
          <div className="hero-content-inner">
            <h1 ref={titleRef} id="hero-title" className="hero-title" aria-label="Find What Moves You">
              {TITLE_WORDS.map((word) => (
                <span key={word} className="hero-word-clip">
                  <span className="hero-word">{word}</span>
                </span>
              ))}
            </h1>

            <p ref={copyRef} className="hero-copy">
              Expert agents. <strong>Real guidance.</strong>{' '}
              <span>A clear path to find what’s next.</span>
            </p>

            <div ref={actionsRef} className="hero-actions">
              <a href="#why-find" className="hero-cta">
                <span>Find Properties</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-overlap" aria-hidden="true">
        <div className="hero-smoke hero-smoke-overlap">
          <img src="/assets/hero-smoke.webp" alt="" />
        </div>
        <div className="hero-overlap-fade" />
      </div>
    </section>
  )
}
