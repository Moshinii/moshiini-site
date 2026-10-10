import {
  BellRingIcon,
  BotIcon,
  GiftIcon,
  KeyRoundIcon,
  LayoutGridIcon,
  MessagesSquareIcon,
  PackagePlusIcon,
  RepeatIcon,
  ShieldCheckIcon,
  StoreIcon,
  UserCheckIcon,
} from "lucide-react"
import { CtaButton } from "@/components/site/cta-button"
import { Hl } from "@/components/site/hl"
import { PageHead, SectionHead } from "@/components/site/section-head"
import { StepCard } from "@/components/site/step-card"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { INVITE_URL, asset } from "@/lib/site"
import { cn } from "cn"

const SELLER_STEPS = [
  {
    icon: BotIcon,
    title: "Adicione o bot",
    text: "Use o link de convite e conceda a permissão de Administrador: o bot precisa dela pra criar canais, cargos e os tickets de entrega.",
  },
  {
    icon: StoreIcon,
    title: "Ative a loja grátis",
    text: "Digite /loja vincular no seu servidor. A loja nasce na hora, no plano Gratuito, sem taxa e sem burocracia.",
  },
  {
    icon: KeyRoundIcon,
    title: "Cadastre o PIX",
    text: "Na Central (/painel_admin) → Configuração da Loja → PIX. A chave é criptografada antes de ser salva.",
  },
  {
    icon: MessagesSquareIcon,
    title: "Defina os canais",
    text: "Na mesma seção, escolha os canais de log, de provas, de carrinho e a categoria onde os tickets abrem.",
  },
  {
    icon: PackagePlusIcon,
    title: "Cadastre os produtos",
    text: "Na seção Produtos: nome, preço, estoque e descrição. Ou aperte ✨ Criar com IA e só revise o rascunho.",
  },
  {
    icon: LayoutGridIcon,
    title: "Poste o painel e fixe a Central",
    text: "Na seção Painéis, publique o painel no canal da loja. Depois, /painel_admin fixo deixa a gestão presa num canal, 100% por botões.",
  },
]

const BUYER_STEPS = [
  {
    title: "Abra o painel da loja",
    text: "Ele fica postado no canal de compras do servidor, com os produtos num menu suspenso.",
  },
  {
    title: "Escolha o produto",
    text: "Botões de Comprar e calculadora embutida: veja o valor exato antes de se comprometer.",
  },
  {
    title: "Monte a sacola",
    text: "Ajuste quantidades, remova itens e aplique cupom de desconto, se tiver um.",
  },
  {
    title: "Pague no PIX",
    text: "Ao finalizar, um ticket privado abre com o QR Code da cobrança. O pagamento vai direto pra chave da loja.",
  },
  {
    title: "Receba e avalie",
    text: "Envie o comprovante no ticket, a staff confirma e entrega ali mesmo. No fim, avalie o atendimento com estrelas.",
  },
]

const EXTRAS = [
  { icon: UserCheckIcon, label: "Verificação por captcha" },
  { icon: ShieldCheckIcon, label: "Honeypot anti-hack" },
  { icon: RepeatIcon, label: "Trocas com middleman" },
  { icon: BellRingIcon, label: "Lembretes de licença" },
  { icon: MessagesSquareIcon, label: "Modmail de suporte" },
  { icon: GiftIcon, label: "Cupons e sorteios" },
]

export function ComoFuncionaPage() {
  return (
    <>
      <PageHead
        kicker="Como funciona"
        kickerVariant="lilac"
        title={
          <>
            Do convite à primeira venda em <Hl tone="mint">10 minutos</Hl>
          </>
        }
        lede="A configuração é feita uma única vez pelo dono do servidor, tudo por botões e menus dentro da Central de Administração. Depois disso, a loja vende sozinha."
      />

      {/* ---------- PARA QUEM VENDE ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20" aria-labelledby="vender">
        <SectionHead
          align="start"
          kicker="Para quem vende"
          kickerVariant="mint"
          title="Configure a loja em 6 passos"
          lede="Funciona no celular e no PC. Cada passo acontece dentro da Central de Administração (/painel_admin)."
          className="mb-10"
        />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SELLER_STEPS.map((step, i) => (
            <li key={step.title}>
              <Card
                hoverable
                className={cn(
                  "flex h-full flex-col gap-4 p-6",
                  "tilt tilt-hover",
                  i % 3 === 0 && "tilt-l-sm",
                  i % 3 === 2 && "tilt-r-sm"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-full border-[3px] border-night-soft bg-primary font-display text-lg font-bold shadow-[3px_3px_0_var(--color-night-soft)]"
                  >
                    {i + 1}
                  </span>
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-2xl border-[3px] border-night-soft bg-white shadow-[3px_3px_0_var(--color-night-soft)]"
                  >
                    <step.icon className="size-5" />
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-balance">{step.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>

        <Card hoverable className="mt-8 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
          <Badge variant="amber">Dica</Badge>
          <p className="leading-relaxed text-muted-foreground">
            A Central fixa <span className="font-semibold text-night-soft">nunca expira</span>:
            sobrevive a reinícios do bot e funciona pra sempre. Perfeita pra
            administrar a loja pelo celular, sem digitar nada.
          </p>
        </Card>
      </section>

      {/* ---------- IA ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20" aria-labelledby="ia-setup">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <figure className="tilt tilt-l tilt-hover order-last lg:order-first">
            <div className="rounded-2xl border-[3px] border-night-soft bg-white p-2 shadow-[6px_6px_0_var(--color-night-soft)]">
              <img
                src={asset("images/ia-modal.png")}
                alt="Modal 'Criar loja com IA' no Discord, com a descrição da loja preenchida pedindo um painel de Robux"
                width={478}
                height={357}
                loading="lazy"
                className="w-full rounded-xl border-2 border-night/10"
              />
            </div>
          </figure>
          <div className="flex flex-col items-start gap-5">
            <Badge variant="lilac">Atalho com IA</Badge>
            <h2 className="text-3xl sm:text-4xl">
              Sem paciência pra cadastrar? <Hl tone="lilac">Descreva e pronto</Hl>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Na Central → Produtos → ✨ Criar com IA, escreva algo como
              “loja de Robux: 1.000 Robux por R$ 30, estoque de 20 mil”. A IA
              monta o painel e os produtos como rascunho — você revisa, edita e
              publica quando quiser.
            </p>
            <ul className="flex flex-wrap gap-2">
              <li className="neo-pill">3 gerações/dia no Gratuito</li>
              <li className="neo-pill">10 gerações/dia no Premium</li>
              <li className="neo-pill">Editar não gasta geração</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- PARA QUEM COMPRA ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20" aria-labelledby="comprar">
        <SectionHead
          align="start"
          kicker="Para quem compra"
          kickerVariant="rose"
          title={
            <>
              A compra inteira <Hl tone="amber">sem sair do Discord</Hl>
            </>
          }
          lede="O fluxo é o mesmo no celular e no PC: menu suspenso, botões e um ticket privado no final."
          className="mb-10"
        />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {BUYER_STEPS.map((step, i) => (
            <li key={step.title}>
              <StepCard n={i + 1} title={step.title} className="h-full">
                {step.text}
              </StepCard>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- EXTRAS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20" aria-labelledby="extras">
        <SectionHead
          kicker="Além da loja"
          kickerVariant="blurple"
          title="Ferramentas pra comunidade inteira"
          lede="Tudo isso vem junto e se configura por botões, nas seções da Central."
          className="mb-10"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXTRAS.map((extra, i) => (
            <li key={extra.label}>
              <Card
                hoverable
                className={cn(
                  "flex h-full items-center gap-4 p-5",
                  "tilt tilt-hover",
                  i % 3 === 0 && "tilt-l-sm",
                  i % 3 === 2 && "tilt-r-sm"
                )}
              >
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-2xl border-[3px] border-night-soft bg-accent shadow-[3px_3px_0_var(--color-night-soft)]"
                >
                  <extra.icon className="size-5" />
                </span>
                <span className="font-display text-lg font-semibold">{extra.label}</span>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-6 pb-4 sm:px-6" aria-labelledby="cta">
        <div className="neo-card bg-accent p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl">
            Bora colocar sua loja no ar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-night-soft/80">
            Adicione a Moshiini com permissão de Administrador e siga os 6
            passos ali de cima.
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
