'use client'

import type { AtividadeRowVM, FunilRowVM, PartnerRowVM, RankRowVM } from '../vm-types'

interface DashboardViewProps {
  nAtrasados: number
  nHoje: number
  nAbertos: number
  nVendasMes: number
  mesTxt: string
  onIrAtrasados: () => void
  onIrHoje: () => void
  onIrAbertos: () => void
  onIrVendas: () => void
  pendentes: PartnerRowVM[]
  rankCodigos: RankRowVM[]
  funil: FunilRowVM[]
  atividade: AtividadeRowVM[]
}

export function DashboardView({
  nAtrasados,
  nHoje,
  nAbertos,
  nVendasMes,
  mesTxt,
  onIrAtrasados,
  onIrHoje,
  onIrAbertos,
  onIrVendas,
  pendentes,
  rankCodigos,
  funil,
  atividade,
}: DashboardViewProps) {
  return (
    <div>
      <div className="nc-stat" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 34, marginBottom: 54 }}>
        <StatButton onClick={onIrAtrasados} value={nAtrasados} color="var(--nc-color-accent-2-700)" label="Follow-ups atrasados" hint="passaram da data de contato" />
        <StatButton onClick={onIrHoje} value={nHoje} color="var(--nc-color-accent-700)" label="Follow-ups de hoje" hint="contato marcado para hoje" />
        <StatButton onClick={onIrAbertos} value={nAbertos} label="Leads abertos" hint="ainda não fechados nem perdidos" />
        <StatButton onClick={onIrVendas} value={nVendasMes} label="Vendas no mês" hint={`registradas em ${mesTxt}`} />
      </div>

      <div className="nc-stack" style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 64, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: 24, margin: '0 0 4px' }}>Para você hoje</h2>
          <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--nc-color-neutral-700)' }}>
            Atrasados primeiro. Ao registrar um contato o próximo follow-up já fica marcado.
          </p>
          {pendentes.map((l) => (
            <div
              key={l.id}
              className="nc-row"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                gap: '12px 18px',
                padding: '16px 0',
                borderBottom: '1px solid color-mix(in srgb, var(--nc-color-text) 8%, transparent)',
              }}
            >
              <div style={{ width: 76, flex: 'none', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: 3, color: l.prazoCor }}>
                {l.prazoTxt}
              </div>
              <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                <button
                  onClick={l.abrir}
                  style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--nc-font-heading)', fontWeight: 600, fontSize: 19, color: 'var(--nc-color-text)' }}
                >
                  {l.nome}
                </button>
                <div style={{ fontSize: 13, color: 'var(--nc-color-neutral-700)', marginTop: 2 }}>
                  {l.handle} · {l.tipo}
                </div>
                <div style={{ fontSize: 13, marginTop: 6, fontStyle: 'italic', color: 'var(--nc-color-neutral-800)' }}>{l.ultimoTxt}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flex: '1 1 100%', paddingTop: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <span className={`nc-tag ${l.etapaCls}`}>{l.etapa}</span>
                <button className="nc-btn nc-btn-secondary nc-btn-sm" onClick={l.qEnviei}>Enviei</button>
                <button className="nc-btn nc-btn-secondary nc-btn-sm" onClick={l.qSemResposta}>Sem resposta</button>
                <button className="nc-btn nc-btn-secondary nc-btn-sm" onClick={l.qRespondeu}>Respondeu</button>
                <button className="nc-btn nc-btn-ghost nc-btn-sm" onClick={l.abrirLog}>Registrar…</button>
              </div>
            </div>
          ))}
          {pendentes.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: 'var(--nc-color-neutral-700)', padding: '20px 0' }}>Nada pendente. Boa semana.</p>
          ) : null}

          <h2 style={{ fontSize: 24, margin: '44px 0 14px' }}>Códigos que mais vendem</h2>
          {rankCodigos.map((r) => (
            <div
              key={r.codigo + r.nome}
              style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '9px 0', borderBottom: '1px solid color-mix(in srgb, var(--nc-color-text) 8%, transparent)', fontSize: 14 }}
            >
              <span style={{ fontFamily: 'var(--nc-font-heading)', fontWeight: 600, minWidth: 150 }}>{r.codigo}</span>
              <span style={{ flex: 1, color: 'var(--nc-color-neutral-700)' }}>{r.nome}</span>
              <span>{r.vendas} vendas</span>
              <span style={{ minWidth: 110, textAlign: 'right' }}>{r.receita}</span>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ fontSize: 24, margin: '0 0 18px' }}>Funil</h2>
          {funil.map((p) => (
            <button
              key={p.etapa}
              onClick={p.go}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 0, padding: '0 0 14px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                <span>{p.etapa}</span>
                <span style={{ color: 'var(--nc-color-neutral-700)' }}>{p.count}</span>
              </div>
              <div style={{ height: 6, background: 'color-mix(in srgb, var(--nc-color-text) 8%, transparent)' }}>
                <div style={{ height: 6, background: p.cor, width: p.largura }} />
              </div>
            </button>
          ))}

          <h2 style={{ fontSize: 24, margin: '38px 0 14px' }}>Atividade recente</h2>
          {atividade.map((r, i) => (
            <div key={i} style={{ padding: '9px 0', borderBottom: '1px solid color-mix(in srgb, var(--nc-color-text) 8%, transparent)', fontSize: 13 }}>
              <span style={{ color: 'var(--nc-color-neutral-600)' }}>{r.dataTxt}</span>
              <span style={{ marginLeft: 8 }}>{r.quem}</span>
              <span style={{ marginLeft: 6, color: 'var(--nc-color-neutral-700)' }}>— {r.tipo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatButton({ onClick, value, label, hint, color }: { onClick: () => void; value: number; label: string; hint: string; color?: string }) {
  return (
    <button onClick={onClick} style={{ textAlign: 'left', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
      <div className="nc-huge" style={{ fontFamily: 'var(--nc-font-heading)', fontSize: 52, lineHeight: 1, color: color || 'var(--nc-color-text)' }}>
        {value}
      </div>
      <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--nc-color-neutral-700)', marginTop: 8 }}>{label}</div>
      <div style={{ fontSize: 12, color: 'var(--nc-color-neutral-600)', marginTop: 3 }}>{hint}</div>
    </button>
  )
}
