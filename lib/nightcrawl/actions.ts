'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { ETAPA_TO_DB } from './mappers'
import {
  adiarParceiroSchema,
  createClienteSchema,
  createModeloSchema,
  createSiteSchema,
  createVendaSchema,
  deleteClienteSchema,
  deleteModeloSchema,
  deleteParceiroSchema,
  deleteSiteSchema,
  deleteVendaSchema,
  logContatoSchema,
  parceiroSchema,
  toggleVendaPagoSchema,
  updateModeloSchema,
  updateParceiroSchema,
  updateSiteSchema,
} from './validators'

function revalidateNightCrawl() {
  revalidatePath('/nightcrawl')
}

export async function createParceiro(input: unknown) {
  const data = parceiroSchema.parse(input)
  await prisma.ncParceiro.create({
    data: {
      ...data,
      etapa: ETAPA_TO_DB[data.etapa as keyof typeof ETAPA_TO_DB],
      proximo: new Date(data.proximo),
    },
  })
  revalidateNightCrawl()
}

export async function updateParceiro(input: unknown) {
  const { id, ...data } = updateParceiroSchema.parse(input)
  await prisma.ncParceiro.update({
    where: { id },
    data: {
      ...data,
      etapa: ETAPA_TO_DB[data.etapa as keyof typeof ETAPA_TO_DB],
      proximo: new Date(data.proximo),
    },
  })
  revalidateNightCrawl()
}

export async function deleteParceiro(input: unknown) {
  const { id } = deleteParceiroSchema.parse(input)
  await prisma.ncParceiro.delete({ where: { id } })
  revalidateNightCrawl()
}

export async function logContato(input: unknown) {
  const { id, tipo, texto, etapa, proximo } = logContatoSchema.parse(input)
  await prisma.ncParceiro.update({
    where: { id },
    data: {
      etapa: ETAPA_TO_DB[etapa as keyof typeof ETAPA_TO_DB],
      proximo: new Date(proximo),
      registros: { create: { tipo, texto } },
    },
  })
  revalidateNightCrawl()
}

export async function adiarParceiro(input: unknown) {
  const { id, proximo } = adiarParceiroSchema.parse(input)
  await prisma.ncParceiro.update({ where: { id }, data: { proximo: new Date(proximo) } })
  revalidateNightCrawl()
}

export async function createVenda(input: unknown) {
  const { parceiroId, ...data } = createVendaSchema.parse(input)
  await prisma.ncVenda.create({
    data: {
      ...data,
      data: new Date(data.data),
      parceiroId: parceiroId || null,
    },
  })
  revalidateNightCrawl()
}

export async function toggleVendaPago(input: unknown) {
  const { id } = toggleVendaPagoSchema.parse(input)
  const venda = await prisma.ncVenda.findUniqueOrThrow({ where: { id } })
  await prisma.ncVenda.update({ where: { id }, data: { pago: !venda.pago } })
  revalidateNightCrawl()
}

export async function deleteVenda(input: unknown) {
  const { id } = deleteVendaSchema.parse(input)
  await prisma.ncVenda.delete({ where: { id } })
  revalidateNightCrawl()
}

export async function createCliente(input: unknown) {
  const data = createClienteSchema.parse(input)
  await prisma.ncCliente.create({ data })
  revalidateNightCrawl()
}

export async function deleteCliente(input: unknown) {
  const { id } = deleteClienteSchema.parse(input)
  await prisma.ncCliente.delete({ where: { id } })
  revalidateNightCrawl()
}

export async function createSite(input: unknown) {
  const data = createSiteSchema.parse(input)
  await prisma.ncSite.create({ data })
  revalidateNightCrawl()
}

export async function updateSite(input: unknown) {
  const { id, ...data } = updateSiteSchema.parse(input)
  await prisma.ncSite.update({ where: { id }, data })
  revalidateNightCrawl()
}

export async function deleteSite(input: unknown) {
  const { id } = deleteSiteSchema.parse(input)
  await prisma.ncSite.delete({ where: { id } })
  revalidateNightCrawl()
}

export async function createModelo(input: unknown) {
  const data = createModeloSchema.parse(input)
  await prisma.ncModelo.create({ data })
  revalidateNightCrawl()
}

export async function updateModelo(input: unknown) {
  const { id, ...data } = updateModeloSchema.parse(input)
  await prisma.ncModelo.update({ where: { id }, data })
  revalidateNightCrawl()
}

export async function deleteModelo(input: unknown) {
  const { id } = deleteModeloSchema.parse(input)
  await prisma.ncModelo.delete({ where: { id } })
  revalidateNightCrawl()
}
