import styles from '@/app/mayura/seo-report.module.css'

interface ImpactDotProps {
  level: 'Alto' | 'Medio' | 'Bajo'
}

const IMPACT_CLASS_MAP = {
  Alto: styles.impactHigh,
  Medio: styles.impactMed,
  Bajo: styles.impactLow,
} as const

export function ImpactDot({ level }: ImpactDotProps) {
  const impactClass = IMPACT_CLASS_MAP[level]

  return (
    <span className={`${styles.impact} ${impactClass}`}>
      <span className={styles.impactBar} />
      <span className={styles.impactBar} />
      <span className={styles.impactBar} />
      <span className={styles.impactLabel}>{level}</span>
    </span>
  )
}
