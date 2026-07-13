'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ParticleField from '@/components/ParticleField'
import GradientOrb from '@/components/GradientOrb'
import AnimatedSection, { staggerContainer, staggerItem } from '@/components/AnimatedSection'
import MagneticButton from '@/components/MagneticButton'

const services = [
  { name: 'Individual Therapy', desc: 'One-on-one support tailored to your unique journey', icon: '◯' },
  { name: 'Couples Therapy', desc: 'Rebuild connection and strengthen your partnership', icon: '◎' },
  { name: 'Family Therapy', desc: 'Nurture healthier dynamics for the whole family', icon: '⬡' },
  { name: 'ADHD & Autism Support', desc: 'Affirming care for neurodivergent minds', icon: '◈' },
  { name: 'Trauma Therapy', desc: 'Gentle, evidence-based healing from past wounds', icon: '✦' },
  { name: 'LGBTQIA+ Affirming', desc: 'A safe, celebratory space for all identities', icon: '◇' },
  { name: 'Psychological Assessments', desc: 'Comprehensive evaluations for deeper understanding', icon: '◉' },
  { name: 'Child & Teen Counseling', desc: 'Age-appropriate support for young minds', icon: '☽' },
]

const therapists = [
  {
    name: 'Dr. Sarah Mitchell',
    title: 'LPC',
    role: 'Individual & Trauma Therapy',
    specialties: ['Trauma', 'PTSD', 'Anxiety', 'Depression'],
    gradient: 'linear-gradient(135deg, #8FA888 0%, #5C7A5E 50%, #C8D5C0 100%)',
  },
  {
    name: 'Jordan Rivera',
    title: 'LMFT',
    role: 'Couples & Family Therapy',
    specialties: ['Relationships', 'Family Systems', 'Communication', 'Grief'],
    gradient: 'linear-gradient(135deg, #C9956C 0%, #9B6B45 50%, #E8C4A8 100%)',
  },
  {
    name: 'Alex Chen',
    title: 'LPC',
    role: 'ADHD, Autism & Youth Therapy',
    specialties: ['ADHD', 'Autism', 'Youth', 'Identity'],
    gradient: 'linear-gradient(135deg, #7A9BAE 0%, #4D7A91 50%, #B8C9D4 100%)',
  },
]

const testimonials = [
  {
    quote: 'For the first time, I felt truly seen. Not judged, not rushed — just understood.',
    initials: 'A.M.',
    offset: -24,
  },
  {
    quote: 'Total Spectrum helped me understand my ADHD as a strength, not a limitation.',
    initials: 'T.R.',
    offset: 16,
  },
  {
    quote: 'The most affirming space I\'ve found as a queer person seeking therapy.',
    initials: 'J.K.',
    offset: -8,
  },
]

const bentoCards = [
  {
    colSpan: 'md:col-span-2',
    bg: '#2A2A2A',
    textColor: 'white',
    isBig: true,
  },
  {
    title: 'Neurodiversity-Affirming',
    body: 'We celebrate all cognitive styles, embracing ADHD, autism, and unique ways of experiencing the world.',
    bg: '#8FA888',
    textColor: 'white',
  },
  {
    stat: '500+',
    statLabel: 'Clients Supported',
    bg: '#C9956C',
    textColor: 'white',
  },
  {
    title: 'Trauma-Informed Care',
    body: 'Every approach considers the nervous system, meeting you where you are with compassion and patience.',
    bg: '#7A9BAE',
    textColor: 'white',
  },
  {
    title: 'All Identities Welcome',
    body: 'LGBTQIA+ affirming. All genders, sexualities, backgrounds — welcomed without exception.',
    bg: '#F5F0E8',
    textColor: '#2A2A2A',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: '#1A1A1A' }}
      >
        <ParticleField />
        <GradientOrb color1="#8FA888" color2="#5C7A5E" size={700} className="top-[-10%] left-[-15%]" opacity={0.35} />
        <GradientOrb color1="#C9956C" color2="#9B6B45" size={550} className="bottom-[-5%] right-[-10%]" opacity={0.3} animationDelay="3s" />
        <GradientOrb color1="#7A9BAE" color2="#4D7A91" size={500} className="top-[20%] right-[10%]" opacity={0.25} animationDelay="6s" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span
              className="text-xs font-medium uppercase tracking-[0.35em]"
              style={{ color: '#7A9BAE' }}
            >
              Therapy &amp; Wellness
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="leading-none mb-6"
          >
            <span
              className="block text-5xl md:text-7xl lg:text-8xl font-bold italic text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              You Are
            </span>
            <span
              className="block text-7xl md:text-9xl lg:text-[11rem] font-bold italic"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, #C9956C, #E8C4A8, #9B6B45)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Whole.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Compassionate, neurodiversity-affirming therapy for individuals, couples, and families.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full text-base font-medium transition-all duration-200 hover:shadow-lg hover:shadow-clay/30"
                style={{
                  background: 'linear-gradient(135deg, #C9956C, #9B6B45)',
                  color: '#FEFCF8',
                }}
              >
                Begin Your Journey
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/about"
                className="px-8 py-4 rounded-full text-base font-medium text-white/80 hover:text-white transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.25)' }}
              >
                Learn More
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-bounce">
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/30">
            <path d="M8 3L8 13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* PHILOSOPHY — BENTO GRID */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#FAF7F2' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium">Our Philosophy</span>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {/* Big quote card */}
            <motion.div
              variants={staggerItem}
              className="md:col-span-2 rounded-3xl p-8 md:p-10 flex flex-col justify-end gradient-border"
              style={{ background: '#2A2A2A' }}
            >
              <p
                className="text-2xl md:text-3xl font-bold italic text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                &ldquo;Every mind deserves to be understood — not fixed.&rdquo;
              </p>
              <span className="mt-3 text-sm text-white/40">Total Spectrum Philosophy</span>
            </motion.div>

            {/* Neurodiversity */}
            <motion.div
              variants={staggerItem}
              className="rounded-3xl p-7 flex flex-col justify-end"
              style={{ background: '#8FA888' }}
            >
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Neurodiversity-Affirming
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                We celebrate ADHD, autism, and all cognitive styles as valid ways of being.
              </p>
            </motion.div>

            {/* Stat */}
            <motion.div
              variants={staggerItem}
              className="rounded-3xl p-7 flex flex-col justify-center items-center text-center"
              style={{ background: '#C9956C' }}
            >
              <span
                className="text-5xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                500+
              </span>
              <span className="text-white/80 text-sm mt-2 uppercase tracking-wide">Clients Supported</span>
            </motion.div>

            {/* Trauma */}
            <motion.div
              variants={staggerItem}
              className="rounded-3xl p-7 flex flex-col justify-end"
              style={{ background: '#7A9BAE' }}
            >
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Trauma-Informed Care
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Meeting your nervous system with patience, compassion, and evidence-based approaches.
              </p>
            </motion.div>

            {/* Inclusive */}
            <motion.div
              variants={staggerItem}
              className="rounded-3xl p-7 flex flex-col justify-end"
              style={{ background: '#F5F0E8', border: '1px solid #E8C4A8' }}
            >
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}>
                All Identities Welcome
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                LGBTQIA+ affirming. Every gender, sexuality, and background celebrated without exception.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#2A2A2A' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-14 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium block mb-3">Specialties</span>
            <h2
              className="text-4xl md:text-5xl font-bold italic text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How We Help
            </h2>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {services.map((service) => (
              <motion.div
                key={service.name}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-2xl p-6 glass group transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  willChange: 'transform',
                }}
              >
                <span className="text-2xl mb-4 block text-clay/70">{service.icon}</span>
                <h3 className="text-white font-semibold mb-2 text-base">{service.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                <div
                  className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'linear-gradient(90deg, #C9956C, transparent)' }}
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="mt-10 text-center" delay={0.2}>
            <Link
              href="/services"
              className="inline-block px-8 py-3.5 rounded-full text-sm font-medium text-white/80 hover:text-white transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
            >
              View All Services
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#FAF7F2' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-14 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium block mb-3">Our Practitioners</span>
            <h2
              className="text-4xl md:text-5xl font-bold italic"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
            >
              Meet the Therapists
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {therapists.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <motion.div
                  className="rounded-3xl overflow-hidden"
                  style={{ background: '#FEFCF8', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', willChange: 'transform' }}
                  whileHover={{ rotateY: 3, rotateX: -3, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Portrait area — gradient placeholder */}
                  <div
                    className="w-full"
                    style={{
                      aspectRatio: '3/4',
                      background: t.gradient,
                      maxHeight: 280,
                    }}
                  />
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-0.5"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
                    >
                      {t.name}, <span className="text-clay">{t.title}</span>
                    </h3>
                    <p className="text-sm text-charcoal-light/70 mb-4">{t.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.specialties.map(s => (
                        <span
                          key={s}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ background: '#F5F0E8', color: '#9B6B45', border: '1px solid #E8C4A8' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center" delay={0.3}>
            <Link
              href="/about"
              className="inline-block px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #C9956C, #9B6B45)',
                color: '#FEFCF8',
              }}
            >
              Meet the Full Team
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-28 px-6 md:px-10 overflow-hidden" style={{ background: '#1A1A1A' }}>
        <GradientOrb color1="#8FA888" color2="#5C7A5E" size={600} className="top-0 left-[-20%]" opacity={0.2} />
        <GradientOrb color1="#C9956C" color2="#9B6B45" size={500} className="bottom-0 right-[-15%]" opacity={0.2} animationDelay="4s" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium block mb-3">Testimonials</span>
            <h2
              className="text-4xl md:text-5xl font-bold italic text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Our Clients Say
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="animate-float rounded-2xl p-8 glass"
                style={{
                  animationDelay: `${i * 1.2}s`,
                  marginTop: t.offset,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  willChange: 'transform',
                }}
              >
                <span
                  className="text-6xl leading-none block mb-4"
                  style={{ color: '#C9956C', fontFamily: "'Playfair Display', serif", opacity: 0.5 }}
                >
                  &ldquo;
                </span>
                <p className="text-white/80 italic leading-relaxed text-base mb-6">
                  {t.quote}
                </p>
                <span className="text-white/30 text-sm">— {t.initials}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="relative py-32 px-6 md:px-10 overflow-hidden animate-gradient-shift"
        style={{
          background: 'linear-gradient(135deg, #8FA888, #C9956C, #7A9BAE, #8FA888)',
          backgroundSize: '300% 300%',
        }}
      >
        <div className="grain-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.06 }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold italic text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Begin?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 text-lg mb-10"
          >
            Your journey toward healing starts with a single conversation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <MagneticButton>
              <Link
                href="/contact"
                className="px-10 py-5 rounded-full text-base font-semibold transition-all duration-200 hover:shadow-2xl"
                style={{ background: '#FEFCF8', color: '#2A2A2A' }}
              >
                Book a Free Consultation
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
