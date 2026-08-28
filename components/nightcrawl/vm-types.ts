import type { Destinatario, Etapa } from '@/lib/nightcrawl/types'

export interface PartnerRowVM {
  id: string
  nome: string
  handle: string
  tipo: string
  contato: string
  cidade: string
  etapa: Etapa
  etapaCls: string
  codigo: string
  descontoTxt: string
  comissaoPctTxt: string
  proximoTxt: string
  prazoTxt: string
  prazoCor: string
  dias: number | null
  ultimoTxt: string
  nVendas: number
  vendasTxt: string
  receitaTxt: string
  comissaoTxt: string
  abrir: () => void
  abrirLog: () => void
  qEnviei: () => void
  qSemResposta: () => void
  qRespondeu: () => void
  adiar: () => void
}

export interface FunilRowVM {
  etapa: string
  count: number
  largura: string
  cor: string
  go: () => void
}

export interface RankRowVM {
  codigo: string
  nome: string
  vendas: number
  receita: string
}

export interface AtividadeRowVM {
  dataTxt: string
  quem: string
  tipo: string
}

export interface FollowGroupVM {
  label: string
  count: number
  items: PartnerRowVM[]
}

export interface FiltroVM {
  label: string
  count: number
  active: boolean
  onClick: () => void
}

export interface SaleRowVM {
  id: string
  dataTxt: string
  parceiro: string
  codigo: string
  cliente: string
  pessoas: string
  valorTxt: string
  comissaoTxt: string
  pago: boolean
  pagoTxt: string
  pagoCls: string
  togglePago: () => void
  remover: () => void
}

export interface ClientRowVM {
  id: string
  nome: string
  contato: string
  pais: string
  tipo: string
  origemTxt: string
  dataTxt: string
  abrir: () => void
  remover: () => void
}

export interface SiteRowVM {
  id: string
  nome: string
  url: string
  urlTxt: string
  status: string
  statusCls: string
  proximaAcao: string
  onAcaoChange: (v: string) => void
  onAcaoBlur: () => void
  onStatusChange: (v: string) => void
  remover: () => void
}

export interface TemplateRowVM {
  id: string
  nome: string
  texto: string
  destinatario: Destinatario
  onNomeChange: (v: string) => void
  onNomeBlur: () => void
  onTextoChange: (v: string) => void
  onTextoBlur: () => void
  onDestinatarioChange: (v: Destinatario) => void
  salvar: () => void
  remover: () => void
}

export interface NavItemVM {
  key: string
  label: string
  badge: string
  active: boolean
}
