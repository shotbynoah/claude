import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HlsVideo from './HlsVideo'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const MARQUEE_TEXT = 'BUILDING THE FUTURE • '

const SOCIALS = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
]

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return

    const anim = gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      anim.kill()
    }
  }, [])

  return (
    <footer className="relative overflow-hidden bg-bg pt-0 pb-0">
      {/* Flipped video background */}
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo
          src={HLS_SRC}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-20"
          style={{ transform: 'translate(-50%, -50%) scaleY(-1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg/90" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden py-6 border-y border-stroke/30 mb-0">
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="text-sm md:text-base uppercase tracking-[0.2em] text-muted px-2"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* CTA */}
            <div>
              <h2 className="text-4xl md:text-6xl font-display italic text-text-primary leading-none mb-8">
                Let's build something great together.
              </h2>
              <a
                href="mailto:hello@portfolio.dev"
                className="relative group inline-flex items-center gap-3"
              >
                <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <span className="relative text-sm md:text-base px-6 py-3 rounded-full border border-stroke text-text-primary group-hover:border-transparent transition-colors duration-300">
                  hello@portfolio.dev
                </span>
                <span className="text-muted group-hover:text-text-primary group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </a>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-8 md:items-end">
              {/* Availability */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm text-muted">Available for projects</span>
              </div>

              {/* Social links */}
              <nav className="flex items-center gap-6 flex-wrap md:justify-end">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-text-primary transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-6 border-t border-stroke/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-muted">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </span>
            <span className="text-xs text-muted">
              Crafted with React, GSAP &amp; Framer Motion
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
