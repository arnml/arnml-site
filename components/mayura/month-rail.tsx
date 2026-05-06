import type { Month } from '@/lib/seo-report-data'
import styles from '@/app/mayura/seo-report.module.css'

interface MonthRailProps {
  months: Month[]
  active: number
  onPick: (n: number) => void
  progressMap: Record<number, { total: number; done: number; pct: number } | null>
}

export function MonthRail({ months, active, onPick, progressMap }: MonthRailProps) {
  return (
    <nav className={styles.rail} aria-label="Meses del informe">
      {months.map((m) => {
        const prog = progressMap[m.n]
        const isActive = active === m.n
        return (
          <button
            key={m.n}
            className={`${styles.railItem} ${isActive ? styles.isActive : ''} ${
              m.locked ? styles.isLocked : ''
            }`}
            onClick={() => onPick(m.n)}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className={styles.railNum}>
              <span>{String(m.n).padStart(2, '0')}</span>
              {m.locked && <span className={styles.railLock}>⌧</span>}
            </div>
            <div>
              <div className={styles.railLabel}>
                {m.label} · {m.period}
              </div>
              <div className={styles.railTitle}>{m.title}</div>
              {!m.locked && prog && (
                <div className={styles.railProg}>
                  <div
                    className={styles.railProgBar}
                    style={{ width: `${prog.pct}%` }}
                  />
                  <span className={styles.railProgTx}>
                    {prog.done}/{prog.total}
                  </span>
                </div>
              )}
              {m.locked && <div className={styles.railLockedTx}>Próximamente</div>}
            </div>
          </button>
        )
      })}
    </nav>
  )
}
