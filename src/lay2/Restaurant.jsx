import { Heading, Overline, UnderlineLink } from './ui.jsx'

/**
 * Frame Pencil `Restaurant` (id NCAfB) : fill #F7F5F1, padding [110,120], gap 80, alignItems center.
 *  - Img 580x620 radius 4 (a gauche)
 *  - Text (fill) gap 26 : overline "LA TABLE", titre 56/300 lh 1.05, paragraphe 16 lh 1.6 #4C5563,
 *    Prices (3 lignes, filet haut #DED8CE, padding [16,0], libelle 15/500 marine, prix Jost 16/300
 *    #8A94A0), lien "Voir la carte"
 */
const PRIX = [
  ['Plats', 'dès 6 000 F'],
  ['Formule brunch', 'dès 25 000 F'],
  ['Cocktails & vins', 'dès 6 000 F'],
]

const IMG =
  'https://images.unsplash.com/photo-1776855828611-8fd3ee069df1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NTA0Mzh8&ixlib=rb-4.1.0&q=80&w=1080'

export default function Restaurant() {
  return (
    <section className="flex w-full flex-col gap-40 bg-paper px-32 py-[3.5rem] sm:py-80 lg:flex-row lg:items-center lg:gap-80 lg:py-110">
      <div className="reveal reveal-wipe reveal-wipe-left aspect-[4/3] w-full overflow-hidden rounded-4 sm:aspect-[580/620] lg:h-620 lg:w-580 lg:shrink-0">
        <img src={IMG} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="reveal flex flex-1 flex-col gap-26" style={{ '--d': '0.12s' }}>
        <Overline>LA TABLE</Overline>
        <Heading lines={['Une cuisine', 'qui voyage']} sizeClass="text-56" />
        <p className="font-body text-16 font-normal leading-1.6 text-text-2">
          Les grands classiques de la cuisine africaine rencontrent les plaisirs de la table
          européenne. Produits soignés, assiettes gourmandes, face à la lagune.
        </p>
        <div className="flex w-full flex-col pt-8">
          {PRIX.map(([l, p]) => (
            <div
              key={l}
              className="group flex w-full items-center justify-between border-t border-map-divider py-16"
            >
              <span className="font-body text-15 font-medium text-marine transition-transform duration-300 group-hover:translate-x-[0.25rem]">
                {l}
              </span>
              <span className="font-heading text-16 font-light text-meta-txt">{p}</span>
            </div>
          ))}
        </div>
        <UnderlineLink className="mt-8">Voir la carte</UnderlineLink>
      </div>
    </section>
  )
}
