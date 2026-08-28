import { z } from 'zod'
import { DEFAULT_PARCEIRO } from './config'
import { ETAPAS } from './types'

const etapaSchema = z.enum(ETAPAS as unknown as [string, ...string[]])

export const parceiroSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  tipo: z.string().default(''),
  cidade: z.string().default(''),
  idioma: z.string().default(''),
  contatos: z.array(z.string()).default([]),
  links: z.array(z.string()).default([]),
  handle: z.string().default(''),
  pedido: z.string().default(''),
  origem: z.string().default(''),
  notas: z.string().default(''),
  codigo: z.string().default(''),
  desconto: z.string().default(DEFAULT_PARCEIRO.desconto),
  comissao: z.string().default(DEFAULT_PARCEIRO.comissao),
  proximo: z.string(),
})

export const updateParceiroSchema = parceiroSchema.extend({ id: z.string().min(1), etapa: etapaSchema.optional() })

export const deleteParceiroSchema = z.object({ id: z.string().min(1) })

export const logContatoSchema = z.object({
  id: z.string().min(1),
  tipo: z.string().min(1),
  texto: z.string().default(''),
  etapa: etapaSchema,
  proximo: z.string(),
})

export const adiarParceiroSchema = z.object({
  id: z.string().min(1),
  proximo: z.string(),
})

export const createVendaSchema = z.object({
  data: z.string(),
  parceiroId: z.string().default(''),
  cliente: z.string().default('Não identificado'),
  pessoas: z.coerce.number().int().nonnegative().default(0),
  valor: z.coerce.number().nonnegative().default(0),
})

export const toggleVendaPagoSchema = z.object({ id: z.string().min(1) })
export const deleteVendaSchema = z.object({ id: z.string().min(1) })

export const createClienteSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  contato: z.string().default(''),
  pais: z.string().default(''),
  tipo: z.string().default(''),
  origem: z.string().default('direto'),
  notas: z.string().default(''),
})

export const deleteClienteSchema = z.object({ id: z.string().min(1) })

export const createSiteSchema = z.object({
  nome: z.string().min(1, 'Dê um nome ao site'),
  url: z.string().default(''),
  status: z.string().default(''),
})

export const updateSiteSchema = z.object({
  id: z.string().min(1),
  proximaAcao: z.string().optional(),
  status: z.string().optional(),
})

export const deleteSiteSchema = z.object({ id: z.string().min(1) })

const destinatarioSchema = z.enum(['parceiro', 'cliente'])

export const createModeloSchema = z.object({
  nome: z.string().default(''),
  texto: z.string().default(''),
  destinatario: destinatarioSchema.default('parceiro'),
})

export const updateModeloSchema = z.object({
  id: z.string().min(1),
  nome: z.string().optional(),
  texto: z.string().optional(),
  destinatario: destinatarioSchema.optional(),
})

export const deleteModeloSchema = z.object({ id: z.string().min(1) })
