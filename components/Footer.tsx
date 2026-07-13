'use client'

import Link from 'next/link'

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 6 10-6"/>
  </svg>
)

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,107,44,0.25)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="display-type text-2xl text-bone">
              Shot<span className="text-ember">/</span>By<span className="text-ember">/</span>Noah
            </span>
            <p className="text-bone-dim text-sm leading-relaxed max-w-xs mt-4">
              Photography by Noah Kissinger. Portraits, events, editorial, and street — available for
              bookings and collaborations.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/shotbynoah"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-bone/40 hover:text-ember transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="mailto:noah.kissinger24@gmail.com"
                aria-label="Email"
                className="text-bone/40 hover:text-ember transition-colors"
              >
                <MailIcon />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-bone/80 text-xs uppercase tracking-[0.2em] font-medium mb-4">Pages</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/work', 'Work'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-bone/40 hover:text-bone text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-bone/80 text-xs uppercase tracking-[0.2em] font-medium mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:noah.kissinger24@gmail.com"
                  className="text-bone/40 hover:text-bone text-sm transition-colors break-all"
                >
                  noah.kissinger24@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/shotbynoah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/40 hover:text-bone text-sm transition-colors"
                >
                  @shotbynoah
                </a>
              </li>
              <li className="mt-4">
                <Link
                  href="/contact"
                  className="text-sm px-4 py-2 inline-block font-semibold uppercase tracking-wide transition-all duration-200 hover:opacity-90"
                  style={{ background: '#FF6B2C', color: '#0A0A0A' }}
                >
                  Book a Shoot
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(237,234,228,0.08)' }}>
          <p className="text-bone/30 text-sm">
            © {new Date().getFullYear()} Noah Kissinger. All photographs are the property of the artist.
          </p>
        </div>
      </div>
    </footer>
  )
}
