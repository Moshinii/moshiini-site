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
import {
  CENTRAL_SECTIONS,
  COMMAND_GROUPS,
  LIMITS,
  OWNER_SECTIONS,
  PANELS_NOTE,
  TAGS,
  TOTAL_COMANDOS,
} from "@/lib/commands"
import type { Command, Tag } from "@/lib/commands"
import { INVITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

/* ---------- estilo visual por tag (variante do Badge) ---------- */

const TAG_STYLES: Record<Tag, BadgeVariant> = {
  TODOS: "mint",
  "GERENTE+": "amber",
  "DONO DO SERV": "lilac",
  "DONO DO BOT": "night",
}

/* ---------- ícone lucide por grupo (id → ícone) ---------- */

const GROUP_ICONS = {
  compras: StoreIcon,
  "cupons-sorteios": MegaphoneIcon,
  convites: UsersIcon,
  trocas: ShieldCheckIcon,
  geral: BookOpenIcon,
  paineis: LayoutGridIcon,
  planos: CrownIcon,
  "dono-do-bot": ShieldCheckIcon,
} as const

/* ---------- tom pastel dos limites (ciclo mint/amber/lilac/rose, como o StepCard) ---------- */

const LIMIT_TONES = ["hl-mint", "hl-amber", "hl-lilac", "hl-rose"] as const

function CommandCard({ cmd, index }: { cmd: Command; index: number }) {
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
        <Badge variant={TAG_STYLES[cmd.tag]}>{TAGS[cmd.tag].label}</Badge>
      </div>
      <p className="leading-relaxed text-muted-foreground">{cmd.desc}</p>
      {cmd.fluxo ? (
        <ol className="flex flex-col gap-2">
          {cmd.fluxo.map((passo, i) => (
            <li
              key={passo}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
            >
              <span
                aria-hidden
                className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-[3px] border-night-soft bg-white font-display text-xs font-bold tabular-nums text-night-soft"
              >
                {i + 1}
              </span>
              <span>{passo}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {cmd.exemplo ? (
        <p className="mt-auto text-sm text-muted-foreground">
          <span className="font-display font-semibold text-night-soft">Exemplo: </span>
          {cmd.exemplo}
        </p>
      ) : null}
      {cmd.nota ? (
        <p className="rounded-xl border-[3px] border-dashed border-night-soft/40 p-3 text-sm leading-relaxed text-muted-foreground">
          <span className="font-display font-semibold text-night-soft">Vale saber: </span>
          {cmd.nota}
        </p>
      ) : null}
    </Card>
  )
}

export function DocsPage() {
  const [query, setQuery] = useState("")
  const searching = query.trim().length > 0

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMAND_GROUPS
    return COMMAND_GROUPS.map((group) => ({
      ...group,
      commands: group.commands.filter((cmd) =>
        [cmd.name, cmd.desc, cmd.exemplo ?? "", cmd.nota ?? "", cmd.tag, group.title]
          .join(" ")
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
        lede={`Referência completa dos ${TOTAL_COMANDOS} comandos de barra, organizada por público e permissão. Os comandos de gestão do dia a dia viraram botões na Central — aqui ficam os que abrem portas.`}
      />

      {/* ---------- NAV + BUSCA + TAGS ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-4 pb-2 sm:px-6" aria-label="Busca e permissões">
        {!searching ? (
          <nav aria-label="Categorias de comandos" className="mb-8">
            <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:px-0 sm:pb-0">
              {COMMAND_GROUPS.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="neo-pill shrink-0 transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-night-soft)]"
                >
                  {group.title}
                </a>
              ))}
            </div>
          </nav>
        ) : null}

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
          {(Object.keys(TAGS) as Tag[]).map((tag) => (
            <Card key={tag} className="flex items-center gap-3 p-4">
              <Badge variant={TAG_STYLES[tag]}>{TAGS[tag].label}</Badge>
              <p className="text-sm leading-snug text-muted-foreground">{TAGS[tag].desc}</p>
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
          filtered.map((group) => {
            const GroupIcon =
              GROUP_ICONS[group.id as keyof typeof GROUP_ICONS] ?? BookOpenIcon
            return (
              <div key={group.id} className="mb-14 last:mb-0">
                <div className="mb-6 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="grid size-12 shrink-0 place-items-center rounded-2xl border-[3px] border-night-soft bg-amber shadow-[3px_3px_0_var(--color-night-soft)]"
                  >
                    <GroupIcon className="size-6" />
                  </span>
                  <div>
                    <h2 id={group.id} className="scroll-mt-28 text-2xl sm:text-3xl">
                      {group.title}
                    </h2>
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
            )
          })
        )}
      </section>

      {/* ---------- LIMITES E COOLDOWNS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6" aria-label="Limites e cooldowns">
        <SectionHead
          align="start"
          kicker="Limites"
          kickerVariant="rose"
          title="Limites e cooldowns"
          lede="De quanto em quanto tempo o bot deixa cada coisa acontecer — intervalos e cotas pra proteger o servidor sem travar o dia a dia."
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {LIMITS.map((limit, i) => (
            <Card
              key={limit.label}
              hoverable
              className={cn(
                "flex h-full flex-col gap-2 p-5",
                "tilt tilt-hover",
                i % 2 === 0 ? "tilt-l-sm" : "tilt-r-sm"
              )}
            >
              <span
                className={cn(
                  "hl w-fit rotate-none font-display text-2xl font-bold tabular-nums",
                  LIMIT_TONES[i % LIMIT_TONES.length]
                )}
              >
                {limit.value}
              </span>
              <p className="mt-1 font-display text-lg font-semibold">{limit.label}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{limit.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- DENTRO DOS PAINÉIS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6" aria-labelledby="dentro-dos-paineis">
        <SectionHead
          align="start"
          kicker="Dentro dos painéis"
          kickerVariant="amber"
          title="A Central de Administração, seção por seção"
          lede={`É aqui que fica a gestão inteira: ${CENTRAL_SECTIONS.length} seções, cada uma com botões, menus e modais na mesma mensagem, sempre com Voltar.`}
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
            Só o dono da Moshiini abre. São {OWNER_SECTIONS.length} seções separadas
            da equipe da loja:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {OWNER_SECTIONS.map((sec, i) => (
              <div
                key={sec.name}
                className={cn(
                  "rounded-2xl border-[3px] border-white/25 bg-white/5 p-4",
                  i === OWNER_SECTIONS.length - 1 &&
                    OWNER_SECTIONS.length % 2 === 1 &&
                    "sm:col-span-2"
                )}
              >
                <h4 className="font-display text-lg font-semibold text-mint">
                  {sec.name}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-white/75">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <Card className="mt-6 border-dashed p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-display font-semibold text-night-soft">Vale saber:</span>{" "}
            {PANELS_NOTE}
          </p>
        </Card>
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
