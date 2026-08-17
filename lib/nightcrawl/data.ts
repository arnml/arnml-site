import { prisma } from '@/lib/prisma'
import { toCliente, toModelo, toParceiro, toSite, toVenda } from './mappers'
import type { Db } from './types'

export async function getNightCrawlDb(): Promise<Db> {
  const [parceiros, vendas, clientes, sites, modelos] = await Promise.all([
    prisma.ncParceiro.findMany({
      include: { registros: { orderBy: { data: 'asc' } }, vendas: true },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.ncVenda.findMany({ orderBy: { data: 'desc' } }),
    prisma.ncCliente.findMany({ orderBy: { data: 'desc' } }),
    prisma.ncSite.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.ncModelo.findMany({ orderBy: { createdAt: 'asc' } }),
  ])

  return {
    parceiros: parceiros.map(toParceiro),
    vendas: vendas.map(toVenda),
    clientes: clientes.map(toCliente),
    sites: sites.map(toSite),
    modelos: modelos.map(toModelo),
  }
}
