import { useCallback, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

/**
 * Frame Pencil `Hero` (id UgnSF) : 1440x820, contient la frame `Hero` (KaRNU) 1420x800 en
 * layout: "none" (positionnement absolu). Positions converties en pourcentages de 1420x800
 * pour rester exactes a 1440px et proportionnelles en dessous.
 *
 *  - Hero BG     : rect 0,0 1420x800, image asset/images/383a17ac-...png (mode fill)
 *  - Nav         : x300 y0, 840x53, fill blanc, cornerRadius [0,0,20,20], padding [0,24]
 *  - Hero Heading: x120 y477, w820 — "Vivez Abidjan" Futura 92/500 lh 1 blanc
 *  - H1 b        : x120 y569 — "les pieds dans l'eau" Jost 92/400 lh 1 #ffffffcc
 *  - Subhead     : x120 y680, w520 — Mulish 18 lh 1.5 #FFFFFFD9
 *
 * Mouvement (hors design) : zoom lent de la photo, entree en cascade des trois blocs de texte,
 * soulignement des liens de nav, relief sur le bouton Reserver.
 *
 * Regle : le hero tient sur un ecran. Hauteur = 100svh plafonnee a 820 (la maquette), plancher 520 ;
 * la composition interne est en % de la frame, donc elle suit.
 */

const NAV_LEFT = ["L'expérience", 'Menu', 'Galerie']
const NAV_MOBILE = [
  ['01', "L'expérience"],
  ['02', 'Menu'],
  ['03', 'Galerie'],
  ['04', 'Événements'],
]

/**
 * Menu telephone : la barre blanche aux coins ronds descend comme un volet jusqu'a couvrir l'ecran
 * (elle garde ses coins arrondis en bas pendant tout le mouvement), les liens arrivent en cascade,
 * le bouton or prend toute la largeur en bas. Sa premiere ligne reprend la barre (logo au meme
 * endroit, la croix a la place du burger) pour que rien ne saute.
 */
function MenuSheet({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = scrollbar > 0 ? `${scrollbar}px` : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [open, onClose])

  const enter = open ? 'translate-y-0 opacity-100' : 'translate-y-[0.75rem] opacity-0'
  const stagger = (i) => ({ transitionDelay: open ? `${260 + i * 60}ms` : '0ms' })

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 flex h-[100svh] flex-col rounded-b-20 bg-white transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
        open ? 'translate-y-0' : 'pointer-events-none -translate-y-full'
      }`}
      aria-hidden={!open}
    >
      {/* meme ligne que la barre : croix a la place du burger, logo au centre */}
      <div className="flex h-[4rem] shrink-0 items-center justify-between px-16">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="-ml-4 flex h-40 w-40 items-center justify-center text-marine transition-transform duration-300 hover:rotate-90"
        >
          <X size={22} strokeWidth={2} />
        </button>
        <img
          src="/asset/images/Screenshot 2026-09-08 170122-Photoroom.png"
          alt="Adoumin Beach Resort"
          className="h-[1.875rem] w-[6.25rem] object-contain"
        />
        <span className="w-40" aria-hidden="true" />
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-4 px-24">
        {NAV_MOBILE.map(([n, label], i) => (
          <a
            key={label}
            href="#"
            onClick={onClose}
            className={`group flex items-baseline gap-14 py-10 transition-all duration-500 ${enter}`}
            style={stagger(i)}
          >
            <span className="font-body text-11 font-bold tracking-1.5 text-gold">{n}</span>
            <span className="font-futura text-[2.5rem] font-medium leading-1 text-marine transition-transform duration-300 group-active:translate-x-[0.5rem]">
              {label}
            </span>
          </a>
        ))}
      </nav>

      <div
        className={`flex flex-col gap-14 px-24 pb-24 transition-all duration-500 ${enter}`}
        style={stagger(NAV_MOBILE.length)}
      >
        <div className="flex items-center justify-between">
          <span className="font-body text-12 text-body-txt">Tous les jours · 12h – 02h</span>
          <a href="tel:+2250778616899" className="font-body text-12 font-semibold text-marine">
            +225 07 78 61 68 99
          </a>
        </div>
        <a
          href="#"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-40 bg-gold py-15 font-body text-15 font-bold text-marine"
        >
          Réserver
        </a>
      </div>
    </div>
  )
}

/**
 * Barre de navigation. En desktop elle reprend la frame `Nav` du .pen (liens a gauche, logo au
 * centre, Evenements + bouton a droite). Sous 768 px le design ne prevoit rien : barre telephone
 * (menu, logo, CTA) et volet `MenuSheet`.
 */
function NavBar() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <div className="relative">
      <div className="flex h-[4rem] w-full items-center justify-between rounded-b-20 bg-white px-16 md:px-24 lg:h-53">
        {/* Bouton menu (telephone uniquement) */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Ouvrir le menu"
          className="-ml-4 flex h-40 w-40 items-center justify-center text-marine md:hidden"
        >
          <Menu size={22} strokeWidth={2} />
        </button>

        <div className="hidden items-center gap-22 md:flex">
          {NAV_LEFT.map((label) => (
            <a
              key={label}
              href="#"
              className="link-underline font-body text-14 font-medium text-ink transition-colors duration-300 hover:text-marine"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="h-[1.875rem] w-[6.25rem] shrink-0 overflow-hidden sm:h-[2.125rem] sm:w-[6.875rem] lg:h-39 lg:w-125">
          <img
            src="/asset/images/Screenshot 2026-09-08 170122-Photoroom.png"
            alt="Adoumin Beach Resort"
            className="h-full w-full object-contain object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex items-center gap-16">
          <a
            href="#"
            className="link-underline hidden font-body text-14 font-medium text-ink transition-colors duration-300 hover:text-marine md:inline"
          >
            Événements
          </a>
          <button
            type="button"
            className="flex items-center rounded-40 bg-gold px-16 py-10 font-body text-13 font-bold text-marine transition-all duration-300 hover:-translate-y-[2px] hover:brightness-95 active:translate-y-0 sm:px-20 sm:py-11 sm:text-14"
          >
            Réserver
          </button>
        </div>
      </div>

      <MenuSheet open={open} onClose={close} />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="flex h-[100svh] max-h-[51.25rem] min-h-[32.5rem] w-full items-center justify-center overflow-hidden lg:py-10">
      {/* frame `Hero` KaRNU : 1420x800 */}
      <div className="relative w-full self-stretch overflow-hidden lg:h-full lg:w-[98.6111%]">
        <img
          src="/asset/images/383a17ac-ca87-4f47-b874-64aa687c0e3f.png"
          alt=""
          className="absolute inset-0 h-full w-full animate-[slow-zoom_1.6s_cubic-bezier(0.22,0.61,0.36,1)_both] object-cover"
        />

        {/* Nav : x300/1420 = 21.1268%, w840/1420 = 59.1549% */}
        <div className="relative z-20 animate-[rise-in_0.8s_cubic-bezier(0.22,0.61,0.36,1)_both] lg:absolute lg:left-[21.1268%] lg:top-0 lg:w-[59.1549%]">
          <NavBar />
        </div>

        {/* Voile de lisibilite (hors design) : degrade partant de zero, juste assez marque sous le
            bloc de titre. Plus leger en desktop, ou le texte tombe deja sur une zone sombre. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[70%] lg:hidden"
          style={{ background: 'linear-gradient(180deg, #0E1E3D00 0%, #0E1E3D40 55%, #0E1E3D80 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-[58%] lg:block"
          style={{ background: 'linear-gradient(180deg, #0E1E3D00 0%, #0E1E3D33 50%, #0E1E3D66 100%)' }}
        />

        {/* Hero Heading + H1 b + Subhead — le wrapper couvre exactement la frame en lg
            pour que les positions en % correspondent au 1420x800 du design. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-24 pb-40 pt-60 lg:inset-0 lg:p-0">
          <div
            className="animate-[rise-in_0.9s_cubic-bezier(0.22,0.61,0.36,1)_both] lg:absolute lg:left-[6.7606%] lg:top-[59.625%] lg:w-[57.7465%]"
            style={{ animationDelay: '0.15s' }}
          >
            <h1 className="font-futura text-[2.125rem] font-medium leading-1 text-white sm:text-[2.875rem] lg:text-92">
              Vivez Abidjan
            </h1>
          </div>
          <div
            className="mt-0 animate-[rise-in_0.9s_cubic-bezier(0.22,0.61,0.36,1)_both] lg:absolute lg:left-[6.7606%] lg:top-[71.125%]"
            style={{ animationDelay: '0.28s' }}
          >
            <p className="font-heading text-[2.125rem] font-normal leading-1 text-[#ffffffcc] sm:text-[2.875rem] lg:text-92">
              les pieds dans l&apos;eau
            </p>
          </div>
          <div
            className="mt-24 max-w-full animate-[rise-in_0.9s_cubic-bezier(0.22,0.61,0.36,1)_both] lg:absolute lg:left-[6.7606%] lg:top-[85%] lg:mt-0 lg:w-520"
            style={{ animationDelay: '0.42s' }}
          >
            <p className="font-body text-15 font-normal leading-1.5 text-w-d9 md:text-18">
              Restaurant, piscine, rooftop et soirées, face à la baie de Cocody. The Place To Be.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
