import Hero from './Hero.jsx'
import Intro from './Intro.jsx'
import Experience from './Experience.jsx'
import Restaurant from './Restaurant.jsx'
import Events from './Events.jsx'
import Gallery from './Gallery.jsx'
import Reviews from './Reviews.jsx'
import FAQ from './FAQ.jsx'
import Infos from './Infos.jsx'
import Carte from './Carte.jsx'
import CtaFooter from './CtaFooter.jsx'
import useReveal from '../shared/useReveal.js'

/**
 * Frame Pencil `Landing — Lay2` (id PSE3p) : 1440 de large, fill #F7F5F1, layout vertical.
 * Ordre des sections lu via MCP :
 * Hero, Intro, Experience, Restaurant, Events, Gallery, Reviews, FAQ, Infos, Carte, CTA + Footer
 * (le footer est celui de `Landing — Lay3`, a la demande).
 */
export default function LandingLay2() {
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
