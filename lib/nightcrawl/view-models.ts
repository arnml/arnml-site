import { ETAPA_CLS, STATUS_CLS, type Db, type Parceiro } from './types'
import { brl, daysUntil, fmtDate, n, prazoTxt } from './utils'

export interface PartnerDerived {
  dias: number | null
  etapaCls: string
  descontoTxt: string
  comissaoPctTxt: string
  proximoTxt: string
  prazoTxt: string
  prazoCor: string
  ultimoTxt: string
  nVendas: number
  vendasTxt: string
  receitaTxt: string
  comissaoTxt: string
}

export function derivePartner(p: Parceiro, db: Db, today: string): PartnerDerived {
  const dias = daysUntil(p.proximo, today)
  const ultimo = p.registros[p.registros.length - 1]
  const vendas = db.vendas.filter((v) => v.parceiroId === p.id)
  const receita = vendas.reduce((a, v) => a + n(v.valor), 0)
  return {
    dias,
    etapaCls: ETAPA_CLS[p.etapa] || 'nc-tag-neutral',
    descontoTxt: p.desconto ? p.desconto + '%' : '—',
    comissaoPctTxt: p.comissao ? p.comissao + '%' : '—',
    proximoTxt: p.proximo ? fmtDate(p.proximo) : '—',
    prazoTxt: prazoTxt(dias),
    prazoCor: dias !== null && dias < 0 ? 'var(--nc-color-accent-2-700)' : 'var(--nc-color-text)',
    ultimoTxt: ultimo ? `${ultimo.tipo} — ${ultimo.texto}` : 'Nenhum contato registrado.',
    nVendas: vendas.length,
    vendasTxt: vendas.length ? `${vendas.length} · ${brl(receita)}` : '—',
    receitaTxt: brl(receita),
    comissaoTxt: brl(receita * (n(p.comissao) / 100)),
  }
}

export function siteStatusCls(status: string): string {
  return STATUS_CLS[status] || 'nc-tag-neutral'
}

export function origemTxt(origem: string, db: Db): string {
  if (!origem || origem === 'direto') return 'Direto'
  if (origem.startsWith('p:')) {
    const p = db.parceiros.find((x) => x.id === origem.slice(2))
    return p ? p.nome : 'Parceiro'
  }
  if (origem.startsWith('s:')) {
    const s = db.sites.find((x) => x.id === origem.slice(2))
    return s ? s.nome : 'Site'
  }
  return origem
}

export function nomeParceiro(id: string, db: Db): string {
  const p = db.parceiros.find((x) => x.id === id)
  return p ? p.nome : 'Direto'
}

export function codigoParceiro(id: string, db: Db): string {
  const p = db.parceiros.find((x) => x.id === id)
  return p ? p.codigo || '—' : '—'
}
