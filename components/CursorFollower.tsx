'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

function subscribeToHoverCapability(callback: () => void) {
  const mql = window.matchMedia('(hover: none)')
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false)
  const isTouchDevice = useSyncExternalStore(
    subscribeToHoverCapability,
    () => window.matchMedia('(hover: none)').matches,
    () => true
  )

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40 })

  const ringX = useSpring(mouseX, { stiffness: 200, damping: 30 })
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 30 })

  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 10 : 6,
            height: isHovering ? 10 : 6,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Larger ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full border border-clay/60"
          animate={{
            width: isHovering ? 52 : 36,
            height: isHovering ? 52 : 36,
            opacity: isHovering ? 0.9 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}
