/**
 * Motifs repetes de la frame `Landing — Lay2` (lus via MCP) :
 *  - `Overline` : pastille or 7 px + texte 12/700, letterSpacing 2, couleur ink
 *  - `Heading`  : lignes Futura 300, marine, lineHeight 1.05 / 1.06
 *  - `Link`     : texte 15/600 marine + point or 6 px, filet bas 0.5 px marine
 *  - `Book`     : bouton plein (marine ou blanc), padding [15,26] ou [14,22/24], fleche arrow-up-right
 */
import { ArrowUpRight } from 'lucide-react'

export function Overline({ children, light = false }) {
  return (
    <div className="flex items-center gap-8">
      <span className="h-7 w-7 shrink-0 rounded-999 bg-gold" />
      <span
        className={`font-body text-12 font-bold tracking-2 ${light ? 'text-white' : 'text-ink'}`}
      >
        {children}
      </span>
    </div>
  )
}

/** Titre sur plusieurs lignes, une ligne par entree. */
export function Heading({ lines, sizeClass, leadingClass = 'leading-1.05', light = false, className = '' }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {lines.map((l) => (
        <span
          key={l}
          className={`font-futura font-light ${sizeClass} ${leadingClass} ${light ? 'text-white' : 'text-marine'}`}
        >
          {l}
        </span>
      ))}
    </div>
  )
}

/** Lien souligne d'un filet fin, point or a droite. Le point s'ecarte au survol. */
export function UnderlineLink({ children, href = '#', className = '' }) {
  return (
    <a
      href={href}
      className={`group inline-flex w-fit items-center gap-8 border-b-[0.5px] border-marine pb-[2px] ${className}`}
    >
      <span className="font-body text-15 font-semibold text-marine">{children}</span>
      <span className="h-6 w-6 shrink-0 rounded-999 bg-gold transition-transform duration-300 group-hover:translate-x-[0.25rem]" />
    </a>
  )
}

/**
 * Bouton `Book`. `tone` = 'marine' (fond marine, texte blanc) ou 'white' (fond blanc, texte marine).
 * Au survol le bouton s'inverse : la couleur opposee monte depuis le bas (un calque qui se deploie),
 * texte et fleche basculent, et la bordure garde la couleur d'origine pour que le bouton reste
 * dessine une fois inverse.
 */
export function BookButton({ children, tone = 'marine', href = '#', paddingClass = 'px-26 py-15' }) {
  const isMarine = tone === 'marine'
  return (
    <a
      href={href}
      className={`group relative isolate inline-flex w-fit items-center gap-8 overflow-hidden border ${paddingClass} ${
        isMarine ? 'border-marine bg-marine' : 'border-white bg-white'
      }`}
    >
      {/* calque d'inversion : il monte depuis le bas au survol */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-y-100 ${
          isMarine ? 'bg-white' : 'bg-marine'
        }`}
      />
      <span
        className={`font-body text-15 font-semibold transition-colors duration-500 ${
          isMarine ? 'text-white group-hover:text-marine' : 'text-marine group-hover:text-white'
        }`}
      >
        {children}
      </span>
      <ArrowUpRight
        size={18}
        strokeWidth={2}
        className={`transition-all duration-500 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] ${
          isMarine ? 'text-white group-hover:text-marine' : 'text-marine group-hover:text-white'
        }`}
      />
    </a>
  )
}
