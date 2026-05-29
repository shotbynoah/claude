'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection, { staggerContainer, staggerItem } from '@/components/AnimatedSection'
import GradientOrb from '@/components/GradientOrb'
import MagneticButton from '@/components/MagneticButton'

const services = [
  {
    name: 'Individual Therapy',
    shortDesc: 'One-on-one support tailored entirely to you.',
    fullDesc: 'Individual therapy is a collaborative journey between you and your therapist. We work together to understand patterns, process emotions, and build the tools you need to live a fuller, more authentic life. Sessions are tailored to your unique needs and goals — no templates, no one-size-fits-all.',
    gradient: 'linear-gradient(135deg, #8FA888, #5C7A5E)',
    icon: '◯',
  },
  {
    name: 'Couples Therapy',
    shortDesc: 'Rebuild connection and strengthen partnership.',
    fullDesc: 'Using evidence-based methods including the Gottman Method and Emotionally Focused Therapy, we help couples break cycles of disconnection and rediscover the foundation of their bond. Whether navigating conflict, intimacy challenges, or major life transitions, we\'re here to guide you.',
    gradient: 'linear-gradient(135deg, #C9956C, #9B6B45)',
    icon: '◎',
  },
  {
    name: 'Family Therapy',
    shortDesc: 'Nurture healthier dynamics for every member.',
    fullDesc: 'Families are complex systems — and sometimes those systems get stuck. Family therapy helps identify unhealthy patterns, improve communication, and create a home environment where every person feels heard, valued, and safe. We work with families in all forms and configurations.',
    gradient: 'linear-gradient(135deg, #7A9BAE, #4D7A91)',
    icon: '⬡',
  },
  {
    name: 'ADHD & Autism Support',
    shortDesc: 'Affirming care for neurodivergent minds.',
    fullDesc: 'Our neurodiversity-affirming approach means we never try to "fix" how you think. Instead, we work with your brain — building executive function strategies, exploring identity, processing late diagnoses, and helping you create systems and environments where you genuinely thrive.',
    gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    icon: '◈',
  },
  {
    name: 'Trauma Therapy',
    shortDesc: 'Gentle, evidence-based healing from past wounds.',
    fullDesc: 'Trauma doesn\'t have to define your future. Using EMDR, somatic experiencing, and trauma-focused CBT, our therapists help you process difficult experiences safely and at your own pace. We understand that healing isn\'t linear — and we meet you exactly where you are in your journey.',
    gradient: 'linear-gradient(135deg, #0D9488, #065F46)',
    icon: '✦',
  },
  {
    name: 'LGBTQIA+ Affirming',
    shortDesc: 'A safe, celebratory space for all identities.',
    fullDesc: 'Our practice isn\'t just "accepting" — it\'s actively affirming and celebratory of all sexual orientations, gender identities, and relationship structures. We have specialized expertise in gender dysphoria, coming out, family rejection, minority stress, and the particular joys and challenges of queer life.',
    gradient: 'linear-gradient(135deg, #EC4899, #F97316, #FACC15)',
    icon: '◇',
  },
  {
    name: 'Psychological Assessments',
    shortDesc: 'Comprehensive evaluations for deeper understanding.',
    fullDesc: 'Our assessments provide clarity. Whether you\'re seeking an ADHD diagnosis, autism evaluation, learning disability assessment, or broader psychological testing, our comprehensive evaluations offer actionable insights. We provide thorough reports with specific, practical recommendations.',
    gradient: 'linear-gradient(135deg, #4A4A4A, #2A2A2A)',
    icon: '◉',
  },
  {
    name: 'Child & Teen Counseling',
    shortDesc: 'Age-appropriate support for young minds.',
    fullDesc: 'Children and adolescents deserve therapists who truly understand their world. We use play therapy, expressive arts, and developmentally appropriate CBT to help young people navigate anxiety, depression, school challenges, family changes, bullying, identity questions, and more.',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    icon: '☽',
  },
]

const steps = [
  { num: '01', title: 'Reach Out', desc: 'Fill out a brief contact form — no pressure, no commitment. Just let us know a bit about what brings you here.' },
  { num: '02', title: 'Free Consultation', desc: 'A complimentary 15-minute call to see if we\'re a good fit. You can ask us anything, and we\'ll answer honestly.' },
  { num: '03', title: 'First Session', desc: 'Begin at your own pace, in your own way. The first session is just about getting to know each other.' },
  { num: '04', title: 'Ongoing Growth', desc: 'Regular sessions tailored to your evolving needs and goals, with flexibility built in throughout.' },
]

const faqs = [
  { q: 'Do you accept insurance?', a: 'We are an out-of-network provider for most insurance plans and can provide a superbill you can submit to your insurance for potential reimbursement. Many clients receive partial to full reimbursement through their out-of-network benefits. Please contact us and we\'ll help you understand your options.' },
  { q: 'How long are sessions?', a: 'Standard individual therapy sessions are 50 minutes. Couples and family sessions are typically 60-75 minutes. Psychological assessments are structured differently and may involve multiple sessions. We also offer extended 90-minute sessions when needed.' },
  { q: 'Do you offer virtual/telehealth sessions?', a: 'Yes — all of our therapists offer secure, HIPAA-compliant video sessions. Many clients choose telehealth for its convenience and comfort. Some prefer the in-person experience. We\'re happy to accommodate either, or a mix of both.' },
  { q: 'What\'s your cancellation policy?', a: 'We ask for 24 hours notice for cancellations. Late cancellations or no-shows may be charged a partial session fee. We understand life happens, and we try to be flexible — please just communicate with us as early as possible.' },
  { q: 'How do I know which therapist is right for me?', a: 'Our free 15-minute consultation is designed exactly for this. You\'ll get a sense of our style, ask questions, and we\'ll make sure we can actually meet your specific needs. If there\'s a mismatch, we\'ll help you find the right fit — even if it\'s outside our practice.' },
  { q: 'What if I\'ve had bad therapy experiences before?', a: 'We hear this often, and we take it seriously. Bad experiences — feeling judged, misunderstood, pushed too fast, or simply not clicking with a therapist — are more common than they should be. We go slowly, we listen carefully, and we ask for feedback regularly. You\'re always in the driver\'s seat.' },
  { q: 'Do you work with children?', a: 'Yes. Alex Chen specializes in child and adolescent therapy, working with children as young as 5 years old through young adults. We use play therapy, expressive arts, and developmentally appropriate techniques for younger clients.' },
  { q: 'What is a psychological assessment?', a: 'A psychological assessment is a thorough evaluation using standardized tests, clinical interviews, and observational data to understand how someone thinks, learns, and processes. Assessments can diagnose ADHD, autism, learning differences, and more — and they result in a detailed report with specific recommendations for support.' },
]

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20"
        style={{ background: '#1A1A1A' }}
      >
        <GradientOrb color1="#8FA888" color2="#5C7A5E" size={600} className="top-[-10%] left-[-15%]" opacity={0.3} />
        <GradientOrb color1="#7A9BAE" color2="#4D7A91" size={500} className="bottom-[-10%] right-[-10%]" opacity={0.25} animationDelay="4s" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium">What We Offer</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-bold italic text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="block text-5xl md:text-7xl">Therapy Tailored</span>
            <span
              className="block text-5xl md:text-7xl"
              style={{
                background: 'linear-gradient(135deg, #C9956C, #E8C4A8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              to Your Story
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-lg text-white/60"
          >
            Eight specialized services, one shared commitment: to meet you where you are.
          </motion.p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-scroll-bounce">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/30">
            <path d="M8 3L8 13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#FAF7F2' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-14 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold italic"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
            >
              Our Services
            </h2>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {services.map((s) => (
              <motion.div
                key={s.name}
                variants={staggerItem}
                whileHover={{ scale: 1.03, y: -6 }}
                className="rounded-2xl overflow-hidden group"
                style={{
                  background: '#FEFCF8',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  willChange: 'transform',
                }}
              >
                {/* Gradient top bar */}
                <div
                  className="h-2 transition-all duration-300 group-hover:h-3"
                  style={{ background: s.gradient }}
                />
                <div className="p-6">
                  <span className="text-3xl block mb-4 opacity-60">{s.icon}</span>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
                  >
                    {s.name}
                  </h3>
                  <p className="text-sm text-charcoal/60 mb-3 leading-relaxed">{s.shortDesc}</p>
                  <p className="text-sm leading-relaxed text-charcoal/50 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
                    {s.fullDesc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS — TIMELINE */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#2A2A2A' }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium block mb-3">The Process</span>
            <h2
              className="text-4xl md:text-5xl font-bold italic text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What to Expect
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute left-[28px] top-10 bottom-10 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, #C9956C, transparent)' }}
            />

            <div className="space-y-10">
              {steps.map((step, i) => (
                <AnimatedSection key={step.num} delay={i * 0.15} direction="left">
                  <div className="flex gap-8 items-start">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.2, type: 'spring' }}
                      className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: 'linear-gradient(135deg, #C9956C, #9B6B45)', color: '#FEFCF8' }}
                    >
                      {step.num}
                    </motion.div>
                    <div className="pt-3">
                      <h3
                        className="text-xl font-bold italic text-white mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="mb-14 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-clay/70 font-medium block mb-3">Common Questions</span>
            <h2
              className="text-4xl md:text-5xl font-bold italic"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2A2A2A' }}
            >
              FAQ
            </h2>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: '#FEFCF8', border: '1px solid rgba(232,196,168,0.3)' }}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors hover:bg-clay/5"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-charcoal pr-4">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-clay text-xl font-light"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-charcoal/70 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
              Ready to take the first step?
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Book a free 15-minute consultation — no commitment, just a conversation.
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
