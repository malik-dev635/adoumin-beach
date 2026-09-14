import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Badge, Title } from './ui.jsx'

/**
 * Frame Pencil `FAQ` (id J0lVp) : fill blanc, vertical, gap 40, padding [80,120], alignItems center.
 * `List` (nCedF) : w 920, gap 14. Chaque item : fill #F1F3F5, cornerRadius 12, padding [22,28],
 * question Mulish 16/500 marine, icone `plus` 22 marine.
 *
 * Le .pen ne dessine que l'etat ferme (aucune reponse). Les reponses et l'icone `minus` de l'etat
 * ouvert sont ajoutees pour l'accordeon fonctionnel demande.
 */

const QUESTIONS = [
  {
    q: "Qu'est-ce qui rend Adoumin Beach Resort unique ?",
    a: "Un cadre les pieds dans l'eau face à la baie de Cocody : palmiers, terrasse, piscine, rooftop et une vue dégagée sur la lagune Ébrié.",
  },
  {
    q: 'Faut-il réserver pour déjeuner ou dîner ?',
    a: "La réservation est conseillée, surtout le week-end et en soirée. Vous pouvez réserver en ligne ou nous appeler au +225 07 78 61 68 99.",
  },
  {
    q: 'Quelles activités propose le complexe ?',
    a: 'Restaurant, piscine et transats, lounge bar et rooftop, soirées avec DJ, et des espaces privatisables pour vos événements.',
  },
  {
    q: 'Prenez-vous en compte les régimes particuliers ?',
    a: 'Oui. Signalez vos allergies ou régimes à la réservation : la cuisine adapte les assiettes, entre recettes africaines et européennes.',
  },
  {
    q: 'Puis-je organiser un événement ou un mariage ?',
    a: "Oui, jusqu'à 1 000 personnes en salle de réception, avec bar, cuisine et vue lagune. L'équipe événementielle vous accompagne.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="flex w-full flex-col items-center gap-40 bg-white px-96 py-[3.5rem] sm:py-80">
      <div className="reveal flex flex-col items-center gap-16">
        <Badge>BON À SAVOIR</Badge>
        <Title
          a="Vos questions,"
          b="nos réponses"
          sizeClass="text-46"
          wrapClass="flex flex-row flex-wrap justify-center gap-12"
        />
      </div>

      <div className="flex w-full flex-col gap-14 lg:w-920">
        {QUESTIONS.map(({ q, a }, i) => {
          const isOpen = open === i
          return (
            <div key={q} className="reveal w-full overflow-hidden rounded-12 bg-surface-1 transition-colors duration-300 hover:bg-[#EAEEF2]" style={{ '--d': `${i * 0.06}s` }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-20 px-28 py-22 text-left"
              >
                <span className="font-body text-16 font-medium text-marine">{q}</span>
                <span className="relative flex h-22 w-22 shrink-0 items-center justify-center">
                  <Plus
                    size={22}
                    strokeWidth={2}
                    className={`absolute text-marine transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                  />
                  <Minus
                    size={22}
                    strokeWidth={2}
                    className={`absolute text-marine transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
                  />
                </span>
              </button>
              <div className="accordion-panel" data-open={isOpen}>
                <div>
                  <p className="px-28 pb-22 font-body text-15 font-normal leading-1.5 text-body-txt">
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
