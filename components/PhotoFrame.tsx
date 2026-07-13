'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { WorkItem } from '@/lib/work'

interface PhotoFrameProps {
  item: WorkItem
  className?: string
  priority?: boolean
}

export default function PhotoFrame({ item, className = '', priority = false }: PhotoFrameProps) {
  return (
    <motion.figure
      className={`relative overflow-hidden rounded-sm group ${className}`}
      style={{ aspectRatio: item.ratio, background: item.tones[1] }}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {item.src ? (
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 120% at 30% 20%, ${item.tones[0]} 0%, ${item.tones[1]} 70%)`,
          }}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="frame-grain" />
          {/* viewfinder crosshair */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              stroke="rgba(237,234,228,0.25)"
              strokeWidth="1"
            >
              <circle cx="22" cy="22" r="14" />
              <line x1="22" y1="0" x2="22" y2="10" />
              <line x1="22" y1="34" x2="22" y2="44" />
              <line x1="0" y1="22" x2="10" y2="22" />
              <line x1="34" y1="22" x2="44" y2="22" />
            </svg>
          </div>
          <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] text-bone/25">
            {item.slug}.jpg
          </span>
        </motion.div>
      )}

      {/* caption */}
      <figcaption className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent">
        <div>
          <span className="block text-bone text-sm font-medium tracking-wide">{item.title}</span>
          <span className="block text-bone-dim text-[11px] uppercase tracking-[0.2em] mt-0.5">
            {item.category}
          </span>
        </div>
        <span className="text-bone-dim text-[11px] tabular-nums">{item.year}</span>
      </figcaption>
    </motion.figure>
  )
}
