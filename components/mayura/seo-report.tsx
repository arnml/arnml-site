'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CATEGORIES, MONTHS } from '@/lib/seo-report-data'
import { TASK_STATUS, BRAND_ASSETS, type TaskStatus } from '@/lib/seo-constants'
import styles from '@/app/mayura/seo-report.module.css'
import { Ornament } from './ornament'
import { MonthRail } from './month-rail'
import { MonthPanel } from './month-panel'

interface SeoReportState {
  tasks: Record<string, TaskStatus>
}

function getInitialTaskState(): Record<string, TaskStatus> {
  const tasks: Record<string, TaskStatus> = {}

  for (const month of MONTHS.filter((m) => !m.locked)) {
    for (const category of CATEGORIES) {
      for (const task of month.tasks[category.id] || []) {
        tasks[task.id] = TASK_STATUS.DONE
      }
    }
  }

  return tasks
}

export function SeoReport() {
  const [state, setState] = useState<SeoReportState>(() => ({
    tasks: getInitialTaskState(),
  }))
  const [activeMonth, setActiveMonth] = useState(1)

  const month = MONTHS.find((m) => m.n === activeMonth)

  return (
    <div className={styles.app}>
      {/* Partner strip */}
      <div className={styles.partnerStrip}>
        <div className={`${styles.partnerSide} ${styles.partnerAgency}`}>
          <Image src={BRAND_ASSETS.AUTOMATAS_LOGO.src} alt={BRAND_ASSETS.AUTOMATAS_LOGO.alt} width={120} height={120} />
          <div className={styles.partnerMeta}>
            <span className={styles.partnerRole}>Agencia</span>
            <span className={styles.partnerName}>Automatas Perú</span>
          </div>
        </div>
        <div className={styles.partnerX}>
          <span className={styles.partnerXLine} />
          <span className={styles.partnerXTx}>colabora con</span>
          <span className={styles.partnerXLine} />
        </div>
        <div className={`${styles.partnerSide} ${styles.partnerClient}`}>
          <div className={`${styles.partnerMeta} ${styles.partnerMetaR}`}>
            <span className={styles.partnerRole}>Cliente</span>
            <span className={styles.partnerName}>Mayura Lounge</span>
          </div>
          <div className={styles.partnerClientLogo}>
            <Image src={BRAND_ASSETS.MAYURA_LOGO.src} alt={BRAND_ASSETS.MAYURA_LOGO.alt} width={120} height={120} />
          </div>
        </div>
      </div>

      {/* Masthead */}
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <div className={styles.brand}>
            <div>
              <div className={styles.brandEyebrow}>Informe SEO</div>
              <div className={styles.brandName}>Plan a 6 meses</div>
              <div className={styles.brandSub}>mayuralounge.es</div>
            </div>
          </div>
          <div className={styles.mastheadMeta}>
            <div className={styles.metaCell}>
              <span className={styles.metaLbl}>Inicio</span>
              <span className={styles.metaVal}>Mayo 2026</span>
            </div>
            <div className={styles.metaCell}>
              <span className={styles.metaLbl}>Ciclo</span>
              <span className={styles.metaVal}>6 meses</span>
            </div>
            <div className={styles.metaCell}>
              <span className={styles.metaLbl}>Mes activo</span>
              <span className={styles.metaVal}>
                {String(activeMonth).padStart(2, '0')} / 06
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Month rail */}
      <MonthRail
        months={MONTHS}
        active={activeMonth}
        onPick={setActiveMonth}
      />

      {/* Main content */}
      <main>
        {month && (
          <MonthPanel
            key={activeMonth}
            month={month}
            state={state}
            setState={setState}
          />
        )}
      </main>

      {/* Footer */}
      <footer className={styles.foot}>
        <Ornament />
        <div className={styles.footPartner}>
          <span className={styles.footPartnerTx}>Servicio SEO realizado por</span>
          <div className={styles.footPartnerLogo}>
            <Image src={BRAND_ASSETS.AUTOMATAS_LOGO.src} alt={BRAND_ASSETS.AUTOMATAS_LOGO.alt} width={120} height={120} />
          </div>
          <span className={styles.footPartnerName}>Automatas Perú</span>
        </div>
      </footer>
    </div>
  )
}
