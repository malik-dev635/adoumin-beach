import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/**
 * Carte reelle partagee par les variantes : Leaflet + fond OpenStreetMap standard (carte « normale »,
 * en couleurs, gratuite avec attribution, sans cle API). Le marqueur reprend le noeud `Marker` du design :
 * pastille marine 48 px, icone map-pin, halo or qui pulse, etiquette blanche en dessous.
 * Position : Adoumin Beach Resort, pointe de Blockhauss (Cocody) sur la lagune Ebrie.
 */
export const POSITION = [5.323278, -4.001685]
export const ITINERAIRE_URL = `https://www.google.com/maps/dir/?api=1&destination=${POSITION[0]},${POSITION[1]}`
/** Lien profond Yango (l'app de VTC d'Abidjan) : ouvre une course vers le resort. Fourni par le client. */
export const YANGO_URL =
  'https://yango.go.link/route?end-lat=5.3215193&end-lon=-4.0018253&ref=malik-dev&lang=fr&adj_deeplink_js=1'

const TUILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

/* Icone map-pin de lucide en SVG inline : le marqueur Leaflet est du HTML brut */
const PIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>'

const MARKER_HTML = `
  <div class="flex flex-col items-center gap-12">
    <div class="relative flex h-[3rem] w-[3rem] items-center justify-center">
      <span class="absolute h-[5.25rem] w-[5.25rem] animate-[halo-pulse_3.2s_ease-in-out_infinite] rounded-999 bg-gold opacity-30"></span>
      <span class="relative flex h-[3rem] w-[3rem] items-center justify-center rounded-999 bg-marine text-white">${PIN_SVG}</span>
    </div>
    <div class="flex flex-col gap-3 rounded-3 bg-white px-16 py-11 shadow-[0_2px_12px_rgba(14,30,61,0.12)]">
      <span class="whitespace-nowrap font-body text-14 font-bold text-marine">Adoumin Beach Resort</span>
      <span class="whitespace-nowrap font-body text-11 font-semibold tracking-0.6 text-meta-txt">Blockhauss · Cocody</span>
    </div>
  </div>`

/**
 * @param {string} className classes du conteneur (il doit avoir une hauteur : `.map-frame` ou autre)
 * @param {number} zoom niveau initial
 */
export default function MapLeaflet({ className = 'map-frame bg-map-bg', zoom = 15 }) {
  const frameRef = useRef(null)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return undefined

    const map = L.map(el, {
      center: POSITION,
      zoom,
      zoomControl: false,
      scrollWheelZoom: false, // ne pas confisquer le scroll de la page
    })
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    L.tileLayer(TUILES, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(map)

    const icon = L.divIcon({
      className: 'adoumin-marker',
      html: MARKER_HTML,
      iconSize: [186, 117],
      iconAnchor: [93, 24], // centre de la pastille sur la position
    })
    L.marker(POSITION, { icon, keyboard: false }).addTo(map)

    // le conteneur change de taille avec la fenetre : Leaflet doit recalculer
    const ro = new ResizeObserver(() => map.invalidateSize())
    ro.observe(el)

    return () => {
      ro.disconnect()
      map.remove()
    }
  }, [zoom])

  return (
    <div
      ref={frameRef}
      className={className}
      role="region"
      aria-label="Carte : Adoumin Beach Resort, Blockhauss, Cocody"
    />
  )
}
