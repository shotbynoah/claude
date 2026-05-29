import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import HlsVideo from './HlsVideo'

const ROLES = ['Creative', 'Fullstack', 'Founder', 'Scholar']
const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleKey, setRoleKey] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
        },
        0.3
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % ROLES.length)
      setRoleKey(k => k + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* HLS Video Background */}
      <HlsVideo
        src={HLS_SRC}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="name-reveal mb-6">
          <h1 className="text-6xl md:text-8xl lg:text-[clamp(4rem,12vw,9rem)] font-display font-normal leading-none text-text-primary">
            John Doe
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="blur-in flex items-center gap-3 text-lg md:text-xl text-muted">
            <span
              key={roleKey}
              className="animate-role-fade-in text-text-primary font-medium"
            >
              {ROLES[roleIndex]}
            </span>
            <span>·</span>
            <span>Designer &amp; Developer</span>
          </div>

          <p className="blur-in text-muted text-base md:text-lg max-w-lg leading-relaxed">
            Building digital experiences that blend artistry with engineering.
            Open to new projects and collaborations.
          </p>

          <div className="blur-in flex items-center gap-4 mt-4">
            <button
              onClick={scrollToWork}
              className="relative group px-6 py-3 rounded-full text-sm font-medium text-text-primary transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative">View Work</span>
            </button>
            <a
              href="mailto:hello@portfolio.dev"
              className="px-6 py-3 rounded-full text-sm font-medium text-muted border border-stroke hover:text-text-primary hover:border-text-primary/30 transition-all duration-300"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToWork}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-text-primary transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-8 bg-stroke overflow-hidden relative">
          <div className="absolute w-full h-full bg-text-primary animate-scroll-down" />
        </div>
      </button>
    </section>
  )
}
