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
      className={`tap group inline-flex w-fit items-center gap-8 border-b-[0.5px] border-marine pb-[2px] ${className}`}
    >
      <span className="font-body text-15 font-semibold text-marine">{children}</span>
      <span className="h-6 w-6 shrink-0 rounded-999 bg-gold transition-transform duration-300 group-hover:translate-x-[0.25rem]" />
    </a>
  )
}

/**
 * Bouton `Book`. `tone` :
 *  - 'marine'  : fond marine, texte blanc — au survol fond transparent, filet marine, texte marine
 *  - 'white'   : fond blanc, texte marine (pour fond sombre) — au survol transparent, filet et texte blancs
 *  - 'outline' : contour marine sur fond clair — au survol se remplit de marine
 *  - 'yango'   : contour et texte rouge Yango — au survol se remplit de rouge, texte blanc
 * Le filet est un ring interieur, la taille ne bouge pas.
 */
export function BookButton({ children, tone = 'marine', href = '#', paddingClass = 'px-26 py-15', onClick }) {
  const styles = {
    marine: {
      box: 'bg-marine ring-marine hover:bg-transparent',
      text: 'text-white group-hover:text-marine',
    },
    white: {
      box: 'bg-white ring-white hover:bg-transparent',
      text: 'text-marine group-hover:text-white',
    },
    outline: {
      box: 'bg-transparent ring-marine hover:bg-marine',
      text: 'text-marine group-hover:text-white',
    },
    yango: {
      box: 'bg-transparent ring-yango hover:bg-yango',
      text: 'text-yango group-hover:text-white',
    },
  }[tone]
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex w-fit items-center gap-8 ring-1 ring-inset transition-colors duration-[400ms] ${paddingClass} ${styles.box}`}
    >
      <span className={`font-body text-15 font-semibold transition-colors duration-[400ms] ${styles.text}`}>
        {children}
      </span>
      <ArrowUpRight
        size={18}
        strokeWidth={2}
        className={`transition-all duration-[400ms] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] ${styles.text}`}
      />
    </a>
  )
}
