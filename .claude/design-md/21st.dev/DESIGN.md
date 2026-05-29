# 21st.dev Design System

> Component marketplace for shadcn/ui-based React + Tailwind components.
> Dark-first, minimal, developer-aesthetic. Built on Geist type + CSS variables.

---

## Brand

- **Voice**: Precise, technical, minimal. No fluff.
- **Aesthetic**: Dark IDE-inspired UI. Clean grids. High contrast. Subtle borders.
- **Primary accent**: Blue (`hsl(210 83% 53%)`) in light; near-white in dark.

---

## Colors

All colors use HSL CSS variables. Reference as `hsl(var(--token))`.

### Light Mode
| Token | Value | Usage |
|---|---|---|
| `--background` | `0 0% 100%` | Page background |
| `--foreground` | `240 10% 3.9%` | Body text |
| `--primary` | `210 83% 53%` | CTAs, links, highlights |
| `--primary-foreground` | `0 0% 98%` | Text on primary |
| `--secondary` | `240 4.8% 95.9%` | Secondary surfaces |
| `--secondary-foreground` | `240 5.9% 10%` | Text on secondary |
| `--muted` | `240 4.8% 95.9%` | Subdued backgrounds |
| `--muted-foreground` | `240 3.8% 46.1%` | Subdued text |
| `--accent` | `240 4.8% 95.9%` | Hover states |
| `--accent-foreground` | `240 5.9% 10%` | Text on accent |
| `--destructive` | `0 84.2% 60.2%` | Errors, danger |
| `--border` | `240 5.9% 90%` | Borders, dividers |
| `--input` | `240 4.9% 83.9%` | Input borders |
| `--ring` | `240 5.9% 10%` | Focus rings |

### Dark Mode
| Token | Value | Usage |
|---|---|---|
| `--background` | `240 10% 3.9%` | Near-black page bg |
| `--foreground` | `240 4.8% 95.9%` | Light gray text |
| `--primary` | `0 0% 98%` | White (inverted) |
| `--primary-foreground` | `240 5.9% 10%` | Dark text on white |
| `--secondary` | `240 3.7% 15.9%` | Dark secondary surface |
| `--muted` | `240 3.7% 15.9%` | Dark muted bg |
| `--muted-foreground` | `240 5% 64.9%` | Gray subdued text |
| `--accent` | `240 3.7% 15.9%` | Dark hover bg |
| `--border` | `240 3.7% 15.9%` | Subtle dark border |
| `--input` | `240 3.7% 15.9%` | Dark input border |

### Gradients
```css
--primary-gradient-start: 210 83% 53%;
--primary-gradient-end: 217 77% 49%;
/* Usage: background: linear-gradient(135deg, hsl(var(--primary-gradient-start)), hsl(var(--primary-gradient-end))); */
```

### Chart Colors (Dark)
- `--chart-1`: `220 70% 50%` (blue)
- `--chart-2`: `160 60% 45%` (teal)
- `--chart-3`: `30 80% 55%` (orange)
- `--chart-4`: `280 65% 60%` (purple)
- `--chart-5`: `340 75% 55%` (pink)

---

## Typography

**Primary font**: Geist Sans — `var(--font-geist-sans)`, fallback `Arial, sans-serif`  
**Mono font**: Geist Mono — `var(--font-geist-mono)`

```css
font-family: var(--font-geist-sans), Arial, sans-serif;
```

### Tailwind font config
```js
fontFamily: {
  sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
  mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
}
```

### Scale (Tailwind defaults apply)
- Display: `text-4xl`–`text-6xl`, `font-semibold` or `font-bold`
- Headings: `text-xl`–`text-3xl`, `font-semibold`
- Body: `text-sm`–`text-base`, `font-normal`
- Labels/captions: `text-xs`–`text-sm`, `text-muted-foreground`
- Code: Geist Mono, `text-sm`

---

## Spacing & Layout

- **Base grid**: 4px
- **Border radius**: `--radius: 0.5rem`
  - `rounded-lg` → `var(--radius)` = 8px
  - `rounded-md` → `calc(var(--radius) - 2px)` = 6px
  - `rounded-sm` → `calc(var(--radius) - 4px)` = 4px
- **Container padding**:
  - `md` (720px+): 24px
  - `xl` (1280px+): 32px
  - `2xl` (1536px+): 80px
- **Breakpoints**: `min-420`, `min-720`, plus standard sm/md/lg/xl/2xl

---

## Shadows & Elevation

```css
--shadow-base: 0 1px 0 0 hsl(var(--alpha-300));
box-shadow: var(--shadow-base);
```

Elevation is minimal — prefer borders over shadows.

---

## Animations

All durations are short and snappy.

| Name | Duration | Easing | Usage |
|---|---|---|---|
| `accordion-down` | 0.2s | ease-out | Accordions opening |
| `accordion-up` | 0.2s | ease-out | Accordions closing |
| `success-ring` | 850ms | ease-out | Confirmation feedback |
| `shimmer-slide` | 1s | linear | Loading skeletons |
| `spin-around` | 3s | linear | Spinner |
| `pulse-slow` | 3s | ease-in-out | Subtle pulsing |
| `ping-slow` | 3s | cubic-bezier | Ping effect |
| `border-rotate` | 8s | linear | Animated border |

---

## Components

Built on **shadcn/ui** + **Radix UI** + **Tailwind CSS**.

### Buttons
```tsx
// Primary
<Button>Action</Button>
// Secondary / ghost
<Button variant="ghost">Cancel</Button>
// Destructive
<Button variant="destructive">Delete</Button>
```
- Rounded: `rounded-md`
- Height: `h-9` (default), `h-8` (sm), `h-10` (lg)
- Padding: `px-4 py-2`

### Cards
```tsx
<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Content</CardContent>
</Card>
```
- Background: `bg-card`
- Border: `border border-border`
- Radius: `rounded-lg`
- No heavy shadows — border only

### Inputs
```tsx
<Input placeholder="Search components..." />
```
- Border: `border-input`
- Background: `bg-background`
- Height: `h-9`
- Radius: `rounded-md`
- Focus: `ring-1 ring-ring`

### Badges
```tsx
<Badge variant="secondary">New</Badge>
```
- Small, pill-shaped: `rounded-full px-2.5 py-0.5 text-xs`

### Code blocks
- Font: Geist Mono
- Background: `bg-muted`
- Radius: `rounded-md`
- Padding: `p-4`

---

## Sidebar
Dedicated sidebar token set for consistent sidebar theming:
```css
--sidebar-background, --sidebar-foreground
--sidebar-primary, --sidebar-primary-foreground
--sidebar-accent, --sidebar-accent-foreground
--sidebar-border, --sidebar-ring
```

---

## Background Patterns

```css
/* Grid background */
background-image: linear-gradient(white 1px, transparent 1px),
                  linear-gradient(to right, white 1px, transparent 1px);
background-size: 30px 30px;
```

---

## Design Rules

1. **Dark-first**: Default to dark mode. Use `dark:` variants.
2. **Border over shadow**: Use `border border-border` for separation, not drop shadows.
3. **Muted secondary text**: Labels and metadata always `text-muted-foreground`.
4. **Geist everywhere**: No system fonts — always Geist Sans / Geist Mono.
5. **Short animations**: Max 200ms for UI transitions; 850ms only for success states.
6. **Minimal radius**: `rounded-md` for most elements; `rounded-lg` for cards/panels.
7. **HSL variables**: Never hardcode color hex values — always `hsl(var(--token))`.
8. **shadcn conventions**: Follow shadcn/ui component APIs and variant patterns.
