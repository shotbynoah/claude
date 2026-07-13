export type WorkCategory = 'Portraits' | 'Events' | 'Editorial' | 'Street' | 'Travel'

export interface WorkItem {
  slug: string
  title: string
  category: WorkCategory
  year: string
  /**
   * Path to the photo under /public (e.g. '/work/golden-hour.jpg').
   * Leave undefined to render a styled placeholder frame until the
   * real image is dropped into public/work/.
   */
  src?: string
  /** Duotone used by the placeholder frame while src is missing. */
  tones: [string, string]
  /** Aspect ratio of the frame, e.g. '4 / 5' or '3 / 2'. */
  ratio: string
}

export const CATEGORIES: WorkCategory[] = ['Portraits', 'Events', 'Editorial', 'Street', 'Travel']

export const WORK: WorkItem[] = [
  {
    slug: 'golden-hour',
    title: 'Golden Hour',
    category: 'Portraits',
    year: '2026',
    tones: ['#3A2418', '#0E0906'],
    ratio: '4 / 5',
  },
  {
    slug: 'city-lights',
    title: 'City Lights',
    category: 'Street',
    year: '2026',
    tones: ['#16213A', '#080A12'],
    ratio: '3 / 4',
  },
  {
    slug: 'the-reception',
    title: 'The Reception',
    category: 'Events',
    year: '2025',
    tones: ['#2E1A2E', '#0C070C'],
    ratio: '3 / 2',
  },
  {
    slug: 'monochrome-study',
    title: 'Monochrome Study',
    category: 'Editorial',
    year: '2025',
    tones: ['#2A2A2A', '#0A0A0A'],
    ratio: '4 / 5',
  },
  {
    slug: 'coastal',
    title: 'Coastal',
    category: 'Travel',
    year: '2025',
    tones: ['#12312E', '#060E0D'],
    ratio: '3 / 2',
  },
  {
    slug: 'neon-portrait',
    title: 'Neon Portrait',
    category: 'Portraits',
    year: '2025',
    tones: ['#38182A', '#0F060B'],
    ratio: '4 / 5',
  },
  {
    slug: 'downtown-rain',
    title: 'Downtown Rain',
    category: 'Street',
    year: '2024',
    tones: ['#1C2A38', '#070B0F'],
    ratio: '3 / 4',
  },
  {
    slug: 'first-dance',
    title: 'First Dance',
    category: 'Events',
    year: '2024',
    tones: ['#332616', '#0D0A06'],
    ratio: '3 / 2',
  },
  {
    slug: 'high-desert',
    title: 'High Desert',
    category: 'Travel',
    year: '2024',
    tones: ['#3A2E1C', '#0E0B07'],
    ratio: '16 / 9',
  },
]

export const FEATURED_SLUGS = ['golden-hour', 'the-reception', 'city-lights', 'monochrome-study', 'high-desert']

export const featured = (): WorkItem[] =>
  FEATURED_SLUGS.flatMap(slug => WORK.filter(w => w.slug === slug))
