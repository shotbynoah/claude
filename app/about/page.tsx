'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection, { staggerContainer, staggerItem } from '@/components/AnimatedSection'
import GradientOrb from '@/components/GradientOrb'
import MagneticButton from '@/components/MagneticButton'

const philosophyItems = [
  {
    title: 'Neurodiversity-Affirming',
    body: 'We don\'t see ADHD, autism, dyslexia, or any other neurological difference as disorders to fix. We see them as valid, beautiful ways of experiencing the world — and we\'re here to help you lean into your strengths.',
    gradient: 'linear-gradient(135deg, #8FA888, #5C7A5E)',
    direction: 'left' as const,
  },
  {
    title: 'Trauma-Informed',
    body: 'Every approach we take considers the profound impact of trauma on the nervous system, on relationships, and on self-perception. We meet you where you are — with patience, gentleness, and deep respect.',
    gradient: 'linear-gradient(135deg, #C9956C, #9B6B45)',
    direction: 'right' as const,
  },
  {
    title: 'Inclusive & Affirming',
    body: 'All genders, sexualities, cultural backgrounds, and family structures are welcomed without exception. Our space is one of celebration, not just tolerance — because everyone deserves to feel at home.',
    gradient: 'linear-gradient(135deg, #7A9BAE, #4D7A91)',
    direction: 'left' as const,
  },
  {
    title: 'Evidence-Based Practice',
    body: 'We draw from CBT, DBT, EMDR, somatic approaches, and the latest research in mental health — always tailored to you, never applied from a template.',
    gradient: 'linear-gradient(135deg, #4A4A4A, #2A2A2A)',
    direction: 'right' as const,
  },
]

const therapists = [
  {
    name: 'Dr. Sarah Mitchell',
    title: 'LPC, PhD',
    role: 'Individual & Trauma Therapy',
    specialties: ['Trauma', 'PTSD', 'Anxiety', 'Depression', 'EMDR'],
    bio: 'Dr. Mitchell brings over 15 years of experience in trauma-focused therapy. She completed her doctorate at NYU and trained extensively in EMDR, somatic therapies, and attachment-based approaches. She is passionate about helping survivors reclaim their narratives and reconnect with their innate wholeness.',
    note: '"Every person who walks through my door carries wisdom about their own healing — my job is to help them access it."',
    gradient: 'linear-gradient(135deg, #8FA888 0%, #5C7A5E 40%, #C8D5C0 100%)',
  },
  {
    name: 'Jordan Rivera',
    title: 'LMFT',
    role: 'Couples & Family Therapy',
    specialties: ['Relationships', 'Family Systems', 'Communication', 'Grief', 'Gottman Method'],
    bio: 'Jordan is a licensed Marriage and Family Therapist with deep expertise in relational dynamics. Using the Gottman Method and Emotionally Focused Therapy, Jordan helps couples and families break destructive patterns and build authentic connection. Jordan holds a special place for multicultural families navigating complex identity questions.',
    note: '"Relationships are where we grow. They can also be where we hurt most — I help people do both with more grace."',
    gradient: 'linear-gradient(135deg, #C9956C 0%, #9B6B45 40%, #E8C4A8 100%)',
  },
  {
    name: 'Alex Chen',
    title: 'LPC',
    role: 'ADHD, Autism & Youth Therapy',
    specialties: ['ADHD', 'Autism Spectrum', 'Youth Counseling', 'Identity', 'Executive Function'],
    bio: 'Alex specializes in neurodivergent-affirming therapy for children, teens, and young adults. Diagnosed with ADHD themselves, Alex brings both professional expertise and genuine lived experience to the therapy room. They work from a strengths-based framework, helping clients discover the power in how they think.',
    note: '"Your brain isn\'t broken. It\'s wired differently — and that difference can be your greatest asset."',
    gradient: 'linear-gradient(135deg, #7A9BAE 0%, #4D7A91 40%, #B8C9D4 100%)',
  },
]

const envFeatures = [
  { title: 'Private & Confidential', desc: 'Your story stays within our walls. HIPAA-compliant systems, strict confidentiality, and your safety always first.', icon: '🔒' },
  { title: 'Virtual & In-Person', desc: 'Attend from the comfort of home via secure video sessions, or visit our warm, carefully designed physical office.', icon: '🌐' },
  { title: 'Flexible Scheduling', desc: 'Evenings, early mornings, weekends — we work around your life so that getting support doesn\'t become another stressor.', icon: '📅' },
]

const heroWords = ['We believe', 'healing', 'begins with', 'being', 'truly seen.']

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{ background: '#1A1A1A' }}
      >
        <GradientOrb color1="#8FA888" color2="#5C7A5E" size={700} className="top-[-20%] right-[-10%]" opacity={0.3} />
        <GradientOrb color1="#C9956C" color2="#9B6B45" size={500} className="bottom-[-10%] left-[-15%]" opacity={0.25} animationDelay="5s" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium">Our Story</span>
          </motion.div>

          <div className="overflow-hidden">
            {[
              { text: 'We believe healing', italic: false, size: 'text-4xl md:text-6xl' },
              { text: 'begins with being', italic: true, size: 'text-4xl md:text-6xl' },
              { text: 'truly seen.', italic: true, gradient: true, size: 'text-5xl md:text-7xl' },
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span
                  className={`block font-bold leading-tight ${line.size} ${line.italic ? 'italic' : ''}`}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    ...(line.gradient
                      ? {
                          background: 'linear-gradient(135deg, #C9956C, #E8C4A8, #9B6B45)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : { color: '#FEFCF8' }),
                  }}
                >
                  {line.text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-8 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Total Spectrum Counseling was founded on a simple conviction: that every human being, regardless of how they think, who they love, or where they come from, deserves care that meets them exactly where they are.
          </motion.p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#FAF7F2' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium block mb-3">What We Stand For</span>
            <h2
              className="text-4xl md:text-5xl font-bold italic"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
            >
              Our Approach
            </h2>
          </AnimatedSection>

          <div className="space-y-16">
            {philosophyItems.map((item, i) => (
              <AnimatedSection
                key={item.title}
                direction={item.direction}
                delay={0.1}
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                  {/* Text */}
                  <div className="space-y-4">
                    <h3
                      className="text-3xl font-bold italic"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#4A4A4A' }}>
                      {item.body}
                    </p>
                  </div>
                  {/* Abstract gradient art */}
                  <div
                    className="w-full rounded-3xl"
                    style={{
                      aspectRatio: '4/3',
                      background: item.gradient,
                      opacity: 0.85,
                    }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM — EXPANDED */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#2A2A2A' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium block mb-3">The Team</span>
            <h2
              className="text-4xl md:text-5xl font-bold italic text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Therapists
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {therapists.map((t, i) => (
              <AnimatedSection key={t.name} delay={0.1}>
                <motion.div
                  className="rounded-3xl overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`grid grid-cols-1 md:grid-cols-3 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                    {/* Portrait */}
                    <div
                      style={{
                        background: t.gradient,
                        minHeight: 300,
                      }}
                    />
                    {/* Bio */}
                    <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
                      <h3
                        className="text-2xl font-bold italic text-white mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {t.name}, <span style={{ color: '#C9956C' }}>{t.title}</span>
                      </h3>
                      <p className="text-sm text-white/50 mb-4">{t.role}</p>
                      <p className="text-white/70 leading-relaxed mb-6">{t.bio}</p>
                      <blockquote
                        className="italic text-white/60 text-sm border-l-2 pl-4"
                        style={{ borderColor: '#C9956C' }}
                      >
                        {t.note}
                      </blockquote>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {t.specialties.map(s => (
                          <span
                            key={s}
                            className="text-xs px-3 py-1 rounded-full"
                            style={{ background: 'rgba(201,149,108,0.15)', color: '#E8C4A8', border: '1px solid rgba(201,149,108,0.3)' }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ENVIRONMENT */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-14 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium block mb-3">The Space</span>
            <h2
              className="text-4xl md:text-5xl font-bold italic mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
            >
              A Space Designed for You
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#4A4A4A' }}>
              From the moment you arrive — physically or virtually — every detail has been considered to help you feel safe, seen, and at ease.
            </p>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {envFeatures.map(f => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="rounded-3xl p-8"
                style={{ background: '#FEFCF8', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(232,196,168,0.3)' }}
              >
                <span className="text-3xl block mb-5">{f.icon}</span>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
                >
                  {f.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#4A4A4A' }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#1A1A1A' }}>
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-4xl md:text-5xl font-bold italic text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let&apos;s start this journey together.
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Reaching out is the first and bravest step. We&apos;re here when you&apos;re ready.
            </p>
            <MagneticButton>
              <Link
                href="/contact"
                className="px-10 py-5 rounded-full text-base font-semibold transition-all duration-200 inline-block"
                style={{ background: 'linear-gradient(135deg, #C9956C, #9B6B45)', color: '#FEFCF8' }}
              >
                Book a Free Consultation
              </Link>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
