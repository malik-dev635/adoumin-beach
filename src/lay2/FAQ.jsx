import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Heading, Overline } from './ui.jsx'

/**
 * Frame Pencil `FAQ` (id QuS2Z) : fill #F1EFE9, padding 120, gap 100.
 *  - Left (w 500) : overline "FAQ" + titre "Questions / fréquentes" Futura 60/300
 *  - List (fill) gap 14 : items fond blanc, filet 1 px #E4DED2, padding [22,26],
 *    question 16/500 marine, icone plus 22 ink
 *
 * Le .pen ne dessine que l'etat ferme : les reponses et l'etat ouvert sont ajoutes.
 */
const QUESTIONS = [
  {
    q: 'Organisez-vous des événements et réceptions ?',
    a: "Oui — mariages, anniversaires, séminaires ou soirées privées, jusqu'à 1 000 personnes dans un espace modulable 4-en-1. L'équipe orchestre tout, de la scénographie au service.",
  },
  {
    q: "Faut-il réserver une table à l'avance ?",
    a: "C'est recommandé, surtout le week-end et le soir. La réservation se fait en ligne ou par téléphone au +225 07 78 61 68 99.",
  },
  {
    q: "Quels sont vos horaires d'ouverture ?",
    a: 'Tous les jours de 12h à 02h : déjeuner, après-midi piscine, dîner et soirée se succèdent sans fermeture.',
  },
  {
    q: 'Proposez-vous la livraison et les plats à emporter ?',
    a: "Oui. La carte est disponible en livraison sur Cocody et en vente à emporter directement au restaurant.",
  },
  {
    q: 'Où se situe Adoumin et comment y accéder ?',
    a: "À Cocody – Blockhauss, en bord de lagune, juste à gauche de la gare lagunaire SOTRA. Voiturier sur place ; accès possible par la lagune sur réservation.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="flex w-full flex-col gap-40 bg-paper-2 px-32 py-[3.5rem] sm:py-80 lg:flex-row lg:gap-100 lg:py-120">
      <div className="reveal flex flex-col gap-26 lg:w-500 lg:shrink-0">
        <Overline>FAQ</Overline>
        <Heading lines={['Questions', 'fréquentes']} sizeClass="text-60" />
      </div>

      <div className="flex flex-1 flex-col gap-14">
        {QUESTIONS.map(({ q, a }, i) => {
          const isOpen = open === i
          return (
            <div
              key={q}
              className={`reveal w-full overflow-hidden border bg-white transition-colors duration-300 ${
                isOpen ? 'border-marine/30' : 'border-line-3 hover:border-marine/30'
              }`}
              style={{ '--d': `${i * 0.06}s` }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-20 px-20 py-18 text-left sm:px-26 sm:py-22"
              >
                <span className="font-body text-16 font-medium text-marine">{q}</span>
                <span className="relative flex h-22 w-22 shrink-0 items-center justify-center">
                  <Plus
                    size={22}
                    strokeWidth={2}
                    className={`absolute text-ink transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                  />
                  <Minus
                    size={22}
                    strokeWidth={2}
                    className={`absolute text-ink transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
                  />
                </span>
              </button>
              <div className="accordion-panel" data-open={isOpen}>
                <div>
                  <p className="px-20 pb-22 font-body text-15 font-normal leading-1.6 text-text-2 sm:px-26">
                    {a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
