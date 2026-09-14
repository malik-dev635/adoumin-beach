import { BookButton, Heading, Overline } from './ui.jsx'

/**
 * Frame Pencil `Infos` (id K3wM8) : fill #F7F5F1, vertical, gap 44, padding [100,120].
 *  - Header : overline "NOUS TROUVER" + titre "Réservez votre / table avec vue" 52/300 ;
 *    bouton marine "Réserver une table"
 *  - Divider 1 px #DED8CE
 *  - Info Row gap 40, trois colonnes : intitule 11/700 ls 1.5 #8A94A0, lignes Jost 19/300 lh 1.35
 */
const COLS = [
  { h: 'HORAIRES', lignes: ['Tous les jours', '12h – 02h'] },
  { h: 'ADRESSE', lignes: ['Cocody – Blockhauss, Abidjan', 'À gauche de la gare lagunaire SOTRA'] },
  { h: 'CONTACT', lignes: ['+225 07 78 61 68 99', 'contact@adoumin.ci'] },
]

export default function Infos() {
  return (
    <section className="flex w-full flex-col gap-32 bg-paper px-32 py-[3.5rem] sm:py-80 lg:gap-44 lg:py-100">
      <div className="reveal flex w-full flex-col items-start justify-between gap-24 sm:flex-row sm:items-end sm:gap-40">
        <div className="flex flex-col gap-16">
          <Overline>NOUS TROUVER</Overline>
          <Heading lines={['Réservez votre', 'table avec vue']} sizeClass="text-52" />
        </div>
        <BookButton>Réserver une table</BookButton>
      </div>

      <div className="reveal h-[1px] w-full bg-map-divider" />

      <div className="flex w-full flex-col gap-24 sm:flex-row sm:gap-40">
        {COLS.map(({ h, lignes }, i) => (
          <div key={h} className="reveal flex min-w-0 flex-1 flex-col gap-12" style={{ '--d': `${i * 0.08}s` }}>
            <span className="font-body text-11 font-bold tracking-1.5 text-meta-txt">{h}</span>
            <div className="flex flex-col gap-4">
              {lignes.map((l) => (
                <span key={l} className="font-heading text-19 font-light leading-1.35 text-marine">
                  {l}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
