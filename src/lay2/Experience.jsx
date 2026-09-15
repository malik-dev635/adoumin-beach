/**
 * Frame Pencil `Experience` (id goSim) : fill #F7F5F1, vertical, gap 52, padding [20,120,120,120].
 *  - Header : "Ce qui vous attend" Futura 42/300 lh 1 + sous-titre 320 px, 15 lh 1.5 #8A94A0
 *  - Grid gap 40, trois cartes : image h 398 radius 4, titre Futura 24/300, texte 15 lh 1.55 #5C6472
 */
const CARDS = [
  {
    title: 'Restaurant & lounge',
    desc: 'Cuisine africaine et européenne, cocktails et rooftop, face à la lagune.',
    img: 'https://images.unsplash.com/photo-1777370537280-94e8796c243a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDg0MTR8&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Piscine & détente',
    desc: "Transats, palmiers et piscine pour une parenthèse au bord de l'eau.",
    img: 'https://images.unsplash.com/photo-1509600110300-21b9d5fedeb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDg0MTV8&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Soirées & événements',
    desc: "DJ, soirées à thème et réceptions jusqu'à 1 000 personnes.",
    img: 'https://images.unsplash.com/photo-1639715541854-04bcb1e9a4a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDg0MTV8&ixlib=rb-4.1.0&q=80&w=1080',
  },
]

function Card({ title, desc, img, delay }) {
  return (
    <a
      href="#"
      className="group flex min-w-0 flex-1 flex-col gap-20"
    >
      <div
        className="reveal reveal-wipe reveal-wipe-left aspect-[4/3] w-full overflow-hidden rounded-4 lg:aspect-auto lg:h-398"
        style={{ '--d': delay }}
      >
        <img src={img} alt="" className="h-full w-full object-cover" />
      </div>
      <span className="reveal font-futura text-24 font-light text-marine transition-transform duration-500 group-hover:translate-x-[0.25rem]" style={{ '--d': delay }}>
        {title}
      </span>
      <p className="reveal font-body text-15 font-normal leading-1.55 text-text-3" style={{ '--d': delay }}>{desc}</p>
    </a>
  )
}

export default function Experience() {
  return (
    <section className="flex w-full flex-col gap-40 bg-paper px-32 pb-[3.5rem] pt-20 sm:pb-80 lg:gap-52 lg:pb-120">
      <div className="reveal flex w-full flex-col items-start justify-between gap-16 lg:flex-row lg:items-end lg:gap-40">
        <h2 className="font-futura text-42 font-light leading-1 text-marine">Ce qui vous attend</h2>
        <p className="font-body text-15 font-normal leading-1.5 text-meta-txt lg:w-320 lg:shrink-0">
          Trois façons de vivre Adoumin, du matin jusqu&apos;au bout de la nuit.
        </p>
      </div>
      <div className="flex w-full flex-col gap-32 md:flex-row md:gap-24 lg:gap-40">
        {CARDS.map((c, i) => (
          <Card key={c.title} {...c} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </section>
  )
}
