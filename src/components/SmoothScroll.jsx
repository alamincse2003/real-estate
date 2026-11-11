import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/** Lenis smooth scrolling, driven by the GSAP ticker and synced with ScrollTrigger. */
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis
    let rafId
    const onScroll = () => ScrollTrigger.update()
    const tick = (time) => lenis?.raf(time * 1000)

    const stop = () => {
      cancelAnimationFrame(rafId)
      gsap.ticker.remove(tick)
      if (lenis) {
        lenis.off('scroll', onScroll)
        lenis.destroy()
        lenis = undefined
      }
    }

    const start = () => {
      if (reducedMotion.matches || lenis) return
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false, anchors: true })
      lenis.on('scroll', onScroll)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      rafId = requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    const restart = () => {
      stop()
      start()
    }

    start()
    reducedMotion.addEventListener('change', restart)
    return () => {
      reducedMotion.removeEventListener('change', restart)
      stop()
    }
  }, [])

  return null
}
