import 'dotenv/config'
import { prisma } from '@/lib/prisma'
import { ETAPA_TO_DB } from '@/lib/nightcrawl/mappers'
import type { Etapa } from '@/lib/nightcrawl/types'
import { addDays, isoOf } from '@/lib/nightcrawl/utils'

/**
 * Deterministic demo data for local development.
 * Run with: pnpm tsx prisma/seed-nightcrawl.ts
 */
async function main() {
  const today = isoOf(new Date())
  const s = (offset: number) => addDays(today, offset)
  const etapa = (e: Etapa) => ETAPA_TO_DB[e]

  const parceirosSeed = [
    {
      nome: 'Marina Alves',
      handle: '@marinapelasp',
      tipo: 'Instagram',
      contatos: ['+55 11 98812-4471'],
      cidade: 'São Paulo',
      idioma: 'PT',
      links: ['@marinapelasp'],
      pedido: 'Comissão de 20% + 2 cortesias',
      origem: 'Busca por hashtag',
      notas: 'Forte com o público da Vila Madalena.',
      codigo: 'MARINA15',
      desconto: '15',
      comissao: '20',
      etapa: etapa('Negociando'),
      proximo: new Date(s(-3)),
      registros: [
        { data: new Date(s(-14)), tipo: 'DM enviada', texto: 'Abri falando do roteiro da Vila Madalena.' },
        { data: new Date(s(-11)), tipo: 'Respondeu', texto: 'Interessada, perguntou como funciona a comissão.' },
        { data: new Date(s(-6)), tipo: 'Proposta enviada', texto: '20% de comissão + duas cortesias.' },
      ],
    },
    {
      nome: 'Guia da Noite SP',
      handle: 'guiadanoitesp.com.br',
      tipo: 'Site de guia',
      contatos: ['contato@guiadanoitesp.com.br'],
      cidade: 'São Paulo',
      idioma: 'PT',
      links: ['guiadanoitesp.com.br'],
      pedido: 'R$ 450/mês + comissão',
      origem: 'Google',
      notas: 'Querem as fotos de agosto antes de publicar.',
      codigo: 'GUIANOITE',
      desconto: '10',
      comissao: '15',
      etapa: etapa('Fechado'),
      proximo: new Date(s(-1)),
      registros: [
        { data: new Date(s(-20)), tipo: 'E-mail enviado', texto: 'Perguntei sobre listagem de parceiro.' },
        { data: new Date(s(-4)), tipo: 'Ligação / reunião', texto: 'Fechamos R$ 450/mês por 6 meses.' },
      ],
    },
    {
      nome: 'Tom Whitfield',
      handle: '@backpackwithtom',
      tipo: 'YouTube',
      contatos: ['tom@backpackwith.com'],
      cidade: 'São Paulo',
      idioma: 'EN',
      links: ['@backpackwithtom'],
      pedido: 'Crawl grátis para ele + editor',
      origem: 'Indicação de hostel',
      notas: 'Na cidade de 22 a 26 de agosto.',
      codigo: 'TOM15',
      desconto: '15',
      comissao: '20',
      etapa: etapa('Respondeu'),
      proximo: new Date(s(0)),
      registros: [
        { data: new Date(s(-8)), tipo: 'E-mail enviado', texto: 'Ofereci o trecho da Augusta.' },
        { data: new Date(s(-2)), tipo: 'Respondeu', texto: 'Pediu datas e tamanho do grupo.' },
      ],
    },
    {
      nome: 'Ô de Casa Hostel',
      handle: 'odecasahostel.com',
      tipo: 'Hostel / hotel',
      contatos: ['Rita — recepção'],
      cidade: 'São Paulo',
      idioma: 'PT',
      links: ['odecasahostel.com'],
      pedido: 'R$ 15 por hóspede',
      origem: 'Visita presencial',
      notas: 'Manda de 8 a 12 hóspedes por semana no verão.',
      codigo: 'ODECASA',
      desconto: '15',
      comissao: '25',
      etapa: etapa('No ar'),
      proximo: new Date(s(12)),
      registros: [
        { data: new Date(s(-40)), tipo: 'Ligação / reunião', texto: 'Mês de teste combinado com a Rita.' },
        { data: new Date(s(-9)), tipo: 'Post publicado', texto: 'Cartaz na recepção + story.' },
      ],
    },
    {
      nome: 'Sofia & Duda',
      handle: '@duasnanoitesp',
      tipo: 'TikTok',
      contatos: ['Só DM'],
      cidade: 'São Paulo',
      idioma: 'PT',
      links: ['@duasnanoitesp'],
      pedido: '',
      origem: 'TikTok — tag vida noturna SP',
      notas: 'Engajamento altíssimo.',
      codigo: 'DUAS15',
      desconto: '15',
      comissao: '20',
      etapa: etapa('Contactado'),
      proximo: new Date(s(1)),
      registros: [{ data: new Date(s(-3)), tipo: 'DM enviada', texto: 'Primeira abordagem, sem resposta.' }],
    },
    {
      nome: 'Bar Tijuana',
      handle: 'bartijuana.com.br',
      tipo: 'Bar / casa noturna',
      contatos: ['Nuno — dono'],
      cidade: 'São Paulo',
      idioma: 'PT',
      links: ['bartijuana.com.br'],
      pedido: '25 pessoas garantidas nas quartas',
      origem: 'Já está no roteiro',
      notas: 'Quer acordo por escrito.',
      codigo: 'TIJUANA',
      desconto: '15',
      comissao: '20',
      etapa: etapa('Fechado'),
      proximo: new Date(s(4)),
      registros: [{ data: new Date(s(-5)), tipo: 'Proposta enviada', texto: 'Minuta enviada para as quartas.' }],
    },
    {
      nome: 'Intercâmbio SP',
      handle: '@intercambiosp',
      tipo: 'Agência de eventos',
      contatos: ['parcerias@intercambiosp.com'],
      cidade: 'São Paulo',
      idioma: 'PT',
      links: ['@intercambiosp'],
      pedido: 'Comissão por venda',
      origem: 'E-mail frio',
      notas: '',
      codigo: 'INTERSP',
      desconto: '15',
      comissao: '20',
      etapa: etapa('Contactado'),
      proximo: new Date(s(3)),
      registros: [{ data: new Date(s(-7)), tipo: 'E-mail enviado', texto: 'Proposta de afiliado 20%.' }],
    },
    {
      nome: 'Viator BR',
      handle: 'viator.com',
      tipo: 'Operadora / OTA',
      contatos: ['supplier@viator.com'],
      cidade: 'São Paulo',
      idioma: 'EN',
      links: ['viator.com'],
      pedido: '20–25% de comissão',
      origem: 'Cadastro de fornecedor',
      notas: 'Precisa de CNPJ ativo e seguro.',
      codigo: 'VIATOR',
      desconto: '15',
      comissao: '20',
      etapa: etapa('Novo'),
      proximo: new Date(s(6)),
      registros: [],
    },
  ]

  const parceiros = await Promise.all(
    parceirosSeed.map(({ registros, ...data }) =>
      prisma.ncParceiro.create({ data: { ...data, registros: { create: registros } } })
    )
  )
  const idByCodigo = new Map(parceiros.map((p) => [p.codigo, p.id]))

  await prisma.ncVenda.createMany({
    data: [
      { data: new Date(s(-8)), parceiroId: idByCodigo.get('ODECASA'), cliente: 'Lucas (despedida)', pessoas: 11, valor: 1320, pago: true },
      { data: new Date(s(-5)), parceiroId: idByCodigo.get('GUIANOITE'), cliente: 'Hannah + 2', pessoas: 3, valor: 360, pago: false },
      { data: new Date(s(-2)), parceiroId: idByCodigo.get('ODECASA'), cliente: 'Grupo argentino', pessoas: 6, valor: 720, pago: false },
      { data: new Date(s(-1)), parceiroId: null, cliente: 'Direto no Instagram', pessoas: 2, valor: 240, pago: false },
    ],
  })

  await prisma.ncCliente.createMany({
    data: [
      { nome: 'Lucas Prado', contato: '+55 11 99126-3388', pais: 'BR', tipo: 'Despedida de solteiro', origem: `p:${idByCodigo.get('ODECASA')}`, data: new Date(s(-8)) },
      { nome: 'Hannah Meyer', contato: '+49 151 2233 991', pais: 'DE', tipo: 'Grupo de turistas', origem: `p:${idByCodigo.get('GUIANOITE')}`, data: new Date(s(-5)) },
      { nome: 'Camila Ferrari', contato: '+55 11 97744-1020', pais: 'BR', tipo: 'Local / recorrente', origem: 'direto', data: new Date(s(-1)), notas: 'Já veio duas vezes.' },
    ],
  })

  await prisma.ncSite.createMany({
    data: [
      { nome: 'TripAdvisor', url: 'https://tripadvisor.com', status: 'Precisa de avaliações', proximaAcao: 'Pedir 5 avaliações aos grupos desta semana' },
      { nome: 'Reddit r/saopaulo', url: 'https://reddit.com/r/saopaulo', status: 'Não estamos', proximaAcao: 'Responder threads de turistas sem vender de cara' },
      { nome: 'GetYourGuide', url: 'https://getyourguide.com', status: 'Cadastro enviado', proximaAcao: 'Cobrar aprovação do cadastro' },
      { nome: 'Google Maps', url: 'https://maps.google.com', status: 'Ativo', proximaAcao: 'Subir fotos novas todo mês' },
    ],
  })

  await prisma.ncModelo.createMany({
    data: [
      {
        nome: 'Primeira abordagem',
        texto:
          'Oi {primeiro_nome}, tudo bem? Aqui é {meu_nome}, do {crawl} — a gente faz pub crawl em {cidade} para turistas e para despedidas de solteiro.\n\nAcompanho o seu trabalho em {arroba} e queria te propor uma parceria simples: você divulga e ganha comissão de {comissao}% em cada venda que vier de você. Sem meta, sem exclusividade.\n\nSeu público ganha {desconto}% de desconto com o código {codigo} — é só a pessoa falar "venho da parte de {primeiro_nome}" no nosso WhatsApp {nosso_whatsapp}.\n\nTe mando os detalhes do roteiro? Nosso Instagram é {nosso_instagram}.',
      },
      {
        nome: 'Lembrete',
        texto:
          'Oi {primeiro_nome}, tudo certo? Só voltando aqui sobre a parceria com o {crawl}.\n\nSe fizer sentido, já deixo o código {codigo} ativo no seu nome ({desconto}% para o seu público, {comissao}% de comissão para você). Se não for o momento, me avisa que eu te procuro mais para frente — sem problema nenhum.',
      },
      {
        nome: 'Proposta fechada',
        texto:
          '{primeiro_nome}, fechado então. Combinado:\n\n• Código {codigo} — {desconto}% de desconto para quem vier de você\n• Comissão de {comissao}% sobre cada venda com esse código\n• Pagamento por Pix toda semana, com a lista das vendas\n• Você pede: {pedido}\n\nO cliente só precisa falar "venho da parte de {primeiro_nome}, código {codigo}" no WhatsApp {nosso_whatsapp} ou no {nosso_site}.\n\nQualquer ajuste me fala. Abraço, {meu_nome}.',
      },
      {
        nome: 'Turista / despedida',
        texto:
          'Oi {primeiro_nome}! Somos o {crawl}, em {cidade}.\n\nAtendemos muito grupo de despedida de solteiro e turista que chega sem conhecer ninguém — quatro casas, welcome shot em cada uma e anfitrião com o grupo a noite toda.\n\nSe você indicar, seu público entra com {desconto}% usando o código {codigo} e você recebe {comissao}% de comissão. Posso te mandar fotos e o roteiro da semana?',
      },
    ],
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
