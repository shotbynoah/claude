import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  { seed: 100, title: 'Geometric Forms', col: 0, row: 0 },
  { seed: 110, title: 'Light Study', col: 1, row: 0 },
  { seed: 120, title: 'Urban Texture', col: 0, row: 1 },
  { seed: 130, title: 'Abstract Flow', col: 1, row: 1 },
  { seed: 140, title: 'Minimal Composition', col: 0, row: 2 },
  { seed: 150, title: 'Digital Landscape', col: 1, row: 2 },
]

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinnedRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const pinned = pinnedRef.current
    if (!section || !pinned) return

    // Pin center content
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinned,
      pinSpacing: false,
    })

    // Parallax on each card
    const triggers: ScrollTrigger[] = []
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const direction = i % 2 === 0 ? -80 : 80
      const st = gsap.fromTo(
        card,
        { y: -direction },
        {
          y: direction,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      ).scrollTrigger

      if (st) triggers.push(st)
    })

    return () => {
      pinTrigger.kill()
      triggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[300vh]"
    >
      {/* Pinned center content */}
      <div
        ref={pinnedRef}
        className="sticky top-0 h-screen flex items-center justify-center pointer-events-none z-10"
      >
        <div className="text-center px-6">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Visual Work</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary leading-none">
            Explorations
          </h2>
          <p className="mt-4 text-muted text-base max-w-md mx-auto">
            A collection of experimental visuals, studies in form and light.
          </p>
        </div>
      </div>

      {/* Parallax cards grid — absolute overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 md:gap-6 w-[85vw] max-w-4xl">
              {IMAGES.map((img, i) => (
                <div
                  key={img.seed}
                  ref={el => { cardRefs.current[i] = el }}
                  className="relative group overflow-hidden rounded-2xl cursor-pointer pointer-events-auto"
                  style={{ aspectRatio: i % 3 === 1 ? '3/4' : '4/3' }}
                  onClick={() => setLightbox(img.seed)}
                >
                  <img
                    src={`https://picsum.photos/seed/${img.seed}/600/500`}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                    <span className="text-text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9998] bg-black/90 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={`https://picsum.photos/seed/${lightbox}/1200/900`}
              alt="Exploration detail"
              className="w-full h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg/80 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-surface transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
