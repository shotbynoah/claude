'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100]"
      animate={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.88)' : 'rgba(10,10,10,0.2)',
        backdropFilter: 'blur(16px)',
        borderBottomColor: scrolled ? 'rgba(237,234,228,0.12)' : 'rgba(237,234,228,0.05)',
      }}
      style={{ borderBottom: '1px solid' }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="group">
          <span className="display-type text-lg text-bone">
            Shot<span className="text-ember">/</span>By<span className="text-ember">/</span>Noah
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide uppercase transition-colors duration-200 relative ${
                pathname === link.href ? 'text-ember' : 'text-bone/60 hover:text-bone'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-ember"
                />
              )}
            </Link>
          ))}

          <MagneticButton>
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-200 hover:opacity-90"
              style={{ background: '#FF6B2C', color: '#0A0A0A' }}
            >
              Book a Shoot
            </Link>
          </MagneticButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="w-6 h-px bg-bone block"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
          />
          <motion.span
            className="w-6 h-px bg-bone block"
            animate={{ opacity: menuOpen ? 0 : 1 }}
          />
          <motion.span
            className="w-6 h-px bg-bone block"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(10,10,10,0.97)', borderTop: '1px solid rgba(237,234,228,0.08)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg tracking-wide uppercase ${
                    pathname === link.href ? 'text-ember' : 'text-bone/80'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide"
                style={{ background: '#FF6B2C', color: '#0A0A0A' }}
              >
                Book a Shoot
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
