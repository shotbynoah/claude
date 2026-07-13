'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import PhotoFrame from '@/components/PhotoFrame'
import { WORK, CATEGORIES, type WorkCategory } from '@/lib/work'

type Filter = 'All' | WorkCategory

export default function WorkPage() {
  const [filter, setFilter] = useState<Filter>('All')
  const items = filter === 'All' ? WORK : WORK.filter(w => w.category === filter)

  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="pt-40 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-ember text-xs uppercase tracking-[0.4em] mb-4">Portfolio</p>
            <h1 className="display-type text-bone text-6xl md:text-8xl">
              The <span className="text-outline">Work</span>
            </h1>
          </AnimatedSection>

          {/* Filters */}
          <AnimatedSection delay={0.15} className="mt-12 flex flex-wrap gap-3">
            {(['All', ...CATEGORIES] as Filter[]).map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-200 ${
                  filter === c
                    ? 'border-ember text-ember'
                    : 'border-bone/15 text-bone/50 hover:border-bone/40 hover:text-bone'
                }`}
              >
                {c}
              </button>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ============ GRID ============ */}
      <section className="pb-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
            <AnimatePresence mode="popLayout">
              {items.map(item => (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="break-inside-avoid"
                >
                  <PhotoFrame item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <p className="mt-14 text-center text-bone/30 text-sm">
            Full galleries available on request —{' '}
            <a href="mailto:noah.kissinger24@gmail.com" className="text-bone/50 hover:text-ember transition-colors">
              ask for the link
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
