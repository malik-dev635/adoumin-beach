import { Heading, Overline, UnderlineLink } from './ui.jsx'

/**
 * Frame Pencil `Events` (id sriOD) : fill #F1EFE9, padding [110,120], gap 80, alignItems center.
 *  - Text (fill) gap 26 : overline "ÉVÉNEMENTS & SÉMINAIRES", titre 56/300, paragraphe 16 lh 1.6,
 *    Stats (gap 56, padding-top 10 : valeur Jost 58/200 lh 1 + libelle 13 #8A94A0), lien "Demander un devis"
 *  - Img 580x620 radius 4 (a droite), asset/images/SaveClip.App_773735872_...jpg
 */
const STATS = [
  ['1 000', 'personnes accueillies'],
  ['4-en-1', 'espace modulable'],
]

export default function Events() {
  return (
    <section className="flex w-full flex-col-reverse gap-40 bg-paper-2 px-32 py-[3.5rem] sm:py-80 lg:flex-row lg:items-center lg:gap-80 lg:py-110">
      <div className="reveal flex flex-1 flex-col gap-26">
        <Overline>ÉVÉNEMENTS &amp; SÉMINAIRES</Overline>
        <Heading lines={['Vos moments,', 'en grand']} sizeClass="text-56" />
        <p className="font-body text-16 font-normal leading-1.6 text-text-2">
          Mariage, anniversaire, séminaire d&apos;entreprise ou soirée privée : notre équipe orchestre
          votre événement de A à Z, dans un cadre que vos invités n&apos;oublieront pas.
        </p>
        <div className="flex w-full gap-40 pt-10 sm:gap-56">
          {STATS.map(([v, l]) => (
            <div key={l} className="flex flex-col gap-4">
              <span className="font-heading text-58 font-extralight leading-1 text-marine">{v}</span>
              <span className="font-body text-13 font-normal text-meta-txt">{l}</span>
            </div>
          ))}
        </div>
        <UnderlineLink className="mt-8">Demander un devis</UnderlineLink>
      </div>

      <div
        className="reveal reveal-wipe reveal-wipe-right aspect-[4/3] w-full overflow-hidden rounded-4 sm:aspect-[580/620] lg:h-620 lg:w-580 lg:shrink-0"
        style={{ '--d': '0.12s' }}
      >
        <img
          src="/asset/images/SaveClip.App_773735872_18131074696649928_6645806752556244771_n.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
