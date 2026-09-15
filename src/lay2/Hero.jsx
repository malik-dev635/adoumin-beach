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

const MENU = ["L'expérience", 'Restaurant', 'Événements', 'Galerie', 'Réserver']

/**
 * Menu plein ecran, leger : fond blanc, cinq liens qui flottent, une ligne d'infos, et en bas les
 * vagues seigaiha du footer qui derivent lentement, a peine visibles. Tout tient dans l'ecran,
 * telephone compris — rien a faire defiler. La pastille blanche reste la graine : le cercle grandit
 * depuis son centre.
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

  const enter = open ? 'translate-y-0 opacity-100' : 'translate-y-[0.75rem] opacity-0'
  const stagger = (i) => ({ transitionDelay: open ? `${420 + i * 70}ms` : '0ms' })

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden bg-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        open ? '' : 'pointer-events-none'
      }`}
      style={{ clipPath: `circle(${open ? '160%' : '0%'} at ${origin.x}px ${origin.y}px)` }}
      aria-hidden={!open}
    >
      {/* vagues : le motif du footer en marine, discret, qui derive. L'image (lignes noires sur
          fond transparent) sert de masque a un aplat marine ; un second masque en degrade efface
          le haut de la bande. */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-marine transition-opacity duration-[1200ms] ${
          open ? 'opacity-[0.16]' : 'opacity-0'
        }`}
        style={{
          maskImage: 'url(/asset/images/vagues.webp), linear-gradient(180deg, transparent 0%, #000 75%)',
          maskSize: '38rem auto, 100% 100%',
          maskRepeat: 'repeat, no-repeat',
          maskComposite: 'intersect',
          WebkitMaskImage: 'url(/asset/images/vagues.webp), linear-gradient(180deg, transparent 0%, #000 75%)',
          WebkitMaskSize: '38rem auto, 100% 100%',
          WebkitMaskRepeat: 'repeat, no-repeat',
          WebkitMaskComposite: 'source-in',
          animation: 'drift-x 60s linear infinite',
          transitionDelay: open ? '500ms' : '0ms',
        }}
      />

      {/* barre : logo + fermer, aux memes places que dans le hero */}
      <div className="relative flex shrink-0 items-center justify-between px-24 py-16 lg:px-40">
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

      <div className="relative flex min-h-0 flex-1">
      {/* liens : ils flottent, un point or apparait a gauche au survol */}
      <nav className="relative flex flex-1 flex-col justify-center gap-4 px-24 lg:px-40">
        {MENU.map((label, i) => (
          <a
            key={label}
            href="#"
            onClick={onClose}
            className={`group flex w-fit items-center gap-14 py-6 transition-all duration-500 lg:py-8 ${enter}`}
            style={stagger(i)}
          >
            <span className="h-6 w-6 shrink-0 rounded-999 bg-gold opacity-0 transition-all duration-300 group-hover:opacity-100 lg:h-8 lg:w-8" />
            <span className="-ml-20 font-futura text-[2.75rem] font-light leading-1 text-marine transition-transform duration-500 group-hover:translate-x-[1.25rem] sm:text-56 lg:text-[4.5rem]">
              {label}
            </span>
          </a>
        ))}
      </nav>

      {/* a droite (desktop) : un cercle d'eau — la pastille en grand, remplie des memes vagues,
          avec le slogan. Il entre en grandissant, apres les liens. */}
      <div className="hidden flex-1 items-center justify-center pr-40 lg:flex">
        <div
          className={`relative flex h-[26rem] w-[26rem] items-center justify-center overflow-hidden rounded-999 ring-1 ring-inset ring-marine/15 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
          style={{ transitionDelay: open ? '650ms' : '0ms' }}
        >
          <div
            className="absolute inset-0 bg-marine opacity-[0.14]"
            style={{
              maskImage: 'url(/asset/images/vagues.webp), linear-gradient(180deg, transparent 15%, #000 80%)',
              maskSize: '22rem auto, 100% 100%',
              maskRepeat: 'repeat, no-repeat',
              maskComposite: 'intersect',
              WebkitMaskImage: 'url(/asset/images/vagues.webp), linear-gradient(180deg, transparent 15%, #000 80%)',
              WebkitMaskSize: '22rem auto, 100% 100%',
              WebkitMaskRepeat: 'repeat, no-repeat',
              WebkitMaskComposite: 'source-in',
              animation: 'drift-x 45s linear infinite',
            }}
          />
          <div className="relative flex flex-col items-center gap-6 text-center">
            <span className="font-script text-[2.75rem] font-light leading-1 text-marine">The Place To Be</span>
            <span className="font-body text-12 font-bold tracking-2 text-meta-txt">COCODY · BLOCKHAUSS</span>
          </div>
        </div>
      </div>
      </div>

      {/* une seule ligne : horaires, telephone */}
      <div
        className={`relative flex shrink-0 flex-wrap items-center gap-x-20 gap-y-6 px-24 pb-24 transition-all duration-500 lg:px-40 lg:pb-32 ${enter}`}
        style={stagger(MENU.length)}
      >
        <span className="font-body text-13 text-meta-txt">Tous les jours · 12h – 02h</span>
        <a href="tel:+2250778616899" className="tap font-body text-13 font-semibold text-marine">
          +225 07 78 61 68 99
        </a>
        <span className="hidden font-body text-13 text-meta-txt sm:inline">Cocody – Blockhauss, Abidjan</span>
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
