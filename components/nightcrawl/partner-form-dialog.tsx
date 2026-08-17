'use client'

import { ORIGENS, TIPOS } from '@/lib/nightcrawl/types'

export interface PartnerFormState {
  id?: string
  nome: string
  tipo: string
  cidade: string
  idioma: string
  contatos: string[]
  links: string[]
  origem: string
  codigo: string
  codigoManual?: boolean
  desconto: string
  comissao: string
  proximo: string
  notas: string
  pedido: string
}

interface PartnerFormDialogProps {
  open: boolean
  title: string
  form: PartnerFormState
  onNomeChange: (v: string) => void
  onFieldChange: (patch: Partial<PartnerFormState>) => void
  onContatoChange: (i: number, v: string) => void
  onContatoRemove: (i: number) => void
  onContatoAdd: () => void
  onLinkChange: (i: number, v: string) => void
  onLinkRemove: (i: number) => void
  onLinkAdd: () => void
  onDescontoChange: (v: string) => void
  onCodigoChange: (v: string) => void
  onCancel: () => void
  onSave: () => void
}

export function PartnerFormDialog({
  open,
  title,
  form,
  onNomeChange,
  onFieldChange,
  onContatoChange,
  onContatoRemove,
  onContatoAdd,
  onLinkChange,
  onLinkRemove,
  onLinkAdd,
  onDescontoChange,
  onCodigoChange,
  onCancel,
  onSave,
}: PartnerFormDialogProps) {
  if (!open) return null
  return (
    <div className="nc-dialog-backdrop" style={{ alignItems: 'start' }}>
      <div className="nc-dialog" style={{ width: 'min(780px,100%)' }}>
        <div className="nc-dialog-title">{title}</div>
        <div className="nc-dialog-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="nc-field">
            <label>Nome *</label>
            <input className="nc-input" value={form.nome} onChange={(e) => onNomeChange(e.target.value)} placeholder="Marina Alves" />
          </div>
          <div className="nc-field">
            <label>Tipo</label>
            <select className="nc-input" value={form.tipo} onChange={(e) => onFieldChange({ tipo: e.target.value })}>
              {TIPOS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="nc-field">
            <label>Cidade</label>
            <input className="nc-input" value={form.cidade} onChange={(e) => onFieldChange({ cidade: e.target.value })} />
          </div>
          <div className="nc-field">
            <label>Idioma / público</label>
            <input className="nc-input" value={form.idioma} onChange={(e) => onFieldChange({ idioma: e.target.value })} placeholder="PT / EN / ES" />
          </div>
          <div className="nc-field">
            <label>
              Contatos <span style={{ color: 'var(--nc-color-neutral-600)' }}>— WhatsApp, e-mail, DM</span>
            </label>
            <div style={{ display: 'grid', gap: 5 }}>
              {form.contatos.map((v, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 22px', alignItems: 'center', gap: 4 }}>
                  <input className="nc-input" value={v} onChange={(e) => onContatoChange(i, e.target.value)} placeholder="+55 11 98812-4471" />
                  <button onClick={() => onContatoRemove(i)} title="Remover" aria-label="Remover" className="nc-icon-btn">×</button>
                </div>
              ))}
              <button className="nc-btn nc-btn-ghost" onClick={onContatoAdd} style={{ justifySelf: 'start', height: 26, fontSize: 12, padding: '0 4px', marginTop: 2 }}>
                + Adicionar contato
              </button>
            </div>
          </div>
          <div className="nc-field">
            <label>
              Links e perfis <span style={{ color: 'var(--nc-color-neutral-600)' }}>— site, Instagram, X</span>
            </label>
            <div style={{ display: 'grid', gap: 5 }}>
              {form.links.map((v, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 22px', alignItems: 'center', gap: 4 }}>
                  <input className="nc-input" value={v} onChange={(e) => onLinkChange(i, e.target.value)} placeholder="@perfil ou https://" />
                  <button onClick={() => onLinkRemove(i)} title="Remover" aria-label="Remover" className="nc-icon-btn">×</button>
                </div>
              ))}
              <button className="nc-btn nc-btn-ghost" onClick={onLinkAdd} style={{ justifySelf: 'start', height: 26, fontSize: 12, padding: '0 4px', marginTop: 2 }}>
                + Adicionar link
              </button>
            </div>
          </div>
          <div className="nc-field">
            <label>Origem</label>
            <select className="nc-input" value={form.origem} onChange={(e) => onFieldChange({ origem: e.target.value })}>
              {(ORIGENS.includes(form.origem) || !form.origem ? ORIGENS : [form.origem, ...ORIGENS]).map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="nc-field">
            <label>
              Código de desconto <span style={{ color: 'var(--nc-color-neutral-600)' }}>— gerado pelo nome, pode editar</span>
            </label>
            <input
              className="nc-input"
              value={form.codigo}
              onChange={(e) => onCodigoChange(e.target.value)}
              placeholder="MARINA15"
              style={{ fontFamily: 'var(--nc-font-heading)', fontWeight: 600, textTransform: 'uppercase' }}
            />
          </div>
          <div className="nc-field">
            <label>Desconto %</label>
            <input className="nc-input" value={form.desconto} onChange={(e) => onDescontoChange(e.target.value)} placeholder="5" />
          </div>
          <div className="nc-field">
            <label>Comissão %</label>
            <input className="nc-input" value={form.comissao} onChange={(e) => onFieldChange({ comissao: e.target.value })} placeholder="10" />
          </div>
          <div className="nc-field">
            <label>Próximo follow-up</label>
            <input className="nc-input" type="date" value={form.proximo} onChange={(e) => onFieldChange({ proximo: e.target.value })} />
          </div>
          <div className="nc-field" style={{ gridColumn: '1 / -1' }}>
            <label>Notas</label>
            <textarea className="nc-input" value={form.notas} onChange={(e) => onFieldChange({ notas: e.target.value })} style={{ minHeight: 70 }} />
          </div>
        </div>
        <div className="nc-dialog-actions">
          <button className="nc-btn nc-btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="nc-btn nc-btn-primary" onClick={onSave}>Salvar parceiro</button>
        </div>
      </div>
    </div>
  )
}
