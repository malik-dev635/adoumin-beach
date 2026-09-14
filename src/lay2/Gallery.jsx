import { Overline, UnderlineLink } from './ui.jsx'

/**
 * Frame Pencil `Gallery` (id FgdrC) : fill #F7F5F1, vertical, gap 44, padding [100,120,110,120].
 *  - Header : overline "GALERIE" + "En images" Futura 52/300 lh 1 ; lien "Tout voir"
 *  - Grid h 720, gap 16, quatre colonnes de deux photos (radius 6). Hauteurs lues dans le .pen :
 *      col 1 : 388 / 316   col 2 : 250 / 454   col 3 : 454 / 250   col 4 : 300 / 404
 *    Chaque colonne fait 720 ; on garde ces proportions via flex-grow au lieu de px fixes.
 */
const U = (id, ix) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=${ix}&ixlib=rb-4.1.0&q=80&w=1080`

const COLS = [
  [
    { h: 388, src: U('1713450138009-89f7feb6733c', 'M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg5MDA1MTR8'), alt: 'Piscine dans la jungle' },
    { h: 316, src: U('1644620426342-471c3ed4e1d4', 'M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg5MDA1MTV8'), alt: 'Villa de verre' },
  ],
  [
    { h: 250, src: U('1752888016122-cc0059408ce5', 'M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg5MDA1MTV8'), alt: 'Dîner aux chandelles' },
    { h: 454, src: U('1770625467960-e6847f909321', 'M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg5MDA1MTZ8'), alt: 'Salon feutré' },
  ],
  [
    { h: 454, src: U('1780805664675-d478703ae915', 'M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg5MDA1MTZ8'), alt: 'Salle de restaurant' },
    { h: 250, src: U('1711110066231-cb235d6e117e', 'M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg5MDA1MTd8'), alt: 'Piscine vue du ciel' },
  ],
  [
    { h: 300, src: U('1694188040138-fbf150159481', 'M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg5MDA1MTh8'), alt: 'Villa blanche' },
    { h: 404, src: U('1777613359406-d6bbc5b086c8', 'M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg5MDA1MTh8'), alt: 'Architecture en bois' },
  ],
]

function Photo({ src, alt, h }) {
  return (
    <a
      href="#"
      className="group relative min-h-0 w-full overflow-hidden rounded-6"
      style={{ flexGrow: h, flexBasis: 0 }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
      <span className="pointer-events-none absolute inset-0 bg-marine/0 transition-colors duration-500 group-hover:bg-marine/10" />
    </a>
  )
}

export default function Gallery() {
  return (
    <section className="flex w-full flex-col gap-44 bg-paper px-32 py-[3.5rem] sm:py-80 lg:pb-110 lg:pt-100">
      <div className="reveal flex w-full flex-col items-start justify-between gap-20 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-16">
          <Overline>GALERIE</Overline>
          <h2 className="font-futura text-52 font-light leading-1 text-marine">En images</h2>
        </div>
        <UnderlineLink>Tout voir</UnderlineLink>
      </div>

      {/* 4 colonnes en desktop, 2 en tablette, mosaique 2 colonnes compacte au telephone */}
      <div className="grid w-full grid-cols-2 gap-12 sm:gap-16 lg:flex lg:h-720">
        {COLS.map((col, i) => (
          <div
            key={i}
            className="reveal flex h-[20rem] min-w-0 flex-col gap-12 sm:h-[26.25rem] sm:gap-16 lg:h-full lg:flex-1"
            style={{ '--d': `${i * 0.08}s` }}
          >
            {col.map((p) => (
              <Photo key={p.src} {...p} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
