import type { Month } from '@/lib/seo-report-data'
import styles from '@/app/mayura/seo-report.module.css'
import { Ornament } from './ornament'

interface LockedMonthProps {
  month: Month
}

export function LockedMonth({ month }: LockedMonthProps) {
  return (
    <div className={styles.lockedCard}>
      <div className={styles.lockedStamp}>Próximamente</div>
      <div className={styles.lockedEyebrow}>
        {month.label} · {month.period}
      </div>
      <h2 className={styles.lockedTitle}>{month.title}</h2>
      <Ornament />
      <p className={styles.lockedSummary}>{month.summary}</p>
      <div className={styles.lockedObjective}>
        <span className={styles.lockedObjectiveLbl}>Objetivo</span>
        <p>{month.objective}</p>
      </div>
      <p className={styles.lockedFoot}>
        Las tareas detalladas se publicarán al iniciar este mes. Si quieres adelantarlas,
        escríbenos y reordenamos el plan.
      </p>
    </div>
  )
}
