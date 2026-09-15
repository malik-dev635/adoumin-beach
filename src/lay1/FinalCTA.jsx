import Star from '../shared/Star.jsx'

/**
 * Frame Pencil `Final CTA` (id oIYX7) : 1440x600, clip, fill #EEF2F5, layout "none".
 *  - Strip (w2ybBa) x70  y-70 rotation 10  280x760, gap 16, 3 photos 280x224 radius 14
 *  - Strip (YEwZu)  x1150 y-70 rotation -10 idem
 *  - Content (GZAnY) x400 y170 w640, gap 24, alignItems center
 * Les rotations Pencil sont antihoraires depuis le coin haut-gauche -> rotate(-N deg) en CSS.
 * Le `Star` reprend la geometrie du path CK4Fi lue via MCP.
 *
 * Mouvement (hors design) : derive tres lente des deux bandes photo, relief sur les boutons.
 */

const STRIP_LEFT = [
  'https://images.unsplash.com/photo-1622856458951-b607999361b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc3MjJ8&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1683914791736-9b0e739565e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc3MjN8&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1615887026505-00283cf0ff83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc3MjR8&ixlib=rb-4.1.0&q=80&w=1080',
]

const STRIP_RIGHT = [
  'https://images.unsplash.com/photo-1573561507036-b0110570e2e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc3MjR8&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1684589424302-fa03aafca1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc3MjR8&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1729719022570-031be5c8605a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc3MjV8&ixlib=rb-4.1.0&q=80&w=1080',
]

function Strip({ images, left, rotate, delay = '0s' }) {
  return (
    <div
      className="absolute hidden w-[19.4444%] lg:block"
      style={{ left, top: '-11.6667%', transform: `rotate(${rotate}deg)`, transformOrigin: 'top left' }}
    >
      {/* la derive est portee par un calque interne pour ne pas ecraser la rotation du design */}
      <div
        className="flex animate-[drift_16s_ease-in-out_infinite] flex-col gap-16"
        style={{ animationDelay: delay }}
      >
        {images.map((src) => (
          <img key={src} src={src} alt="" className="h-224 w-full rounded-14 object-cover" />
        ))}
      </div>
    </div>
  )
}

export default function FinalCTA() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-32 overflow-hidden bg-cta-bg py-[3rem] lg:h-600 lg:gap-0 lg:px-0 lg:py-0">
      <Strip images={STRIP_LEFT} left="4.8611%" rotate={-10} />
      <Strip images={STRIP_RIGHT} left="79.8611%" rotate={10} delay="-8s" />

      {/* Sous 1024 px les bandes inclinees n'ont pas la place : les six photos defilent en bandeau */}
      <div className="reveal flex w-full snap-x snap-mandatory gap-12 overflow-x-auto px-24 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {[...STRIP_LEFT, ...STRIP_RIGHT].map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            className="h-[7rem] w-[8.75rem] shrink-0 snap-start rounded-14 object-cover"
          />
        ))}
      </div>

      {/* Content : x400 y170 w640 */}
      <div className="reveal relative flex w-full flex-col items-center gap-24 px-24 lg:absolute lg:px-0 lg:left-[27.7778%] lg:top-[28.3333%] lg:w-[44.4444%]">
        <div className="flex items-center gap-8">
          <div className="flex gap-2">
            <Star color="#ffcd03" />
            <Star color="#ffcd03" />
            <Star color="#ffcd03" />
            <Star color="#ffcd03" />
            <Star color="#c9d1da" />
          </div>
          <span className="font-body text-13 font-bold tracking-1 text-marine">
            4,1 / 5 · AVIS CLIENTS
          </span>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="font-futura text-54 font-medium leading-1.02 text-marine">
            Votre table
          </span>
          <span className="font-avenir text-54 font-medium leading-1.02 text-title-b">
            avec vue vous attend
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-14">
          <button
            type="button"
            className="rounded-40 bg-gold px-28 py-15 font-body text-15 font-bold text-marine transition-all duration-300 hover:-translate-y-[3px] hover:brightness-95 active:translate-y-0"
          >
            Réserver maintenant
          </button>
          <a
            href="tel:+2250778616899"
            className="rounded-40 border border-line-2 bg-white px-28 py-15 font-body text-15 font-semibold text-marine transition-all duration-300 hover:-translate-y-[3px] hover:border-marine active:translate-y-0"
          >
            Nous appeler
          </a>
        </div>
      </div>
    </section>
  )
}
