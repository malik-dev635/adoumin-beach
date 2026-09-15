import Star from '../shared/Star.jsx'
import useCountUp from '../shared/useCountUp.js'

/**
 * Frame Pencil `Hero Alt — ERA` (id TJDSD) : 1440x860, layout "none", clip.
 *  - BG    : asset/images/Gemini_Generated_Image_gsnk92gsnk92gsnk.jpg (cover) + Tint #0E2C5C1F
 *  - Badge : x48 y40, cercle 83, filet 1.5 creme #F4EEE4, logo_declined2.png 37x46 dedans
 *  - Nav   : x1140 y44 w252, colonne alignee a droite, gap 14 —
 *            RESERVER Futura 20/500 ls 1 creme ; EVENEMENT, CONTACT Futura 13/500 ls 1.5 creme 80 %
 *  - Title : y70, centre — ADOUMIN / BEACH Futura 130/300 ls 6 lh 0.92 blanc, « Resort » Kalam 82/300
 *  - card_order : x898 y418 517x416, fill marine, padding [20,30], space_between —
 *            Heading Block (w450, gap 22) : titre 62/300 lh 0.98 ; Stat Bar (w462, filet haut #ded8ce80,
 *            padding-top 26, gap 28) : desc 258 px 15 lh 1.45, note 4,1 + etoiles, 120+ Avis
 *  (Le texte « OÙ REVENIR » du .pen est recouvert par la carte : non rendu.)
 *
 * Regle : le hero tient sur un ecran (100svh, plafond 860). Sous 1024 px la carte marine prend
 * toute la largeur en bas, la nav garde ses trois mots.
 *
 * Entree : meme langage que Lay2 — la carte se deploie depuis la droite (volet), le badge tombe en
 * place, le titre sort de ses masques ligne par ligne, le filet se trace, les chiffres se comptent.
 */
const T = {
  photo: '0s',
  badge: '0.7s',
  nav: '0.6s',
  l1: '0.35s',
  l2: '0.47s',
  l3: '0.62s',
  card: '0.55s',
  h1: '1.15s',
  h2: '1.27s',
  rule: '1.45s',
  desc: '1.55s',
  stats: '1.65s',
}
const MS = (s) => Math.round(parseFloat(s) * 1000)

function MaskedLine({ children, delay, className = '' }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
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
    <div className="relative flex w-full flex-col gap-16 pt-26 sm:flex-row sm:items-center sm:gap-28 lg:w-462">
      <span
        className="absolute left-0 top-0 h-[1px] w-full origin-left animate-[draw-line_0.9s_cubic-bezier(0.16,1,0.3,1)_both] bg-line-w50"
        style={{ animationDelay: T.rule }}
      />
      <p
        className="animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both] font-body text-15 font-normal leading-1.45 text-white sm:w-258"
        style={{ animationDelay: T.desc }}
      >
        Un complexe où la cuisine, la détente et la fête se vivent face à la lagune.
      </p>
      <div className="flex items-center gap-28">
        <div className="flex flex-col items-center gap-5">
          <span
            className="animate-[fade-in_0.5s_ease-out_both] font-heading text-24 font-light tabular-nums text-white"
            style={{ animationDelay: T.stats }}
          >
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
          <span
            className="animate-[fade-in_0.5s_ease-out_both] font-heading text-24 font-light tabular-nums text-white"
            style={{ animationDelay: T.stats }}
          >
            {avis}+
          </span>
          <span
            className="animate-[fade-in_0.6s_ease-out_both] font-body text-12 text-meta-txt"
            style={{ animationDelay: T.stats }}
          >
            Avis
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] max-h-[53.75rem] min-h-[37.5rem] w-full flex-col overflow-hidden bg-sky">
      {/* BG + Tint : la photo respire lentement */}
      <img
        src="/asset/images/Gemini_Generated_Image_gsnk92gsnk92gsnk.jpg"
        alt=""
        className="absolute inset-0 h-full w-full animate-[slow-zoom_2.6s_cubic-bezier(0.16,1,0.3,1)_both] object-cover"
        style={{ animationDelay: T.photo }}
      />
      <div className="absolute inset-0 bg-tint-3" />
      {/* Sous 1024 px le titre et la nav tombent sur la photo : voile marine en degrade, dense en
          haut, qui s'efface vers la carte. Le desktop garde la teinte a 12 % du design. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(14,30,61,0.72) 0%, rgba(14,30,61,0.45) 42%, rgba(14,30,61,0.10) 70%, rgba(14,30,61,0) 100%)' }}
      />

      {/* Badge : x48 y40 -> 3.33 % / 4.65 % */}
      <a
        href="#"
        aria-label="Adoumin Beach Resort"
        className="absolute left-[4%] top-[3.5%] flex h-[4rem] w-[4rem] animate-[drop-in_0.7s_cubic-bezier(0.34,1.56,0.64,1)_both] items-center justify-center rounded-999 ring-[1.5px] ring-cream transition-transform duration-500 hover:scale-105 lg:left-[3.33%] lg:top-[4.65%] lg:h-[5.1875rem] lg:w-[5.1875rem]"
        style={{ animationDelay: T.badge }}
      >
        <img src="/asset/images/logo_declined2.png" alt="" className="h-[2.25rem] w-[1.8125rem] object-cover lg:h-[2.875rem] lg:w-[2.3125rem]" />
      </a>

      {/* Nav : x1140 y44 w252, alignee a droite -> right 3.33 % */}
      <nav
        className="absolute right-[4%] top-[4.2%] flex animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both] flex-col items-end gap-12"
        style={{ animationDelay: T.nav }}
      >
        {/* RESERVER est l'action : pilule au filet creme. Les deux autres : point or + filet fin. */}
        <a
          href="#"
          className="group inline-flex items-center gap-10 rounded-999 px-20 py-8 font-futura text-20 font-medium tracking-1 text-cream ring-1 ring-inset ring-cream/70 transition-all duration-300 hover:ring-gold"
        >
          RESERVER
          <span className="h-6 w-6 rounded-999 bg-gold transition-transform duration-300 group-hover:translate-x-[0.25rem]" />
        </a>
        <a
          href="#"
          className="tap link-underline inline-flex items-center gap-8 border-b border-cream/40 pb-[2px] font-futura text-13 font-medium tracking-1.5 text-cream-cc transition-colors duration-300 hover:text-cream"
        >
          <span className="h-5 w-5 rounded-999 bg-gold" />
          EVENEMENT
        </a>
        <a
          href="#"
          className="tap link-underline inline-flex items-center gap-8 border-b border-cream/40 pb-[2px] font-futura text-13 font-medium tracking-1.5 text-cream-cc transition-colors duration-300 hover:text-cream"
        >
          <span className="h-5 w-5 rounded-999 bg-gold" />
          CONTACT
        </a>
      </nav>

      {/* Title : y70, centre. Lettres en Futura Light, « Resort » en Kalam. */}
      <div className="absolute left-0 right-0 top-[19%] flex flex-col items-center text-center lg:top-[8.14%]">
        <MaskedLine
          delay={T.l1}
          className="font-futura text-[13vw] font-light leading-0.92 tracking-6 text-white lg:text-130"
        >
          ADOUMIN
        </MaskedLine>
        <MaskedLine
          delay={T.l2}
          className="font-futura text-[13vw] font-light leading-0.92 tracking-6 text-white lg:text-130"
        >
          BEACH
        </MaskedLine>
        <MaskedLine delay={T.l3} className="font-script text-[8vw] font-light leading-1 text-white lg:text-82">
          Resort
        </MaskedLine>
      </div>

      {/* card_order : x898 y418 517x416 -> right 1.74 %, top 48.6 %, bottom 3.02 %, w 35.9 %.
          Volet depuis la droite. Au telephone : pleine largeur, en bas. */}
      <div
        className="absolute inset-x-0 bottom-0 flex animate-[wipe-from-right_0.9s_cubic-bezier(0.76,0,0.24,1)_both] flex-col justify-between gap-24 bg-marine px-24 py-20 lg:inset-x-auto lg:bottom-[3.02%] lg:right-[1.74%] lg:top-[48.6%] lg:w-[35.9%] lg:px-30"
        style={{ animationDelay: T.card }}
      >
        <div className="flex flex-col gap-22 lg:w-450">
          <div className="flex flex-col">
            <MaskedLine
              delay={T.h1}
              className="font-futura text-[2.5rem] font-light leading-0.98 text-white sm:text-62"
            >
              Votre évasion
            </MaskedLine>
            <MaskedLine
              delay={T.h2}
              className="font-futura text-[2.5rem] font-light leading-0.98 text-white sm:text-62"
            >
              au bord de l&apos;eau
            </MaskedLine>
          </div>
        </div>
        <StatBar />
      </div>
    </section>
  )
}
