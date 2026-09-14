import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import { BookButton } from './ui.jsx'

/**
 * `CTA + Footer` : la bande (noeud v6aApH de Lay2) puis le footer de `Landing — Lay3` (noeud tPfc9),
 * repris a la demande a la place de celui de Lay2.
 *
 * Band (h 460, layout "none") : photo asset/images/images1.jpg, degrade #0B152699 -> #1c346371,
 *   "Votre échappée commence ici" 58/200 lh 1.02, sous-titre 460 px 16 lh 1.5 #FFFFFFCC, bouton blanc.
 *
 * Footer Lay3 (1440 x 643, fill #0E1E3D, layout "none") :
 *   Top      x120 y70  : Newsletter (w 360 — titre Futura 28/300 lh 1.15, champ 320 #FFFFFF14 padding
 *                        [8,8,8,20], bouton or 40x40, note 13 #FFFFFF80) + Cols gap 56 (PAGES / INFOS /
 *                        SUIVEZ-NOUS : intitule 11/700 ls 1.5 #FFFFFF66, liens 15 #FFFFFFCC, gap 14)
 *   Divider  y289      : 1 px #FFFFFF1A
 *   Contact  y303      : adresse / telephone / mail (icone 17 #FFFFFF99, texte 15 #FFFFFFD9) + reseaux
 *   Mid      y360      : copyright + "The Place To Be", 13 #FFFFFF80
 *   Wordmark x139 y450 : "ADOUMIN" Futura 250/300, lh 0.9, letterSpacing -4 (rogne par le cadre)
 *   Vagues   y404 h318 : forme (path o0LHc) remplie du motif asset/images/645-Photoroom.png, opacity 0.25
 */
const COLS = [
  { h: 'PAGES', links: ["L'expérience", 'Restaurant', 'Événements', 'Soirées', 'Galerie'] },
  { h: 'INFOS', links: ['À propos', 'Réserver', 'Nous trouver', 'Horaires', 'Contact'] },
  { h: 'SUIVEZ-NOUS', links: ['Instagram', 'Facebook', 'TikTok', 'WhatsApp'] },
]

const CONTACT = [
  { icon: MapPin, label: 'Cocody – Blockhauss, Abidjan', href: '#' },
  { icon: Phone, label: '+225 07 78 61 68 99', href: 'tel:+2250778616899' },
  { icon: Mail, label: 'contact@adoumin.ci', href: 'mailto:contact@adoumin.ci' },
]

const SOCIAL = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Twitter, label: 'Twitter' },
]

/* Geometrie du path o0LHc (bbox 10.011 -129.138 567.989 190.5), etiree sur 1440 x 318 */
const VAGUES_PATH =
  'M10.011-129.138c4-13.5-8.511 86.138 66.989 74.138 75.5-12 104.5-5.5 139.5 11.5 35 17 64.377 55.86 142.178 55.86 0 0 76.342 0 117.322-22.86 0 0 93.5-46 102-44.5 8.5 1.5 4.5 188 0 190.5-4.5 2.5-567.989 0-567.989 0 0 0-4-251.138 0-264.638z'

function Band() {
  return (
    <div className="relative flex h-[26.25rem] w-full items-center justify-center overflow-hidden px-24 lg:h-460">
      <img src="/asset/images/images1.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #0B152699 0%, #1C346371 100%)' }}
      />
      <div className="reveal relative flex w-full flex-col items-center gap-20 text-center">
        <h2 className="font-heading text-58 font-extralight leading-1.02 text-white lg:whitespace-nowrap">
          Votre échappée commence ici
        </h2>
        <p className="max-w-full font-body text-16 sm:max-w-460 font-normal leading-1.5 text-w-cc">
          Réservez votre table ou votre événement — on s&apos;occupe du reste.
        </p>
        <BookButton tone="white" paddingClass="px-24 py-14">
          Réserver
        </BookButton>
      </div>
    </div>
  )
}

/**
 * Forme aux vagues remplie du motif seigaiha, en bas du footer. Le path est ramene dans un repere
 * 1440 x 318 (celui du noeud) pour que le motif garde ses proportions ; le bloc suit la largeur
 * (ratio 1440/318) et deborde de 79 px sous le cadre comme dans le .pen (404 + 318 > 643).
 */
function Vagues() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 w-full translate-y-[24.84%] opacity-25">
      <svg className="block h-auto w-full" viewBox="0 0 1440 318" aria-hidden="true">
        <defs>
          <clipPath id="vagues-clip">
            <path d={VAGUES_PATH} transform="scale(2.5352 1.6693) translate(-10.011 129.138)" />
          </clipPath>
        </defs>
        <image
          href="/asset/images/vagues.webp"
          x="0"
          y="0"
          width="1440"
          height="318"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#vagues-clip)"
        />
      </svg>
    </div>
  )
}

function Newsletter() {
  return (
    <div className="flex w-full flex-col gap-18 lg:w-360 lg:shrink-0">
      <h3 className="font-futura text-28 font-light leading-1.15 text-white">
        Restons connectés avec l&apos;essentiel
      </h3>
      <form
        className="flex w-full items-center justify-between bg-w-14 py-8 pl-20 pr-8 lg:w-320"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Votre e-mail…"
          className="w-full bg-transparent font-body text-15 font-normal text-white outline-none placeholder:text-w-80 focus:placeholder:text-w-cc"
        />
        <button
          type="submit"
          aria-label="S'inscrire"
          className="group flex h-40 w-40 shrink-0 items-center justify-center bg-gold transition-all duration-300 hover:brightness-95"
        >
          <ArrowRight
            size={20}
            strokeWidth={2}
            className="text-marine transition-transform duration-300 group-hover:translate-x-[2px]"
          />
        </button>
      </form>
      <span className="font-body text-13 font-normal text-w-80">Pas de spam. Juste nos actus et bons plans.</span>
    </div>
  )
}

function Cols() {
  return (
    <div className="flex flex-wrap gap-32 sm:gap-56">
      {COLS.map(({ h, links }) => (
        <div key={h} className="flex flex-col gap-14">
          <span className="font-body text-11 font-bold tracking-1.5 text-w-66">{h}</span>
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="w-fit font-body text-15 font-normal text-w-cc transition-all duration-300 hover:translate-x-[0.25rem] hover:text-white"
            >
              {l}
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function CtaFooter() {
  return (
    <footer className="w-full bg-footer-2">
      <Band />

      {/* Footer Lay3 : flux vertical avec les ecarts du design (70 / 40 / 13 / 39 / 74) */}
      <div className="relative w-full overflow-hidden bg-footer-bg px-32 pt-[3.5rem] lg:pt-70">
        <Vagues />

        <div className="reveal relative flex w-full flex-col justify-between gap-40 lg:flex-row lg:gap-60">
          <Newsletter />
          <Cols />
        </div>

        <div className="relative mt-40 h-[1px] w-full bg-w-1a" />

        <div className="reveal relative mt-13 flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-24">
          {CONTACT.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} className="group flex items-center gap-8">
              <Icon size={17} strokeWidth={2} className="shrink-0 text-w-99" />
              <span className="font-body text-15 font-normal text-w-d9 transition-colors duration-300 group-hover:text-white">
                {label}
              </span>
            </a>
          ))}
          <div className="flex items-center gap-16">
            {SOCIAL.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-w-b3 transition-all duration-300 hover:-translate-y-[2px] hover:text-white"
              >
                <Icon size={18} strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mt-24 flex w-full flex-col items-start justify-between gap-6 lg:mt-39 lg:flex-row lg:items-center">
          <span className="font-body text-13 font-normal text-w-80">
            Adoumin Beach Resort — Tous droits réservés © 2026
          </span>
          <span className="font-body text-13 font-normal text-w-80">The Place To Be</span>
        </div>

        {/* Wordmark : centre (le .pen le cale a x139), le bas rogne comme dans le .pen */}
        <div className="reveal relative mt-24 flex justify-center lg:mt-[4.625rem]">
          <span className="block text-center font-futura text-[18vw] font-light leading-0.9 tracking-[-0.25rem] text-white lg:mb-[-2rem] lg:text-250">
            ADOUMIN
          </span>
        </div>
      </div>
    </footer>
  )
}
