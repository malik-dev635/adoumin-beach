import MapLeaflet, { ITINERAIRE_URL, YANGO_URL } from '../shared/MapLeaflet.jsx'
import { BookButton, Heading, Overline } from './ui.jsx'
import { YangoModal, useYango } from '../shared/Yango.jsx'

/**
 * Frame Pencil `Carte` de Lay2 (id EdqXn) : fill #F1EFE9, vertical, gap 44, padding [100,120].
 *  - Header (FkwKt) : overline "NOUS SITUER" + titre Futura 52/300 lh 1.05, bouton marine [15,26]
 *  - Body : carte 460 de haut
 * Le titre reprend celui retenu sur Lay1 (« Cocody, côté lagune ») et la carte prend toute la
 * largeur : la section `Infos` juste au-dessus donne deja adresse, horaires et contact.
 */
export default function Carte() {
  const yango = useYango()

  return (
    <section className="flex w-full flex-col gap-32 bg-paper-2 px-32 py-[3.5rem] sm:py-80 lg:gap-44 lg:py-100">
      <div className="reveal flex w-full flex-col items-start justify-between gap-24 sm:flex-row sm:items-end sm:gap-40">
        <div className="flex flex-col gap-16">
          <Overline>NOUS SITUER</Overline>
          <Heading lines={['Cocody,', 'côté lagune']} sizeClass="text-52" />
        </div>
        <div className="flex flex-wrap gap-12">
          <BookButton href={ITINERAIRE_URL}>Itinéraire</BookButton>
          {/* Yango : l'app de VTC d'Abidjan, une course vers le resort en un tap */}
          <BookButton href={YANGO_URL} tone="yango" onClick={yango.onClick}>
            Commander un Yango
          </BookButton>
        </div>
      </div>

      <div className="reveal w-full" style={{ '--d': '0.12s' }}>
        <MapLeaflet className="h-[20rem] w-full overflow-hidden rounded-4 bg-map-bg lg:h-460" zoom={15} />
      </div>
      <YangoModal open={yango.open} onClose={yango.close} radiusClass="rounded-4" />
    </section>
  )
}
