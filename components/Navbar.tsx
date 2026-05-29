'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
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
        backgroundColor: scrolled ? 'rgba(26,26,26,0.85)' : 'rgba(26,26,26,0.2)',
        backdropFilter: 'blur(16px)',
        borderBottomColor: scrolled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
      }}
      style={{ borderBottom: '1px solid' }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <div className="flex flex-col leading-none">
            <span
              className="text-xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
            >
              Total Spectrum
            </span>
            <span className="text-[10px] text-clay/80 uppercase tracking-[0.2em] font-light">
              Counseling
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors duration-200 relative group ${
                pathname === link.href ? 'text-clay' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-clay"
                />
              )}
            </Link>
          ))}

          <MagneticButton>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #C9956C, #9B6B45)',
                color: '#FEFCF8',
              }}
            >
              Book Consultation
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
            className="w-6 h-px bg-white block"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
          />
          <motion.span
            className="w-6 h-px bg-white block"
            animate={{ opacity: menuOpen ? 0 : 1 }}
          />
          <motion.span
            className="w-6 h-px bg-white block"
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
            style={{ background: 'rgba(26,26,26,0.97)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg tracking-wide ${pathname === link.href ? 'text-clay' : 'text-white/80'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-6 py-3 rounded-full text-center text-sm font-medium"
                style={{ background: 'linear-gradient(135deg, #C9956C, #9B6B45)', color: '#FEFCF8' }}
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
