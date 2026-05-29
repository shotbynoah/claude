'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import GradientOrb from '@/components/GradientOrb'
import MagneticButton from '@/components/MagneticButton'

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
)

interface FloatingLabelProps {
  label: string
  name: string
  type?: string
  required?: boolean
}

function FloatingInput({ label, name, type = 'text', required = false }: FloatingLabelProps) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-6 pb-2 rounded-xl text-sm outline-none transition-all duration-200 bg-transparent"
        style={{
          border: `1.5px solid ${focused ? '#C9956C' : 'rgba(255,255,255,0.2)'}`,
          color: '#2A2A2A',
          background: 'rgba(255,255,255,0.5)',
          boxShadow: focused ? '0 0 0 3px rgba(201,149,108,0.15)' : 'none',
        }}
      />
      <label
        className="absolute left-4 transition-all duration-200 pointer-events-none text-sm"
        style={{
          top: active ? '8px' : '50%',
          transform: active ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: active ? '10px' : '14px',
          color: focused ? '#C9956C' : '#9B6B45',
          opacity: active ? 1 : 0.7,
          fontWeight: active ? 600 : 400,
          letterSpacing: active ? '0.08em' : '0',
          textTransform: active ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        required={required}
        rows={5}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-8 pb-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none bg-transparent"
        style={{
          border: `1.5px solid ${focused ? '#C9956C' : 'rgba(255,255,255,0.2)'}`,
          color: '#2A2A2A',
          background: 'rgba(255,255,255,0.5)',
          boxShadow: focused ? '0 0 0 3px rgba(201,149,108,0.15)' : 'none',
        }}
      />
      <label
        className="absolute left-4 top-3 transition-all duration-200 pointer-events-none"
        style={{
          fontSize: active ? '10px' : '14px',
          color: focused ? '#C9956C' : '#9B6B45',
          opacity: active ? 1 : 0.7,
          fontWeight: active ? 600 : 400,
          letterSpacing: active ? '0.08em' : '0',
          textTransform: active ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  )
}

export default function ContactPage() {
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20"
        style={{ background: '#FAF7F2' }}
      >
        <GradientOrb color1="#8FA888" color2="#C8D5C0" size={700} className="top-[-20%] right-[-20%]" opacity={0.4} />
        <GradientOrb color1="#E8C4A8" color2="#C9956C" size={500} className="bottom-[-10%] left-[-15%]" opacity={0.3} animationDelay="3s" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium">Reach Out</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold italic mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
          >
            Let&apos;s Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: '#4A4A4A' }}
          >
            You don&apos;t have to navigate this alone. A simple message is all it takes to begin.
          </motion.p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Contact Form */}
          <AnimatedSection className="lg:col-span-3" direction="left">
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              }}
            >
              <h2
                className="text-2xl font-bold italic mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
              >
                Send Us a Message
              </h2>
              <p className="text-sm text-charcoal/50 mb-8">No commitment. Just a conversation.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #8FA888, #5C7A5E)' }}
                  >
                    ✓
                  </div>
                  <h3
                    className="text-2xl font-bold italic mb-3"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
                  >
                    Message Received
                  </h3>
                  <p className="text-charcoal/60">
                    We&apos;ll be in touch within 24 hours. Thank you for reaching out — it takes courage.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FloatingInput label="Your Name" name="name" required />
                    <FloatingInput label="Email Address" name="email" type="email" required />
                  </div>
                  <FloatingInput label="Phone (optional)" name="phone" type="tel" />
                  <FloatingTextarea label="What brings you here?" name="message" required />

                  {/* Contact method */}
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-charcoal/50 font-medium mb-3">Preferred Contact Method</p>
                    <div className="flex gap-4">
                      {(['email', 'phone'] as const).map(method => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setContactMethod(method)}
                          className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 capitalize"
                          style={{
                            background: contactMethod === method ? 'linear-gradient(135deg, #C9956C, #9B6B45)' : 'rgba(201,149,108,0.1)',
                            color: contactMethod === method ? '#FEFCF8' : '#9B6B45',
                            border: `1px solid ${contactMethod === method ? 'transparent' : 'rgba(201,149,108,0.3)'}`,
                          }}
                        >
                          {method === 'email' ? '✉ Email' : '☏ Phone'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <MagneticButton className="w-full">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 relative overflow-hidden"
                      style={{
                        background: loading ? '#8FA888' : 'linear-gradient(135deg, #C9956C, #9B6B45)',
                        color: '#FEFCF8',
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white inline-block"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          />
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Office Info */}
          <AnimatedSection className="lg:col-span-2" direction="right" delay={0.1}>
            <div className="space-y-6">
              <div>
                <h3
                  className="text-2xl font-bold italic mb-6"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
                >
                  Office Information
                </h3>
              </div>

              {[
                { icon: <PhoneIcon />, label: 'Phone', value: '(555) 867-5309' },
                { icon: <MailIcon />, label: 'Email', value: 'hello@totalspectrumcounseling.com' },
                { icon: <MapPinIcon />, label: 'Location', value: 'Available in-person and via telehealth throughout the region' },
                { icon: <ClockIcon />, label: 'Hours', value: 'Mon–Fri: 9am–7pm\nSat: 10am–3pm\nSun: Closed' },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex gap-4 p-5 rounded-2xl items-start"
                  style={{ background: '#FEFCF8', border: '1px solid rgba(232,196,168,0.3)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C9956C, #9B6B45)', color: '#FEFCF8' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-charcoal/40 font-medium mb-1">{item.label}</p>
                    <p className="text-sm text-charcoal/80 whitespace-pre-line leading-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}

              <div
                className="p-6 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(143,168,136,0.15), rgba(122,155,174,0.15))', border: '1px solid rgba(143,168,136,0.3)' }}
              >
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: '#5C7A5E' }}
                >
                  Free 15-Minute Consultation
                </p>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  Not sure where to start? We offer a complimentary introductory call to answer your questions and help you find the right fit.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="relative py-32 px-6 md:px-10 overflow-hidden"
        style={{ background: '#1A1A1A' }}
      >
        <GradientOrb color1="#8FA888" color2="#5C7A5E" size={600} className="top-[-20%] left-[-15%]" opacity={0.2} />
        <GradientOrb color1="#C9956C" color2="#9B6B45" size={500} className="bottom-[-15%] right-[-10%]" opacity={0.2} animationDelay="4s" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-xs uppercase tracking-[0.3em] text-clay/60 font-medium mb-4">Remember</p>
            <h2
              className="text-5xl md:text-6xl font-bold italic text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              You Are Not Alone
            </h2>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              Taking the first step is the bravest thing you can do. And we&apos;ll be right here to meet you.
            </p>
            <MagneticButton>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-10 py-5 rounded-full text-base font-semibold transition-all duration-200 inline-block hover:shadow-2xl hover:shadow-clay/30"
                style={{ background: 'linear-gradient(135deg, #C9956C, #9B6B45)', color: '#FEFCF8' }}
              >
                Book a Free Consultation
              </button>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
