import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Work', href: '#work' },
  { label: 'Journal', href: '#journal' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)

      const sections = ['hero', 'work', 'journal', 'explorations', 'stats']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-stroke shadow-lg' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo with gradient border */}
        <a href="#hero" onClick={e => smoothScroll(e, '#hero')}>
          <div className="group relative p-[2px] rounded-lg accent-gradient hover:opacity-90 transition-opacity">
            <div className="bg-bg rounded-[6px] px-3 py-1.5 group-hover:bg-surface transition-colors">
              <span className="text-sm font-semibold tracking-wide text-text-primary">
                Portfolio
              </span>
            </div>
          </div>
        </a>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => smoothScroll(e, link.href)}
                className={`text-sm transition-colors duration-200 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-text-primary'
                    : 'text-muted hover:text-text-primary'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Say hi button */}
        <a href="mailto:hello@portfolio.dev" className="relative group">
          <span className="absolute inset-[-2px] rounded-lg accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <span className="relative block text-sm px-4 py-2 rounded-lg border border-stroke text-text-primary group-hover:border-transparent transition-colors duration-300">
            Say hi
          </span>
        </a>
      </nav>
    </header>
  )
}
