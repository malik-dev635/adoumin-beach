/**
 * Motifs repetes de la frame `Landing — Lay1` (frames Pencil `Badge` et `Title`).
 * Les valeurs proviennent de la lecture MCP des noeuds correspondants.
 * Les classes sont passees en entier (jamais construites dynamiquement) pour rester scannables
 * par Tailwind.
 */

/** Frame Pencil `Badge` : fill #EEF1F4, cornerRadius 40, padding [7,14], texte 11/700/ls 1.5. */
export function Badge({ children }) {
  return (
    <div className="inline-flex w-fit items-center rounded-40 bg-badge-bg px-14 py-7">
      <span className="font-body text-11 font-bold tracking-1.5 text-ink">{children}</span>
    </div>
  )
}

/**
 * Frame Pencil `Title` : deux textes de meme corps, le premier en Futura/marine (weight 500),
 * le second en Avenir Next W1G/#7C8794.
 */
export function Title({ a, b, sizeClass, leadingClass = 'leading-1', wrapClass = 'flex flex-row flex-wrap gap-12', weightBClass = 'font-normal' }) {
  return (
    <div className={wrapClass}>
      <span className={`font-futura font-medium text-marine ${sizeClass} ${leadingClass}`}>{a}</span>
      <span className={`font-avenir text-title-b ${weightBClass} ${sizeClass} ${leadingClass}`}>{b}</span>
    </div>
  )
}
