import type {
  NcCliente,
  NcModelo,
  NcParceiro,
  NcRegistro,
  NcSite,
  NcVenda,
} from '@/app/generated/prisma/client'
import { NcEtapa } from '@/app/generated/prisma/enums'
import { isoOf } from './utils'
import type { Cliente, Destinatario, Etapa, Modelo, Registro, Site, Venda } from './types'
import type { Parceiro } from './types'

export const ETAPA_TO_DB: Record<Etapa, NcEtapa> = {
  Novo: NcEtapa.NOVO,
  Contactado: NcEtapa.CONTACTADO,
  Respondeu: NcEtapa.RESPONDEU,
  Negociando: NcEtapa.NEGOCIANDO,
  Fechado: NcEtapa.FECHADO,
  'No ar': NcEtapa.NO_AR,
  Perdido: NcEtapa.PERDIDO,
}

export const ETAPA_FROM_DB: Record<NcEtapa, Etapa> = {
  NOVO: 'Novo',
  CONTACTADO: 'Contactado',
  RESPONDEU: 'Respondeu',
  NEGOCIANDO: 'Negociando',
  FECHADO: 'Fechado',
  NO_AR: 'No ar',
  PERDIDO: 'Perdido',
}

export function toRegistro(row: NcRegistro): Registro {
  return {
    data: isoOf(row.data),
    tipo: row.tipo,
    texto: row.texto,
  }
}

export function toParceiro(row: NcParceiro & { registros: NcRegistro[]; vendas: NcVenda[] }): Parceiro {
  return {
    id: row.id,
    nome: row.nome,
    handle: row.handle,
    tipo: row.tipo,
    contatos: row.contatos,
    cidade: row.cidade,
    idioma: row.idioma,
    links: row.links,
    pedido: row.pedido,
    origem: row.origem,
    notas: row.notas,
    codigo: row.codigo,
    desconto: row.desconto,
    comissao: row.comissao,
    etapa: ETAPA_FROM_DB[row.etapa],
    proximo: isoOf(row.proximo),
    registros: row.registros.map(toRegistro),
  }
}

export function toVenda(row: NcVenda): Venda {
  return {
    id: row.id,
    data: isoOf(row.data),
    parceiroId: row.parceiroId ?? '',
    cliente: row.cliente,
    pessoas: String(row.pessoas),
    valor: row.valor.toString(),
    pago: row.pago,
  }
}

export function toCliente(row: NcCliente): Cliente {
  return {
    id: row.id,
    nome: row.nome,
    contato: row.contato,
    pais: row.pais,
    tipo: row.tipo,
    origem: row.origem,
    data: isoOf(row.data),
    notas: row.notas,
  }
}

export function toSite(row: NcSite): Site {
  return {
    id: row.id,
    nome: row.nome,
    url: row.url,
    status: row.status,
    proximaAcao: row.proximaAcao,
  }
}

export function toModelo(row: NcModelo): Modelo {
  return {
    id: row.id,
    nome: row.nome,
    texto: row.texto,
    destinatario: (row.destinatario === 'cliente' ? 'cliente' : 'parceiro') as Destinatario,
  }
}
