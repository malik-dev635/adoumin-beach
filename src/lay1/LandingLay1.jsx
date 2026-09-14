import Hero from './Hero.jsx'
import Experience from './Experience.jsx'
import RestaurantList from './RestaurantList.jsx'
import SpacesCarousel from './SpacesCarousel.jsx'
import Testimonials from './Testimonials.jsx'
import FAQ from './FAQ.jsx'
import Carte from './Carte.jsx'
import FinalCTA from './FinalCTA.jsx'
import Footer from './Footer.jsx'
import useReveal from '../shared/useReveal.js'

/**
 * Frame Pencil `Landing — Lay1` (id kORQl) : 1440 de large, fill blanc, layout vertical.
 * Ordre des sections lu via MCP :
 * Hero, Experience, Restaurant List, Spaces Carousel, Testimonials, FAQ, Carte, Final CTA, Footer.
 *
 * `overflow-x-hidden` : les photos laterales du carrousel debordent volontairement de 10 px de
 * chaque cote (la frame Pencil ne clippe pas). Sur le web ce debord creerait une barre de scroll
 * horizontale, on le rogne au bord de la page.
 */
export default function LandingLay1() {
  useReveal()

  return (
    <div className="mx-auto flex w-full max-w-1440 flex-col overflow-x-hidden bg-white">
      <Hero />
      <Experience />
      <RestaurantList />
      <SpacesCarousel />
      <Testimonials />
      <FAQ />
      <Carte />
      <FinalCTA />
      <Footer />
    </div>
  )
}
