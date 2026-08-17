'use client'

import { STATUS_SITE } from '@/lib/nightcrawl/types'
import type { SiteRowVM } from '../vm-types'

interface SiteForm {
  nome: string
  url: string
  status: string
  responsavel: string
}

interface PresenceViewProps {
  sForm: SiteForm
  onSFormChange: (patch: Partial<SiteForm>) => void
  responsaveis: string[]
  onSalvar: () => void
  sites: SiteRowVM[]
}

export function PresenceView({ sForm, onSFormChange, responsaveis, onSalvar, sites }: PresenceViewProps) {
  return (
    <div>
      <h2 style={{ fontSize: 28, margin: '0 0 4px' }}>Presença nos sites</h2>
      <p style={{ margin: '0 0 26px', fontSize: 13, color: 'var(--nc-color-neutral-700)' }}>
        TripAdvisor, Reddit, fóruns, guias — onde precisamos aparecer e em que pé está.
      </p>

      <div className="nc-formrow" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr 1fr auto', gap: 12, alignItems: 'end', marginBottom: 34 }}>
        <div className="nc-field">
          <label>Site</label>
          <input className="nc-input" value={sForm.nome} onChange={(e) => onSFormChange({ nome: e.target.value })} placeholder="TripAdvisor" />
        </div>
        <div className="nc-field">
          <label>Link</label>
          <input className="nc-input" value={sForm.url} onChange={(e) => onSFormChange({ url: e.target.value })} placeholder="https://" />
        </div>
        <div className="nc-field">
          <label>Situação</label>
          <select className="nc-input" value={sForm.status} onChange={(e) => onSFormChange({ status: e.target.value })}>
            {STATUS_SITE.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="nc-field">
          <label>Responsável</label>
          <select className="nc-input" value={sForm.responsavel} onChange={(e) => onSFormChange({ responsavel: e.target.value })}>
            {responsaveis.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <button className="nc-btn nc-btn-primary" onClick={onSalvar} style={{ height: 36 }}>Adicionar</button>
      </div>

      {sites.map((s) => (
        <div
          key={s.id}
          className="nc-row"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '14px 20px', padding: '18px 0', borderBottom: '1px solid color-mix(in srgb, var(--nc-color-text) 9%, transparent)' }}
        >
          <div style={{ flex: '1 1 240px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--nc-font-heading)', fontWeight: 600, fontSize: 20 }}>{s.nome}</span>
              <span className={`nc-tag ${s.statusCls}`}>{s.status}</span>
            </div>
            <div style={{ fontSize: 13, marginTop: 4 }}>
              <a href={s.url} target="_blank" rel="noreferrer">{s.urlTxt}</a>
            </div>
          </div>
          <div style={{ flex: '1 1 240px', minWidth: 0 }}>
            <input
              className="nc-input"
              value={s.proximaAcao}
              onChange={(e) => s.onAcaoChange(e.target.value)}
              placeholder="Próxima ação — ex.: pedir 5 avaliações"
            />
          </div>
          <div style={{ width: 150, flex: '0 0 150px' }}>
            <select className="nc-input" value={s.status} onChange={(e) => s.onStatusChange(e.target.value)}>
              {STATUS_SITE.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div style={{ fontSize: 13, color: 'var(--nc-color-neutral-700)', width: 90, flex: 'none', paddingTop: 8 }}>{s.responsavel}</div>
          <button className="nc-btn nc-btn-ghost nc-btn-danger" onClick={s.remover} style={{ fontSize: 12, paddingTop: 8 }}>Excluir</button>
        </div>
      ))}
    </div>
  )
}
