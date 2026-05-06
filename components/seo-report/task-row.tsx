import { TASK_STATUS, CHEVRON, type TaskStatus } from '@/lib/seo-constants'
import type { Task } from '@/lib/seo-report-data'
import styles from '@/app/mayura/seo-report.module.css'
import { ImpactDot } from './impact-dot'

interface TaskRowProps {
  task: Task
  status: TaskStatus
  expanded: boolean
  onToggleExpand: () => void
  onCycleStatus: () => void
}

const STATUS_CLASS_MAP: Record<TaskStatus, string> = {
  [TASK_STATUS.TODO]: '',
  [TASK_STATUS.DOING]: styles.checkDoing,
  [TASK_STATUS.DONE]: styles.checkDone,
}

const STATUS_GLYPH_MAP: Record<TaskStatus, React.ReactNode> = {
  [TASK_STATUS.TODO]: undefined,
  [TASK_STATUS.DOING]: <span className={styles.checkHalf} aria-hidden="true" />,
  [TASK_STATUS.DONE]: <span aria-hidden="true">✓</span>,
}

export function TaskRow({
  task,
  status,
  expanded,
  onToggleExpand,
  onCycleStatus,
}: TaskRowProps) {
  return (
    <li className={`${styles.task} ${status === TASK_STATUS.DONE ? styles.isDone : ''}`}>
      <div className={styles.taskHead} onClick={onToggleExpand}>
        <button
          className={`${styles.check} ${STATUS_CLASS_MAP[status]}`}
          onClick={(e) => {
            e.stopPropagation()
            onCycleStatus()
          }}
          aria-label={`Estado de ${task.title}`}
        >
          {STATUS_GLYPH_MAP[status]}
        </button>
        <div className={styles.taskMain}>
          <div className={styles.taskTitle}>{task.title}</div>
          <div className={styles.taskMeta}>
            <ImpactDot level={task.impact} />
            {task.metric && <span className={styles.metricChip}>{task.metric}</span>}
          </div>
        </div>
        <button
          className={styles.taskToggle}
          aria-expanded={expanded}
          onClick={(e) => {
            e.stopPropagation()
            onToggleExpand()
          }}
          aria-label={expanded ? 'Colapsar detalle' : 'Expandir detalle'}
        >
          <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
            <path
              d={expanded ? CHEVRON.UP : CHEVRON.DOWN}
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {expanded && (
        <div className={styles.taskDetail}>
          <p>{task.detail}</p>
        </div>
      )}
    </li>
  )
}
