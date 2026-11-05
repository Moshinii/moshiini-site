import {
  ArrowUpRightIcon,
  HistoryIcon,
  RocketIcon,
  SparklesIcon,
} from "lucide-react"
import { CtaButton } from "@/components/site/cta-button"
import { Hl } from "@/components/site/hl"
import { PageHead, SectionHead } from "@/components/site/section-head"
import { Badge, type BadgeVariant } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { INVITE_URL, SERVER_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

type ChangeKind = "novo" | "corrigido" | "alterado"

const KIND_STYLE: Record<ChangeKind, { label: string; variant: BadgeVariant }> = {
  novo: { label: "Novo", variant: "mint" },
  corrigido: { label: "Corrigido", variant: "lilac" },
  alterado: { label: "Alterado", variant: "amber" },
}

const RELEASE_VARIANTS: BadgeVariant[] = ["mint", "amber", "lilac", "rose"]

type Change = { kind: ChangeKind; title: string; text: string }

type Release = {
  version: string
  date: string
  title: string
  changes: Change[]
}

const RELEASES: Release[] = [
  {
    version: "5.10.0",
    date: "04/11/2026",
    title: "Loja ativa em 1 clique + sacola em canal privado",
    changes: [
      {
        kind: "novo",
        title: "Quem adiciona o bot vira dono com 1 clique",
        text: "A DM de boas-vindas agora traz o botão “Ativar Minha Loja”: um clique ativa a loja no plano grátis e abre o assistente — sem precisar saber de nenhum comando. Vale pra quem adicionou o bot e pro dono do servidor; membros comuns não passam, e ninguém assume loja de outro (mesma trava do /loja vincular). O botão continua valendo depois de reinícios e também funciona no canal do servidor quando a DM está fechada.",
      },
      {
        kind: "novo",
        title: "Botão “Criar Canais” — o bot monta a estrutura sozinho",
        text: "No assistente de setup (e na Central → Configuração da Loja → Canais), um botão cria as categorias Compras e Suporte + a categoria Logs da Loja com 4 canais privados: logs da loja, entradas e saídas, avaliações e provas de entrega. Nunca sobrescreve canal já configurado, recria o que foi apagado e rodar de novo não duplica nada. Sem a permissão Gerenciar Canais, ele ensina como conceder em vez de falhar calado.",
      },
      {
        kind: "novo",
        title: "Sacola em canal privado, do 1º item até o ticket",
        text: "Ao adicionar o 1º item no painel, o cliente ganha um canal privado “sacola-…” com a sacola viva: adicionar mais produtos pelo menu, editar/remover itens, aplicar cupom e FINALIZAR — tudo no mesmo canal. O checkout dentro do canal o converte no próprio ticket da compra (a equipe é chamada pra lá) — nasce um canal a menos por pedido. Depois de 30 min parado (configurável), o canal avisa e fecha sozinho, e os itens ficam salvos: a sacola reabre intacta na próxima compra. Quem preferir o modo antigo desliga na Central → Configuração da Loja → Carrinho.",
      },
    ],
  },
  {
    version: "5.9.10",
    date: "02/11/2026",
    title: "Clique “Ver Minha Sacola” para de falhar em horário de pico",
    changes: [
      {
        kind: "corrigido",
        title: "Fim do 10062 no botão da sacola",
        text: "Sob carga, a consulta ao banco acontecia antes de confirmar o clique e estourava a janela de 3 segundos do Discord — o cliente clicava e nada acontecia. Agora o clique é confirmado na hora (padrão já usado pelos outros botões do hub), com teste de regressão travando a ordem nos 4 caminhos.",
      },
    ],
  },
  {
    version: "5.9.9",
    date: "01/11/2026",
    title: "Comprovante agora aparece na DM do dono (licença)",
    changes: [
      {
        kind: "corrigido",
        title: "Painel de aprovação chega com a imagem certa",
        text: "O painel de divergência da licença passou a reenviar os bytes do MESMO anexo que a IA validou: imagem renderiza no embed, PDF chega como anexo abrível, e a caducidade da URL do CDN (~24h) não derruba mais a imagem de painéis antigos.",
      },
    ],
  },
  {
    version: "5.9.8",
    date: "28/10/2026",
    title: "Parceria sem conteúdo divulgava casca vazia",
    changes: [
      {
        kind: "corrigido",
        title: "Loja sem “Editar Divulgação” sai do sorteio",
        text: "Ativar a rede só exigia o canal — loja que nunca personalizou o anúncio entrava no sorteio e divulgava conteúdo 100% padrão. Agora o sorteio só escolhe parceiros com título e descrição preenchidos, e o botão Ativar orienta a editar a divulgação antes. Quem recebe continua divulgando os outros normalmente.",
      },
    ],
  },
  {
    version: "5.9.7",
    date: "28/10/2026",
    title: "Moderação por IA na rede de parcerias",
    changes: [
      {
        kind: "novo",
        title: "Anúncio impróprio não entra na rede",
        text: "Antes de um anúncio de parceria ser salvo ou ativado, a IA analisa o texto: conteúdo pornográfico, envolvendo menores, gore, discurso de ódio, drogas ilícitas, fraude/phishing, aposta ilegal ou vulgaridade ofensiva é bloqueado — e nada é guardado. Se a IA estiver fora do ar, a ativação é recusada: nada entra na rede sem passar pela checagem.",
      },
      {
        kind: "novo",
        title: "Botão Prévia do Anúncio",
        text: "Na seção Parcerias, mostra exatamente o embed (conteúdo, cor e imagens) e o botão de link que os outros servidores vão publicar, com um cartão explicativo embaixo. Quem ainda usa o conteúdo padrão do sistema recebe o lembrete pra personalizar.",
      },
    ],
  },
  {
    version: "5.9.6",
    date: "28/10/2026",
    title: "Quem apaga o anúncio da rede agora é advertido",
    changes: [
      {
        kind: "novo",
        title: "3 apagamentos seguidos = saída da rede",
        text: "Ao entrar na rede de parcerias, o servidor aceita divulgar as outras lojas — e agora o bot detecta se o anúncio publicado foi apagado do canal. O 1º e o 2º apagamento geram aviso na DM do dono; o 3º seguido desativa a participação automaticamente, com orientação de como reativar.",
      },
      {
        kind: "novo",
        title: "Punição só pra quem apaga sempre",
        text: "Cada anúncio que permanece no canal reduz a contagem em 1, erro de API não conta strike e reativar pela Central zera a ficha. O Status da seção Parcerias mostra a contagem atual (ex.: 1/3 seguidos).",
      },
    ],
  },
  {
    version: "5.9.5",
    date: "28/10/2026",
    title: "Intervalo das divulgações fixo pelo plano",
    changes: [
      {
        kind: "alterado",
        title: "Vale a faixa do plano",
        text: "Grátis divulga a cada 3–6 h · Premium a cada 2–4 h, sorteado a cada envio. O botão de intervalo personalizado saiu da Central de Administração — e o Status e a home da seção mostram a faixa atual.",
      },
      {
        kind: "corrigido",
        title: "Editar Divulgação abre de primeira",
        text: "O modal rejeitava na abertura por um campo acima do limite do Discord. Agora abre normal — e o embed publicado continua aceitando até 4.096 caracteres.",
      },
    ],
  },
  {
    version: "5.9.4",
    date: "24/10/2026",
    title: "Postar e sincronizar o painel sem erro interno",
    changes: [
      {
        kind: "corrigido",
        title: "Postar/Sincronizar pela Central funciona",
        text: "Postar ou sincronizar o painel pela Central não trava mais com erro interno ao resolver o canal — e canal deletado ou fora do alcance virou uma orientação amigável em vez de erro bruto. O aviso de falta de permissão continua valendo.",
      },
    ],
  },
  {
    version: "5.9.3",
    date: "24/10/2026",
    title: "Todas as provas chegam ao canal de provas",
    changes: [
      {
        kind: "corrigido",
        title: "Entrega com várias fotos, todas publicadas",
        text: "Antes, só a primeira prova ia para o canal de provas. Agora cada prova extra vira um bloco próprio na mesma mensagem, rotulado “Prova X de N” no rodapé pra conferência rápida.",
      },
    ],
  },
  {
    version: "5.9.2",
    date: "24/10/2026",
    title: "Estabilidade: loja lisa mesmo em horário de pico",
    changes: [
      {
        kind: "corrigido",
        title: "Fim do “database is locked” em cascata",
        text: "O contador de mensagens parou de gravar no banco a cada mensagem do chat — a maior fonte de escritas do bot. Agora acumula em memória e grava um lote único a cada 30 segundos: sob tráfego alto, nada de carrinho travado ou compra falhando por banco saturado.",
      },
      {
        kind: "corrigido",
        title: "Clique no produto mais rápido",
        text: "A abertura de compra consolidou três consultas em uma ida só ao banco, dentro da janela de resposta do Discord. Se a interação expirar mesmo assim, o bot registra um aviso limpo em vez de estourar erro duplicado.",
      },
    ],
  },
  {
    version: "5.9.1",
    date: "22/10/2026",
    title: "Troque o modelo de IA sem reiniciar",
    changes: [
      {
        kind: "novo",
        title: "Seção Modelo & API da IA na Central do Dono",
        text: "Em /painel_dono, troque o modelo de IA, a URL do provedor e a chave em runtime — sem restart e sem tocar em arquivo de configuração. O botão “Restaurar Padrão” volta à configuração original na hora.",
      },
    ],
  },
  {
    version: "5.9.0",
    date: "20/10/2026",
    title: "Licença Premium ativa sozinha (e tem botão de desfazer)",
    changes: [
      {
        kind: "novo",
        title: "Comprovante da licença validado por IA",
        text: "Pague o PIX, clique em “Já Paguei” e envie o comprovante na DM do bot. Conferidos valor, destinatário, data e o identificador da cobrança, a licença ativa em segundos, sem esperar aprovação. Qualquer divergência cai no fluxo manual de sempre — com a análise da IA anexada, campo a campo.",
      },
      {
        kind: "novo",
        title: "Remover Assinatura na Central do Dono",
        text: "Com confirmação e mesmo efeito da expiração natural: a loja volta ao plano Gratuito, as funções de IA desligam e nada é apagado — renovar religa tudo. É o desfazer pra o caso de a IA aceitar um comprovante errado.",
      },
    ],
  },
]

const OLDER_RELEASES = [
  { version: "5.8.0", date: "20/10", text: "IA de edição por texto e leitor de comprovante viram recurso de toda loja Premium." },
  { version: "5.7.0", date: "20/10", text: "Administração por menção cobre produto e painel inteiros, não só estoque." },
  { version: "5.6.6", date: "20/10", text: "Leitor de comprovante aceita PDF (até 3 páginas)." },
  { version: "5.6.5", date: "20/10", text: "Cada servidor escolhe o prazo do kick da verificação — de 1 hora a nunca." },
  { version: "5.6.4", date: "18/10", text: "Preço com centavo quebrado (ex.: R$ 0,045) e estoque grande aparecem formatados certo." },
  { version: "5.6.0", date: "09/10", text: "“Criar loja com IA”, downgrade gracioso do Premium e verificação restart-safe." },
  { version: "5.5.0", date: "29/09", text: "Supervisor religa o bot sozinho após crash, logs persistentes e snapshot diário do banco." },
]

export function NovidadesPage() {
  return (
    <>
      <PageHead
        kicker={
          <>
            <SparklesIcon />
            Novidades
          </>
        }
        kickerVariant="amber"
        title={
          <>
            O que mudou na <Hl tone="mint">Moshiini</Hl>
          </>
        }
        lede="Do mais recente pro mais antigo. As atualizações aparecem sozinhas no bot — nada pra reinstalar ou configurar de novo."
      />

      {/* ---------- VERSÕES RECENTES ---------- */}
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14" aria-label="Versões recentes">
        <ol className="flex flex-col gap-8">
          {RELEASES.map((release, i) => (
            <li key={release.version}>
              <Card
                hoverable
                className={cn(
                  "flex flex-col gap-5 p-6 sm:p-8",
                  "tilt tilt-hover",
                  i % 2 === 0 ? "tilt-l-sm" : "tilt-r-sm"
                )}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={RELEASE_VARIANTS[i % RELEASE_VARIANTS.length]}>
                    v{release.version}
                  </Badge>
                  <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl">
                    {release.title}
                  </h2>
                  <time className="ml-auto text-sm text-muted-foreground" dateTime={release.date.slice(-4) + "-" + release.date.slice(3, 5) + "-" + release.date.slice(0, 2)}>
                    {release.date}
                  </time>
                </div>

                <ul className="flex flex-col gap-4">
                  {release.changes.map((change) => (
                    <li key={change.title} className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-2">
                        <Badge variant={KIND_STYLE[change.kind].variant} className="text-[11px]">
                          {KIND_STYLE[change.kind].label}
                        </Badge>
                        <strong className="font-display text-base sm:text-lg">{change.title}</strong>
                      </span>
                      <p className="leading-relaxed text-muted-foreground">{change.text}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- VERSÕES ANTERIORES ---------- */}
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14" aria-labelledby="anteriores">
        <SectionHead
          align="start"
          kicker={
            <>
              <HistoryIcon />
              Versões anteriores
            </>
          }
          kickerVariant="lilac"
          title="Antes disso"
          lede="Os destaques das versões que já estão no ar há um tempinho."
          className="mb-8"
        />
        <ul className="flex flex-col gap-3">
          {OLDER_RELEASES.map((release) => (
            <li key={release.version}>
              <Card hoverable className="flex flex-wrap items-center gap-x-3 gap-y-1 p-4 sm:p-5">
                <Badge variant="default">v{release.version}</Badge>
                <span className="text-sm text-muted-foreground">{release.date}</span>
                <span className="w-full leading-relaxed sm:w-auto sm:flex-1">{release.text}</span>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-4xl px-5 pt-6 pb-4 sm:px-6" aria-labelledby="cta">
        <div className="neo-card bg-amber p-8 text-center sm:p-12">
          <span
            aria-hidden
            className="mx-auto grid size-12 place-items-center rounded-2xl border-[3px] border-night-soft bg-white shadow-[3px_3px_0_var(--color-night-soft)]"
          >
            <RocketIcon className="size-6" />
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl sm:text-4xl">
            Bora testar as novidades na prática?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-night-soft/80">
            Adicione a Moshiini ao seu servidor e monte sua loja grátis — as
            funções novas já vêm ligadas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href={INVITE_URL} variant="night">
              Adicionar ao Discord
            </CtaButton>
            <a
              href={SERVER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-display font-semibold text-night-soft underline underline-offset-4 outline-none hover:text-blurple"
            >
              Entrar no servidor oficial
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
