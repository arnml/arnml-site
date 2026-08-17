export type Etapa =
  | 'Novo'
  | 'Contactado'
  | 'Respondeu'
  | 'Negociando'
  | 'Fechado'
  | 'No ar'
  | 'Perdido'

export interface Registro {
  data: string
  tipo: string
  texto: string
}

export interface Parceiro {
  id: string
  nome: string
  handle: string
  tipo: string
  contatos: string[]
  cidade: string
  idioma: string
  links: string[]
  pedido: string
  origem: string
  notas: string
  codigo: string
  desconto: string
  comissao: string
  etapa: Etapa
  proximo: string
  registros: Registro[]
}

export interface Venda {
  id: string
  data: string
  parceiroId: string
  cliente: string
  pessoas: string
  valor: string
  pago: boolean
}

export interface Cliente {
  id: string
  nome: string
  contato: string
  pais: string
  tipo: string
  origem: string
  data: string
  notas: string
}

export interface Site {
  id: string
  nome: string
  url: string
  status: string
  proximaAcao: string
}

export interface Modelo {
  id: string
  nome: string
  texto: string
}

export interface Db {
  parceiros: Parceiro[]
  vendas: Venda[]
  clientes: Cliente[]
  sites: Site[]
  modelos: Modelo[]
}

export type View =
  | 'mesa'
  | 'parceiros'
  | 'follow'
  | 'vendas'
  | 'clientes'
  | 'presenca'
  | 'modelos'
  | 'ficha'

export const ETAPAS: Etapa[] = [
  'Novo',
  'Contactado',
  'Respondeu',
  'Negociando',
  'Fechado',
  'No ar',
  'Perdido',
]

export const ETAPA_CLS: Record<Etapa, string> = {
  Novo: 'nc-tag-outline',
  Contactado: 'nc-tag-neutral',
  Respondeu: 'nc-tag-accent',
  Negociando: 'nc-tag-accent',
  Fechado: 'nc-tag-accent-2',
  'No ar': 'nc-tag-accent-2',
  Perdido: 'nc-tag-neutral',
}

export const TIPOS = [
  'Casa de eventos',
  'Instagram',
  'TikTok',
  'YouTube',
  'Blog',
  'Site de guia',
  'Hostel / hotel',
  'Bar / casa noturna',
  'Operadora / OTA',
  'Agência de eventos',
  'Imprensa',
]

export const CONTATOS_TIPOS = [
  'DM enviada',
  'E-mail enviado',
  'WhatsApp',
  'Sem resposta',
  'Respondeu',
  'Ligação / reunião',
  'Proposta enviada',
  'Post publicado',
  'Nota',
]

export const TIPOS_FESTA = [
  'Despedida de solteiro',
  'Despedida de solteira',
  'Turista sozinho',
  'Grupo de turistas',
  'Aniversário',
  'Corporativo',
  'Local / recorrente',
]

export const ORIGENS = [
  'Agente IA',
  'Busca no Instagram',
  'Busca no TikTok',
  'Google / busca',
  'Indicação de hostel',
  'Indicação de parceiro',
  'Indicação de cliente',
  'Contato na rua / visita',
  'E-mail frio',
  'Nos procuraram',
  'Evento / feira',
  'Outro',
]

export const STATUS_SITE = [
  'Não estamos',
  'Cadastro enviado',
  'Publicado',
  'Precisa de avaliações',
  'Ativo',
]

export const STATUS_CLS: Record<string, string> = {
  'Não estamos': 'nc-tag-neutral',
  'Cadastro enviado': 'nc-tag-outline',
  Publicado: 'nc-tag-accent',
  'Precisa de avaliações': 'nc-tag-accent-2',
  Ativo: 'nc-tag-accent',
}

export const VARIAVEIS = [
  { k: '{nome}', d: 'Nome completo do parceiro' },
  { k: '{primeiro_nome}', d: 'Só o primeiro nome' },
  { k: '{arroba}', d: '@ ou site do parceiro' },
  { k: '{codigo}', d: 'Código de desconto dele' },
  { k: '{desconto}', d: '% de desconto do código' },
  { k: '{comissao}', d: '% de comissão dele' },
  { k: '{pedido}', d: 'O que ele pediu' },
  { k: '{cidade}', d: 'Cidade do parceiro' },
  { k: '{meu_nome}', d: 'Quem está escrevendo' },
  { k: '{nosso_instagram}', d: 'Nosso Instagram' },
  { k: '{nosso_whatsapp}', d: 'Nosso WhatsApp' },
  { k: '{nosso_site}', d: 'Nosso site' },
  { k: '{crawl}', d: 'Nome do pub crawl' },
]
