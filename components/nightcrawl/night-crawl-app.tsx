'use client'

import { useEffect, useState } from 'react'
import './nightcrawl.css'
import {
  ETAPAS,
  RESPONSAVEIS,
  STATUS_SITE,
  TIPOS_FESTA,
  type Db,
  type Etapa,
  type Parceiro,
  type View,
} from '@/lib/nightcrawl/types'
import { addDays, brl, fmtDate, gerarCodigo, n, preencherModelo, uid, waLink } from '@/lib/nightcrawl/utils'
import { codigoParceiro, derivePartner, nomeParceiro, origemTxt, siteStatusCls } from '@/lib/nightcrawl/view-models'
import { HeaderNav } from './header-nav'
import { DashboardView } from './views/dashboard-view'
import { PartnersView } from './views/partners-view'
import { FollowUpsView } from './views/follow-ups-view'
import { SalesView } from './views/sales-view'
import { ClientsView } from './views/clients-view'
import { PresenceView } from './views/presence-view'
import { TemplatesView } from './views/templates-view'
import { PartnerDetailView } from './views/partner-detail-view'
import { PartnerFormDialog, type PartnerFormState } from './partner-form-dialog'
import { LogContactDialog, type LogFormState } from './log-contact-dialog'
import type { FiltroVM, NavItemVM, PartnerRowVM } from './vm-types'

const ABERTOS: Etapa[] = ['Novo', 'Contactado', 'Respondeu', 'Negociando']
const FOLLOW_UP_DAYS = 3

interface NightCrawlAppProps {
  initialDb: Db
  crawlName: string
  city: string
  today: string
  hojeTxt: string
}

function emptyForm(defaults: { responsavel: string; proximo: string }): PartnerFormState {
  return {
    nome: '',
    tipo: 'Instagram',
    cidade: 'São Paulo',
    idioma: 'PT',
    contatos: [''],
    links: [''],
    origem: 'Busca no Instagram',
    codigo: '',
    desconto: '15',
    comissao: '20',
    proximo: defaults.proximo,
    notas: '',
    pedido: '',
    responsavel: defaults.responsavel,
    etapa: 'Novo',
  }
}

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function NightCrawlApp({ initialDb, crawlName, city, today, hojeTxt }: NightCrawlAppProps) {
  const [db, setDb] = useState<Db>(initialDb)
  const [view, setView] = useState<View>('mesa')
  const [sel, setSel] = useState<string | null>(null)
  const [busca, setBusca] = useState('')
  const [etapaF, setEtapaF] = useState('Todas')
  const [buscaFollow, setBuscaFollow] = useState('')
  const [modeloSel, setModeloSel] = useState('m1')
  const [rascunho, setRascunho] = useState<string | null>(null)
  const [modal, setModal] = useState<'parceiro' | 'log' | null>(null)
  const [form, setForm] = useState<PartnerFormState>(() =>
    emptyForm({ responsavel: RESPONSAVEIS[0], proximo: addDays(today, 1) })
  )
  const [log, setLog] = useState<LogFormState>({ tipo: 'Respondeu', texto: '', etapa: 'Novo', proximo: '' })
  const [aviso, setAviso] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [vForm, setVForm] = useState({ data: today, parceiroId: '', cliente: '', pessoas: '', valor: '' })
  const [cForm, setCForm] = useState({ nome: '', contato: '', pais: 'BR', tipo: TIPOS_FESTA[0], origem: '' })
  const [sForm, setSForm] = useState({ nome: '', url: '', status: STATUS_SITE[0], responsavel: RESPONSAVEIS[0] })

  useEffect(() => {
    if (!aviso) return
    const t = setTimeout(() => setAviso(''), 2200)
    return () => clearTimeout(t)
  }, [aviso])

  function showAviso(msg: string) {
    setAviso(msg)
  }

  function patchDb(fn: (d: Db) => Db) {
    setDb(fn)
  }

  function patchParceiro(id: string, fn: (p: Parceiro) => Parceiro) {
    setDb((d) => ({ ...d, parceiros: d.parceiros.map((p) => (p.id === id ? fn(p) : p)) }))
  }

  function registrar(id: string, tipo: string, texto: string, etapa?: Etapa, proximo?: string) {
    patchParceiro(id, (l) => ({
      ...l,
      etapa: etapa ?? l.etapa,
      proximo: proximo === undefined ? addDays(today, FOLLOW_UP_DAYS) : proximo,
      registros: [...l.registros, { data: today, tipo, texto: texto || '' }],
    }))
    showAviso(`${tipo} registrado`)
  }

  function existingCodes(excludeId?: string) {
    return db.parceiros.filter((p) => p.id !== excludeId).map((p) => p.codigo)
  }

  function buildRow(p: Parceiro): PartnerRowVM {
    const derived = derivePartner(p, db, today)
    return {
      id: p.id,
      nome: p.nome,
      handle: p.handle,
      tipo: p.tipo,
      contato: p.contato,
      cidade: p.cidade,
      responsavel: p.responsavel,
      etapa: p.etapa,
      codigo: p.codigo,
      ...derived,
      abrir: () => {
        setView('ficha')
        setSel(p.id)
        setRascunho(null)
        setCopiado(false)
      },
      abrirLog: () => {
        setModal('log')
        setSel(p.id)
        setLog({ tipo: 'Respondeu', texto: '', etapa: p.etapa, proximo: addDays(today, FOLLOW_UP_DAYS) })
      },
      qEnviei: () => registrar(p.id, 'DM enviada', 'Registro rápido da mesa.', p.etapa === 'Novo' ? 'Contactado' : p.etapa),
      qSemResposta: () => registrar(p.id, 'Sem resposta', 'Segue sem responder.', p.etapa),
      qRespondeu: () => registrar(p.id, 'Respondeu', 'Registro rápido da mesa.', 'Respondeu'),
      adiar: () => {
        patchParceiro(p.id, (x) => ({ ...x, proximo: addDays(today, FOLLOW_UP_DAYS) }))
        showAviso('Adiado')
      },
    }
  }

  const todos = db.parceiros.map(buildRow)

  const nAtrasados = todos.filter((l) => l.dias !== null && l.dias < 0 && l.etapa !== 'Perdido').length
  const nHoje = todos.filter((l) => l.dias === 0).length
  const nAbertos = todos.filter((l) => ABERTOS.includes(l.etapa)).length
  const mesAtual = today.slice(0, 7)
  const doMes = db.vendas.filter((v) => v.data.slice(0, 7) === mesAtual)
  const mesTxt = new Date(today + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'long' })

  const q = busca.trim().toLowerCase()
  const bate = (l: PartnerRowVM) =>
    !q || [l.nome, l.handle, l.tipo, l.cidade, l.responsavel, l.codigo].join(' ').toLowerCase().includes(q)
  const visiveis = todos.filter((l) => bate(l) && (etapaF === 'Todas' || l.etapa === etapaF))

  const pendentes = todos
    .filter((l) => l.dias !== null && l.dias <= 1 && l.etapa !== 'Perdido')
    .sort((a, b) => (a.dias ?? 0) - (b.dias ?? 0))

  const qf = buscaFollow.trim().toLowerCase()
  const digitos = qf.replace(/[^0-9]/g, '')
  const agendados = db.parceiros
    .map((p, i) => ({ p, row: todos[i] }))
    .filter(({ p, row }) => {
      if (row.dias === null || row.etapa === 'Perdido') return false
      if (!qf) return true
      const cts = p.contatos.join(' ')
      if (digitos) return cts.replace(/[^0-9]/g, '').includes(digitos) || row.codigo.toLowerCase().includes(qf)
      return [row.nome, row.handle, row.codigo, cts, row.responsavel].join(' ').toLowerCase().includes(qf)
    })
    .sort((a, b) => (a.row.dias ?? 0) - (b.row.dias ?? 0))

  const gp = (label: string, teste: (d: number) => boolean) => {
    const items = agendados.filter(({ row }) => teste(row.dias ?? 0)).map(({ row }) => row)
    return { label, items, count: items.length }
  }
  const grupos = [
    gp('Atrasados', (d) => d < 0),
    gp('Hoje', (d) => d === 0),
    gp('Esta semana', (d) => d > 0 && d <= 7),
    gp('Depois', (d) => d > 7),
  ].filter((g) => g.count)

  const maxF = Math.max(1, ...ETAPAS.map((e) => todos.filter((l) => l.etapa === e).length))
  const funil = ETAPAS.map((e) => {
    const c = todos.filter((l) => l.etapa === e).length
    return {
      etapa: e,
      count: c,
      largura: Math.round((c / maxF) * 100) + '%',
      cor:
        e === 'Perdido'
          ? 'var(--nc-color-neutral-400)'
          : e === 'Fechado' || e === 'No ar'
            ? 'var(--nc-color-accent-2)'
            : 'var(--nc-color-accent)',
      go: () => {
        setView('parceiros')
        setEtapaF(e)
      },
    }
  })

  const atividade: { data: string; dataTxt: string; quem: string; tipo: string }[] = []
  db.parceiros.forEach((p) =>
    p.registros.forEach((r) => atividade.push({ data: r.data, dataTxt: fmtDate(r.data), quem: p.nome, tipo: r.tipo }))
  )
  atividade.sort((a, b) => (a.data < b.data ? 1 : -1))

  const rankCodigos = db.parceiros
    .map((p) => {
      const vs = db.vendas.filter((v) => v.parceiroId === p.id)
      const receita = vs.reduce((a, v) => a + n(v.valor), 0)
      return { codigo: p.codigo || '—', nome: p.nome, vendas: vs.length, receita: brl(receita), _r: receita }
    })
    .filter((r) => r.vendas)
    .sort((a, b) => b._r - a._r)
    .slice(0, 5)

  // ---- vendas ----
  const comissaoDe = (v: Db['vendas'][number]) => {
    const p = db.parceiros.find((x) => x.id === v.parceiroId)
    return p ? n(v.valor) * (n(p.comissao) / 100) : 0
  }
  const vendasOrd = [...db.vendas].sort((a, b) => (a.data < b.data ? 1 : -1))
  const vendasVM = vendasOrd.map((v) => ({
    id: v.id,
    dataTxt: fmtDate(v.data),
    parceiro: nomeParceiro(v.parceiroId, db),
    codigo: codigoParceiro(v.parceiroId, db),
    cliente: v.cliente,
    pessoas: v.pessoas || '—',
    valorTxt: brl(v.valor),
    comissaoTxt: brl(comissaoDe(v)),
    pago: v.pago,
    pagoTxt: v.pago ? 'Pago' : 'A pagar',
    pagoCls: v.pago ? 'nc-tag-accent' : 'nc-tag-accent-2',
    togglePago: () =>
      patchDb((x) => ({ ...x, vendas: x.vendas.map((y) => (y.id === v.id ? { ...y, pago: !y.pago } : y)) })),
    remover: () => {
      patchDb((x) => ({ ...x, vendas: x.vendas.filter((y) => y.id !== v.id) }))
      showAviso('Venda excluída')
    },
  }))
  const somaValor = db.vendas.reduce((a, v) => a + n(v.valor), 0)
  const somaComissao = db.vendas.reduce((a, v) => a + (v.pago ? 0 : comissaoDe(v)), 0)
  const opcoesParceiro = db.parceiros.map((p) => ({ value: p.id, label: (p.codigo ? p.codigo + ' — ' : '') + p.nome }))
  const nomesClientes = db.clientes.map((c) => c.nome)

  function salvarVenda() {
    const digitado = vForm.cliente.trim()
    const chave = (s: string) => stripDiacritics(s).toLowerCase().trim()
    const existente = db.clientes.find((c) => chave(c.nome) === chave(digitado))
    const nova = {
      id: uid(),
      data: vForm.data || today,
      parceiroId: vForm.parceiroId,
      cliente: existente ? existente.nome : digitado || 'Não identificado',
      pessoas: vForm.pessoas,
      valor: vForm.valor,
      pago: false,
    }
    patchDb((x) => ({ ...x, vendas: [...x.vendas, nova] }))
    showAviso('Venda registrada')
    setVForm({ data: today, parceiroId: vForm.parceiroId, cliente: '', pessoas: '', valor: '' })
  }

  // ---- clientes ----
  const clientesVM = [...db.clientes]
    .sort((a, b) => (a.data < b.data ? 1 : -1))
    .map((c) => ({
      id: c.id,
      nome: c.nome,
      contato: c.contato,
      pais: c.pais,
      tipo: c.tipo,
      origemTxt: origemTxt(c.origem, db),
      dataTxt: fmtDate(c.data),
      remover: () => {
        patchDb((x) => ({ ...x, clientes: x.clientes.filter((y) => y.id !== c.id) }))
        showAviso('Cliente excluído')
      },
    }))

  const opcoesOrigem = [
    { value: 'direto', label: 'Direto' },
    ...db.parceiros.map((p) => ({ value: 'p:' + p.id, label: 'Parceiro — ' + p.nome })),
    ...db.sites.map((s) => ({ value: 's:' + s.id, label: 'Site — ' + s.nome })),
  ]

  function salvarCliente() {
    if (!cForm.nome.trim()) {
      showAviso('O nome é obrigatório')
      return
    }
    patchDb((x) => ({
      ...x,
      clientes: [
        ...x.clientes,
        { id: uid(), nome: cForm.nome, contato: cForm.contato, pais: cForm.pais, tipo: cForm.tipo, origem: cForm.origem || 'direto', data: today, notas: '' },
      ],
    }))
    showAviso('Cliente adicionado')
    setCForm({ nome: '', contato: '', pais: cForm.pais, tipo: cForm.tipo, origem: cForm.origem })
  }

  // ---- presença ----
  const sitesVM = db.sites.map((s) => ({
    id: s.id,
    nome: s.nome,
    url: s.url,
    urlTxt: s.url || 'sem link',
    status: s.status,
    statusCls: siteStatusCls(s.status),
    responsavel: s.responsavel,
    proximaAcao: s.proximaAcao,
    onAcaoChange: (v: string) =>
      patchDb((x) => ({ ...x, sites: x.sites.map((y) => (y.id === s.id ? { ...y, proximaAcao: v } : y)) })),
    onStatusChange: (v: string) =>
      patchDb((x) => ({ ...x, sites: x.sites.map((y) => (y.id === s.id ? { ...y, status: v } : y)) })),
    remover: () => {
      patchDb((x) => ({ ...x, sites: x.sites.filter((y) => y.id !== s.id) }))
      showAviso('Site removido')
    },
  }))

  function salvarSite() {
    if (!sForm.nome.trim()) {
      showAviso('Dê um nome ao site')
      return
    }
    patchDb((x) => ({
      ...x,
      sites: [...x.sites, { id: uid(), nome: sForm.nome, url: sForm.url, status: sForm.status, responsavel: sForm.responsavel, proximaAcao: '' }],
    }))
    showAviso('Site adicionado')
    setSForm({ nome: '', url: '', status: sForm.status, responsavel: sForm.responsavel })
  }

  // ---- modelos ----
  const modelosVM = db.modelos.map((m) => ({
    id: m.id,
    nome: m.nome,
    texto: m.texto,
    onNomeChange: (v: string) => patchDb((x) => ({ ...x, modelos: x.modelos.map((y) => (y.id === m.id ? { ...y, nome: v } : y)) })),
    onTextoChange: (v: string) => patchDb((x) => ({ ...x, modelos: x.modelos.map((y) => (y.id === m.id ? { ...y, texto: v } : y)) })),
    remover: () => {
      patchDb((x) => ({ ...x, modelos: x.modelos.filter((y) => y.id !== m.id) }))
      showAviso('Modelo excluído')
    },
  }))

  // ---- ficha (partner detail) ----
  const selRaw = sel ? db.parceiros.find((p) => p.id === sel) || null : null

  function abrirNovoParceiro() {
    setForm(emptyForm({ responsavel: RESPONSAVEIS[0], proximo: addDays(today, 1) }))
    setModal('parceiro')
  }

  function abrirEditarParceiro() {
    if (!selRaw) return
    setForm({
      id: selRaw.id,
      nome: selRaw.nome,
      tipo: selRaw.tipo,
      cidade: selRaw.cidade,
      idioma: selRaw.idioma,
      contatos: selRaw.contatos.length ? [...selRaw.contatos] : [''],
      links: selRaw.links.length ? [...selRaw.links] : [''],
      origem: selRaw.origem,
      codigo: selRaw.codigo,
      codigoManual: true,
      desconto: selRaw.desconto,
      comissao: selRaw.comissao,
      proximo: selRaw.proximo,
      notas: selRaw.notas,
      pedido: selRaw.pedido,
      responsavel: selRaw.responsavel,
      etapa: selRaw.etapa,
    })
    setModal('parceiro')
  }

  let fichaProps: React.ComponentProps<typeof PartnerDetailView> | null = null
  if (selRaw) {
    const rowSel = buildRow(selRaw)
    const modelo = db.modelos.find((m) => m.id === modeloSel) || db.modelos[0]
    const mensagem = rascunho !== null ? rascunho : preencherModelo(modelo ? modelo.texto : '', selRaw, db.eu, crawlName)
    const tel = selRaw.contatos.map((c) => c.replace(/[^0-9]/g, '')).find((x) => x.length >= 8) || ''
    fichaProps = {
      tipo: selRaw.tipo,
      nome: selRaw.nome,
      handle: selRaw.handle,
      cidade: selRaw.cidade,
      responsavel: selRaw.responsavel,
      etapas: ETAPAS.map((e) => ({
        label: e,
        bg:
          e === selRaw.etapa
            ? e === 'Perdido'
              ? 'var(--nc-color-neutral-300)'
              : 'var(--nc-color-accent)'
            : 'color-mix(in srgb, var(--nc-color-text) 6%, transparent)',
        fg: e === selRaw.etapa ? (e === 'Perdido' ? 'var(--nc-color-neutral-900)' : 'var(--nc-color-bg)') : 'var(--nc-color-neutral-800)',
        go: () => registrar(selRaw.id, 'Nota', `Etapa movida para ${e}.`, e, selRaw.proximo),
      })),
      onEditar: abrirEditarParceiro,
      onAbrirLog: () => {
        setModal('log')
        setLog({ tipo: 'Respondeu', texto: '', etapa: selRaw.etapa, proximo: addDays(today, FOLLOW_UP_DAYS) })
      },
      onVoltar: () => setView('parceiros'),
      abasModelo: db.modelos.map((m2) => ({
        label: m2.nome,
        active: modeloSel === m2.id,
        go: () => {
          setModeloSel(m2.id)
          setRascunho(null)
          setCopiado(false)
        },
      })),
      mensagem,
      onMensagemChange: (v) => {
        setRascunho(v)
        setCopiado(false)
      },
      onRestaurar: () => {
        setRascunho(null)
        setCopiado(false)
      },
      copiarLabel: copiado ? 'Copiado' : 'Copiar mensagem',
      onCopiar: () => {
        navigator.clipboard?.writeText(mensagem).catch(() => {})
        setCopiado(true)
        showAviso('Mensagem copiada')
      },
      whatsUrl: waLink(tel, mensagem),
      registros: [...selRaw.registros].reverse().map((r) => ({ dataTxt: fmtDate(r.data), tipo: r.tipo, texto: r.texto })),
      semRegistros: selRaw.registros.length === 0,
      codigo: selRaw.codigo,
      onCodigoChange: (v) => patchParceiro(selRaw.id, (l) => ({ ...l, codigo: v.toUpperCase() })),
      onGerarCodigo: () => {
        patchParceiro(selRaw.id, (l) => ({ ...l, codigo: gerarCodigo(l.nome, l.desconto, existingCodes(l.id)) }))
        showAviso('Código gerado')
      },
      desconto: selRaw.desconto,
      onDescontoChange: (v) => patchParceiro(selRaw.id, (l) => ({ ...l, desconto: v })),
      comissao: selRaw.comissao,
      onComissaoChange: (v) => patchParceiro(selRaw.id, (l) => ({ ...l, comissao: v })),
      avisoCodigo: selRaw.codigo
        ? `O cliente diz: "venho da parte de ${selRaw.nome.split(' ')[0]}, código ${selRaw.codigo}".`
        : 'Sem código ainda — clique em Gerar.',
      nVendas: rowSel.nVendas,
      receitaTxt: rowSel.receitaTxt,
      comissaoTxt: rowSel.comissaoTxt,
      fatos: [
        { k: 'Contatos', v: selRaw.contatos.join('  ·  ') || '—' },
        { k: 'O que pedem', v: selRaw.pedido || '—' },
        { k: 'Próximo', v: rowSel.proximoTxt },
        { k: 'Origem', v: selRaw.origem || '—' },
        { k: 'Links', v: selRaw.links.join('  ·  ') || '—' },
        { k: 'Notas', v: selRaw.notas || '—' },
      ],
      onExcluir: () => {
        patchDb((x) => ({ ...x, parceiros: x.parceiros.filter((p) => p.id !== selRaw.id) }))
        showAviso('Parceiro excluído')
        setView('parceiros')
        setSel(null)
      },
    }
  }

  // ---- diálogo de parceiro ----
  function onNomeChange(v: string) {
    setForm((f) => {
      const nf = { ...f, nome: v }
      if (!nf.codigoManual) nf.codigo = v.trim() ? gerarCodigo(v, nf.desconto, existingCodes(f.id)) : ''
      return nf
    })
  }
  function onDescontoAutoChange(v: string) {
    setForm((f) => {
      const nf = { ...f, desconto: v }
      if (!nf.codigoManual && nf.nome) nf.codigo = gerarCodigo(nf.nome, v, existingCodes(f.id))
      return nf
    })
  }
  function onCodigoManualChange(v: string) {
    setForm((f) => ({ ...f, codigo: v.toUpperCase(), codigoManual: true }))
  }
  function onContatoChange(i: number, v: string) {
    setForm((f) => {
      const arr = [...f.contatos]
      arr[i] = v
      return { ...f, contatos: arr }
    })
  }
  function onContatoRemove(i: number) {
    setForm((f) => {
      const arr = [...f.contatos]
      arr.splice(i, 1)
      return { ...f, contatos: arr.length ? arr : [''] }
    })
  }
  function onContatoAdd() {
    setForm((f) => ({ ...f, contatos: [...f.contatos, ''] }))
  }
  function onLinkChange(i: number, v: string) {
    setForm((f) => {
      const arr = [...f.links]
      arr[i] = v
      return { ...f, links: arr }
    })
  }
  function onLinkRemove(i: number) {
    setForm((f) => {
      const arr = [...f.links]
      arr.splice(i, 1)
      return { ...f, links: arr.length ? arr : [''] }
    })
  }
  function onLinkAdd() {
    setForm((f) => ({ ...f, links: [...f.links, ''] }))
  }

  function salvarParceiro() {
    if (!form.nome.trim()) {
      showAviso('O nome é obrigatório')
      return
    }
    const codigo = (form.codigo || gerarCodigo(form.nome, form.desconto, existingCodes(form.id))).toUpperCase()
    const contatosLimpos = form.contatos.map((x) => x.trim()).filter(Boolean)
    const linksLimpos = form.links.map((x) => x.trim()).filter(Boolean)
    const handle = linksLimpos[0] || ''
    const contato = contatosLimpos[0] || ''
    if (form.id) {
      const id = form.id
      patchParceiro(id, (l) => ({
        ...l,
        nome: form.nome,
        tipo: form.tipo,
        cidade: form.cidade,
        idioma: form.idioma,
        contatos: contatosLimpos,
        links: linksLimpos,
        handle,
        contato,
        origem: form.origem,
        codigo,
        desconto: form.desconto,
        comissao: form.comissao,
        proximo: form.proximo,
        notas: form.notas,
        pedido: form.pedido,
        responsavel: form.responsavel,
        etapa: form.etapa,
      }))
      showAviso('Parceiro atualizado')
    } else {
      const novo: Parceiro = {
        id: uid(),
        nome: form.nome,
        handle,
        tipo: form.tipo,
        contato,
        contatos: contatosLimpos,
        cidade: form.cidade,
        idioma: form.idioma,
        links: linksLimpos,
        pedido: form.pedido,
        origem: form.origem,
        notas: form.notas,
        responsavel: form.responsavel,
        codigo,
        desconto: form.desconto,
        comissao: form.comissao,
        etapa: form.etapa,
        proximo: form.proximo,
        registros: [{ data: today, tipo: 'Nota', texto: 'Parceiro adicionado à mesa.' }],
      }
      patchDb((x) => ({ ...x, parceiros: [...x.parceiros, novo] }))
      showAviso('Parceiro criado')
    }
    setModal(null)
  }

  function salvarLog() {
    if (!sel) return
    registrar(sel, log.tipo, log.texto, log.etapa, log.proximo)
    setModal(null)
  }

  // ---- navegação ----
  const navItems: NavItemVM[] = [
    { key: 'mesa', label: 'Resumo', badge: '' },
    { key: 'parceiros', label: 'Parceiros', badge: String(todos.length) },
    { key: 'follow', label: 'Follow-ups', badge: nAtrasados ? String(nAtrasados) : '' },
    { key: 'vendas', label: 'Vendas', badge: '' },
    { key: 'clientes', label: 'Clientes', badge: '' },
    { key: 'presenca', label: 'Presença', badge: '' },
    { key: 'modelos', label: 'Modelos', badge: '' },
  ].map((it) => ({ ...it, active: view === it.key || (it.key === 'parceiros' && view === 'ficha') }))

  const filtrosEtapa: FiltroVM[] = [
    { key: 'Todas', label: 'Todas', count: todos.length },
    ...ETAPAS.map((e) => ({ key: e, label: e, count: todos.filter((l) => l.etapa === e).length })),
  ].map((f) => ({ label: f.label, count: f.count, active: etapaF === f.key, onClick: () => setEtapaF(f.key) }))

  return (
    <div className="nc-root">
      <HeaderNav crawlName={crawlName} city={city} hojeTxt={hojeTxt} navItems={navItems} onNav={setView} onNovoParceiro={abrirNovoParceiro} />

      <main className="nc-pad" style={{ paddingTop: 34, paddingBottom: 100 }}>
        {view === 'mesa' && (
          <DashboardView
            nAtrasados={nAtrasados}
            nHoje={nHoje}
            nAbertos={nAbertos}
            nVendasMes={doMes.length}
            mesTxt={mesTxt}
            onIrAtrasados={() => setView('follow')}
            onIrHoje={() => setView('follow')}
            onIrAbertos={() => {
              setView('parceiros')
              setEtapaF('Todas')
              setBusca('')
            }}
            onIrVendas={() => setView('vendas')}
            pendentes={pendentes}
            rankCodigos={rankCodigos}
            funil={funil}
            atividade={atividade.slice(0, 7)}
          />
        )}

        {view === 'parceiros' && (
          <PartnersView
            busca={busca}
            onBuscaChange={setBusca}
            filtrosEtapa={filtrosEtapa}
            parceiros={visiveis}
            onLimparFiltros={() => {
              setBusca('')
              setEtapaF('Todas')
            }}
          />
        )}

        {view === 'follow' && <FollowUpsView busca={buscaFollow} onBuscaChange={setBuscaFollow} grupos={grupos} />}

        {view === 'vendas' && (
          <SalesView
            vForm={vForm}
            onVFormChange={(patch) => setVForm((f) => ({ ...f, ...patch }))}
            opcoesParceiro={opcoesParceiro}
            nomesClientes={nomesClientes}
            onSalvar={salvarVenda}
            totalVendas={String(db.vendas.length)}
            totalPessoas={String(db.vendas.reduce((a, v) => a + n(v.pessoas), 0))}
            totalReceita={brl(somaValor)}
            totalComissao={brl(somaComissao)}
            vendas={vendasVM}
          />
        )}

        {view === 'clientes' && (
          <ClientsView
            cForm={cForm}
            onCFormChange={(patch) => setCForm((f) => ({ ...f, ...patch }))}
            opcoesOrigem={opcoesOrigem}
            onSalvar={salvarCliente}
            clientes={clientesVM}
          />
        )}

        {view === 'presenca' && (
          <PresenceView
            sForm={sForm}
            onSFormChange={(patch) => setSForm((f) => ({ ...f, ...patch }))}
            responsaveis={RESPONSAVEIS}
            onSalvar={salvarSite}
            sites={sitesVM}
          />
        )}

        {view === 'modelos' && (
          <TemplatesView
            modelos={modelosVM}
            onNovoModelo={() =>
              patchDb((x) => ({ ...x, modelos: [...x.modelos, { id: uid(), nome: 'Novo modelo', texto: 'Oi {primeiro_nome}, ' }] }))
            }
            eu={db.eu}
            onEuChange={(patch) => patchDb((x) => ({ ...x, eu: { ...x.eu, ...patch } }))}
          />
        )}

        {view === 'ficha' && fichaProps && <PartnerDetailView {...fichaProps} />}
      </main>

      <PartnerFormDialog
        open={modal === 'parceiro'}
        title={form.id ? 'Editar parceiro' : 'Novo parceiro'}
        form={form}
        responsaveis={RESPONSAVEIS}
        onNomeChange={onNomeChange}
        onFieldChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
        onContatoChange={onContatoChange}
        onContatoRemove={onContatoRemove}
        onContatoAdd={onContatoAdd}
        onLinkChange={onLinkChange}
        onLinkRemove={onLinkRemove}
        onLinkAdd={onLinkAdd}
        onDescontoChange={onDescontoAutoChange}
        onCodigoChange={onCodigoManualChange}
        onCancel={() => setModal(null)}
        onSave={salvarParceiro}
      />

      <LogContactDialog
        open={modal === 'log'}
        partnerName={db.parceiros.find((p) => p.id === sel)?.nome || ''}
        log={log}
        onFieldChange={(patch) => setLog((l) => ({ ...l, ...patch }))}
        onCancel={() => setModal(null)}
        onSave={salvarLog}
      />

      {aviso ? <div className="nc-toast">{aviso}</div> : null}
    </div>
  )
}
