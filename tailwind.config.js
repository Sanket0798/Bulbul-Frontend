/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // ── Brand colors — use as: text-rust, bg-cream, border-gold, etc. ──────
      colors: {
        'bg':           '#FAEBE1',   // home page background
        'bg-inner':     '#F5DED2',   // inner pages background
        'rust-dark':    '#7D332C',   // deep rust
        'rust':         '#852C28',   // primary — buttons, headings on light bg
        'cream':        '#EFD3B6',   // text/elements on dark backgrounds
        'gold':         '#C98218',   // amber gold
        'terracotta':   '#C45A38',   // terracotta orange
        'charcoal':     '#232323',   // default body text
        'olive':        '#787C1D',   // section tags, feature labels
        'accent-gold':  '#EAB932',   // bright gold, stars, highlights
        // semantic aliases
        'primary':      '#852C28',
        'secondary':    '#C98218',
      },

      // ── Font families ────────────────────────────────────────────────────────
      fontFamily: {
        'freight':  ['"FreightDispPro"', 'Georgia', 'serif'],      // primary — all headings, buttons, body
        'freight-text': ['"FreightTextCmpPro"', 'Georgia', 'serif'], // secondary — select body copy
        'josefin':  ['"Josefin Sans"', 'sans-serif'],              // labels, tags, small caps
        'script':   ['"Mrs Saint Delafield"', 'cursive'],          // decorative h3
        // legacy aliases so old className="font-gilda" etc. still work
        'gilda':    ['"FreightDispPro"', 'Georgia', 'serif'],
        'cormorant':['"FreightDispPro"', 'Georgia', 'serif'],
        'playfair': ['"FreightDispPro"', 'Georgia', 'serif'],
      },

      // ── Font sizes — use as: text-display, text-h1, text-h2, etc. ───────────
      // clamp(min, preferred-vw, max) gives fluid scaling without media queries
      fontSize: {
        // Display / Hero headings
        'display':  ['clamp(48px, 6vw, 80px)',   { lineHeight: '1.1' }],
        // Section headings
        'h1':       ['clamp(44px, 5.5vw, 72px)', { lineHeight: '1.1' }],
        'h2':       ['clamp(32px, 3.5vw, 48px)', { lineHeight: '1.15' }],
        'h2-sm':    ['clamp(28px, 3vw, 40px)',   { lineHeight: '1.15' }],
        // Sub-headings
        'h3':       ['clamp(36px, 4vw, 55px)',   { lineHeight: '1' }],
        'h4':       ['clamp(22px, 2vw, 28px)',   { lineHeight: '1.2' }],
        // Body
        'body-lg':  ['18px', { lineHeight: '1.75' }],
        'body':     ['16px', { lineHeight: '1.75' }],
        'body-sm':  ['15px', { lineHeight: '1.75' }],
        'body-xs':  ['14px', { lineHeight: '1.8' }],
        // UI
        'label':    ['13px', { lineHeight: '1.5', letterSpacing: '0.12em' }],
        'caption':  ['12px', { lineHeight: '1.5', letterSpacing: '0.18em' }],
      },

      // ── Spacing extras ───────────────────────────────────────────────────────
      maxWidth: {
        'page': '1440px',
      },
    },
  },
  plugins: [],
}
