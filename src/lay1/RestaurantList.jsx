import { Badge, Title } from './ui.jsx'

/**
 * Frame Pencil `Restaurant List` (id afG64) : fill blanc, vertical, gap 36, padding [80,120].
 * `Rows` (q2IU6i) : 3 frames `Item 0X`, chacune avec strokeWidth {top:1} #E6E9ED, padding [28,0],
 * gap 32, alignItems center. Thumb 280x170, cornerRadius 12.
 */

const ITEMS = [
  {
    num: '01',
    title: 'Cuisine africaine & européenne',
    titleFontClass: 'font-futura',
    desc: 'Des saveurs généreuses et des assiettes gourmandes, servies face à la lagune. Chaque repas devient une sortie.',
    img: 'https://images.unsplash.com/photo-1655102713930-ed68081e6b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc1MTd8&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    num: '02',
    title: 'Lounge bar & rooftop',
    titleFontClass: 'font-futura',
    desc: 'Cocktails signature et grands classiques, à savourer sur la terrasse ou en hauteur, la brise de la lagune en prime.',
    img: 'https://images.unsplash.com/photo-1610219081334-bc9a72d80f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc1MTd8&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    num: '03',
    title: 'Brunch, livraison & à emporter',
    titleFontClass: 'font-avenir',
    desc: "Formules brunch le week-end, et la cuisine d'Adoumin jusque chez vous en livraison ou à emporter.",
    img: 'https://images.unsplash.com/photo-1608491545066-18f37f4dec11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODg4NDc1MTh8&ixlib=rb-4.1.0&q=80&w=1080',
  },
]

function Item({ num, title, titleFontClass, desc, img }) {
  return (
    <div className="group reveal flex w-full cursor-pointer flex-col gap-32 border-t border-row-line py-28 transition-colors duration-500 hover:border-marine md:flex-row md:items-center">
      <span className="font-body text-13 font-medium text-num-txt transition-colors duration-500 group-hover:text-gold">{num}</span>
      <h3 className={`text-32 font-medium leading-1.1 text-marine transition-transform duration-500 group-hover:translate-x-[0.375rem] md:w-360 md:shrink-0 ${titleFontClass}`}>
        {title}
      </h3>
      <p className="flex-1 font-body text-15 font-normal leading-1.5 text-body-txt">{desc}</p>
      <div className="aspect-[280/170] w-full shrink-0 overflow-hidden rounded-12 md:aspect-auto md:h-170 md:w-280">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
        />
      </div>
    </div>
  )
}

export default function RestaurantList() {
  return (
    <section className="flex w-full flex-col gap-36 bg-white px-96 py-[3.5rem] sm:py-80">
      <div className="reveal flex w-full flex-col items-start justify-between gap-40 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-18">
          <Badge>LE RESTAURANT</Badge>
          <Title
            a="Saveurs"
            b="d'ici et d'ailleurs"
            sizeClass="text-44"
            wrapClass="flex flex-row flex-wrap items-center gap-12"
          />
        </div>
        <p className="font-body text-16 font-normal leading-1.5 text-body-txt lg:w-360 lg:shrink-0">
          Une carte qui marie les classiques de la cuisine africaine et les plaisirs de la table
          européenne.
        </p>
      </div>

      <div className="flex w-full flex-col">
        {ITEMS.map((item) => (
          <Item key={item.num} {...item} />
        ))}
      </div>
    </section>
  )
}
