import Hero from './Hero.jsx'
import Intro from '../lay2/Intro.jsx'
import Experience from '../lay2/Experience.jsx'
import Restaurant from '../lay2/Restaurant.jsx'
import Events from '../lay2/Events.jsx'
import Gallery from '../lay2/Gallery.jsx'
import Reviews from '../lay2/Reviews.jsx'
import FAQ from '../lay2/FAQ.jsx'
import Infos from '../lay2/Infos.jsx'
import Carte from '../lay2/Carte.jsx'
import CtaFooter from '../lay2/CtaFooter.jsx'
import useReveal from '../shared/useReveal.js'

/**
 * Frame Pencil `Landing — Lay3` (id qqnlq) : 1440 de large, fill #F7F5F1, layout vertical.
 * Le corps est identique a Lay2, noeud pour noeud et mot pour mot (verifie via MCP) : seule
 * difference, le hero (`Hero Alt — ERA`, 860 de haut). Les sections sont donc celles de Lay2.
 */
export default function LandingLay3() {
  useReveal()

  return (
    <div className="mx-auto flex w-full max-w-1440 flex-col overflow-x-hidden bg-paper">
      <Hero />
      <Intro />
      <Experience />
      <Restaurant />
      <Events />
      <Gallery />
      <Reviews />
      <FAQ />
      <Infos />
      <Carte />
      <CtaFooter />
    </div>
  )
}
