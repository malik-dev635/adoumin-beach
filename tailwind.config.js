/**
 * Tokens extraits du fichier design_resort.pen via le MCP Pencil (GetVariables + lecture des noeuds
 * des frames `Landing — Lay1` et `Landing — Lay2`). Aucune valeur n'est arrondie sur l'echelle Tailwind par defaut :
 * chaque entree porte la valeur px exacte lue dans le design.
 *
 * Les tailles "fluides" conservent la valeur du design comme MAXIMUM (donc exacte a 1440px, la
 * largeur de la frame) et se reduisent proportionnellement en dessous (base 1440).
 * Unites : tout est exprime en rem (1 rem = 16 px, la valeur du design divisee par 16) — jamais en
 * px — et les largeurs de colonnes en pourcentage dans les composants.
 */

const DESIGN_WIDTH = 1440

/** px du design -> rem (base 16), arrondi a 4 decimales. */
const rem = (px) => `${Math.round((px / 16) * 10000) / 10000}rem`

/**
 * clamp(min, vw, valeur du design) — exact a 1440px de large. Les bornes sont en rem : la page
 * suit le reglage de taille de police du navigateur ; le terme en vw porte la fluidite.
 */
const fluid = (px, minRatio) => {
  if (minRatio >= 1) return rem(px)
  const vw = Math.round((px / DESIGN_WIDTH) * 100 * 10000) / 10000
  return `clamp(${rem(px * minRatio)}, ${vw}vw, ${rem(px)})`
}

/** Typo : <=16px fige (lisibilite), 17-28px plancher a 85%, >=29px plancher a 65%. */
const fluidText = (px) => fluid(px, px <= 16 ? 1 : px <= 28 ? 0.85 : 0.65)
/** Espacements : <=24px fige, 25-60px plancher a 55%, >60px plancher a 30%. */
const fluidSpace = (px) => fluid(px, px <= 24 ? 1 : px <= 60 ? 0.55 : 0.3)

const TEXT_SIZES = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 42, 44, 46, 48, 52, 54, 56, 58, 60, 62, 92, 110, 250]
const SPACE_SIZES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 38, 39, 40, 44, 48,
  52, 53, 56, 60, 64, 70, 80, 84, 96, 100, 110, 120, 125, 128, 133, 152, 170, 184, 200, 212, 224, 240, 250, 280,
  300, 316, 320, 330, 340, 346, 360, 373, 388, 398, 400, 404, 420, 454, 460, 470, 520, 521, 542, 580,
  581, 600, 617, 620, 640, 643, 708, 716, 717, 720, 760, 780, 820, 840, 852, 860, 900, 920, 1062, 1200,
  1420, 1440,
]

const px = (list, fn) => Object.fromEntries(list.map((n) => [String(n), fn(n)]))

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Variables du fichier .pen
        white: '#FFFFFF',
        marine: '#1C3464',
        gold: '#FFCE02',
        sky: '#9ECCD9',
        sand: '#F5EFE6',
        ink: '#2A3B57',
        cream: '#F4EEE4',
        // Couleurs litterales utilisees dans Landing — Lay1
        'badge-bg': '#EEF1F4',
        'title-b': '#7C8794',
        'body-txt': '#6B7684',
        'surface-1': '#F1F3F5',
        'row-line': '#E6E9ED',
        'num-txt': '#A6AEB8',
        'line-2': '#DCE1E7',
        'cta-bg': '#EEF2F5',
        'footer-bg': '#0E1E3D',
        'caption-bg': '#0E1E3DB3',
        'star-on': '#ffcd03',
        'star-off': '#c9d1da',
        'map-bg': '#EFF2F4',
        'map-road': '#DCE3E8',
        'map-shore': '#7FB0C2',
        'map-lagoon-txt': '#3E7286',
        'map-plateau-txt': '#97A3AE',
        'map-divider': '#DED8CE',
        'meta-txt': '#8A94A0',
        'stop-txt': '#5D6A7B',
        'w-d9': '#FFFFFFD9',
        'w-cc': '#FFFFFFCC',
        'w-e6': '#FFFFFFE6',
        'w-b3': '#FFFFFFB3',
        'w-80': '#FFFFFF80',
        'w-66': '#FFFFFF66',
        'w-26': '#FFFFFF26',
        'w-1a': '#FFFFFF1A',
        'w-14': '#FFFFFF14',
        // Landing — Lay2
        paper: '#F7F5F1',
        'paper-2': '#F1EFE9',
        'text-2': '#4C5563',
        'text-3': '#5C6472',
        'line-3': '#E4DED2',
        'footer-2': '#0B1526',
        'w-99': '#FFFFFF99',
        'line-w50': '#DED8CE80',
      },
      fontFamily: {
        // Le design system du .pen precise que Jost et Mulish ne sont que les APERCUS Pencil de
        // Futura et Avenir Next. En production les deux polices de marque rendent partout ;
        // Jost / Mulish ne restent que des fallbacks.
        heading: ['Futura', 'Jost', 'sans-serif'],
        body: ['"Avenir Next W1G"', '"Avenir Next"', 'Mulish', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        futura: ['Futura', 'Jost', 'sans-serif'],
        avenir: ['"Avenir Next W1G"', '"Avenir Next"', 'Mulish', 'sans-serif'],
      },
      fontSize: px(TEXT_SIZES, (n) => fluidText(n)),
      spacing: px(SPACE_SIZES, (n) => fluidSpace(n)),
      borderRadius: Object.fromEntries([3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 26, 40].map((n) => [String(n), rem(n)]).concat([['999', '999px']])),
      letterSpacing: { '-4': '-0.25rem', 0.6: '0.0375rem', 1: '0.0625rem', 1.5: '0.0938rem', 2: '0.125rem', 3: '0.1875rem' },
      lineHeight: { 0.7: '0.7', 0.9: '0.9', 0.98: '0.98', 1: '1', 1.02: '1.02', 1.05: '1.05', 1.06: '1.06', 1.1: '1.1', 1.15: '1.15', 1.3: '1.3', 1.35: '1.35', 1.4: '1.4', 1.45: '1.45', 1.5: '1.5', 1.55: '1.55', 1.6: '1.6', 1.65: '1.65' },
      maxWidth: { 1440: '90rem' },
    },
  },
  plugins: [],
}
