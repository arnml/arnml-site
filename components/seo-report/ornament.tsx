import styles from '@/app/mayura/seo-report.module.css'

export function Ornament() {
  return (
    <svg className={styles.ornament} viewBox="0 0 120 12" aria-hidden="true">
      <path d="M0 6 L40 6" stroke="currentColor" strokeWidth="1" />
      <circle cx="48" cy="6" r="1.5" fill="currentColor" />
      <path d="M55 6 L60 2 L65 6 L60 10 Z" fill="currentColor" />
      <circle cx="72" cy="6" r="1.5" fill="currentColor" />
      <path d="M80 6 L120 6" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
