'use client'

import { useState, useMemo, useCallback } from 'react'
import { CATEGORIES } from '@/lib/seo-report-data'
import { TASK_STATUS, getNextStatus, type TaskStatus } from '@/lib/seo-constants'
import type { Month } from '@/lib/seo-report-data'
import styles from '@/app/mayura/seo-report.module.css'
import { Ornament } from './ornament'
import { TaskRow } from './task-row'
import { LockedMonth } from './locked-month'

interface SeoReportState {
  tasks: Record<string, TaskStatus>
}

interface MonthPanelProps {
  month: Month
  state: SeoReportState
  setState: (state: SeoReportState) => void
}

export function MonthPanel({ month, state, setState }: MonthPanelProps) {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  if (month.locked) return <LockedMonth month={month} />

  const tasks = month.tasks[activeCat] || []
  const taskState = state.tasks

  const cycleStatus = useCallback(
    (id: string) => {
      const cur = taskState[id] || TASK_STATUS.TODO
      const next = getNextStatus(cur)
      setState({ tasks: { ...taskState, [id]: next } })
    },
    [taskState, setState]
  )

  const catCounts = useMemo(() => {
    const out: Record<string, { total: number; done: number }> = {}
    for (const c of CATEGORIES) {
      const list = month.tasks[c.id] || []
      const done = list.filter((t) => taskState[t.id] === TASK_STATUS.DONE).length
      out[c.id] = { total: list.length, done }
    }
    return out
  }, [month, taskState])

  return (
    <article>
      <header className={styles.monthHead}>
        <div className={styles.monthEyebrow}>
          <span>{month.label}</span>
          <span className={styles.dotSep}>·</span>
          <span>{month.period}</span>
        </div>
        <h1 className={styles.monthTitle}>{month.title}</h1>
        <Ornament />
        <p className={styles.monthSummary}>{month.summary}</p>
        <div className={styles.monthObjective}>
          <span className={styles.monthObjectiveLbl}>Objetivo del mes</span>
          <p>{month.objective}</p>
        </div>
      </header>

      <div className={styles.catTabs} role="tablist">
        {CATEGORIES.map((c) => {
          const ct = catCounts[c.id]
          const isActive = activeCat === c.id
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={isActive}
              className={`${styles.catTab} ${isActive ? styles.isActive : ''}`}
              onClick={() => setActiveCat(c.id)}
            >
              <span className={styles.catTabLabel}>{c.label}</span>
              <span className={styles.catTabCount}>
                {ct.done}/{ct.total}
              </span>
            </button>
          )
        })}
      </div>

      {tasks.length === 0 ? (
        <p className={styles.empty}>Sin tareas en esta categoría este mes.</p>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((t) => {
            const handleToggle = () => {
              const newExpanded = new Set(expanded)
              if (newExpanded.has(t.id)) {
                newExpanded.delete(t.id)
              } else {
                newExpanded.add(t.id)
              }
              setExpanded(newExpanded)
            }

            return (
              <TaskRow
                key={t.id}
                task={t}
                status={taskState[t.id] || TASK_STATUS.TODO}
                expanded={expanded.has(t.id)}
                onToggleExpand={handleToggle}
                onCycleStatus={() => cycleStatus(t.id)}
              />
            )
          })}
        </ul>
      )}
    </article>
  )
}
