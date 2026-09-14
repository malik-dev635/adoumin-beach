/** Etoile de notation : geometrie du path `Star` lue dans le .pen (noeud CK4Fi), viewBox 0 0 100 100. */
const STAR_PATH =
  'M50 2l11.2 32.6 34.4 0.6-27.5 20.7 10.1 32.9-28.2-19.8-28.2 19.8 10.1-32.9-27.5-20.7 34.4-0.6z'

export default function Star({ color = '#ffcd03', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d={STAR_PATH} fill={color} />
    </svg>
  )
}

/** Rangee de `count` etoiles, `on` allumees. */
export function Stars({ count = 5, on = 5, size = 16, gapClass = 'gap-2' }) {
  return (
    <div className={`flex ${gapClass}`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={size} color={i < on ? '#ffcd03' : '#c9d1da'} />
      ))}
    </div>
  )
}
