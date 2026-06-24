import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Plano de Desenvolvimento — APSEABA Intercâmbio',
  description: 'Escopo e estimativas de desenvolvimento da plataforma APSEABA Intercâmbio.',
  robots: { index: false, follow: false },
}

type Area = 'g' | 'm' | 'a'

interface Feature {
  id: number
  name: string
  desc: string
  area: Area
  hours: number
}

interface Phase {
  number: number
  name: string
  deliver: string
  hours: number
  features: Feature[]
}

const PHASES: Phase[] = [
  {
    number: 1,
    name: 'Fundação + Aprovação de Membros',
    deliver: 'A plataforma entra no ar. A APSEABA já consegue aprovar quem entra e quem não entra.',
    hours: 53,
    features: [
      { id: 1,  name: 'Página de apresentação',       area: 'g', hours: 3,  desc: 'A primeira página que qualquer pessoa vê — explica o que é o Intercâmbio e como entrar' },
      { id: 2,  name: 'Tela de entrada (login)',       area: 'g', hours: 8,  desc: 'O botão "Entrar" funciona de verdade — membro digita seu código APSEABA e senha e acessa' },
      { id: 3,  name: 'Estrutura da plataforma',       area: 'g', hours: 10, desc: 'Menu lateral, navegação entre seções e proteção de acesso — cada perfil só vê o que pode ver' },
      { id: 4,  name: 'Painel do administrador',       area: 'a', hours: 10, desc: 'Tela de resumo para a APSEABA: quantos membros ativos, aprovações pendentes, atividade recente' },
      { id: 5,  name: 'Fila de aprovações',            area: 'a', hours: 8,  desc: 'Lista de quem pediu acesso, com dados de cada solicitante — pendente, aprovado ou recusado' },
      { id: 6,  name: 'Aprovar membro e gerar código', area: 'a', hours: 10, desc: 'A APSEABA aprova e o sistema gera automaticamente o Código Universal de 4 dígitos do membro' },
      { id: 7,  name: 'Recusar solicitação',           area: 'a', hours: 4,  desc: 'Rejeitar um cadastro com motivo — o solicitante é notificado' },
    ],
  },
  {
    number: 2,
    name: 'Cadastro + Perfil + Feed',
    deliver: 'O associado pede acesso pelo site, recebe confirmação por e-mail e já vê o feed da plataforma.',
    hours: 49,
    features: [
      { id: 8,  name: 'Formulário de cadastro (4 passos)',  area: 'g', hours: 14, desc: 'Quem quer entrar preenche dados pessoais, segmento e contato — a APSEABA recebe e analisa' },
      { id: 9,  name: 'E-mail de confirmação de cadastro',  area: 'g', hours: 6,  desc: 'Ao enviar o pedido de acesso, o solicitante recebe um e-mail automático confirmando o recebimento' },
      { id: 10, name: 'Recuperação de senha',               area: 'g', hours: 7,  desc: 'Se o membro esqueceu a senha, pode pedir uma nova pelo e-mail cadastrado' },
      { id: 11, name: 'Feed principal',                     area: 'm', hours: 10, desc: 'A tela principal do associado — mostra publicações, perguntas e novidades dos outros membros em tempo real' },
      { id: 12, name: 'Meu perfil',                         area: 'm', hours: 5,  desc: 'Tela com os dados do próprio membro — nome, empresa, segmento, código APSEABA e status' },
      { id: 13, name: 'Editar perfil',                      area: 'm', hours: 7,  desc: 'O membro atualiza telefone, WhatsApp, empresa, localização — os dados salvam na plataforma' },
    ],
  },
  {
    number: 3,
    name: 'Publicações + Perguntas Técnicas',
    deliver: 'Membros postam produtos, equipamentos e cursos. Fazem e respondem perguntas técnicas do setor.',
    hours: 49,
    features: [
      { id: 14, name: 'Criar publicação',              area: 'm', hours: 8, desc: 'Membro posta produto, equipamento, mídia, curso ou anúncio — aparece no feed dos outros' },
      { id: 15, name: 'Ver publicação completa',       area: 'm', hours: 6, desc: 'Clicar numa publicação abre a página completa com todos os detalhes, autor e tags' },
      { id: 16, name: 'Filtrar publicações',           area: 'm', hours: 5, desc: 'Ver só produtos, só cursos, só anúncios — ou buscar por palavra-chave' },
      { id: 17, name: 'Fazer uma pergunta',            area: 'm', hours: 6, desc: 'Membro posta uma dúvida técnica e aguarda respostas de colegas do setor' },
      { id: 18, name: 'Ver pergunta e respostas',      area: 'm', hours: 8, desc: 'Página com a pergunta completa e todas as respostas dos membros, ordenadas pelos mais votados' },
      { id: 19, name: 'Responder pergunta',            area: 'm', hours: 8, desc: 'Qualquer membro pode responder uma dúvida e ajudar o colega de setor' },
      { id: 20, name: 'Votar na melhor resposta',      area: 'm', hours: 4, desc: 'Membros votam nas respostas mais úteis — as melhores sobem para o topo' },
      { id: 21, name: 'Marcar pergunta como resolvida',area: 'm', hours: 4, desc: 'Quem fez a pergunta marca quando encontrou a solução — ajuda outros com a mesma dúvida' },
    ],
  },
  {
    number: 4,
    name: 'Arquivos + Equipe + Foto',
    deliver: 'Membros enviam datasheets, certificados e projetos. Gerenciam a própria equipe e foto.',
    hours: 49,
    features: [
      { id: 22, name: 'Lista de arquivos',          area: 'm', hours: 6,  desc: 'Área para ver todos os datasheets, certificados, projetos e fotos compartilhados na plataforma' },
      { id: 23, name: 'Enviar arquivo',             area: 'm', hours: 10, desc: 'Upload de PDF, imagem, planilha ou vídeo — fica disponível para a rede ver e baixar' },
      { id: 24, name: 'Baixar arquivo',             area: 'm', hours: 4,  desc: 'Qualquer membro da rede pode baixar os arquivos compartilhados' },
      { id: 25, name: 'Compartilhar arquivo',       area: 'm', hours: 6,  desc: 'Enviar um arquivo diretamente para outro membro ou gerar um link de acesso' },
      { id: 26, name: 'Foto de perfil',             area: 'm', hours: 8,  desc: 'O membro faz upload da própria foto — aparece no perfil e nas publicações' },
      { id: 27, name: 'Minha equipe',               area: 'm', hours: 8,  desc: 'Lista de funcionários, auxiliares e clientes vinculados ao membro — busca e ordenação' },
      { id: 28, name: 'Indicar membro da equipe',   area: 'm', hours: 7,  desc: 'Membro indica um funcionário ou auxiliar para entrar na plataforma — a APSEABA gera o código' },
    ],
  },
  {
    number: 5,
    name: 'Gestão Avançada + Experiência',
    deliver: 'A APSEABA tem controle total dos membros, hierarquia e exportações. A plataforma fica mais rápida.',
    hours: 53,
    features: [
      { id: 29, name: 'Telas de carregamento',             area: 'g', hours: 8,  desc: 'Enquanto os dados carregam, a tela mostra um esboço da página — sem tela em branco ou travamento' },
      { id: 30, name: 'Diretório completo de membros',      area: 'a', hours: 10, desc: 'A APSEABA vê todos os membros em uma tabela completa, separados por função' },
      { id: 31, name: 'Filtros e busca de membros',         area: 'a', hours: 6,  desc: 'Filtrar por função, buscar por nome ou código — encontra qualquer membro na hora' },
      { id: 32, name: 'Exportar lista de membros',          area: 'a', hours: 5,  desc: 'Baixar a lista de membros em Excel ou CSV para relatórios externos' },
      { id: 33, name: 'Pedir mais informações ao candidato',area: 'a', hours: 6,  desc: 'Na fila de aprovações, enviar mensagem pedindo documentos ou dados faltantes' },
      { id: 34, name: 'Exportar fila de aprovações',        area: 'a', hours: 6,  desc: 'Baixar as solicitações pendentes ou concluídas em planilha' },
      { id: 35, name: 'Árvore de hierarquia',               area: 'a', hours: 12, desc: 'Visualizar os 6 níveis da estrutura da APSEABA — quem está dentro de qual grupo e sub-grupo' },
    ],
  },
  {
    number: 6,
    name: 'Permissões + Moderação + Busca',
    deliver: 'A APSEABA define o que cada tipo de membro pode ver e fazer. Todos conseguem buscar conteúdo.',
    hours: 45,
    features: [
      { id: 36, name: 'Tabela de permissões',      area: 'a', hours: 7,  desc: 'Visualização clara de quem pode publicar o quê, ver o quê e cadastrar quem' },
      { id: 37, name: 'Editar permissões por função',area: 'a', hours: 12, desc: 'A APSEABA ajusta o que Fabricante, Técnico, Distribuidor, etc. podem fazer na plataforma' },
      { id: 38, name: 'Moderar publicações',        area: 'a', hours: 8,  desc: 'A APSEABA pode remover ou arquivar publicações inadequadas de qualquer membro' },
      { id: 39, name: 'Ver como outro perfil',      area: 'g', hours: 6,  desc: 'A APSEABA navega como se fosse um Fabricante ou Técnico — para revisar o que cada um vê' },
      { id: 40, name: 'Busca global',               area: 'g', hours: 12, desc: 'Campo de pesquisa no topo — digita uma palavra e encontra publicações, perguntas e membros' },
    ],
  },
  {
    number: 7,
    name: 'Notificações + Mensagens',
    deliver: 'Membros recebem alertas de atividade e podem trocar mensagens privadas dentro da plataforma.',
    hours: 28,
    features: [
      { id: 41, name: 'Notificações',       area: 'g', hours: 12, desc: 'Alerta quando alguém responde sua pergunta, comenta sua publicação ou te menciona' },
      { id: 42, name: 'Mensagens privadas', area: 'g', hours: 16, desc: 'Chat direto entre membros dentro da plataforma — sem precisar sair para WhatsApp' },
    ],
  },
]

const AREA_LABELS: Record<Area, string> = { g: 'Geral', m: 'Membro', a: 'Admin' }

const SERVICES = [
  'Hospedagem — Vercel (servidor da plataforma)',
  'Banco de dados — Vercel Postgres (membros, publicações, perguntas)',
  'Armazenamento de arquivos — Vercel Blob (datasheets, certificados, fotos)',
  'E-mails automáticos — Resend (cadastros, aprovações, notificações)',
  'Certificado de segurança HTTPS — incluso na Vercel',
]

export default function APSEABAPlanPage() {
  const totalHours = PHASES.reduce((s, p) => s + p.hours, 0)
  const totalFeatures = PHASES.reduce((s, p) => s + p.features.length, 0)
  const pricePerPhase = 1_000
  const totalPrice = PHASES.length * pricePerPhase

  const tagClass: Record<Area, string> = {
    g: styles.tagG,
    m: styles.tagM,
    a: styles.tagA,
  }

  return (
    <div className={styles.root}>
      {/* HEADER */}
      <div className={styles.docHeader}>
        <p className={styles.docEyebrow}>APSEABA · Intercâmbio — Planejamento de entregas</p>
        <h1 className={styles.docTitle}>{PHASES.length} fases · ~50 horas cada</h1>
        <p className={styles.docSub}>
          Ordenado por dependência e valor ao cliente. Cada fase entrega algo concreto e utilizável.
        </p>
        <div className={styles.summaryRow}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryVal}>{PHASES.length}</span>
            <span className={styles.summaryLbl}>Fases</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryVal}>{totalFeatures}</span>
            <span className={styles.summaryLbl}>Funcionalidades</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryVal}>{totalHours}</span>
            <span className={styles.summaryLbl}>Horas totais</span>
          </div>
          <div className={`${styles.summaryItem} ${styles.summaryItemGreen}`}>
            <span className={styles.summaryVal}>
              R$&nbsp;{totalPrice.toLocaleString('pt-BR')}
            </span>
            <span className={styles.summaryLbl}>Investimento total</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryVal}>R$&nbsp;50</span>
            <span className={styles.summaryLbl}>Manutenção/mês</span>
          </div>
        </div>
      </div>

      {/* LEGEND */}
      <div className={styles.legend}>
        <span className={styles.legendLabel}>Área</span>
        <span className={styles.legendItem}>
          <span className={`${styles.tag} ${styles.tagG}`}>Geral</span>
          Acesso público e estrutura
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.tag} ${styles.tagM}`}>Membro</span>
          Área dos associados
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.tag} ${styles.tagA}`}>Admin</span>
          Exclusivo APSEABA
        </span>
      </div>

      {/* PHASES */}
      {PHASES.map((phase) => (
        <div key={phase.number} className={styles.phase}>
          <div className={styles.phaseHead}>
            <div className={styles.phaseNum}>{phase.number}</div>
            <div className={styles.phaseMeta}>
              <span className={styles.phaseName}>{phase.name}</span>
              <span className={styles.phaseDeliver}>{phase.deliver}</span>
            </div>
            <div className={styles.phaseRight}>
              <div className={styles.phaseHours}>
                <span className={styles.phaseHoursVal}>{phase.hours}h</span>
                <span className={styles.phaseHoursLbl}>estimado</span>
              </div>
              <span className={styles.phasePrice}>
                R$&nbsp;{pricePerPhase.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
          <div className={styles.tblWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.colN}>#</th>
                  <th>Funcionalidade</th>
                  <th className={styles.colTag}>Área</th>
                  <th className={styles.colHrs}>Horas</th>
                </tr>
              </thead>
              <tbody>
                {phase.features.map((f) => (
                  <tr key={f.id}>
                    <td className={styles.colN}>{f.id}</td>
                    <td>
                      <span className={styles.featName}>{f.name}</span>
                      <span className={styles.featDesc}>{f.desc}</span>
                    </td>
                    <td className={styles.colTag}>
                      <span className={`${styles.tag} ${tagClass[f.area]}`}>
                        {AREA_LABELS[f.area]}
                      </span>
                    </td>
                    <td className={styles.colHrs}>
                      {f.hours}<span className={styles.hrsUnit}>h</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* MAINTENANCE */}
      <div className={styles.maintenance}>
        <div className={styles.maintLeft}>
          <p className={styles.maintLabel}>Manutenção mensal</p>
          <p className={styles.maintTitle}>O que mantém a plataforma no ar</p>
          <p className={styles.maintDesc}>
            Usando os serviços da Vercel, é possível hospedar tudo — servidor, banco de dados,
            arquivos e e-mails — com custo mínimo.
          </p>
          <ul className={styles.maintServices}>
            {SERVICES.map((s) => (
              <li key={s} className={styles.maintService}>{s}</li>
            ))}
          </ul>
        </div>
        <div className={styles.maintPriceBox}>
          <span className={styles.maintPrice}>R$ 50</span>
          <span className={styles.maintPriceUnit}>por mês</span>
          <span className={styles.maintNote}>após a plataforma estar no ar</span>
        </div>
      </div>

      {/* GRAND TOTAL */}
      <div className={styles.grandTotal}>
        <div className={styles.gtLeft}>
          <p className={styles.gtLabel}>Investimento total · {PHASES.length} fases</p>
          <p className={styles.gtSub}>
            {totalHours} horas · R$&nbsp;{pricePerPhase.toLocaleString('pt-BR')} por fase · pagamento fase a fase
          </p>
        </div>
        <div className={styles.gtRight}>
          <div className={styles.gtHours}>{totalHours}<span className={styles.gtUnit}>h</span></div>
          <div className={styles.gtPrice}>
            R$&nbsp;{totalPrice.toLocaleString('pt-BR')} no total
          </div>
        </div>
      </div>
    </div>
  )
}
