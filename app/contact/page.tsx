'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import MagneticButton from '@/components/MagneticButton'

const EMAIL = 'noah.kissinger24@gmail.com'
const SHOOT_TYPES = ['Portraits', 'Event', 'Editorial', 'Prints / Licensing', 'Something else']

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-bone/50 text-[11px] uppercase tracking-[0.2em] mb-2">{children}</span>
  )
}

const inputClass =
  'w-full bg-transparent border border-bone/15 focus:border-ember text-bone px-4 py-3 text-sm outline-none transition-colors placeholder:text-bone/25'

export default function ContactPage() {
  const [opened, setOpened] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const from = String(data.get('email') || '')
    const type = String(data.get('type') || 'Shoot')
    const message = String(data.get('message') || '')

    const subject = encodeURIComponent(`Booking inquiry — ${type}${name ? ` (${name})` : ''}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${from ? `\n${from}` : ''}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setOpened(true)
  }

  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="pt-40 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-ember text-xs uppercase tracking-[0.4em] mb-4">Contact</p>
            <h1 className="display-type text-bone text-6xl md:text-8xl">
              Let&rsquo;s <span className="text-outline">Talk</span>
            </h1>
            <p className="text-bone-dim mt-6 max-w-lg">
              Booking shoots and collaborations. Tell me the idea, the date, and the vibe — I&rsquo;ll
              take it from there.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ FORM + DETAILS ============ */}
      <section className="pb-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Form */}
          <AnimatedSection className="md:col-span-7" delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="block">
                  <FieldLabel>Name</FieldLabel>
                  <input name="name" required className={inputClass} placeholder="Your name" />
                </label>
                <label className="block">
                  <FieldLabel>Email</FieldLabel>
                  <input
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block">
                <FieldLabel>What are we shooting?</FieldLabel>
                <select name="type" className={`${inputClass} appearance-none`} defaultValue={SHOOT_TYPES[0]}>
                  {SHOOT_TYPES.map(t => (
                    <option key={t} value={t} style={{ background: '#141414' }}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <FieldLabel>The idea</FieldLabel>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className={inputClass}
                  placeholder="Dates, location, references, mood — whatever you've got."
                />
              </label>

              <MagneticButton>
                <button
                  type="submit"
                  className="px-10 py-4 text-sm font-semibold uppercase tracking-wide transition-all hover:opacity-90"
                  style={{ background: '#FF6B2C', color: '#0A0A0A' }}
                >
                  Send It
                </button>
              </MagneticButton>

              {opened && (
                <p className="text-bone-dim text-sm">
                  Your email app should have opened with the message ready to send. If it
                  didn&rsquo;t, email me directly at{' '}
                  <a href={`mailto:${EMAIL}`} className="text-ember hover:underline">
                    {EMAIL}
                  </a>
                  .
                </p>
              )}
            </form>
          </AnimatedSection>

          {/* Direct details */}
          <AnimatedSection className="md:col-span-5" delay={0.2}>
            <div className="border border-bone/10 p-8">
              <h2 className="display-type text-bone text-2xl mb-8">Direct</h2>
              <ul className="space-y-6">
                <li>
                  <span className="block text-bone/40 text-[11px] uppercase tracking-[0.2em] mb-1">
                    Email
                  </span>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-bone hover:text-ember transition-colors break-all"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <span className="block text-bone/40 text-[11px] uppercase tracking-[0.2em] mb-1">
                    Instagram
                  </span>
                  <a
                    href="https://instagram.com/shotbynoah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone hover:text-ember transition-colors"
                  >
                    @shotbynoah
                  </a>
                </li>
                <li>
                  <span className="block text-bone/40 text-[11px] uppercase tracking-[0.2em] mb-1">
                    Response time
                  </span>
                  <span className="text-bone">Usually within 24 hours</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
