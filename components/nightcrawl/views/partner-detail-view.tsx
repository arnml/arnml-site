'use client'

interface EtapaChipVM {
  label: string
  bg: string
  fg: string
  go: () => void
}

interface AbaModeloVM {
  label: string
  active: boolean
  go: () => void
}

interface RegistroVM {
  dataTxt: string
  tipo: string
  texto: string
}

interface FatoVM {
  k: string
  v: string
}

interface PartnerDetailViewProps {
  tipo: string
  nome: string
  handle: string
  cidade: string
  etapas: EtapaChipVM[]
  onEditar: () => void
  onAbrirLog: () => void
  onVoltar: () => void
  abasModelo: AbaModeloVM[]
  mensagem: string
  onMensagemChange: (v: string) => void
  onRestaurar: () => void
  copiarLabel: string
  onCopiar: () => void
  whatsUrl: string
  registros: RegistroVM[]
  semRegistros: boolean
  codigo: string
  onCodigoChange: (v: string) => void
  onCodigoBlur: () => void
  onGerarCodigo: () => void
  desconto: string
  onDescontoChange: (v: string) => void
  onDescontoBlur: () => void
  comissao: string
  onComissaoChange: (v: string) => void
  onComissaoBlur: () => void
  avisoCodigo: string
  nVendas: number
  receitaTxt: string
  comissaoTxt: string
  fatos: FatoVM[]
  onExcluir: () => void
}

export function PartnerDetailView({
  tipo,
  nome,
  handle,
  cidade,
  etapas,
  onEditar,
  onAbrirLog,
  onVoltar,
  abasModelo,
  mensagem,
  onMensagemChange,
  onRestaurar,
  copiarLabel,
  onCopiar,
  whatsUrl,
  registros,
  semRegistros,
  codigo,
  onCodigoChange,
  onCodigoBlur,
  onGerarCodigo,
  desconto,
  onDescontoChange,
  onDescontoBlur,
  comissao,
  onComissaoChange,
  onComissaoBlur,
  avisoCodigo,
  nVendas,
  receitaTxt,
  comissaoTxt,
  fatos,
  onExcluir,
}: PartnerDetailViewProps) {
  return (
    <div>
      <button className="nc-btn nc-btn-ghost" onClick={onVoltar} style={{ marginBottom: 16, paddingLeft: 0 }}>← Voltar</button>
      <div className="nc-head" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 30 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--nc-color-accent-700)' }}>{tipo}</div>
          <h2 className="nc-big" style={{ fontSize: 42, lineHeight: 1.05, margin: '6px 0 8px' }}>{nome}</h2>
          <div style={{ fontSize: 15, color: 'var(--nc-color-neutral-700)' }}>
            {handle} · {cidade}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <button className="nc-btn nc-btn-secondary" onClick={onEditar}>Editar</button>
          <button className="nc-btn nc-btn-primary" onClick={onAbrirLog}>Registrar contato</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', margin: '26px 0 40px' }}>
        {etapas.map((s) => (
          <button key={s.label} onClick={s.go} style={{ border: 0, cursor: 'pointer', fontSize: 13, padding: '7px 14px', background: s.bg, color: s.fg }}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="nc-stack" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'start' }}>
        <div>
          <h3 style={{ fontSize: 22, margin: '0 0 12px' }}>Mensagem pronta</h3>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {abasModelo.map((tt) => (
              <button key={tt.label} onClick={tt.go} className={`nc-btn nc-btn-sm ${tt.active ? 'nc-btn-primary' : 'nc-btn-secondary'}`}>
                {tt.label}
              </button>
            ))}
          </div>
          <textarea
            className="nc-input"
            value={mensagem}
            onChange={(e) => onMensagemChange(e.target.value)}
            style={{ minHeight: 220, fontSize: 15, lineHeight: 1.55 }}
          />
          <div className="nc-row" style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <button className="nc-btn nc-btn-primary" onClick={onCopiar}>{copiarLabel}</button>
            <a className="nc-btn nc-btn-secondary" href={whatsUrl} target="_blank" rel="noreferrer">Abrir no WhatsApp</a>
            <button className="nc-btn nc-btn-ghost" onClick={onRestaurar}>Restaurar modelo</button>
          </div>

          <h3 style={{ fontSize: 22, margin: '40px 0 16px' }}>Histórico</h3>
          {registros.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 18, padding: '14px 0', borderBottom: '1px solid color-mix(in srgb, var(--nc-color-text) 8%, transparent)' }}>
              <div style={{ width: 76, flex: 'none', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--nc-color-neutral-600)', paddingTop: 3 }}>
                {r.dataTxt}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--nc-font-heading)', fontWeight: 600, fontSize: 16 }}>{r.tipo}</div>
                <div style={{ fontSize: 14, color: 'var(--nc-color-neutral-800)', marginTop: 3 }}>{r.texto}</div>
              </div>
            </div>
          ))}
          {semRegistros ? (
            <p style={{ fontStyle: 'italic', color: 'var(--nc-color-neutral-700)' }}>Nada registrado ainda.</p>
          ) : null}
        </div>

        <div>
          <h3 style={{ fontSize: 22, margin: '0 0 14px' }}>Código de desconto</h3>
          <div className="nc-row" style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div className="nc-field" style={{ flex: 1 }}>
              <label>Código</label>
              <input
                className="nc-input"
                value={codigo}
                onChange={(e) => onCodigoChange(e.target.value)}
                onBlur={onCodigoBlur}
                style={{ fontFamily: 'var(--nc-font-heading)', fontWeight: 600, fontSize: 17, textTransform: 'uppercase' }}
              />
            </div>
            <button className="nc-btn nc-btn-secondary" onClick={onGerarCodigo} style={{ height: 36 }}>Gerar</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <div className="nc-field">
              <label>Desconto %</label>
              <input className="nc-input" value={desconto} onChange={(e) => onDescontoChange(e.target.value)} onBlur={onDescontoBlur} placeholder="5" />
            </div>
            <div className="nc-field">
              <label>Comissão %</label>
              <input className="nc-input" value={comissao} onChange={(e) => onComissaoChange(e.target.value)} onBlur={onComissaoBlur} placeholder="10" />
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--nc-color-neutral-700)', marginTop: 10 }}>{avisoCodigo}</div>

          <div style={{ display: 'flex', gap: 34, margin: '28px 0 6px', flexWrap: 'wrap' }}>
            <MiniStat label="Vendas" value={String(nVendas)} />
            <MiniStat label="Receita" value={receitaTxt} />
            <MiniStat label="Comissão" value={comissaoTxt} color="var(--nc-color-accent-2-700)" />
          </div>

          <h3 style={{ fontSize: 22, margin: '34px 0 12px' }}>A ficha</h3>
          {fatos.map((f) => (
            <div key={f.k} style={{ display: 'flex', gap: 14, padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--nc-color-text) 6%, transparent)', fontSize: 14 }}>
              <div style={{ width: 120, flex: 'none', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--nc-color-neutral-600)', paddingTop: 2 }}>
                {f.k}
              </div>
              <div style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>{f.v}</div>
            </div>
          ))}
          <button className="nc-btn nc-btn-ghost nc-btn-danger" onClick={onExcluir} style={{ marginTop: 28, paddingLeft: 0 }}>Excluir parceiro</button>
        </div>
      </div>
    </div>
  )
}

function MiniStat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--nc-font-heading)', fontSize: 30, lineHeight: 1, color: color || 'var(--nc-color-text)' }}>{value}</div>
      <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--nc-color-neutral-700)', marginTop: 4 }}>{label}</div>
    </div>
  )
}
