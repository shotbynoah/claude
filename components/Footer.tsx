'use client'

import Link from 'next/link'

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', borderTop: '1px solid rgba(201,149,108,0.3)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
              >
                Total Spectrum
              </span>
              <br />
              <span className="text-xs text-clay/70 uppercase tracking-[0.2em]">Counseling</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Compassionate, neurodiversity-affirming therapy for individuals, couples, and families. Every mind deserves to be understood.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/40 hover:text-clay transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="text-white/40 hover:text-clay transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="text-white/40 hover:text-clay transition-colors">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium mb-4">Pages</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/40 hover:text-white/80 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium mb-4">Services</h4>
            <ul className="space-y-3">
              {['Individual Therapy', 'Couples Therapy', 'Family Therapy', 'ADHD & Autism', 'Trauma Therapy', 'LGBTQIA+ Affirming'].map(s => (
                <li key={s}>
                  <Link href="/services" className="text-white/40 hover:text-white/80 text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium mb-4">Connect</h4>
            <ul className="space-y-3">
              <li className="text-white/40 text-sm">(555) 867-5309</li>
              <li className="text-white/40 text-sm">hello@totalspectrumcounseling.com</li>
              <li className="text-white/40 text-sm">Mon–Fri 9am–7pm</li>
              <li className="text-white/40 text-sm">Sat 10am–3pm</li>
              <li className="mt-4">
                <Link
                  href="/contact"
                  className="text-sm px-4 py-2 rounded-full inline-block transition-all duration-200 hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #C9956C, #9B6B45)', color: '#FEFCF8' }}
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">© 2025 Total Spectrum Counseling. All rights reserved.</p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'HIPAA Notice'].map(item => (
                <a key={item} href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
