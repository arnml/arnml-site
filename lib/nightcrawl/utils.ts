import { DEFAULT_PARCEIRO, type EuInfo } from './config'
import type { Cliente, Parceiro } from './types'

export function n(v: string | number | undefined): number {
  const x = Number(String(v ?? '').replace(',', '.'))
  return !v || Number.isNaN(x) ? 0 : x
}

export function brl(v: string | number | undefined): string {
  return 'R$ ' + Math.round(n(v)).toLocaleString('pt-BR')
}

export function isoOf(d: Date): string {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

export function todayIso(referenceIso?: string): string {
  return referenceIso ?? isoOf(new Date())
}

export function addDays(baseIso: string, days: number): string {
  const d = new Date(baseIso + 'T00:00:00')
  d.setDate(d.getDate() + days)
  return isoOf(d)
}

export function daysUntil(iso: string | undefined, todayIsoStr: string): number | null {
  if (!iso) return null
  const base = new Date(todayIsoStr + 'T00:00:00')
  const target = new Date(iso + 'T00:00:00')
  return Math.round((target.getTime() - base.getTime()) / 86400000)
}

export function fmtDate(iso: string | undefined): string {
  if (!iso) return '—'
  return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

export function prazoTxt(dias: number | null): string {
  if (dias === null) return ''
  if (dias < 0) return -dias + 'd atraso'
  if (dias === 0) return 'Hoje'
  return 'em ' + dias + 'd'
}

let idSeq = 0
export function uid(): string {
  idSeq += 1
  return `nc-${Date.now().toString(36)}-${idSeq}`
}

export function gerarCodigo(nome: string, desconto: string, existentes: string[], idAtual?: string): string {
  const base = nome
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
  const raiz = (base[0] || 'PARCEIRO').slice(0, 10)
  const usados = existentes.filter((c) => c !== idAtual).map((c) => c.toUpperCase())
  let cod = raiz + (n(desconto) || Number(DEFAULT_PARCEIRO.desconto))
  let i = 2
  while (usados.includes(cod)) {
    cod = raiz + (n(desconto) || Number(DEFAULT_PARCEIRO.desconto)) + i
    i += 1
  }
  return cod
}

export function preencherModelo(texto: string, p: Parceiro, eu: EuInfo, crawlName: string): string {
  const mapa: Record<string, string> = {
    '{nome}': p.nome || '',
    '{primeiro_nome}': (p.nome || '').split(' ')[0],
    '{arroba}': p.handle || '',
    '{codigo}': p.codigo || '',
    '{desconto}': String(n(p.desconto) || Number(DEFAULT_PARCEIRO.desconto)),
    '{comissao}': String(n(p.comissao) || Number(DEFAULT_PARCEIRO.comissao)),
    '{pedido}': p.pedido || 'o combinado',
    '{cidade}': p.cidade || 'São Paulo',
    '{meu_nome}': eu.nome || 'Eu',
    '{nosso_instagram}': eu.instagram || '',
    '{nosso_whatsapp}': eu.whatsapp || '',
    '{nosso_site}': eu.site || '',
    '{crawl}': crawlName || 'Night Crawl',
  }
  let out = texto || ''
  for (const k of Object.keys(mapa)) {
    out = out.split(k).join(mapa[k])
  }
  return out
}

export function preencherModeloCliente(texto: string, c: Cliente, eu: EuInfo, crawlName: string): string {
  const mapa: Record<string, string> = {
    '{nome}': c.nome || '',
    '{primeiro_nome}': (c.nome || '').split(' ')[0],
    '{arroba}': '',
    '{codigo}': '',
    '{desconto}': '',
    '{comissao}': '',
    '{pedido}': '',
    '{cidade}': c.pais || '',
    '{meu_nome}': eu.nome || 'Eu',
    '{nosso_instagram}': eu.instagram || '',
    '{nosso_whatsapp}': eu.whatsapp || '',
    '{nosso_site}': eu.site || '',
    '{crawl}': crawlName || 'Night Crawl',
  }
  let out = texto || ''
  for (const k of Object.keys(mapa)) {
    out = out.split(k).join(mapa[k])
  }
  return out
}

export function waLink(phone: string, message: string): string {
  const digits = phone.replace(/[^0-9]/g, '')
  // wa.me's redirect page has known bugs mangling 4-byte UTF-8 emoji
  // (outside the BMP); api.whatsapp.com/send handles them correctly.
  if (digits.length < 8) return 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message)
  return 'https://api.whatsapp.com/send?phone=' + digits + '&text=' + encodeURIComponent(message)
}
