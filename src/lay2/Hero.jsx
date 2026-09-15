import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Star from '../shared/Star.jsx'
import useCountUp from '../shared/useCountUp.js'
import { BookButton } from './ui.jsx'

/**
 * Frame Pencil `Hero` (id Z2UAt2) : 1440x900, fill #F7F5F1, padding 24, gap 48, deux colonnes
 * (rendu avec un cadre plus fin, padding 10 / gap 12, a la demande) —
 *  - Hero Image (vs7OP) 780 x fill, radius 4, asset/images/Gemini_Generated_Image_gsnk92gsnk92gsnk.jpg
 *  - Right (E1RFoR) 581 x fill, fill marine, layout "none" :
 *      Dot            x483 y-26 125x125 blanc — c'est le bouton menu
 *      TopBar         x30 y20  w521 : logo 133x34 + icone menu 28 (posee dans la pastille)
 *      Heading Block  overline "BIENVENUE À" + titre Futura 62/300 lh 0.98
 *      Stat Bar       x30 y740 w521 : filet haut #ded8ce80, desc 15, note 4,1 + etoiles, 120+ avis, bouton
 *      Logo filigrane x237 y-43 617x1038, opacity 0.15 (positions du design respectees)
 *
 * Regle : le hero tient sur un ecran (100svh, plafond 900 = la maquette).
 * Sous 1024 px : un seul panneau marine avec la photo en fond voilee, contenu en flux.
 *
 * Arrivee : les deux volets se deploient (photo depuis la gauche, panneau depuis la droite), la
 * pastille tombe en place, le titre sort de ses masques ligne par ligne, le filet de la Stat Bar se
 * trace et les chiffres se comptent. Chronologie dans `T`.
 *
 * Menu : la pastille blanche est une graine. Au clic elle grandit (clip-path circle depuis son
 * centre) jusqu'a couvrir l'ecran et devient le fond du menu ; les liens entrent ensuite en cascade.
 */

const MENU = [
  ['01', "L'expérience"],
  ['02', 'Restaurant'],
  ['03', 'Événements'],
  ['04', 'Galerie'],
  ['05', 'Réserver'],
]
const MENU_INFOS = [
  ['HORAIRES', 'Tous les jours · 12h – 02h'],
  ['ADRESSE', 'Cocody – Blockhauss, à gauche de la gare lagunaire SOTRA'],
  ['CONTACT', '+225 07 78 61 68 99 · contact@adoumin.ci'],
]
const MENU_SOCIAL = ['Instagram', 'Facebook', 'TikTok', 'WhatsApp']

/**
 * Menu plein ecran. Deux colonnes : les liens numerotes a gauche, un panneau photo a droite qui
 * reprend l'univers du hero (photo, voile marine, infos pratiques, bouton). Au telephone tout
 * s'empile, la photo en dernier.
 */
function MenuOverlay({ open, origin, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    // on bloque le scroll sans faire sauter la page : la largeur de la barre est compensee
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = scrollbar > 0 ? `${scrollbar}px` : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [open, onClose])

  const stagger = (i, base = 380) => ({ transitionDelay: open ? `${base + i * 55}ms` : '0ms' })
  const enter = open ? 'translate-y-0 opacity-100' : 'translate-y-[1rem] opacity-0'

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        open ? '' : 'pointer-events-none'
      }`}
      style={{ clipPath: `circle(${open ? '160%' : '0%'} at ${origin.x}px ${origin.y}px)` }}
      aria-hidden={!open}
    >
      {/* barre : logo + fermer */}
      <div className="flex shrink-0 items-center justify-between px-24 py-16 lg:px-40">
        <img
          src="/asset/images/Screenshot 2026-09-08 170122-Photoroom.png"
          alt="Adoumin Beach Resort"
          className="h-[2.125rem] w-[8.3125rem] object-contain object-left"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-999 text-marine transition-all duration-300 hover:rotate-90 hover:bg-paper-2"
        >
          <X size={28} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        {/* colonne liens */}
        <div className="flex flex-col justify-between px-24 pb-24 pt-16 lg:flex-1 lg:px-32 lg:pb-32">
          <nav className="flex flex-col">
            {MENU.map(([n, label], i) => (
              <a
                key={label}
                href="#"
                onClick={onClose}
                className={`group flex items-baseline gap-16 border-b border-line-3 py-12 transition-all duration-500 last:border-b-0 lg:py-14 ${enter}`}
                style={stagger(i)}
              >
                <span className="font-body text-11 font-bold tracking-1.5 text-gold">{n}</span>
                <span className="font-futura text-[2.25rem] font-light leading-1.05 text-marine transition-transform duration-300 group-hover:translate-x-[0.5rem] sm:text-48 lg:text-56">
                  {label}
                </span>
                <span className="ml-auto h-6 w-6 rounded-999 bg-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            ))}
          </nav>
          <div
            className={`mt-24 flex flex-wrap items-center gap-x-20 gap-y-8 transition-all duration-500 ${enter}`}
            style={stagger(MENU.length)}
          >
            {MENU_SOCIAL.map((s) => (
              <a key={s} href="#" className="tap link-underline font-body text-13 font-semibold text-marine">
                {s}
              </a>
            ))}
            <span className="ml-auto font-body text-12 text-meta-txt">© 2026 Adoumin Beach Resort</span>
          </div>
        </div>

        {/* panneau photo : univers du hero */}
        <div
          className={`relative m-24 mt-0 flex min-h-[22rem] shrink-0 flex-col justify-end overflow-hidden rounded-4 bg-marine transition-all duration-700 lg:m-0 lg:mb-32 lg:mr-40 lg:min-h-0 lg:w-[40%] ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: open ? '450ms' : '0ms' }}
        >
          <img
            src="/asset/images/Gemini_Generated_Image_gsnk92gsnk92gsnk.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marine via-marine/60 to-marine/10" />
          <div className="relative flex flex-col gap-20 p-24 lg:p-32">
            <span className="font-futura text-[2rem] font-light leading-1.05 text-white lg:text-42">
              Cocody, côté lagune
            </span>
            <div className="flex flex-col gap-12">
              {MENU_INFOS.map(([h, v]) => (
                <div key={h} className="flex flex-col gap-2">
                  <span className="font-body text-10 font-bold tracking-1.5 text-w-80">{h}</span>
                  <span className="font-body text-14 text-white">{v}</span>
                </div>
              ))}
            </div>
            <BookButton tone="white" paddingClass="px-22 py-14">
              Réserver une table
            </BookButton>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Chronologie de la mise en place (secondes). Les volets d'abord, puis la pastille, le texte sort de
 * ses masques, le filet se trace et les chiffres se comptent.
 */
const T = {
  panel: '0s',
  photo: '0.15s',
  logo: '0.75s',
  dot: '0.85s',
  overline: '0.95s',
  line1: '1.05s',
  line2: '1.17s',
  rule: '1.35s',
  desc: '1.5s',
  stats: '1.6s',
  cta: '1.75s',
}
const MS = (s) => Math.round(parseFloat(s) * 1000)

/**
 * La pastille blanche du design (Dot x483 y-26, 125 px, qui deborde du cadre) avec l'icone `menu`
 * marine posee dedans, en bas a gauche (position du noeud Menu : x523 y23).
 * A l'arrivee elle tombe en place avec un leger rebond.
 */
function MenuDot({ onOpen, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onOpen}
      aria-label="Ouvrir le menu"
      className="group absolute right-[-1.6875rem] top-[-1.625rem] z-20 h-[7.8125rem] w-[7.8125rem] animate-[drop-in_0.7s_cubic-bezier(0.34,1.56,0.64,1)_both] rounded-999 bg-white transition-transform duration-500 hover:scale-105"
      style={{ animationDelay: T.dot }}
    >
      <Menu
        size={28}
        strokeWidth={1.5}
        className="absolute left-[2.5rem] top-[3.0625rem] text-marine transition-transform duration-300 group-hover:rotate-90"
      />
    </button>
  )
}

/** Une ligne de texte qui sort d'un masque (le parent coupe, l'enfant remonte). */
function MaskedLine({ children, delay, className = '' }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <span
        className={`block animate-[mask-up_0.9s_cubic-bezier(0.16,1,0.3,1)_both] ${className}`}
        style={{ animationDelay: delay }}
      >
        {children}
      </span>
    </span>
  )
}

function StatBar() {
  const note = useCountUp(4.1, { decimals: 1, delay: MS(T.stats), duration: 1100 })
  const avis = useCountUp(120, { delay: MS(T.stats), duration: 1300 })

  return (
    <div className="relative flex w-full flex-col gap-20 pt-26 md:flex-row md:items-center md:gap-28">
      {/* filet haut #ded8ce80 : il se trace de gauche a droite */}
      <span
        className="absolute left-0 top-0 h-[1px] w-full origin-left animate-[draw-line_0.9s_cubic-bezier(0.16,1,0.3,1)_both] bg-line-w50"
        style={{ animationDelay: T.rule }}
      />
      <p
        className="flex-1 animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both] font-body text-15 font-normal leading-1.45 text-white"
        style={{ animationDelay: T.desc }}
      >
        Un complexe où la cuisine, la détente et la fête se vivent face à la lagune.
      </p>
      <div className="flex items-center gap-28">
        <div className="flex flex-col items-center gap-5">
          <span className="animate-[fade-in_0.5s_ease-out_both] font-heading text-24 font-light tabular-nums text-white" style={{ animationDelay: T.stats }}>
            {note.replace('.', ',')}
          </span>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="inline-flex animate-[pop_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                style={{ animationDelay: `${MS(T.stats) + 500 + i * 70}ms` }}
              >
                <Star size={11} />
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <span className="animate-[fade-in_0.5s_ease-out_both] font-heading text-24 font-light tabular-nums text-white" style={{ animationDelay: T.stats }}>{avis}+</span>
          <span
            className="animate-[fade-in_0.6s_ease-out_both] font-body text-12 text-meta-txt"
            style={{ animationDelay: T.stats }}
          >
            Avis
          </span>
        </div>
        <div
          className="animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: T.cta }}
        >
          <BookButton tone="white" paddingClass="px-22 py-14">
            Réserver
          </BookButton>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const dotRef = useRef(null)

  // l'origine du cercle = centre de la pastille, tenue a jour en continu (montage, redimensionnement,
  // defilement) : l'etat ferme porte deja le bon centre bien avant le clic, la transition n'anime
  // donc que le rayon
  useEffect(() => {
    let raf = 0
    const measure = () => {
      const r = dotRef.current?.getBoundingClientRect()
      if (r) setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
    }
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('resize', schedule)
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule)
    }
  }, [])
  const openMenu = useCallback(() => setOpen(true), [])
  const closeMenu = useCallback(() => setOpen(false), [])

  return (
    <section className="flex h-[100svh] max-h-[56.25rem] min-h-[37.5rem] w-full gap-10 bg-paper p-8">
      {/* Hero Image : 780 / 1392 = 56.0345 % de la largeur utile (proportion du design).
          Volet : la photo se devoile depuis la gauche, puis respire (leger dezoom). */}
      <div
        className="hidden animate-[wipe-from-left_1.1s_cubic-bezier(0.76,0,0.24,1)_both] overflow-hidden rounded-4 lg:block lg:w-[56.0345%]"
        style={{ animationDelay: T.photo }}
      >
        <img
          src="/asset/images/Gemini_Generated_Image_gsnk92gsnk92gsnk.jpg"
          alt=""
          className="h-full w-full animate-[slow-zoom_2.6s_cubic-bezier(0.16,1,0.3,1)_both] object-cover"
          style={{ animationDelay: T.photo }}
        />
      </div>

      {/* Right : panneau marine, volet qui se deploie depuis la droite.
          Au telephone il porte aussi la photo, voilee. */}
      <div
        className="relative flex flex-1 animate-[wipe-from-right_0.9s_cubic-bezier(0.76,0,0.24,1)_both] flex-col overflow-hidden rounded-4 bg-marine"
        style={{ animationDelay: T.panel }}
      >
        <img
          src="/asset/images/Gemini_Generated_Image_gsnk92gsnk92gsnk.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover lg:hidden"
        />
        <div className="absolute inset-0 bg-marine/80 lg:hidden" />

        <MenuDot onOpen={openMenu} buttonRef={dotRef} />

        {/* Logo en filigrane (noeud JnUgH) : x237 y-43, 617 x 1038 sur un panneau de 581 x 852,
            mode fill, opacity 0.15 -> left 40.79 %, top -5.05 %, w 106.2 %, h 121.8 %, cover.
            Il apparait en dernier, lentement. */}
        <img
          src="/asset/images/Logo_Jewi-Photoroom.png"
          alt=""
          className="pointer-events-none absolute left-[40.79%] top-[-5.05%] hidden h-[121.8%] w-[106.2%] animate-[fade-watermark_1.8s_ease-out_both] object-cover lg:block"
          style={{ animationDelay: T.line2 }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between px-[5%] pb-24 pt-20 lg:pb-[4.8%]">
          <div
            className="animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
            style={{ animationDelay: T.logo }}
          >
            <div className="flex w-full items-center justify-between">
              <img
                src="/asset/images/ChatGPT Image Sep 8, 2026, 05_02_48 PM-Photoroom.png"
                alt="Adoumin Beach Resort"
                className="h-[2.125rem] w-[8.3125rem] object-cover"
              />
            </div>
          </div>

          {/* Heading Block (noeud D6EArR) : x30 y317 sur 581 x 852 -> left 5.16 %, top 37.2 %.
              Chaque ligne sort de son masque. */}
          <div className="flex flex-col gap-22 lg:absolute lg:left-[5.16%] lg:right-[5.16%] lg:top-[37.2%]">
            <MaskedLine delay={T.overline} className="font-body text-12 font-bold tracking-2 text-white">
              BIENVENUE À
            </MaskedLine>
            <div className="flex flex-col">
              <MaskedLine delay={T.line1} className="font-futura text-62 font-light leading-0.98 text-white">
                Votre évasion
              </MaskedLine>
              <MaskedLine delay={T.line2} className="font-futura text-62 font-light leading-0.98 text-white">
                au bord de l&apos;eau
              </MaskedLine>
            </div>
          </div>

          <StatBar />
        </div>
      </div>

      <MenuOverlay open={open} origin={origin} onClose={closeMenu} />
    </section>
  )
}
