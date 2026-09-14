import { ArrowUpRight, Martini, Umbrella, Utensils } from 'lucide-react'
import { Badge, Title } from './ui.jsx'

/**
 * Frame Pencil `Experience` (id zcCsb) : fill blanc, layout vertical, gap 44, padding [80,120].
 * Header (f6qnC) + Bento Row 1 (BLUTq, h 420) + Bento Row 2 (stl6M, h 300), gap 20 entre cartes.
 *
 * Mouvement (hors design) : entree au scroll en cascade, zoom de la photo et remontee de la
 * legende au survol, puce d'icone qui se colore sur les cartes plates.
 */

const POOL_IMG =
  'https://images.unsplash.com/photo-1691040276996-0f70353a52e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc0OTR8&ixlib=rb-4.1.0&q=80&w=1080'
const NIGHT_IMG =
  'https://images.unsplash.com/photo-1611244806964-91d204d4a2a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc0OTV8&ixlib=rb-4.1.0&q=80&w=1080'

/** Frame `Caption` des cartes photo : fill #0E1E3DB3, radius 12, gap 6, padding 16. */
function Caption({ title, titleFontClass, desc, widthClass }) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-12 bg-caption-bg p-14 transition-transform duration-500 group-hover:-translate-y-[0.25rem] sm:p-16 ${widthClass}`}
    >
      <div className="flex w-full items-center justify-between gap-10">
        <span className={`text-15 font-semibold text-white sm:text-17 ${titleFontClass}`}>{title}</span>
        <ArrowUpRight
          size={18}
          strokeWidth={2}
          className="shrink-0 text-white transition-transform duration-500 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
        />
      </div>
      <p className="font-body text-13 font-normal leading-1.4 text-w-cc">{desc}</p>
    </div>
  )
}

/** Carte photo : l'image est un calque a part pour pouvoir zoomer au survol. */
function PhotoCard({ img, children }) {
  return (
    <div className="group relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden rounded-16 p-14 sm:p-18">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        style={{ backgroundImage: `url('${img}')` }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

/** Frames `Restaurant face à la lagune` / `Rooftop & lounge bar` / `Terrasse & transats`. */
function BentoCard({ icon: Icon, title, titleFontClass, desc }) {
  return (
    <div className="group flex h-full cursor-pointer flex-col justify-between gap-24 rounded-16 bg-surface-1 p-20 transition-colors duration-500 hover:bg-[#EAEEF2] sm:p-28">
      <div className="w-fit rounded-10 bg-white p-10 transition-all duration-500 group-hover:bg-marine">
        <Icon
          size={22}
          strokeWidth={2}
          className="text-marine transition-colors duration-500 group-hover:text-white"
        />
      </div>
      <div className="flex w-full flex-col gap-8">
        <span
          className={`text-20 font-semibold text-marine transition-transform duration-500 group-hover:translate-x-[0.25rem] sm:text-22 ${titleFontClass}`}
        >
          {title}
        </span>
        <p className="font-body text-15 font-normal leading-1.5 text-body-txt">{desc}</p>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section className="flex w-full flex-col gap-44 bg-white px-96 py-[3.5rem] sm:py-80">
      {/* Header */}
      <div className="reveal flex w-full flex-col items-start justify-between gap-40 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-18">
          <Badge>L&apos;EXPÉRIENCE</Badge>
          <Title
            a="Un cadre d'exception"
            b="face à la lagune"
            sizeClass="text-48"
            leadingClass="leading-1.05"
            wrapClass="flex flex-col"
          />
        </div>
        <div className="flex w-full flex-col gap-20 lg:w-360 lg:shrink-0">
          <p className="font-body text-16 font-normal leading-1.5 text-body-txt">
            Palmiers, terrasse élégante et piscine face à la lagune Ébrié. En journée comme au
            coucher du soleil, la baie de Cocody est votre panorama.
          </p>
          <button
            type="button"
            className="w-fit rounded-40 bg-marine px-24 py-13 font-body text-14 font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#16294F] active:translate-y-0"
          >
            Découvrir le cadre
          </button>
        </div>
      </div>

      {/* Bento Row 1 — h 420 */}
      <div className="flex flex-col gap-20 md:flex-row lg:h-420">
        <div className="reveal aspect-[16/11] min-w-0 flex-1 sm:aspect-[16/9] md:aspect-auto md:min-h-[17.5rem]">
          <PhotoCard img={POOL_IMG}>
            <Caption
              title="La piscine au coucher du soleil"
              titleFontClass="font-heading"
              desc="Transats, palmiers et vue imprenable sur la lagune."
              widthClass="w-full md:w-340"
            />
          </PhotoCard>
        </div>
        <div className="reveal min-w-0 flex-1 md:min-h-[17.5rem]" style={{ '--d': '0.1s' }}>
          <BentoCard
            icon={Utensils}
            title="Restaurant face à la lagune"
            titleFontClass="font-heading"
            desc="Cuisine africaine & européenne, servie dans un cadre exotique et raffiné."
          />
        </div>
      </div>

      {/* Bento Row 2 — h 300 */}
      <div className="flex flex-col gap-20 md:flex-row lg:h-300">
        <div className="reveal min-w-0 flex-1 md:min-h-[15rem]">
          <BentoCard
            icon={Martini}
            title="Rooftop & lounge bar"
            titleFontClass="font-avenir"
            desc="Un verre en hauteur, la brise de la lagune et la plus belle vue de la baie."
          />
        </div>
        <div className="reveal min-w-0 flex-1 md:min-h-[15rem]" style={{ '--d': '0.1s' }}>
          <BentoCard
            icon={Umbrella}
            title="Terrasse & transats"
            titleFontClass="font-avenir"
            desc="Un cadre paisible au bord de l'eau, ouvert 7j/7 de 12h à 2h."
          />
        </div>
        <div className="reveal aspect-[16/11] min-w-0 flex-1 sm:aspect-[16/9] md:aspect-auto md:min-h-[15rem]" style={{ '--d': '0.2s' }}>
          <PhotoCard img={NIGHT_IMG}>
            <Caption
              title="Les soirées Adoumin"
              titleFontClass="font-avenir"
              desc="DJ & ambiance, les pieds au bord de l'eau."
              widthClass="w-full"
            />
          </PhotoCard>
        </div>
      </div>
    </section>
  )
}
