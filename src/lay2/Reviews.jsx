import { Stars } from '../shared/Star.jsx'
import { Heading, Overline } from './ui.jsx'

/**
 * Frame Pencil `Reviews` (id k8czCk) : fill #F1EFE9, vertical, gap 52, padding [110,120].
 *  - Header : overline "ILS Y SONT ALLÉS" + titre "Ce qu'ils / en disent" 52/300 ;
 *    a droite, note "4,1 / 5" Jost 30/300 et "120+ avis vérifiés" 13 #8A94A0
 *  - Grid gap 40, trois avis : filet haut #DED8CE, padding-top 28, gap 18 —
 *    etoiles 13 px, citation Jost 19/300 lh 1.4 marine, auteur 14/500 #8A94A0
 */
const AVIS = [
  { q: 'Superbe cadre, bonne ambiance et personnel accueillant. On y revient pour la vue.', a: 'Awa K. · Cocody' },
  { q: 'Un endroit paisible avec une vue magnifique sur la lagune Ébrié.', a: 'Client vérifié' },
  { q: "The place to be. L'ambiance, la cuisine et le coucher de soleil : parfait.", a: 'Cliente vérifiée' },
]

export default function Reviews() {
  return (
    <section className="flex w-full flex-col gap-40 bg-paper-2 px-32 py-[3.5rem] sm:py-80 lg:gap-52 lg:py-110">
      <div className="reveal flex w-full flex-col items-start justify-between gap-24 sm:flex-row sm:items-end sm:gap-40">
        <div className="flex flex-col gap-16">
          <Overline>ILS Y SONT ALLÉS</Overline>
          <Heading lines={["Ce qu'ils", 'en disent']} sizeClass="text-52" />
        </div>
        <div className="flex flex-col gap-6 sm:items-end">
          <span className="font-heading text-30 font-light text-marine">4,1 / 5</span>
          <span className="font-body text-13 font-normal text-meta-txt">120+ avis vérifiés</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-24 md:flex-row md:gap-40">
        {AVIS.map(({ q, a }, i) => (
          <blockquote
            key={a}
            className="reveal flex min-w-0 flex-1 flex-col gap-18 border-t border-map-divider pt-28"
            style={{ '--d': `${i * 0.1}s` }}
          >
            <Stars size={13} />
            <p className="font-heading text-19 font-light leading-1.4 text-marine">{q}</p>
            <cite className="font-body text-14 font-medium not-italic text-meta-txt">{a}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
