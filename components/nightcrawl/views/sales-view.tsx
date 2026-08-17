'use client'

import type { SaleRowVM } from '../vm-types'

interface VendaForm {
  data: string
  parceiroId: string
  cliente: string
  pessoas: string
  valor: string
}

interface SalesViewProps {
  vForm: VendaForm
  onVFormChange: (patch: Partial<VendaForm>) => void
  opcoesParceiro: { value: string; label: string }[]
  nomesClientes: string[]
  onSalvar: () => void
  totalVendas: string
  totalPessoas: string
  totalReceita: string
  totalComissao: string
  vendas: SaleRowVM[]
}

export function SalesView({
  vForm,
  onVFormChange,
  opcoesParceiro,
  nomesClientes,
  onSalvar,
  totalVendas,
  totalPessoas,
  totalReceita,
  totalComissao,
  vendas,
}: SalesViewProps) {
  return (
    <div>
      <h2 style={{ fontSize: 28, margin: '0 0 4px' }}>Vendas atribuídas</h2>
      <p style={{ margin: '0 0 26px', fontSize: 13, color: 'var(--nc-color-neutral-700)' }}>
        O cliente disse &quot;venho da parte de…&quot; — registre aqui e a comissão do parceiro é calculada sozinha.
      </p>

      <div className="nc-formrow" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr 1.3fr 0.7fr 0.9fr auto', gap: 12, alignItems: 'end', marginBottom: 34 }}>
        <div className="nc-field">
          <label>Data</label>
          <input className="nc-input" type="date" value={vForm.data} onChange={(e) => onVFormChange({ data: e.target.value })} />
        </div>
        <div className="nc-field">
          <label>Código / parceiro</label>
          <select className="nc-input" value={vForm.parceiroId} onChange={(e) => onVFormChange({ parceiroId: e.target.value })}>
            <option value="">Sem código (direto)</option>
            {opcoesParceiro.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="nc-field">
          <label>Cliente (opcional)</label>
          <input
            className="nc-input"
            value={vForm.cliente}
            onChange={(e) => onVFormChange({ cliente: e.target.value })}
            list="nc-lista-clientes"
            placeholder="Não identificado"
          />
          <datalist id="nc-lista-clientes">
            {nomesClientes.map((nc) => (
              <option key={nc} value={nc} />
            ))}
          </datalist>
        </div>
        <div className="nc-field">
          <label>Pessoas</label>
          <input className="nc-input" value={vForm.pessoas} onChange={(e) => onVFormChange({ pessoas: e.target.value })} placeholder="4" />
        </div>
        <div className="nc-field">
          <label>Valor (R$)</label>
          <input className="nc-input" value={vForm.valor} onChange={(e) => onVFormChange({ valor: e.target.value })} placeholder="480" />
        </div>
        <button className="nc-btn nc-btn-primary" onClick={onSalvar} style={{ height: 36 }}>Registrar</button>
      </div>

      <div className="nc-stat" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 34, marginBottom: 36 }}>
        <Stat label="Vendas" value={totalVendas} />
        <Stat label="Pessoas" value={totalPessoas} />
        <Stat label="Receita" value={totalReceita} />
        <Stat label="Comissão a pagar" value={totalComissao} color="var(--nc-color-accent-2-700)" />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="nc-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Parceiro</th>
              <th>Código</th>
              <th>Cliente</th>
              <th className="nc-hide-sm">Pessoas</th>
              <th>Valor</th>
              <th>Comissão</th>
              <th>Pago</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((v) => (
              <tr key={v.id}>
                <td style={{ fontSize: 13 }}>{v.dataTxt}</td>
                <td style={{ fontSize: 14 }}>{v.parceiro}</td>
                <td style={{ fontSize: 13, fontFamily: 'var(--nc-font-heading)', fontWeight: 600 }}>{v.codigo}</td>
                <td style={{ fontSize: 14 }}>{v.cliente}</td>
                <td style={{ fontSize: 13 }} className="nc-hide-sm">{v.pessoas}</td>
                <td style={{ fontSize: 14 }}>{v.valorTxt}</td>
                <td style={{ fontSize: 14 }}>{v.comissaoTxt}</td>
                <td>
                  <button onClick={v.togglePago} className={`nc-tag ${v.pagoCls}`} style={{ border: 0, cursor: 'pointer' }}>
                    {v.pagoTxt}
                  </button>
                </td>
                <td>
                  <button className="nc-btn nc-btn-ghost nc-btn-danger" onClick={v.remover} style={{ fontSize: 12 }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {vendas.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: 'var(--nc-color-neutral-700)', padding: '22px 0' }}>Nenhuma venda registrada ainda.</p>
      ) : null}
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <div className="nc-huge" style={{ fontFamily: 'var(--nc-font-heading)', fontSize: 44, lineHeight: 1, color: color || 'var(--nc-color-text)' }}>{value}</div>
      <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--nc-color-neutral-700)', marginTop: 6 }}>{label}</div>
    </div>
  )
}
