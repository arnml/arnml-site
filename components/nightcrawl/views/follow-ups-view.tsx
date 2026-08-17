'use client'

import type { FollowGroupVM } from '../vm-types'

interface FollowUpsViewProps {
  busca: string
  onBuscaChange: (v: string) => void
  grupos: FollowGroupVM[]
}

export function FollowUpsView({ busca, onBuscaChange, grupos }: FollowUpsViewProps) {
  return (
    <div style={{ maxWidth: 940 }}>
      <h2 style={{ fontSize: 28, margin: '0 0 4px' }}>Fila de follow-up</h2>
      <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--nc-color-neutral-700)' }}>
        Todos os parceiros com data de próximo contato, do mais antigo para o mais novo.
      </p>
      <input
        className="nc-input"
        value={busca}
        onChange={(e) => onBuscaChange(e.target.value)}
        placeholder="Buscar por nome ou número — ex.: Marina ou 98812"
        style={{ maxWidth: 420, marginBottom: 30 }}
      />
      {grupos.map((g) => (
        <div key={g.label} style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--nc-color-accent-700)', marginBottom: 10 }}>
            {g.label} <span style={{ color: 'var(--nc-color-neutral-600)' }}>{g.count}</span>
          </div>
          {g.items.map((l) => (
            <div
              key={l.id}
              className="nc-row"
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 16px', padding: '13px 0', borderBottom: '1px solid color-mix(in srgb, var(--nc-color-text) 8%, transparent)' }}
            >
              <div style={{ width: 84, flex: 'none', fontSize: 13, color: l.prazoCor }}>{l.proximoTxt}</div>
              <button onClick={l.abrir} style={{ flex: '1 1 200px', minWidth: 0, textAlign: 'left', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
                <span style={{ fontFamily: 'var(--nc-font-heading)', fontWeight: 600, fontSize: 18 }}>{l.nome}</span>
                <span style={{ fontSize: 13, color: 'var(--nc-color-neutral-700)', marginLeft: 10 }}>{l.contato}</span>
              </button>
              <span className={`nc-tag ${l.etapaCls}`}>{l.etapa}</span>
              <button className="nc-btn nc-btn-secondary nc-btn-sm" onClick={l.adiar}>Adiar</button>
              <button className="nc-btn nc-btn-secondary nc-btn-sm" onClick={l.abrirLog}>Registrar contato</button>
            </div>
          ))}
        </div>
      ))}
      {grupos.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: 'var(--nc-color-neutral-700)' }}>Nenhum follow-up marcado.</p>
      ) : null}
    </div>
  )
}
