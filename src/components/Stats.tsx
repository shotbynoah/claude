import { motion } from 'framer-motion'

const STATS = [
  { value: '20+', label: 'Years Experience', description: 'Decades of crafting digital solutions' },
  { value: '95+', label: 'Projects Done', description: 'From MVPs to enterprise platforms' },
  { value: '200%', label: 'Satisfied Clients', description: 'Going above and beyond every time' },
]

export default function Stats() {
  return (
    <section id="stats" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stroke rounded-3xl overflow-hidden">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-surface p-10 md:p-14 flex flex-col gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <span className="text-5xl md:text-7xl font-display font-normal text-text-primary leading-none">
              {stat.value}
            </span>
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">{stat.label}</p>
              <p className="text-xs text-muted leading-relaxed">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
