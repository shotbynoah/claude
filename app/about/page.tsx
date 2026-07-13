'use client'

import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import MagneticButton from '@/components/MagneticButton'

const PRINCIPLES = [
  {
    n: '01',
    title: 'Light first',
    body: 'Every frame starts with the light. I plan shoots around golden hour, neon, window light — whatever gives the image a pulse.',
  },
  {
    n: '02',
    title: 'Honest moments',
    body: 'The best shots are the ones nobody posed for. I keep sessions loose so the real thing has room to happen.',
  },
  {
    n: '03',
    title: 'Delivered, not dumped',
    body: 'You get a curated, edited gallery — every image color-graded and ready to post or print. No 400-photo data dumps.',
  },
]

const SERVICES = [
  { name: 'Portraits', detail: 'Individuals, couples, seniors, creatives' },
  { name: 'Events', detail: 'Weddings, parties, shows, launches' },
  { name: 'Editorial', detail: 'Lookbooks, brand shoots, product' },
  { name: 'Street & Travel', detail: 'Prints and licensing available' },
]

export default function AboutPage() {
  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="pt-40 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-ember text-xs uppercase tracking-[0.4em] mb-4">About</p>
            <h1 className="display-type text-bone text-5xl md:text-8xl leading-[0.9]">
              Noah <span className="text-outline">Kissinger</span>
            </h1>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-16 items-start">
            {/* Portrait placeholder — drop /public/about/portrait.jpg and swap this block for an <Image> */}
            <AnimatedSection className="md:col-span-5" delay={0.1}>
              <div
                className="relative overflow-hidden rounded-sm"
                style={{
                  aspectRatio: '4 / 5',
                  background: 'radial-gradient(120% 120% at 30% 20%, #2A2018 0%, #0C0906 70%)',
                }}
              >
                <div className="frame-grain" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-bone/25 text-xs uppercase tracking-[0.3em]">Self portrait</span>
                </div>
                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] text-bone/25">
                  portrait.jpg
                </span>
              </div>
            </AnimatedSection>

            {/* Bio */}
            <AnimatedSection className="md:col-span-7" delay={0.2}>
              <p className="text-bone text-xl md:text-2xl leading-relaxed">
                I&rsquo;m a photographer shooting portraits, events, and editorial work — the kind of
                images that feel like the moment did.
              </p>
              <p className="text-bone-dim leading-relaxed mt-6">
                What started as a camera and too many golden hours turned into shotbynoah: a practice
                built on chasing light, keeping people comfortable in front of the lens, and treating
                every gallery like it&rsquo;s going on a wall, not just a feed.
              </p>
              <p className="text-bone-dim leading-relaxed mt-4">
                When I&rsquo;m not on a shoot I&rsquo;m out walking with a camera anyway — most of the
                street and travel work here came from exactly that.
              </p>
              <div className="mt-10">
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="px-8 py-4 text-sm font-semibold uppercase tracking-wide inline-block transition-all hover:opacity-90"
                    style={{ background: '#FF6B2C', color: '#0A0A0A' }}
                  >
                    Work With Me
                  </Link>
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ PRINCIPLES ============ */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#141414' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="display-type text-bone text-4xl md:text-6xl mb-14">How I Shoot</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PRINCIPLES.map((p, i) => (
              <AnimatedSection key={p.n} delay={i * 0.1}>
                <span className="display-type text-ember/60 text-5xl">{p.n}</span>
                <h3 className="text-bone text-xl font-semibold mt-4 mb-3">{p.title}</h3>
                <p className="text-bone-dim leading-relaxed text-sm">{p.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="display-type text-bone text-4xl md:text-6xl mb-14">What I Book</h2>
          </AnimatedSection>
          <div>
            {SERVICES.map((s, i) => (
              <AnimatedSection key={s.name} delay={i * 0.05}>
                <Link
                  href="/contact"
                  className="group flex items-baseline justify-between py-6 transition-colors"
                  style={{ borderBottom: '1px solid rgba(237,234,228,0.1)' }}
                >
                  <span className="display-type text-bone/80 group-hover:text-ember text-2xl md:text-4xl transition-colors">
                    {s.name}
                  </span>
                  <span className="text-bone-dim text-sm text-right max-w-[50%]">{s.detail}</span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
