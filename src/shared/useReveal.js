import { useEffect } from 'react'

/**
 * Marque `data-revealed` sur les elements `.reveal` des qu'ils entrent dans le viewport. Un attribut
 * data-* plutot qu'une classe : React reecrit `className` a chaque changement d'etat (ex. un item de
 * FAQ qui s'ouvre) et effacerait une classe posee a la main.
 * Une seule fois par element (pas de re-animation au scroll arriere).
 * Si l'utilisateur a demande moins d'animation, tout est revele immediatement.
 * En bas de page, ce qui reste est revele des qu'on atteint la fin du scroll : un element colle au
 * pied de page peut ne jamais franchir la ligne de declenchement sur un petit ecran.
 */
export default function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const showAll = () => nodes.forEach((n) => (n.dataset.revealed = 'true'))

    if (reduced || typeof IntersectionObserver === 'undefined') {
      showAll()
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.dataset.revealed = 'true'
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
    nodes.forEach((n) => observer.observe(n))

    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      if (atBottom) showAll()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
