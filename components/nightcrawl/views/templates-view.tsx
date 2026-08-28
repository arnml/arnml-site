'use client'

import { DESTINATARIOS, VARIAVEIS, type Destinatario } from '@/lib/nightcrawl/types'
import type { TemplateRowVM } from '../vm-types'

interface TemplatesViewProps {
  modelos: TemplateRowVM[]
  aba: Destinatario
  onAbaChange: (v: Destinatario) => void
  onNovoModelo: () => void
}

export function TemplatesView({ modelos, aba, onAbaChange, onNovoModelo }: TemplatesViewProps) {
  const visiveis = modelos.filter((m) => m.destinatario === aba)
  return (
    <div className="nc-stack" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, alignItems: 'start' }}>
      <div>
        <h2 style={{ fontSize: 28, margin: '0 0 4px' }}>Modelos de mensagem</h2>
        <p style={{ margin: '0 0 26px', fontSize: 13, color: 'var(--nc-color-neutral-700)' }}>
          Escreva uma vez; o sistema troca as variáveis pelos dados de cada parceiro ou cliente.
        </p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 22 }}>
          {DESTINATARIOS.map((d) => (
            <button
              key={d.value}
              onClick={() => onAbaChange(d.value)}
              className={`nc-btn nc-btn-sm ${aba === d.value ? 'nc-btn-primary' : 'nc-btn-secondary'}`}
            >
              {d.label}
            </button>
          ))}
        </div>
        {visiveis.map((m) => (
          <div key={m.id} style={{ paddingBottom: 30 }}>
            <input
              className="nc-input"
              value={m.nome}
              onChange={(e) => m.onNomeChange(e.target.value)}
              onBlur={m.onNomeBlur}
              style={{ maxWidth: 320, fontFamily: 'var(--nc-font-heading)', fontWeight: 600, fontSize: 17, marginBottom: 8 }}
            />
            <textarea
              className="nc-input"
              value={m.texto}
              onChange={(e) => m.onTextoChange(e.target.value)}
              onBlur={m.onTextoBlur}
              style={{ minHeight: 170, fontSize: 14 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <select
                className="nc-input"
                value={m.destinatario}
                onChange={(e) => m.onDestinatarioChange(e.target.value as Destinatario)}
                style={{ maxWidth: 160, fontSize: 12 }}
              >
                {DESTINATARIOS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="nc-btn nc-btn-secondary" onClick={m.salvar} style={{ fontSize: 12 }}>Salvar modelo</button>
                <button className="nc-btn nc-btn-ghost nc-btn-danger" onClick={m.remover} style={{ fontSize: 12 }}>Excluir modelo</button>
              </div>
            </div>
          </div>
        ))}
        {visiveis.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: 'var(--nc-color-neutral-700)', padding: '10px 0 26px' }}>
            Nenhum modelo para {aba === 'cliente' ? 'clientes' : 'parceiros'} ainda.
          </p>
        ) : null}
        <button className="nc-btn nc-btn-secondary" onClick={onNovoModelo}>+ Novo modelo</button>
      </div>
      <div>
        <h3 style={{ fontSize: 22, margin: '0 0 14px' }}>Variáveis</h3>
        {VARIAVEIS.map((v) => (
          <div key={v.k} style={{ display: 'flex', gap: 12, padding: '7px 0', borderBottom: '1px solid color-mix(in srgb, var(--nc-color-text) 6%, transparent)', fontSize: 13 }}>
            <code style={{ fontFamily: 'var(--nc-font-heading)', fontWeight: 600, minWidth: 158 }}>{v.k}</code>
            <span style={{ color: 'var(--nc-color-neutral-700)' }}>{v.d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
