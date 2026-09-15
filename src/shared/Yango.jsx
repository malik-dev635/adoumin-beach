import { useCallback, useEffect, useState } from 'react'
import { Smartphone, X } from 'lucide-react'
import { YANGO_URL } from './MapLeaflet.jsx'

/**
 * Le lien profond Yango n'ouvre rien sur un ordinateur (page d'erreur). Sur mobile on laisse le lien
 * faire son travail ; sur desktop on intercepte le clic et on montre un panneau : photo de la
 * terrasse, QR code a scanner avec le telephone (il ouvre la course Yango), et un mot d'explication.
 * Le QR est un SVG statique (public/asset/yango-qr.svg, genere par tools/qr-yango.mjs).
 */
const isMobile = () =>
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
  (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 1024)

export function useYango() {
  const [open, setOpen] = useState(false)
  const onClick = useCallback((e) => {
    if (isMobile()) return // le lien s'ouvre normalement
    e.preventDefault()
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])
  return { open, onClick, close }
}

/** @param {string} radiusClass arrondi du panneau, selon la variante (rounded-24 sur Lay1, rounded-4 sur Lay2/3) */
export function YangoModal({ open, onClose, radiusClass = 'rounded-4' }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center px-24 transition-opacity duration-300 ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!open}
      role="dialog"
      aria-label="Commander un Yango depuis votre téléphone"
    >
      {/* voile */}
      <button type="button" aria-label="Fermer" onClick={onClose} className="absolute inset-0 bg-marine/70" />

      <div
        className={`relative flex w-full max-w-[56rem] flex-col overflow-hidden bg-white shadow-[0_30px_80px_rgba(14,30,61,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:flex-row ${radiusClass} ${
          open ? 'translate-y-0 scale-100' : 'translate-y-[1.5rem] scale-[0.98]'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-12 top-12 z-10 flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-999 bg-white/90 text-marine transition-transform duration-300 hover:rotate-90"
        >
          <X size={22} strokeWidth={2} />
        </button>

        {/* photo */}
        <div className="relative h-[12rem] w-full shrink-0 md:h-auto md:w-[42%]">
          <img
            src="/asset/images/terrasse-palmiers.webp"
            alt="La terrasse d'Adoumin Beach Resort"
            className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marine/70 to-transparent md:bg-gradient-to-r" />
          <div className="absolute bottom-20 left-20 flex flex-col gap-4 md:bottom-28 md:left-28">
            <span className="font-body text-11 font-bold tracking-1.5 text-w-cc">ADOUMIN BEACH RESORT</span>
            <span className="font-futura text-[1.75rem] font-light leading-1.05 text-white">Cocody, côté lagune</span>
          </div>
        </div>

        {/* QR + message */}
        <div className="flex flex-1 flex-col items-center gap-20 px-24 py-32 text-center md:px-40 md:py-44">
          <span className="flex items-center gap-8 font-body text-11 font-bold tracking-1.5 text-yango">
            <Smartphone size={16} strokeWidth={2} />
            COMMANDER UN YANGO
          </span>
          <h3 className="font-futura text-[1.75rem] font-light leading-1.1 text-marine md:text-30">
            Ce lien s&apos;ouvre sur votre téléphone
          </h3>
          <p className="max-w-[24rem] font-body text-14 leading-1.6 text-text-2">
            Scannez ce code avec l&apos;appareil photo de votre téléphone : l&apos;application Yango
            s&apos;ouvre avec la course déjà réglée vers Adoumin Beach Resort.
          </p>
          <img
            src="/asset/yango-qr.svg"
            alt="QR code du lien Yango vers Adoumin Beach Resort"
            className="h-[11rem] w-[11rem] rounded-8 ring-1 ring-inset ring-line-2"
          />
          <a
            href={YANGO_URL}
            className="font-body text-12 text-meta-txt underline-offset-4 transition-colors duration-300 hover:text-marine hover:underline"
          >
            ou copiez le lien
          </a>
        </div>
      </div>
    </div>
  )
}
