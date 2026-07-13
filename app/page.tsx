'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import MagneticButton from '@/components/MagneticButton'
import PhotoFrame from '@/components/PhotoFrame'
import { featured, CATEGORIES } from '@/lib/work'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const items = featured()

  return (
    <>
      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 70% at 50% 40%, rgba(255,107,44,0.06) 0%, transparent 55%), radial-gradient(120% 100% at 50% 100%, #000 0%, transparent 60%)',
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-ember text-xs md:text-sm uppercase tracking-[0.4em] mb-6"
          >
            Noah Kissinger — Photographer
          </motion.p>

          <h1 className="display-type text-bone text-[16vw] md:text-[11rem] leading-[0.85] select-none">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Shot
            </motion.span>
            <motion.span
              className="block text-outline"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              By
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Noah
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton>
              <Link
                href="/work"
                className="px-8 py-4 text-sm font-semibold uppercase tracking-wide inline-block transition-all hover:opacity-90"
                style={{ background: '#FF6B2C', color: '#0A0A0A' }}
              >
                View Work
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/contact"
                className="px-8 py-4 text-sm uppercase tracking-wide inline-block border border-bone/25 text-bone/80 hover:border-bone/60 hover:text-bone transition-all"
              >
                Book a Shoot
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bone/40">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="animate-scroll-bounce">↓</span>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <section
        className="py-6 overflow-hidden select-none"
        style={{ borderTop: '1px solid rgba(237,234,228,0.08)', borderBottom: '1px solid rgba(237,234,228,0.08)' }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map(copy => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {CATEGORIES.map(c => (
                <span key={`${copy}-${c}`} className="display-type text-3xl md:text-5xl text-bone/15 mx-6">
                  {c} <span className="text-ember/40">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURED WORK ============ */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="flex items-end justify-between mb-12">
            <div>
              <p className="text-ember text-xs uppercase tracking-[0.4em] mb-3">Selected Work</p>
              <h2 className="display-type text-bone text-4xl md:text-6xl">Recent Frames</h2>
            </div>
            <Link
              href="/work"
              className="hidden md:inline text-sm uppercase tracking-wide text-bone/50 hover:text-ember transition-colors"
            >
              All work →
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <AnimatedSection className="md:col-span-5" delay={0}>
              <PhotoFrame item={items[0]} priority />
            </AnimatedSection>
            <AnimatedSection className="md:col-span-7" delay={0.1}>
              <PhotoFrame item={items[1]} />
            </AnimatedSection>
            <AnimatedSection className="md:col-span-4" delay={0}>
              <PhotoFrame item={items[2]} />
            </AnimatedSection>
            <AnimatedSection className="md:col-span-4" delay={0.1}>
              <PhotoFrame item={items[3]} />
            </AnimatedSection>
            <AnimatedSection className="md:col-span-4" delay={0.2}>
              <PhotoFrame item={items[4]} />
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-10 text-center md:hidden">
            <Link href="/work" className="text-sm uppercase tracking-wide text-bone/50 hover:text-ember transition-colors">
              All work →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ ABOUT TEASER ============ */}
      <section className="py-24 md:py-32 px-6 md:px-10" style={{ background: '#141414' }}>
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-ember text-xs uppercase tracking-[0.4em] mb-6">Behind the Lens</p>
            <p className="display-type text-bone text-3xl md:text-5xl leading-tight normal-case">
              I chase light, honest moments, and the frame you didn&rsquo;t know you needed.
            </p>
            <Link
              href="/about"
              className="inline-block mt-10 text-sm uppercase tracking-wide text-bone/50 hover:text-ember transition-colors"
            >
              More about me →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-28 md:py-40 px-6 md:px-10 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(60% 80% at 50% 100%, rgba(255,107,44,0.12) 0%, transparent 70%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="display-type text-bone text-5xl md:text-8xl mb-8">
              Let&rsquo;s <span className="text-ember">Shoot.</span>
            </h2>
            <p className="text-bone-dim text-lg mb-10 max-w-xl mx-auto">
              Booking portraits, events, and editorial work. Tell me what you have in mind.
            </p>
            <MagneticButton>
              <Link
                href="/contact"
                className="px-10 py-5 text-sm font-semibold uppercase tracking-wide inline-block transition-all hover:opacity-90"
                style={{ background: '#FF6B2C', color: '#0A0A0A' }}
              >
                Get in Touch
              </Link>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
