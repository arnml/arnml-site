'use client'

import type { FiltroVM, PartnerRowVM } from '../vm-types'

interface PartnersViewProps {
  busca: string
  onBuscaChange: (v: string) => void
  filtrosEtapa: FiltroVM[]
  parceiros: PartnerRowVM[]
  onLimparFiltros: () => void
}

export function PartnersView({ busca, onBuscaChange, filtrosEtapa, parceiros, onLimparFiltros }: PartnersViewProps) {
  return (
    <div>
      <div className="nc-row" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
        <input
          className="nc-input"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Buscar nome, @, código, cidade, notas…"
          style={{ maxWidth: 340 }}
        />
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
        {filtrosEtapa.map((f) => (
          <button key={f.label} onClick={f.onClick} className={`nc-btn nc-btn-sm ${f.active ? 'nc-btn-primary' : 'nc-btn-secondary'}`}>
            {f.label} <span style={{ opacity: 0.65, marginLeft: 5 }}>{f.count}</span>
          </button>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="nc-table">
          <thead>
            <tr>
              <th>Parceiro</th>
              <th>Tipo</th>
              <th>Código</th>
              <th className="nc-hide-sm">Desconto</th>
              <th className="nc-hide-sm">Comissão</th>
              <th>Etapa</th>
              <th>Próximo</th>
              <th className="nc-hide-sm">Vendas</th>
            </tr>
          </thead>
          <tbody>
            {parceiros.map((l) => (
              <tr key={l.id} onClick={l.abrir} style={{ cursor: 'pointer' }}>
                <td>
                  <span style={{ fontFamily: 'var(--nc-font-heading)', fontWeight: 600, fontSize: 16 }}>{l.nome}</span>
                  <span style={{ color: 'var(--nc-color-neutral-600)', marginLeft: 8, fontSize: 13 }}>{l.handle}</span>
                </td>
                <td style={{ fontSize: 13 }}>{l.tipo}</td>
                <td style={{ fontSize: 13, fontFamily: 'var(--nc-font-heading)', fontWeight: 600 }}>{l.codigo}</td>
                <td style={{ fontSize: 13 }} className="nc-hide-sm">{l.descontoTxt}</td>
                <td style={{ fontSize: 13 }} className="nc-hide-sm">{l.comissaoPctTxt}</td>
                <td><span className={`nc-tag ${l.etapaCls}`}>{l.etapa}</span></td>
                <td style={{ fontSize: 13, color: l.prazoCor }}>{l.proximoTxt}</td>
                <td style={{ fontSize: 13 }} className="nc-hide-sm">{l.vendasTxt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {parceiros.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: 'var(--nc-color-neutral-700)', padding: '26px 0' }}>
          Nenhum parceiro encontrado.{' '}
          <button className="nc-btn nc-btn-ghost" onClick={onLimparFiltros}>Limpar filtros</button>
        </p>
      ) : null}
    </div>
  )
}
