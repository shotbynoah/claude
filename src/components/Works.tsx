import { motion } from 'framer-motion'

const WORKS = [
  {
    id: 1,
    title: 'Luminary Brand System',
    category: 'Branding',
    year: '2024',
    seed: 10,
    span: 'col-span-12 md:col-span-7',
  },
  {
    id: 2,
    title: 'Orbit SaaS Dashboard',
    category: 'Product Design',
    year: '2024',
    seed: 20,
    span: 'col-span-12 md:col-span-5',
  },
  {
    id: 3,
    title: 'Pulse Motion Studio',
    category: 'Motion & 3D',
    year: '2023',
    seed: 30,
    span: 'col-span-12 md:col-span-5',
  },
  {
    id: 4,
    title: 'Terrain E-commerce',
    category: 'Web Development',
    year: '2023',
    seed: 40,
    span: 'col-span-12 md:col-span-7',
  },
]

const halftoneStyle = {
  backgroundImage:
    'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
  backgroundSize: '6px 6px',
}

export default function Works() {
  return (
    <section id="work" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-16 flex items-end justify-between"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-3">Selected Work</p>
          <h2 className="text-4xl md:text-6xl font-display italic text-text-primary leading-none">
            Recent Projects
          </h2>
        </div>
        <a
          href="#"
          className="hidden md:inline-flex text-sm text-muted hover:text-text-primary transition-colors gap-2 items-center"
        >
          All projects
          <span aria-hidden>→</span>
        </a>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-4">
        {WORKS.map((work, i) => (
          <motion.div
            key={work.id}
            className={`${work.span} group relative overflow-hidden rounded-3xl bg-surface border border-stroke cursor-pointer`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${work.seed}/800/600`}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Halftone overlay */}
              <div className="absolute inset-0 pointer-events-none" style={halftoneStyle} />
              {/* Dark hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              {/* Category pill */}
              <div className="absolute top-4 left-4">
                <span className="relative inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full bg-bg/80 backdrop-blur-sm text-text-primary border border-stroke/50 overflow-hidden">
                  <span className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <span className="relative">{work.category}</span>
                </span>
              </div>
            </div>

            {/* Card footer */}
            <div className="p-5 flex items-center justify-between">
              <h3 className="text-sm md:text-base font-medium text-text-primary">
                {work.title}
              </h3>
              <span className="text-xs text-muted">{work.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
