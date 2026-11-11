/** Nidus Estate house mark — used by the navbar and footer. */
export default function LogoMark({ className = 'nav-brand-mark' }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 32 32">
        <path d="M5 15.5 16 6l11 9.5" />
        <path d="M8.5 13v12.5h15V13" />
        <path d="M13 25.5v-4.5a3 3 0 0 1 6 0v4.5" />
      </svg>
    </span>
  )
}
