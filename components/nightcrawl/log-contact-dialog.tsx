'use client'

import { CONTATOS_TIPOS, ETAPAS, type Etapa } from '@/lib/nightcrawl/types'

export interface LogFormState {
  tipo: string
  texto: string
  etapa: Etapa
  proximo: string
}

interface LogContactDialogProps {
  open: boolean
  partnerName: string
  log: LogFormState
  onFieldChange: (patch: Partial<LogFormState>) => void
  onCancel: () => void
  onSave: () => void
}

export function LogContactDialog({ open, partnerName, log, onFieldChange, onCancel, onSave }: LogContactDialogProps) {
  if (!open) return null
  return (
    <div className="nc-dialog-backdrop">
      <div className="nc-dialog" style={{ width: 'min(520px,100%)' }}>
        <div className="nc-dialog-title">Registrar contato — {partnerName}</div>
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="nc-field">
            <label>O que aconteceu</label>
            <select className="nc-input" value={log.tipo} onChange={(e) => onFieldChange({ tipo: e.target.value })}>
              {CONTATOS_TIPOS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="nc-field">
            <label>Nota</label>
            <textarea
              className="nc-input"
              value={log.texto}
              onChange={(e) => onFieldChange({ texto: e.target.value })}
              placeholder="Mandei a proposta, pediram 2 lugares no dia 22"
              style={{ minHeight: 70 }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="nc-field">
              <label>Mover para etapa</label>
              <select className="nc-input" value={log.etapa} onChange={(e) => onFieldChange({ etapa: e.target.value as Etapa })}>
                {ETAPAS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="nc-field">
              <label>Próximo follow-up</label>
              <input className="nc-input" type="date" value={log.proximo} onChange={(e) => onFieldChange({ proximo: e.target.value })} />
            </div>
          </div>
        </div>
        <div className="nc-dialog-actions">
          <button className="nc-btn nc-btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="nc-btn nc-btn-primary" onClick={onSave}>Salvar registro</button>
        </div>
      </div>
    </div>
  )
}
