'use client'

interface AbaModeloVM {
  label: string
  active: boolean
  go: () => void
}

interface FatoVM {
  k: string
  v: string
}

interface ClientDetailViewProps {
  nome: string
  contato: string
  pais: string
  tipo: string
  onVoltar: () => void
  abasModelo: AbaModeloVM[]
  semModelos: boolean
  mensagem: string
  onMensagemChange: (v: string) => void
  onRestaurar: () => void
  copiarLabel: string
  onCopiar: () => void
  whatsUrl: string
  fatos: FatoVM[]
  onExcluir: () => void
}

export function ClientDetailView({
  nome,
  contato,
  pais,
  tipo,
  onVoltar,
  abasModelo,
  semModelos,
  mensagem,
  onMensagemChange,
  onRestaurar,
  copiarLabel,
  onCopiar,
  whatsUrl,
  fatos,
  onExcluir,
}: ClientDetailViewProps) {
  return (
    <div>
      <button className="nc-btn nc-btn-ghost" onClick={onVoltar} style={{ marginBottom: 16, paddingLeft: 0 }}>← Voltar</button>
      <div className="nc-head" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 30 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--nc-color-accent-700)' }}>{tipo || 'Cliente'}</div>
          <h2 className="nc-big" style={{ fontSize: 42, lineHeight: 1.05, margin: '6px 0 8px' }}>{nome}</h2>
          <div style={{ fontSize: 15, color: 'var(--nc-color-neutral-700)' }}>
            {contato} · {pais}
          </div>
        </div>
      </div>

      <div className="nc-stack" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'start', marginTop: 34 }}>
        <div>
          <h3 style={{ fontSize: 22, margin: '0 0 12px' }}>Mensagem pronta</h3>
          {semModelos ? (
            <p style={{ fontStyle: 'italic', color: 'var(--nc-color-neutral-700)', marginBottom: 14 }}>
              Nenhum modelo para clientes ainda. Crie um em Modelos.
            </p>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div>
          <h3 style={{ fontSize: 22, margin: '0 0 14px' }}>A ficha</h3>
          {fatos.map((f) => (
            <div key={f.k} style={{ display: 'flex', gap: 14, padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--nc-color-text) 6%, transparent)', fontSize: 14 }}>
              <div style={{ width: 120, flex: 'none', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--nc-color-neutral-600)', paddingTop: 2 }}>
                {f.k}
              </div>
              <div style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>{f.v}</div>
            </div>
          ))}
          <button className="nc-btn nc-btn-ghost nc-btn-danger" onClick={onExcluir} style={{ marginTop: 28, paddingLeft: 0 }}>Excluir cliente</button>
        </div>
      </div>
    </div>
  )
}
