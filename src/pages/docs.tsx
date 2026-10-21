import { useMemo, useState } from "react"
import {
  BookOpenIcon,
  CrownIcon,
  LayoutGridIcon,
  MegaphoneIcon,
  SearchIcon,
  ShieldCheckIcon,
  StoreIcon,
  UsersIcon,
} from "lucide-react"
import { CtaButton } from "@/components/site/cta-button"
import { Hl } from "@/components/site/hl"
import { PageHead, SectionHead } from "@/components/site/section-head"
import { Badge } from "@/components/ui/badge"
import type { BadgeVariant } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { INVITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

type Tag = "TODOS" | "GERENTE+" | "DONO DO SERV" | "DONO DO BOT"

type Command = {
  name: string
  tag: Tag
  desc: string
  exemplo?: string
}

type CommandGroup = {
  id: string
  icon: typeof UsersIcon
  title: string
  intro: string
  commands: Command[]
  note?: string
}

const TAG_STYLES: Record<Tag, { label: string; variant: BadgeVariant }> = {
  TODOS: { label: "Todos", variant: "mint" },
  "GERENTE+": { label: "Gerente+", variant: "amber" },
  "DONO DO SERV": { label: "Dono do servidor", variant: "lilac" },
  "DONO DO BOT": { label: "Dono do bot", variant: "night" },
}

const GROUPS: CommandGroup[] = [
  {
    id: "compras",
    icon: StoreIcon,
    title: "Compras e sua conta",
    intro: "Comandos que qualquer membro usa pra ver produtos, sacola, histórico e gastos.",
    commands: [
      {
        name: "/ajuda",
        tag: "TODOS",
        desc: "Central de Ajuda interativa: botões por categoria com todos os comandos e as tags de permissão.",
        exemplo: "/ajuda → toca em “Comprar”",
      },
      {
        name: "/minha_loja",
        tag: "TODOS",
        desc: "Seu hub pessoal com botões: Ver Sacola, Histórico, Gasto Total e Cupons.",
        exemplo: "/minha_loja → Ver Sacola",
      },
      {
        name: "/loja top",
        tag: "TODOS",
        desc: "Ranking dos maiores compradores do servidor.",
      },
      {
        name: "/loja meugasto",
        tag: "TODOS",
        desc: "Mostra quanto você já gastou e o que falta pro próximo cargo de recompensa.",
        exemplo: "“faltam R$ 50 pro cargo Comprador”",
      },
      {
        name: "/loja robux calcular_robux",
        tag: "TODOS",
        desc: "Conversão entre R$ e Robux, com ou sem a taxa de 30% do Roblox.",
        exemplo: "informe 100 R$ e escolha “com taxa”",
      },
    ],
  },
  {
    id: "cupons-sorteios",
    icon: MegaphoneIcon,
    title: "Cupons e sorteios",
    intro: "Mensagens contam como moeda de participação.",
    commands: [
      {
        name: "/cupom resgatar",
        tag: "TODOS",
        desc: "Roleta de cupons: gasta as mensagens acumuladas pra tentar a sorte.",
      },
      {
        name: "/cupom meuscupons",
        tag: "TODOS",
        desc: "Lista seus cupons disponíveis (os ainda não usados).",
      },
      {
        name: "/sorteio minhasmensagens",
        tag: "TODOS",
        desc: "Seu saldo de mensagens pra participar de sorteios com requisito.",
      },
    ],
  },
  {
    id: "convites",
    icon: UsersIcon,
    title: "Convites com recompensa",
    intro: "Um convite ativo por vez, com ciclo e meta configuráveis pela loja.",
    note: "Fluxo: /convite criar → compartilhe o link → bateu a meta, chega uma DM avisando → /convite resgatar abre ticket com a staff e o ciclo encerra (aí já pode criar outro).",
    commands: [
      {
        name: "/convite criar",
        tag: "TODOS",
        desc: "Gera seu link de convite rastreado. Cada entrada pelo link soma +1 no seu contador.",
      },
      {
        name: "/convite status",
        tag: "TODOS",
        desc: "Recupera o link do seu convite ativo e o progresso do ciclo.",
        exemplo: "“3/5 convites”",
      },
      {
        name: "/convite resgatar",
        tag: "TODOS",
        desc: "Abre um ticket pra receber a recompensa ao bater a meta (com cargo automático, se a loja configurou).",
      },
      {
        name: "/convite ranking",
        tag: "TODOS",
        desc: "Top 10 convidadores do servidor.",
      },
    ],
  },
  {
    id: "trocas",
    icon: ShieldCheckIcon,
    title: "Trocas com middleman",
    intro: "Troca segura entre membros, com ticket privado e recibo assinado digitalmente.",
    note: "O convite de troca chega na DM da pessoa e expira em 15 minutos. Guarde o recibo: ele prova a autenticidade da troca.",
    commands: [
      {
        name: "/trocar enviar",
        tag: "TODOS",
        desc: "Convida alguém pra uma troca com middleman (MM).",
        exemplo: "/trocar enviar → escolhe a pessoa",
      },
      {
        name: "/trocar aceitar",
        tag: "TODOS",
        desc: "Aceita a troca e abre o ticket privado dos dois lados.",
      },
      {
        name: "/trocar verificar",
        tag: "TODOS",
        desc: "Valida a assinatura digital de um recibo anti-fraude.",
        exemplo: "anexe o recibo → o bot confirma a autenticidade",
      },
    ],
  },
  {
    id: "geral",
    icon: BookOpenIcon,
    title: "Status e sugestões",
    intro: "Transparência do bot e canal direto com quem desenvolve.",
    commands: [
      {
        name: "/status_publico",
        tag: "TODOS",
        desc: "Resumo público do bot: servidores, membros e vendas (só números agregados).",
      },
      {
        name: "/sugestao",
        tag: "TODOS",
        desc: "Envia uma sugestão direto pro dono do bot (uma a cada 24h).",
        exemplo: "“adiciona pagamento via cartão”",
      },
    ],
  },
  {
    id: "paineis",
    icon: LayoutGridIcon,
    title: "Painéis de gestão",
    intro: "Os pontos de entrada da gestão. Todo o resto é botão, menu e modal dentro do painel.",
    commands: [
      {
        name: "/painel_admin abrir",
        tag: "GERENTE+",
        desc: "Abre a Central de Administração na forma efêmera (só você vê).",
        exemplo: "/painel_admin abrir → toca em “Produtos”",
      },
      {
        name: "/painel_admin fixo",
        tag: "GERENTE+",
        desc: "Posta a Central fixa num canal. Sobrevive a reinícios do bot e nunca expira.",
        exemplo: "/painel_admin fixo → escolhe #gestão",
      },
      {
        name: "/painel_dono abrir",
        tag: "DONO DO BOT",
        desc: "Abre o Painel Exclusivo do dono do bot. Gerentes e admins de loja nem veem que existe.",
      },
    ],
  },
  {
    id: "planos",
    icon: CrownIcon,
    title: "Planos da loja",
    intro: "Só o dono do servidor ativa a loja e mexe na licença.",
    commands: [
      {
        name: "/loja vincular",
        tag: "DONO DO SERV",
        desc: "Ativa a loja de graça, no plano Gratuito, sem taxa. Só o dono do servidor consegue.",
      },
      {
        name: "/loja plano",
        tag: "DONO DO SERV",
        desc: "Mostra o plano atual, o uso dos limites e dívidas antigas do modelo de comissão.",
        exemplo: "“3/5 produtos, 1/2 painéis”",
      },
      {
        name: "/loja mudardeplano",
        tag: "DONO DO SERV",
        desc: "Compra ou renova a licença Premium (R$ 0,50/dia). Paga o PIX na DM e envia o comprovante: a IA valida e a licença ativa na hora — se algo divergir, o dono do bot aprova manualmente.",
        exemplo: "30 dias · R$ 15,00 → comprovante → ativada em segundos",
      },
    ],
    note: "Fora dos comandos: no plano Premium, o dono menciona o bot (@Moshiini) e edita a loja escrevendo em português — preço, estoque, status, renomear, descrição e painéis. Perguntas sobre a loja também funcionam.",
  },
  {
    id: "dono-do-bot",
    icon: ShieldCheckIcon,
    title: "Administração do bot",
    intro: "Ferramentas do dono da Moshiini: bloqueios de suporte e sugestões.",
    commands: [
      {
        name: "/modmail_admin bloquear",
        tag: "DONO DO BOT",
        desc: "Impede um usuário de abrir tickets de modmail.",
      },
      {
        name: "/modmail_admin desbloquear",
        tag: "DONO DO BOT",
        desc: "Libera os tickets de modmail do usuário.",
      },
      {
        name: "/sugestao_admin bloquear",
        tag: "DONO DO BOT",
        desc: "Impede um usuário de enviar sugestões.",
      },
      {
        name: "/sugestao_admin desbloquear",
        tag: "DONO DO BOT",
        desc: "Libera as sugestões do usuário.",
      },
    ],
    note: "Cirúrgico e rápido: o dia a dia dessas áreas fica no /painel_dono. Existe ainda o /testar_bot, que só carrega em ambiente de testes e nunca em produção.",
  },
]

const CENTRAL_SECTIONS = [
  { name: "Produtos", desc: "Adicionar (modal), editar, ativar/desativar, excluir e limiar de estoque com aviso automático." },
  { name: "Painéis", desc: "Criar, ligar/desligar produtos, editar textos, banner e cor, dar nome próprio às opções e postar o painel." },
  { name: "Configuração da Loja", desc: "PIX criptografado, canais de log/provas/carrinho/tickets, campo de entrega, cargo de cliente, termos e auto-close do carrinho." },
  { name: "Verificação", desc: "Canal e cargo da verificação com captcha por DM, e postagem do painel de verificar." },
  { name: "Cargos & Auxiliares", desc: "Cargo de suporte, canais ignorados na contagem e recompensas por gasto." },
  { name: "Backup de Imagens", desc: "Destino das imagens das transcrições e provas: site FreeImage.host, canal do Discord ou ambos, com teste de envio." },
  { name: "Cupons", desc: "Cupom público ou de sorteio, com vínculo a produto, quantidade mínima, modo “leva tudo” e auto-aplicar." },
  { name: "Sorteios & Convites", desc: "Criar e gerenciar sorteios com requisito de cargo/mensagens e configurar o sistema de convites." },
  { name: "Segurança & Honeypot", desc: "Ativar a armadilha anti-hack, ver status e bans, e desbanir usuários." },
  { name: "Manutenção & Relatórios", desc: "Estatísticas de vendas, exportar CSV, diagnóstico da loja e backup/restauração (isso pede administrador)." },
  { name: "Mensagens", desc: "Escrever um embed com título, descrição, imagens, cor e rodapé, com preview antes de enviar no canal." },
]

const OWNER_SECTIONS = [
  { name: "Licenças & Equipe", desc: "Cobrança de licença via PIX (com validação automática por IA), gerentes de loja por servidor, bloqueio de lojas, definir/verificar licenças, remover assinatura (desfaz uma ativação automática) e aviso geral." },
  { name: "Modmail", desc: "Bloquear/desbloquear usuário e definir a categoria dos tickets de suporte." },
  { name: "Ações Globais", desc: "Limpar lojas inativas (30+ dias), remover um cargo de todos os membros, DM pra todos (com confirmação) e status global." },
  { name: "Sincronizar Comandos", desc: "Reenvia a lista de comandos ao Discord, útil quando comando novo demora a aparecer." },
]

function CommandCard({ cmd, index }: { cmd: Command; index: number }) {
  const tag = TAG_STYLES[cmd.tag]
  return (
    <Card
      hoverable
      className={cn(
        "flex h-full flex-col gap-3 p-5",
        "tilt tilt-hover",
        index % 2 === 0 ? "tilt-l-sm" : "tilt-r-sm"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <code className="cmd-chip">{cmd.name}</code>
        <Badge variant={tag.variant}>{tag.label}</Badge>
      </div>
      <p className="leading-relaxed text-muted-foreground">{cmd.desc}</p>
      {cmd.exemplo ? (
        <p className="mt-auto text-sm text-muted-foreground">
          <span className="font-display font-semibold text-night-soft">Exemplo: </span>
          {cmd.exemplo}
        </p>
      ) : null}
    </Card>
  )
}

export function DocsPage() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return GROUPS
    return GROUPS.map((group) => ({
      ...group,
      commands: group.commands.filter((cmd) =>
        `${cmd.name} ${cmd.desc} ${cmd.exemplo ?? ""} ${cmd.tag}`
          .toLowerCase()
          .includes(q)
      ),
    })).filter((group) => group.commands.length > 0)
  }, [query])

  return (
    <>
      <PageHead
        kicker="Docs"
        kickerVariant="blurple"
        title={
          <>
            Todos os comandos da <Hl tone="mint">Moshiini</Hl>
          </>
        }
        lede="Referência completa dos 27 comandos de barra, organizada por público e permissão. Os comandos de gestão do dia a dia viraram botões na Central — aqui ficam os que abrem portas."
      />

      {/* ---------- BUSCA + TAGS ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-4 pb-2 sm:px-6" aria-label="Busca e permissões">
        <div className="mx-auto max-w-2xl">
          <label htmlFor="busca-comandos" className="sr-only">
            Buscar comando
          </label>
          <div className="relative">
            <input
              id="busca-comandos"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar comando… ex.: cupom, trocar, painel"
              className="neo-input pr-12"
              autoComplete="off"
            />
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-5 size-5 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(TAG_STYLES) as Tag[]).map((tag) => (
            <Card key={tag} className="flex items-center gap-3 p-4">
              <Badge variant={TAG_STYLES[tag].variant}>{TAG_STYLES[tag].label}</Badge>
              <p className="text-sm leading-snug text-muted-foreground">
                {tag === "TODOS" && "Qualquer membro do servidor pode usar."}
                {tag === "GERENTE+" && "Dono do servidor, admins ou gerentes da loja (nível 1+)."}
                {tag === "DONO DO SERV" && "Somente o dono do servidor."}
                {tag === "DONO DO BOT" && "Somente o dono da Moshiini."}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Dentro do Discord, a tag aparece na descrição de cada comando — e os
          comandos de gestão só aparecem pra quem pode usá-los.
        </p>
      </section>

      {/* ---------- COMANDOS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6" aria-label="Lista de comandos">
        {filtered.length === 0 ? (
          <Card className="mx-auto max-w-xl p-8 text-center">
            <p className="font-display text-xl font-semibold">
              Nenhum comando encontrado
            </p>
            <p className="mt-2 text-muted-foreground">
              Tenta buscar por “cupom”, “pix”, “painel”… ou confira a lista
              completa abaixo limpando a busca.
            </p>
          </Card>
        ) : (
          filtered.map((group) => (
            <div key={group.id} className="mb-14">
              <div className="mb-6 flex items-center gap-4">
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-2xl border-[3px] border-night-soft bg-amber shadow-[3px_3px_0_var(--color-night-soft)]"
                >
                  <group.icon className="size-6" />
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl">{group.title}</h2>
                  <p className="text-muted-foreground">{group.intro}</p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.commands.map((cmd, i) => (
                  <CommandCard key={cmd.name} cmd={cmd} index={i} />
                ))}
              </div>
              {group.note ? (
                <Card className="mt-6 border-dashed p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-display font-semibold text-night-soft">
                      Vale saber:
                    </span>{" "}
                    {group.note}
                  </p>
                </Card>
              ) : null}
            </div>
          ))
        )}
      </section>

      {/* ---------- DENTRO DOS PAINÉIS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6" aria-labelledby="dentro-dos-paineis">
        <SectionHead
          align="start"
          kicker="Dentro dos painéis"
          kickerVariant="amber"
          title="A Central de Administração, seção por seção"
          lede="É aqui que fica a gestão inteira: cada seção abre botões, menus e modais na mesma mensagem, sempre com Voltar."
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CENTRAL_SECTIONS.map((sec, i) => (
            <Card
              key={sec.name}
              hoverable
              className={cn(
                "flex h-full flex-col gap-2 p-5",
                "tilt tilt-hover",
                i % 3 === 0 && "tilt-l-sm",
                i % 3 === 2 && "tilt-r-sm"
              )}
            >
              <h3 className="font-display text-xl font-semibold">{sec.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{sec.desc}</p>
            </Card>
          ))}
        </div>

        <div className="neo-card mt-12 bg-night p-6 text-white sm:p-8">
          <h3 className="font-display text-2xl font-semibold">
            E dentro do Painel do Dono
          </h3>
          <p className="mt-1 text-white/70">
            Só o dono da Moshiini abre. São 4 seções separadas da equipe da loja:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {OWNER_SECTIONS.map((sec) => (
              <div
                key={sec.name}
                className="rounded-2xl border-[3px] border-white/25 bg-white/5 p-4"
              >
                <h4 className="font-display text-lg font-semibold text-mint">
                  {sec.name}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-white/75">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-6 pb-4 sm:px-6" aria-labelledby="cta">
        <div className="neo-card bg-lilac p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl">
            Agora é só chamar a Moshiini pro seu servidor
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-night-soft/80">
            Adicione o bot, rode /loja vincular e use esta página de referência
            sempre que bater a dúvida.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton href={INVITE_URL} variant="night">
              Adicionar ao Discord
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  )
}
