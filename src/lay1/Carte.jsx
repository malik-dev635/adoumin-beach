import { ArrowUpRight } from 'lucide-react'
import MapLeaflet, { ITINERAIRE_URL } from '../shared/MapLeaflet.jsx'
import { Badge, Title } from './ui.jsx'

/**
 * Frame Pencil `Carte` (id zd5TV) : fill blanc, vertical, gap 44, padding [80,120].
 * `Body` (pBBnV) : gap 32 — `Map` (lsyKO, fill #EFF2F4, h 460, layout "none") + `Accès` (nx3RH, w 340).
 * Le plan stylise du .pen est remplace par une vraie carte (composant partage MapLeaflet).
 */

/**
 * Infos pratiques du panneau lateral. Contenu repris des noeuds `Infos` du .pen (frame E9ksvR),
 * mis en forme avec le meme motif : intitule 11/700/ls 1.5 puis lignes Jost 19/300.
 */
const INFOS = [
  { h: 'ADRESSE', lignes: ['Cocody – Blockhauss, Abidjan', 'À gauche de la gare lagunaire SOTRA'] },
  { h: 'HORAIRES', lignes: ['Tous les jours', '12h – 02h'] },
  { h: 'CONTACT', lignes: ['+225 07 78 61 68 99', 'contact@adoumin.ci'] },
]

export default function Carte() {
  return (
    <section className="flex w-full flex-col gap-44 bg-white px-96 py-[3.5rem] sm:py-80">
      <div className="reveal flex w-full flex-col items-center gap-16">
        <Badge>NOUS TROUVER</Badge>
        <Title
          a="Cocody,"
          b="côté lagune"
          sizeClass="text-46"
          wrapClass="flex flex-row flex-wrap justify-center gap-12"
        />
      </div>

      <div className="flex w-full flex-col gap-32 lg:flex-row">
        <div className="reveal flex-1">
          <MapLeaflet />
        </div>

        {/* Accès : w 340, justifyContent space_between — s'etire sur la hauteur de la carte */}
        <div
          className="reveal flex w-full flex-col justify-between gap-26 lg:w-340 lg:shrink-0 lg:self-stretch"
          style={{ '--d': '0.12s' }}
        >
          <div className="flex w-full flex-col">
            {INFOS.map(({ h, lignes }, i) => (
              <div key={h} className="w-full">
                {i > 0 && <div className="h-[1px] w-full bg-map-divider" />}
                <div className="flex w-full flex-col gap-10 py-13">
                  <span className="font-body text-11 font-bold tracking-1.5 text-meta-txt">{h}</span>
                  <div className="flex w-full flex-col gap-4">
                    {lignes.map((l) => (
                      <span key={l} className="font-heading text-19 font-light leading-1.35 text-marine">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col gap-22">
            <p className="font-body text-13 font-normal leading-1.5 text-title-b">
              Voiturier sur place. Accès direct par la lagune sur réservation.
            </p>
            <a
              href={ITINERAIRE_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex w-fit items-center gap-8 bg-marine px-26 py-15 transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#16294F]"
            >
              <span className="font-body text-15 font-semibold text-white">Itinéraire</span>
              <ArrowUpRight
                size={18}
                strokeWidth={2}
                className="text-white transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
