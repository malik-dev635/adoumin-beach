import { ArrowRight } from 'lucide-react'

/**
 * Frame Pencil `Footer` (id fNXVy) : 1440x643, clip, fill #0E1E3D, layout "none".
 *  - Hero Image (Hk8i9) x975 y35 542x708, image Logo_Jewi-Photoroom.png, fill opacity 0.15
 *  - Top (tBEZl)  x120 y70  w1200, gap 60 — Newsletter (w360) + Cols (gap 56)
 *  - Divider (BEdux) x120 y289 w1200 h1 #FFFFFF1A
 *  - Mid (SQjAE)  x120 y330 w1200, space_between
 *  - Wordmark : on suit la variante capitales du .pen, le noeud nY3JB du footer de Lay3
 *    ("ADOUMIN", Futura 250 poids 300, lh 0.9, letterSpacing -4, pose en x139 y450) plutot que
 *    le V4ACg de Lay1 ("Adoumin", poids 500, x252 y431).
 */

const COLS = [
  { h: 'PAGES', links: ["L'expérience", 'Restaurant', 'Événements', 'Soirées', 'Galerie'] },
  { h: 'INFOS', links: ['À propos', 'Réserver', 'Nous trouver', 'Horaires', 'Contact'] },
  { h: 'SUIVEZ-NOUS', links: ['Instagram', 'Facebook', 'TikTok', 'WhatsApp'] },
]

function Newsletter() {
  return (
    <div className="flex w-full flex-col gap-18 lg:w-360 lg:shrink-0">
      <h3 className="font-futura text-28 font-light leading-1.15 text-white">
        Restons connectés avec l&apos;essentiel
      </h3>
      <form
        className="flex w-full items-center justify-between rounded-40 bg-w-14 py-8 pl-20 pr-8 lg:w-320"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Votre e-mail…"
          className="w-full bg-transparent font-body text-15 font-normal text-white outline-none transition-colors placeholder:text-w-80 focus:placeholder:text-w-cc"
        />
        <button
          type="submit"
          aria-label="S'inscrire"
          className="group flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-999 bg-gold transition-all duration-300 hover:scale-105 hover:brightness-95"
        >
          <ArrowRight size={20} strokeWidth={2} className="text-marine transition-transform duration-300 group-hover:translate-x-[2px]" />
        </button>
      </form>
      <span className="font-body text-13 font-normal text-w-80">
        Pas de spam. Juste nos actus et bons plans.
      </span>
    </div>
  )
}

function Cols() {
  return (
    <div className="flex flex-wrap gap-56">
      {COLS.map(({ h, links }) => (
        <div key={h} className="flex flex-col gap-14">
          <span className="font-body text-11 font-bold tracking-1.5 text-w-66">{h}</span>
          {links.map((l) => (
            <a key={l} href="#" className="tap w-fit font-body text-15 font-normal text-w-cc transition-all duration-300 hover:translate-x-[0.25rem] hover:text-white">
              {l}
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-footer-bg px-24 pb-0 pt-[3.5rem] lg:h-643 lg:px-0 lg:py-0">
      {/* Hero Image : logo en filigrane, opacity 0.15 */}
      <img
        src="/asset/images/Logo_Jewi-Photoroom.png"
        alt=""
        className="pointer-events-none absolute right-[-14%] top-[4%] h-[96%] w-auto object-contain opacity-15 lg:h-[110.1089%] lg:w-[37.6389%] lg:object-cover lg:[left:67.7083%] lg:[top:5.4432%] lg:[right:auto]"
      />

      {/* Top */}
      <div className="reveal relative flex w-full flex-col justify-between gap-60 lg:absolute lg:left-[6.6667%] lg:top-[10.8865%] lg:w-[86.6667%] lg:flex-row">
        <Newsletter />
        <Cols />
      </div>

      {/* Divider */}
      <div className="relative my-32 h-[1px] w-full bg-w-1a lg:absolute lg:left-[6.6667%] lg:top-[44.9456%] lg:my-0 lg:w-[86.6667%]" />

      {/* Mid */}
      <div className="relative flex w-full flex-col items-start justify-between gap-8 lg:absolute lg:left-[6.6667%] lg:top-[51.3219%] lg:w-[86.6667%] lg:flex-row lg:items-center lg:gap-0">
        <span className="font-body text-13 font-normal text-w-80">
          Adoumin Beach Resort — Tous droits réservés © 2026
        </span>
        <span className="font-body text-13 font-normal text-w-80">The Place To Be</span>
      </div>

      {/* Wordmark */}
      <div className="reveal relative mt-40 flex justify-center lg:absolute lg:left-[9.6528%] lg:top-[69.984%] lg:mt-0 lg:block">
        <span className="block font-futura text-[19vw] font-light leading-[0.78] tracking-[-0.25rem] text-white lg:leading-0.9 lg:text-250">
          ADOUMIN
        </span>
      </div>
    </footer>
  )
}
