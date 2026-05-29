import { motion } from 'framer-motion'

const ENTRIES = [
  {
    id: 1,
    title: 'The Art of Purposeful Whitespace in Modern UI',
    date: 'May 12, 2024',
    readTime: '5 min read',
    seed: 50,
    tags: ['Design', 'UI'],
  },
  {
    id: 2,
    title: 'Why I Moved My Stack to TypeScript + Bun',
    date: 'Apr 3, 2024',
    readTime: '8 min read',
    seed: 60,
    tags: ['Engineering', 'DX'],
  },
  {
    id: 3,
    title: 'Lessons from Shipping 10 Products in 12 Months',
    date: 'Mar 18, 2024',
    readTime: '12 min read',
    seed: 70,
    tags: ['Startup', 'Growth'],
  },
  {
    id: 4,
    title: 'GSAP vs Framer Motion: A Practical Breakdown',
    date: 'Feb 22, 2024',
    readTime: '6 min read',
    seed: 80,
    tags: ['Animation', 'Dev'],
  },
]

export default function Journal() {
  return (
    <section id="journal" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-3">Journal</p>
        <h2 className="text-4xl md:text-6xl font-display italic text-text-primary leading-none">
          Thoughts &amp; Writing
        </h2>
      </motion.div>

      {/* Entries as horizontal pills */}
      <div className="flex flex-col gap-3">
        {ENTRIES.map((entry, i) => (
          <motion.a
            key={entry.id}
            href="#"
            className="group flex items-center gap-5 p-4 md:p-5 rounded-2xl bg-surface border border-stroke hover:border-stroke/80 hover:bg-surface/80 transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Image thumbnail */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${entry.seed}/100/100`}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-medium text-text-primary group-hover:text-text-primary/90 transition-colors truncate">
                {entry.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted">{entry.date}</span>
                <span className="text-xs text-stroke">·</span>
                <span className="text-xs text-muted">{entry.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {entry.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full border border-stroke text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <span className="flex-shrink-0 text-muted group-hover:text-text-primary group-hover:translate-x-1 transition-all duration-300">
              →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
