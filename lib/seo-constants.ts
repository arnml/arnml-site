// SEO Report constants - eliminates magic strings and duplication

export const TASK_STATUS = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done',
} as const

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]

export const CATEGORY_IDS = {
  WP: 'wp',
  SPEED: 'speed',
  GSC: 'gsc',
  GA: 'ga',
} as const

export type CategoryId = (typeof CATEGORY_IDS)[keyof typeof CATEGORY_IDS]

export function getNextStatus(current: TaskStatus): TaskStatus {
  const cycle: TaskStatus[] = [TASK_STATUS.TODO, TASK_STATUS.DOING, TASK_STATUS.DONE]
  const nextIndex = (cycle.indexOf(current) + 1) % cycle.length
  return cycle[nextIndex]
}

export const BRAND_ASSETS = {
  AUTOMATAS_LOGO: {
    src: '/automatas-logo.png',
    alt: 'Automatas Perú',
  },
  MAYURA_LOGO: {
    src: 'https://mayuralounge.es/wp-content/uploads/2023/11/cropped-mayura-con-pluma-alta-blackground.webp',
    alt: 'Mayura Lounge',
  },
} as const

export const CHEVRON = {
  UP: 'M2 7 L6 3 L10 7',
  DOWN: 'M2 5 L6 9 L10 5',
} as const
