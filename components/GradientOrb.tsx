'use client'

interface GradientOrbProps {
  color1: string
  color2: string
  size?: number
  className?: string
  animationDelay?: string
  opacity?: number
}

export default function GradientOrb({
  color1,
  color2,
  size = 600,
  className = '',
  animationDelay = '0s',
  opacity = 0.45,
}: GradientOrbProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none animate-orb-drift ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 40% 40%, ${color1}, ${color2}, transparent 70%)`,
        filter: 'blur(80px)',
        opacity,
        animationDelay,
        willChange: 'transform',
      }}
    />
  )
}
