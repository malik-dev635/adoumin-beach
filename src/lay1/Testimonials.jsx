import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Badge, Title } from './ui.jsx'

/**
 * Frame Pencil `Testimonials` (id rn0vU) : fill blanc, vertical, gap 40, padding [80,120].
 * `Panel` (ykbkY) : fill #F1F3F5, cornerRadius 24, gap 48, padding 56, alignItems center.
 * `Portrait` (D55JUS) : 340x460, cornerRadius 18, degrade `Grad` #0E1E3D00 40% -> #0E1E3DE6 100%.
 *
 * Le .pen ne contient qu'un temoignage (Awa K.) ; les deux suivants sont une copie ajoutee pour
 * rendre les fleches fonctionnelles.
 */

const QUOTES = [
  {
    quote:
      'Superbe cadre, bonne ambiance et personnel accueillant. On y revient pour la vue sur la lagune.',
    name: 'Awa K.',
    role: 'Cliente · Cocody',
    img: 'https://images.unsplash.com/photo-1658497730270-b5f4fef00ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc2NDd8&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    quote:
      'La terrasse au coucher du soleil vaut le détour. Service impeccable et cuisine généreuse.',
    name: 'Yao S.',
    role: 'Client · Plateau',
    img: 'https://images.unsplash.com/photo-1658497730270-b5f4fef00ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc2NDd8&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    quote:
      "Nous y avons organisé notre réception : l'équipe a tout pris en main, les invités en parlent encore.",
    name: 'Fatou D.',
    role: 'Cliente · Riviera',
    img: 'https://images.unsplash.com/photo-1658497730270-b5f4fef00ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc2NDd8&ixlib=rb-4.1.0&q=80&w=1080',
  },
]

const mod = (n, m) => ((n % m) + m) % m

export default function Testimonials() {
  // index non borne + sens du dernier clic, pour que l'entree suive la fleche utilisee
  const [{ index, dir }, setNav] = useState({ index: 0, dir: 1 })
  const go = (step) => setNav(({ index: i }) => ({ index: i + step, dir: step }))
  const current = QUOTES[mod(index, QUOTES.length)]
  const glide =
    dir > 0
      ? 'animate-[glide-from-right_0.5s_ease-out_both]'
      : 'animate-[glide-from-left_0.5s_ease-out_both]'

  return (
    <section className="flex w-full flex-col gap-40 bg-white px-96 py-[3.5rem] sm:py-80">
      <div className="reveal flex w-full flex-col items-start justify-between gap-40 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-18">
          <Badge>ILS Y SONT ALLÉS</Badge>
          <Title
            a="Ils ont vécu"
            b="Adoumin"
            sizeClass="text-44"
            wrapClass="flex flex-row flex-wrap gap-12"
          />
        </div>
        <p className="font-body text-16 font-normal leading-1.5 text-body-txt lg:w-340 lg:shrink-0">
          Chaque client repart avec un souvenir. Leurs moments au bord de la lagune inspirent tout
          ce que nous faisons.
        </p>
      </div>

      <div className="reveal flex w-full flex-col items-center gap-28 rounded-24 bg-surface-1 p-24 sm:gap-48 sm:p-56 lg:flex-row">
        <div className="flex w-full flex-1 flex-col gap-24">
          <span className="font-heading text-[3.5rem] font-bold leading-0.7 text-line-2 sm:text-110">&ldquo;</span>
          <p
            key={index}
            className={`${glide} font-avenir text-30 font-medium leading-1.3 text-ink`}
          >
            {current.quote}
          </p>
          <div className="flex gap-12">
            <button
              type="button"
              aria-label="Témoignage précédent"
              onClick={() => go(-1)}
              className="group flex h-[2.75rem] w-[2.75rem] lg:h-48 lg:w-48 items-center justify-center rounded-24 border border-line-2 bg-white transition-all duration-300 hover:border-marine hover:bg-marine"
            >
              <ArrowLeft
                size={20}
                strokeWidth={2}
                className="text-marine transition-colors duration-300 group-hover:text-white"
              />
            </button>
            <button
              type="button"
              aria-label="Témoignage suivant"
              onClick={() => go(1)}
              className="group flex h-[2.75rem] w-[2.75rem] lg:h-48 lg:w-48 items-center justify-center rounded-24 border border-line-2 bg-white transition-all duration-300 hover:border-marine hover:bg-marine"
            >
              <ArrowRight
                size={20}
                strokeWidth={2}
                className="text-marine transition-colors duration-300 group-hover:text-white"
              />
            </button>
          </div>
        </div>

        {/* Le design ne fournit qu'un seul portrait : c'est la carte entiere qui accompagne le
            changement (ses bords se decalent sur le panneau gris), avec le meme glissement
            directionnel que la citation. */}
        <div
          key={index}
          className={`relative flex aspect-[4/3] w-full shrink-0 flex-col justify-end overflow-hidden rounded-18 bg-cover bg-[center_30%] p-22 sm:aspect-[340/460] sm:max-w-[21.25rem] lg:aspect-auto lg:h-460 lg:w-340 lg:max-w-none ${glide}`}
          style={{ backgroundImage: `url('${current.img}')` }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #0E1E3D00 40%, #0E1E3DE6 100%)' }}
          />
          <div className="relative flex flex-col gap-2">
            <span className="font-heading text-20 font-semibold text-white">{current.name}</span>
            <span className="font-body text-14 font-normal text-w-b3">{current.role}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
