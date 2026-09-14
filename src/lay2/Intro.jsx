import { Heading, Overline, UnderlineLink } from './ui.jsx'

/**
 * Frame Pencil `Intro` (id Lw0QV) : fill #F7F5F1, padding 120, gap 80 —
 *  - Left (w 600) : overline "LE LIEU", titre 3 lignes Futura 56/300 lh 1.06
 *  - Right (fill) : deux paragraphes 17 lh 1.65 #4C5563, lien "Découvrir l'expérience"
 */
export default function Intro() {
  return (
    <section className="flex w-full flex-col gap-40 bg-paper px-32 py-[3.5rem] sm:py-80 lg:flex-row lg:gap-80 lg:py-120">
      <div className="reveal flex flex-col gap-26 lg:w-600 lg:shrink-0">
        <Overline>LE LIEU</Overline>
        <Heading lines={['Là où Abidjan', 'se retrouve, se régale', 'et célèbre.']} sizeClass="text-56" leadingClass="leading-1.06" />
      </div>
      <div className="reveal flex flex-1 flex-col gap-28 lg:pt-6" style={{ '--d': '0.12s' }}>
        <p className="font-body text-17 font-normal leading-1.65 text-text-2">
          Sur les rives de la lagune Ébrié, à Cocody, Adoumin Beach Resort réunit un restaurant, une
          piscine, un rooftop et un espace de réception dans un même cadre exotique.
        </p>
        <p className="font-body text-17 font-normal leading-1.65 text-text-2">
          Une cuisine africaine et européenne, une vue imprenable sur la baie de Cocody, et l&apos;art
          de recevoir — du déjeuner paisible à la soirée animée.
        </p>
        <UnderlineLink>Découvrir l&apos;expérience</UnderlineLink>
      </div>
    </section>
  )
}
