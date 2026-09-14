import { useEffect, useState } from 'react'

/**
 * Compte de 0 a `target` en `duration` ms, avec une courbe qui ralentit sur la fin.
 * `delay` ms avant de partir. Si l'utilisateur a demande moins d'animation, la valeur finale est
 * affichee tout de suite.
 */
export default function useCountUp(target, { duration = 1100, delay = 0, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return undefined
    }
    let raf = 0
    let start = 0
    const tick = (now) => {
      if (!start) start = now
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])

  return value.toFixed(decimals)
}
