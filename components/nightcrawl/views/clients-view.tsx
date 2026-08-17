'use client'

import { TIPOS_FESTA } from '@/lib/nightcrawl/types'
import type { ClientRowVM } from '../vm-types'

interface ClienteForm {
  nome: string
  contato: string
  pais: string
  tipo: string
  origem: string
}

interface ClientsViewProps {
  cForm: ClienteForm
  onCFormChange: (patch: Partial<ClienteForm>) => void
  opcoesOrigem: { value: string; label: string }[]
  onSalvar: () => void
  clientes: ClientRowVM[]
}

export function ClientsView({ cForm, onCFormChange, opcoesOrigem, onSalvar, clientes }: ClientsViewProps) {
  return (
    <div>
      <h2 style={{ fontSize: 28, margin: '0 0 4px' }}>Clientes</h2>
      <p style={{ margin: '0 0 26px', fontSize: 13, color: 'var(--nc-color-neutral-700)' }}>
        Só o essencial: como falar com a pessoa, que festa era e de onde veio.
      </p>

      <div className="nc-formrow" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.1fr 1fr 1.1fr 1.2fr auto', gap: 12, alignItems: 'end', marginBottom: 34 }}>
        <div className="nc-field">
          <label>Nome</label>
          <input className="nc-input" value={cForm.nome} onChange={(e) => onCFormChange({ nome: e.target.value })} placeholder="Primeiro nome basta" />
        </div>
        <div className="nc-field">
          <label>WhatsApp / contato</label>
          <input className="nc-input" value={cForm.contato} onChange={(e) => onCFormChange({ contato: e.target.value })} placeholder="+55 11 9…" />
        </div>
        <div className="nc-field">
          <label>País</label>
          <input className="nc-input" value={cForm.pais} onChange={(e) => onCFormChange({ pais: e.target.value })} placeholder="BR / AR / US" />
        </div>
        <div className="nc-field">
          <label>Tipo de festa</label>
          <select className="nc-input" value={cForm.tipo} onChange={(e) => onCFormChange({ tipo: e.target.value })}>
            {TIPOS_FESTA.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="nc-field">
          <label>Veio de</label>
          <select className="nc-input" value={cForm.origem} onChange={(e) => onCFormChange({ origem: e.target.value })}>
            {opcoesOrigem.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <button className="nc-btn nc-btn-primary" onClick={onSalvar} style={{ height: 36 }}>Adicionar</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="nc-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Contato</th>
              <th className="nc-hide-sm">País</th>
              <th>Tipo</th>
              <th>Veio de</th>
              <th className="nc-hide-sm">Desde</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: 'var(--nc-font-heading)', fontWeight: 600, fontSize: 16 }}>{c.nome}</td>
                <td style={{ fontSize: 14 }}>{c.contato}</td>
                <td style={{ fontSize: 13 }} className="nc-hide-sm">{c.pais}</td>
                <td><span className="nc-tag nc-tag-neutral">{c.tipo}</span></td>
                <td style={{ fontSize: 13 }}>{c.origemTxt}</td>
                <td style={{ fontSize: 13, color: 'var(--nc-color-neutral-700)' }} className="nc-hide-sm">{c.dataTxt}</td>
                <td>
                  <button className="nc-btn nc-btn-ghost nc-btn-danger" onClick={c.remover} style={{ fontSize: 12 }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {clientes.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: 'var(--nc-color-neutral-700)', padding: '22px 0' }}>Nenhum cliente cadastrado ainda.</p>
      ) : null}
    </div>
  )
}
