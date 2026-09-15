import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Martini, Users, Waves } from 'lucide-react'
import { Badge, Title } from './ui.jsx'

/**
 * Frame Pencil `Spaces Carousel` (id ZKvdk) : fill blanc, vertical, gap 40, padding 80,
 * alignItems center. `Carousel` (jv8DV) : h 460, layout "none" —
 *   Side L  x-90  y30  300x400 opacity 0.3 radius 16
 *   Side R  x1070 y30  300x400 opacity 0.3 radius 16
 *   Featured x340 y0   600x460 radius 18, padding 24
 *   Prev    x314 y204  52x52   / Next x914 y204 52x52 (fill marine, stroke #FFFFFF 2)
 * Le conteneur fait 1280 (1440 - padding 80 x2) : positions converties en % de 1280 x 460.
 *
 * Mouvement (hors design) : ce sont les cartes elles-memes qui voyagent d'un emplacement du design
 * a l'autre (vignette 300x400 a 30 % -> carte 600x460 au centre -> vignette opposee). Chaque carte
 * est portee par une position absolue non bornee, donc elle se deplace toujours dans le sens de la
 * fleche cliquee, sans jamais traverser l'ecran pour reboucler.
 *
 * Le .pen ne dessine qu'une diapositive ; les deux autres reprennent les images `Side L`/`Side R`
 * du design. Leurs titres et metadonnees ne figurent pas dans le design (copie ajoutee).
 */

const SLIDES = [
  {
    tag: 'ÉVÉNEMENTIEL',
    title: 'Salle de réception',
    img: 'https://images.unsplash.com/photo-1784450441710-353b5ae81b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc2MDN8&ixlib=rb-4.1.0&q=80&w=1080',
    meta: [
      { icon: Users, label: "Jusqu'à 1 000 pers." },
      { icon: Waves, label: 'Vue lagune' },
      { icon: Martini, label: 'Bar & cuisine' },
    ],
  },
  {
    tag: 'ÉVÉNEMENTIEL',
    title: 'Terrasse privatisable',
    img: 'https://images.unsplash.com/photo-1772352214475-12f9a75618d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc2MDN8&ixlib=rb-4.1.0&q=80&w=1080',
    meta: [
      { icon: Users, label: "Jusqu'à 250 pers." },
      { icon: Waves, label: 'Bord de lagune' },
      { icon: Martini, label: 'Service cocktails' },
    ],
  },
  {
    tag: 'ÉVÉNEMENTIEL',
    title: 'Rooftop panoramique',
    img: 'https://images.unsplash.com/photo-1605635542960-4ec85186d6f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc2MDN8&ixlib=rb-4.1.0&q=80&w=1080',
    meta: [
      { icon: Users, label: "Jusqu'à 120 pers." },
      { icon: Waves, label: 'Vue baie de Cocody' },
      { icon: Martini, label: 'Lounge bar' },
    ],
  },
]

const mod = (n, m) => ((n % m) + m) % m

/**
 * Emplacements, en % du conteneur 1280 x 460 :
 *  -1 / +1 : vignettes Side L (x-90, y30) et Side R (x1070, y30), 300x400, opacite 0.3
 *   0      : Featured (x340, y0), 600x460
 *  -2 / +2 : hors champ, d'ou les cartes arrivent et ou elles repartent
 */
const SLOTS_DESKTOP = {
  '-2': { left: '-45%', top: '6.5217%', width: '23.4375%', height: '86.9565%', opacity: 0, radius: 16 },
  '-1': { left: '-7.03125%', top: '6.5217%', width: '23.4375%', height: '86.9565%', opacity: 0.3, radius: 16 },
  0: { left: '26.5625%', top: '0%', width: '46.875%', height: '100%', opacity: 1, radius: 18 },
  1: { left: '83.59375%', top: '6.5217%', width: '23.4375%', height: '86.9565%', opacity: 0.3, radius: 16 },
  2: { left: '121%', top: '6.5217%', width: '23.4375%', height: '86.9565%', opacity: 0, radius: 16 },
}

/** Sous 1024 px le design masque les vignettes : la carte centrale occupe toute la largeur. */
const SLOTS_MOBILE = {
  '-2': { left: '-220%', top: '0%', width: '100%', height: '100%', opacity: 0, radius: 18 },
  '-1': { left: '-110%', top: '0%', width: '100%', height: '100%', opacity: 0, radius: 18 },
  0: { left: '0%', top: '0%', width: '100%', height: '100%', opacity: 1, radius: 18 },
  1: { left: '110%', top: '0%', width: '100%', height: '100%', opacity: 0, radius: 18 },
  2: { left: '220%', top: '0%', width: '100%', height: '100%', opacity: 0, radius: 18 },
}

function useDesktop() {
  const [desktop, setDesktop] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return desktop
}

/** Une carte : image en fond, contenu affiche seulement quand elle occupe l'emplacement central. */
function Card({ slide, slot, centre }) {
  return (
    <div
      className="absolute overflow-hidden bg-cover bg-center transition-all duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
      style={{
        left: slot.left,
        top: slot.top,
        width: slot.width,
        height: slot.height,
        opacity: slot.opacity,
        borderRadius: slot.radius,
        zIndex: centre ? 2 : 1,
        backgroundImage: `url('${slide.img}')`,
      }}
    >
      <div
        className={`flex h-full w-full flex-col justify-between p-24 transition-opacity duration-500 ${
          centre ? 'opacity-100 delay-200' : 'opacity-0'
        }`}
      >
        {/* Voile de lisibilite : meme degrade que le noeud `Grad` du portrait des temoignages */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #0E1E3D00 40%, #0E1E3DE6 100%)' }}
        />
        <div className="relative w-fit rounded-40 bg-w-26 px-12 py-6 backdrop-blur-[2px]">
          <span className="font-body text-10 font-bold tracking-1.5 text-white">{slide.tag}</span>
        </div>
        <div className="relative flex w-full flex-col gap-14">
          <h3 className="font-futura text-30 font-medium text-white">{slide.title}</h3>
          <div className="flex flex-wrap items-center gap-22">
            {slide.meta.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-8">
                <Icon size={18} strokeWidth={2} className="text-w-cc" />
                <span className="font-body text-14 font-normal text-w-e6">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SpacesCarousel() {
  // position non bornee : sa valeur porte le sens du defilement
  const [index, setIndex] = useState(0)
  const desktop = useDesktop()
  const slots = desktop ? SLOTS_DESKTOP : SLOTS_MOBILE

  return (
    <section className="flex w-full flex-col items-center gap-40 bg-white px-24 py-[3.5rem] sm:p-80">
      <div className="reveal flex flex-col items-center gap-16">
        <Badge>NOS ESPACES</Badge>
        <Title
          a="Espaces &"
          b="Événements"
          sizeClass="text-46"
          wrapClass="flex flex-row flex-wrap justify-center gap-12"
        />
      </div>

      <div className="reveal relative aspect-[4/5] w-full sm:aspect-[600/460] lg:aspect-auto lg:h-460">
        {[index - 2, index - 1, index, index + 1, index + 2].map((p) => (
          <Card
            key={p}
            slide={SLIDES[mod(p, SLIDES.length)]}
            slot={slots[p - index]}
            centre={p === index}
          />
        ))}

        {/* Prev x314 => 24.53125%, Next x914 => 71.40625%, y204 => 44.3478% */}
        <button
          type="button"
          aria-label="Espace précédent"
          onClick={() => setIndex((i) => i - 1)}
          className="group absolute left-12 top-[46%] z-10 flex h-44 w-44 items-center justify-center rounded-26 border-2 border-white bg-marine transition-all duration-300 hover:scale-110 hover:bg-[#16294F] active:scale-95 sm:h-52 sm:w-52 sm:top-[44.3478%] lg:left-[24.53125%]"
        >
          <ArrowLeft
            size={22}
            strokeWidth={2}
            className="text-white transition-transform duration-300 group-hover:-translate-x-[3px]"
          />
        </button>
        <button
          type="button"
          aria-label="Espace suivant"
          onClick={() => setIndex((i) => i + 1)}
          className="group absolute right-12 top-[46%] z-10 flex h-44 w-44 items-center justify-center rounded-26 border-2 border-white bg-marine transition-all duration-300 hover:scale-110 hover:bg-[#16294F] active:scale-95 sm:h-52 sm:w-52 sm:top-[44.3478%] lg:left-[71.40625%] lg:right-auto"
        >
          <ArrowRight
            size={22}
            strokeWidth={2}
            className="text-white transition-transform duration-300 group-hover:translate-x-[3px]"
          />
        </button>
      </div>
    </section>
  )
}
