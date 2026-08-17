'use client'

import { useEffect, useState, useTransition } from 'react'
import './nightcrawl.css'
import { ETAPAS, STATUS_SITE, TIPOS_FESTA, type Db, type Etapa, type Parceiro, type View } from '@/lib/nightcrawl/types'
import { DEFAULT_PARCEIRO, EU_INFO } from '@/lib/nightcrawl/config'
import { addDays, brl, fmtDate, gerarCodigo, n, preencherModelo, waLink } from '@/lib/nightcrawl/utils'
import { codigoParceiro, derivePartner, nomeParceiro, origemTxt, siteStatusCls } from '@/lib/nightcrawl/view-models'
import {
  adiarParceiro,
  createCliente,
  createModelo,
  createParceiro,
  createSite,
  createVenda,
  deleteCliente,
  deleteModelo,
  deleteParceiro,
  deleteSite,
  deleteVenda,
  logContato,
  toggleVendaPago,
  updateModelo,
  updateParceiro,
  updateSite,
} from '@/lib/nightcrawl/actions'
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
  db: Db
  crawlName: string
  city: string
  today: string
  hojeTxt: string
}

function emptyForm(proximo: string): PartnerFormState {
  return {
    nome: '',
    tipo: DEFAULT_PARCEIRO.tipo,
    cidade: 'São Paulo',
    idioma: 'PT',
    contatos: [''],
    links: [''],
    origem: DEFAULT_PARCEIRO.origem,
    codigo: '',
    desconto: DEFAULT_PARCEIRO.desconto,
    comissao: DEFAULT_PARCEIRO.comissao,
    proximo,
    notas: '',
    pedido: '',
  }
}

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function NightCrawlApp({ db, crawlName, city, today, hojeTxt }: NightCrawlAppProps) {
  const [, startTransition] = useTransition()
  const [view, setView] = useState<View>('mesa')
  const [sel, setSel] = useState<string | null>(null)
  const [busca, setBusca] = useState('')
  const [etapaF, setEtapaF] = useState('Todas')
  const [buscaFollow, setBuscaFollow] = useState('')
  const [modeloSel, setModeloSel] = useState('m1')
  const [rascunho, setRascunho] = useState<string | null>(null)
  const [modal, setModal] = useState<'parceiro' | 'log' | null>(null)
  const [form, setForm] = useState<PartnerFormState>(() => emptyForm(addDays(today, 1)))
  const [log, setLog] = useState<LogFormState>({ tipo: 'Respondeu', texto: '', etapa: 'Novo', proximo: '' })
  const [aviso, setAviso] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [vForm, setVForm] = useState({ data: today, parceiroId: '', cliente: '', pessoas: '', valor: '' })
  const [cForm, setCForm] = useState({ nome: '', contato: '', pais: 'BR', tipo: TIPOS_FESTA[0], origem: '' })
  const [sForm, setSForm] = useState({ nome: '', url: '', status: STATUS_SITE[0] })
  // Drafts for fields committed on blur instead of on every keystroke — typing
  // now writes to the DB, so we can't fire a server action per keypress.
  const [fichaDraftRaw, setFichaDraftRaw] = useState<{ id: string; codigo: string; desconto: string; comissao: string } | null>(null)
  const [siteDrafts, setSiteDrafts] = useState<Record<string, string>>({})
  const [modeloDrafts, setModeloDrafts] = useState<Record<string, { nome: string; texto: string }>>({})

  useEffect(() => {
    if (!aviso) return
    const t = setTimeout(() => setAviso(''), 2200)
    return () => clearTimeout(t)
  }, [aviso])

  function showAviso(msg: string) {
    setAviso(msg)
  }

  function runAction(fn: () => Promise<void>, successMsg: string, failureMsg: string) {
    startTransition(async () => {
      try {
        await fn()
        showAviso(successMsg)
      } catch {
        showAviso(failureMsg)
      }
    })
  }

  function registrar(id: string, tipo: string, texto: string, etapa: Etapa, proximo?: string) {
    const novoProximo = proximo === undefined ? addDays(today, FOLLOW_UP_DAYS) : proximo
    runAction(
      () => logContato({ id, tipo, texto: texto || '', etapa, proximo: novoProximo }),
      `${tipo} registrado`,
      'Não foi possível registrar'
    )
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
      contato: p.contatos[0] ?? '',
      cidade: p.cidade,
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
        runAction(
          () => adiarParceiro({ id: p.id, proximo: addDays(today, FOLLOW_UP_DAYS) }),
          'Adiado',
          'Não foi possível adiar'
        )
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
    !q || [l.nome, l.handle, l.tipo, l.cidade, l.codigo].join(' ').toLowerCase().includes(q)
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
      return [row.nome, row.handle, row.codigo, cts].join(' ').toLowerCase().includes(qf)
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
    togglePago: () => runAction(() => toggleVendaPago({ id: v.id }), 'Venda atualizada', 'Não foi possível atualizar'),
    remover: () => runAction(() => deleteVenda({ id: v.id }), 'Venda excluída', 'Não foi possível excluir'),
  }))
  const somaValor = db.vendas.reduce((a, v) => a + n(v.valor), 0)
  const somaComissao = db.vendas.reduce((a, v) => a + (v.pago ? 0 : comissaoDe(v)), 0)
  const opcoesParceiro = db.parceiros.map((p) => ({ value: p.id, label: (p.codigo ? p.codigo + ' — ' : '') + p.nome }))
  const nomesClientes = db.clientes.map((c) => c.nome)

  function salvarVenda() {
    const digitado = vForm.cliente.trim()
    const chave = (s: string) => stripDiacritics(s).toLowerCase().trim()
    const existente = db.clientes.find((c) => chave(c.nome) === chave(digitado))
    const cliente = existente ? existente.nome : digitado || 'Não identificado'
    runAction(
      () => createVenda({ data: vForm.data || today, parceiroId: vForm.parceiroId, cliente, pessoas: vForm.pessoas, valor: vForm.valor }),
      'Venda registrada',
      'Não foi possível registrar a venda'
    )
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
      remover: () => runAction(() => deleteCliente({ id: c.id }), 'Cliente excluído', 'Não foi possível excluir'),
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
    runAction(
      () => createCliente({ nome: cForm.nome, contato: cForm.contato, pais: cForm.pais, tipo: cForm.tipo, origem: cForm.origem || 'direto' }),
      'Cliente adicionado',
      'Não foi possível adicionar'
    )
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
    proximaAcao: siteDrafts[s.id] ?? s.proximaAcao,
    onAcaoChange: (v: string) => setSiteDrafts((d) => ({ ...d, [s.id]: v })),
    onAcaoBlur: () => {
      const proximaAcao = siteDrafts[s.id]
      if (proximaAcao === undefined || proximaAcao === s.proximaAcao) return
      runAction(() => updateSite({ id: s.id, proximaAcao }), 'Site atualizado', 'Não foi possível atualizar')
    },
    onStatusChange: (v: string) =>
      runAction(() => updateSite({ id: s.id, status: v }), 'Site atualizado', 'Não foi possível atualizar'),
    remover: () => runAction(() => deleteSite({ id: s.id }), 'Site removido', 'Não foi possível remover'),
  }))

  function salvarSite() {
    if (!sForm.nome.trim()) {
      showAviso('Dê um nome ao site')
      return
    }
    runAction(
      () => createSite({ nome: sForm.nome, url: sForm.url, status: sForm.status }),
      'Site adicionado',
      'Não foi possível adicionar'
    )
    setSForm({ nome: '', url: '', status: sForm.status })
  }

  // ---- modelos ----
  const modelosVM = db.modelos.map((m) => ({
    id: m.id,
    nome: modeloDrafts[m.id]?.nome ?? m.nome,
    texto: modeloDrafts[m.id]?.texto ?? m.texto,
    onNomeChange: (v: string) =>
      setModeloDrafts((d) => ({ ...d, [m.id]: { nome: v, texto: d[m.id]?.texto ?? m.texto } })),
    onNomeBlur: () => {
      const nome = modeloDrafts[m.id]?.nome
      if (nome === undefined || nome === m.nome) return
      runAction(() => updateModelo({ id: m.id, nome }), 'Modelo atualizado', 'Não foi possível atualizar')
    },
    onTextoChange: (v: string) =>
      setModeloDrafts((d) => ({ ...d, [m.id]: { nome: d[m.id]?.nome ?? m.nome, texto: v } })),
    onTextoBlur: () => {
      const texto = modeloDrafts[m.id]?.texto
      if (texto === undefined || texto === m.texto) return
      runAction(() => updateModelo({ id: m.id, texto }), 'Modelo atualizado', 'Não foi possível atualizar')
    },
    salvar: () => {
      const draft = modeloDrafts[m.id]
      if (!draft) return
      const updates: { nome?: string; texto?: string } = {}
      if (draft.nome !== m.nome) updates.nome = draft.nome
      if (draft.texto !== m.texto) updates.texto = draft.texto
      if (!Object.keys(updates).length) return
      runAction(() => updateModelo({ id: m.id, ...updates }), 'Modelo atualizado', 'Não foi possível atualizar')
    },
    remover: () => runAction(() => deleteModelo({ id: m.id }), 'Modelo excluído', 'Não foi possível excluir'),
  }))

  // ---- ficha (partner detail) ----
  const selRaw = sel ? db.parceiros.find((p) => p.id === sel) || null : null

  function abrirNovoParceiro() {
    setForm(emptyForm(addDays(today, 1)))
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
    })
    setModal('parceiro')
  }

  const fichaDraft = fichaDraftRaw && fichaDraftRaw.id === selRaw?.id ? fichaDraftRaw : null
  function setFichaDraft(next: { codigo: string; desconto: string; comissao: string }) {
    if (!selRaw) return
    setFichaDraftRaw({ id: selRaw.id, ...next })
  }

  let fichaProps: React.ComponentProps<typeof PartnerDetailView> | null = null
  if (selRaw) {
    const rowSel = buildRow(selRaw)
    const modelo = db.modelos.find((m) => m.id === modeloSel) || db.modelos[0]
    const mensagem = rascunho !== null ? rascunho : preencherModelo(modelo ? modelo.texto : '', selRaw, EU_INFO, crawlName)
    const tel = selRaw.contatos.map((c) => c.replace(/[^0-9]/g, '')).find((x) => x.length >= 8) || ''
    fichaProps = {
      tipo: selRaw.tipo,
      nome: selRaw.nome,
      handle: selRaw.handle,
      cidade: selRaw.cidade,
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
      codigo: fichaDraft?.codigo ?? selRaw.codigo,
      onCodigoChange: (v) => {
        const codigo = v.toUpperCase()
        setFichaDraft({
          codigo,
          desconto: fichaDraft?.desconto ?? selRaw.desconto,
          comissao: fichaDraft?.comissao ?? selRaw.comissao,
        })
      },
      onCodigoBlur: () => {
        const codigo = fichaDraft?.codigo
        if (codigo === undefined || codigo === selRaw.codigo) return
        runAction(() => updateParceiro({ ...toParceiroInput(selRaw), codigo }), 'Código atualizado', 'Não foi possível atualizar')
      },
      onGerarCodigo: () => {
        const codigo = gerarCodigo(selRaw.nome, fichaDraft?.desconto ?? selRaw.desconto, existingCodes(selRaw.id))
        setFichaDraft({ codigo, desconto: fichaDraft?.desconto ?? selRaw.desconto, comissao: fichaDraft?.comissao ?? selRaw.comissao })
        runAction(
          () => updateParceiro({ ...toParceiroInput(selRaw), codigo }),
          'Código gerado',
          'Não foi possível gerar o código'
        )
      },
      desconto: fichaDraft?.desconto ?? selRaw.desconto,
      onDescontoChange: (v) =>
        setFichaDraft({ codigo: fichaDraft?.codigo ?? selRaw.codigo, desconto: v, comissao: fichaDraft?.comissao ?? selRaw.comissao }),
      onDescontoBlur: () => {
        const desconto = fichaDraft?.desconto
        if (desconto === undefined || desconto === selRaw.desconto) return
        runAction(() => updateParceiro({ ...toParceiroInput(selRaw), desconto }), 'Desconto atualizado', 'Não foi possível atualizar')
      },
      comissao: fichaDraft?.comissao ?? selRaw.comissao,
      onComissaoChange: (v) =>
        setFichaDraft({ codigo: fichaDraft?.codigo ?? selRaw.codigo, desconto: fichaDraft?.desconto ?? selRaw.desconto, comissao: v }),
      onComissaoBlur: () => {
        const comissao = fichaDraft?.comissao
        if (comissao === undefined || comissao === selRaw.comissao) return
        runAction(() => updateParceiro({ ...toParceiroInput(selRaw), comissao }), 'Comissão atualizada', 'Não foi possível atualizar')
      },
      avisoCodigo: (fichaDraft?.codigo ?? selRaw.codigo)
        ? `O cliente diz: "venho da parte de ${selRaw.nome.split(' ')[0]}, código ${fichaDraft?.codigo ?? selRaw.codigo}".`
        : 'Sem código ainda — clique em Gerar.',
      nVendas: rowSel.nVendas,
      receitaTxt: rowSel.receitaTxt,
      comissaoTxt: rowSel.comissaoTxt,
      fatos: [
        { k: 'Contatos', v: selRaw.contatos.join('  ·  ') || '—' },
        { k: 'Próximo', v: rowSel.proximoTxt },
        { k: 'Origem', v: selRaw.origem || '—' },
        { k: 'Links', v: selRaw.links.join('  ·  ') || '—', links: selRaw.links },
        { k: 'Notas', v: selRaw.notas || '—' },
      ],
      onExcluir: () => {
        runAction(() => deleteParceiro({ id: selRaw.id }), 'Parceiro excluído', 'Não foi possível excluir')
        setView('parceiros')
        setSel(null)
      },
    }
  }

  function toParceiroInput(p: Parceiro) {
    return {
      id: p.id,
      nome: p.nome,
      tipo: p.tipo,
      cidade: p.cidade,
      idioma: p.idioma,
      contatos: p.contatos,
      links: p.links,
      handle: p.handle,
      origem: p.origem,
      codigo: p.codigo,
      desconto: p.desconto,
      comissao: p.comissao,
      proximo: p.proximo,
      notas: p.notas,
      pedido: p.pedido,
      etapa: p.etapa,
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
    const payload = {
      nome: form.nome,
      tipo: form.tipo,
      cidade: form.cidade,
      idioma: form.idioma,
      contatos: contatosLimpos,
      links: linksLimpos,
      handle,
      origem: form.origem,
      codigo,
      desconto: form.desconto,
      comissao: form.comissao,
      proximo: form.proximo,
      notas: form.notas,
      pedido: form.pedido,
    }
    if (form.id) {
      runAction(() => updateParceiro({ ...payload, id: form.id }), 'Parceiro atualizado', 'Não foi possível atualizar')
    } else {
      runAction(() => createParceiro(payload), 'Parceiro criado', 'Não foi possível criar')
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
            onSalvar={salvarSite}
            sites={sitesVM}
          />
        )}

        {view === 'modelos' && (
          <TemplatesView
            modelos={modelosVM}
            onNovoModelo={() =>
              runAction(() => createModelo({ nome: 'Novo modelo', texto: 'Oi {primeiro_nome}, ' }), 'Modelo criado', 'Não foi possível criar')
            }
          />
        )}

        {view === 'ficha' && fichaProps && <PartnerDetailView {...fichaProps} />}
      </main>

      <PartnerFormDialog
        open={modal === 'parceiro'}
        title={form.id ? 'Editar parceiro' : 'Novo parceiro'}
        form={form}
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
