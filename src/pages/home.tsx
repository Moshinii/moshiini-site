import {
  CheckIcon,
  CrownIcon,
  GiftIcon,
  LayoutGridIcon,
  MessagesSquareIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SparklesIcon,
  TicketCheckIcon,
} from "lucide-react"
import { Link } from "react-router-dom"
import { CtaButton } from "@/components/site/cta-button"
import { Hl } from "@/components/site/hl"
import { SectionHead } from "@/components/site/section-head"
import { StepCard } from "@/components/site/step-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { INVITE_URL, SERVER_URL, asset } from "@/lib/site"
import { cn } from "cn"

const FEATURES = [
  {
    icon: LayoutGridIcon,
    tone: "bg-primary",
    title: "Painéis de venda",
    text: "Monte vitrines com produtos, preços, estoque e emojis. O cliente escolhe no menu suspenso, sem digitar comando.",
  },
  {
    icon: ShoppingCartIcon,
    tone: "bg-accent",
    title: "Carrinho e cupons",
    text: "Sacola com ajuste de quantidades, cupom de desconto e calculadora que mostra o valor antes de fechar o pedido.",
  },
  {
    icon: QrCodeIcon,
    tone: "bg-[#a78bfa]",
    title: "PIX com QR Code",
    text: "Cobrança gerada na hora dentro de um ticket privado. O dinheiro cai direto na chave PIX da sua loja.",
  },
  {
    icon: TicketCheckIcon,
    tone: "bg-[#ff8ab5]",
    title: "Tickets de entrega",
    text: "Cada compra abre um canal privado: o cliente envia o comprovante, a staff confirma e entrega ali mesmo.",
  },
  {
    icon: GiftIcon,
    tone: "bg-[#5865f2] text-white",
    title: "Sorteios e convites",
    text: "Sorteios com requisito de cargo ou mensagens e sistema de convites com recompensa pra espalhar seu servidor.",
  },
  {
    icon: ShieldCheckIcon,
    tone: "bg-night text-white",
    title: "Anti-hack de verdade",
    text: "Honeypot que pega invasor, verificação por captcha, log de entradas e saídas e backup da loja quando você quiser.",
  },
]

const BUY_STEPS = [
  {
    title: "Abrir o painel da loja",
    text: "O painel fica postado no canal da loja, com todos os produtos num menu suspenso.",
  },
  {
    title: "Escolher o produto",
    text: "Dá pra comprar direto ou usar a calculadora: quanto em R$ vira quantidade, e vice-versa.",
  },
  {
    title: "Montar a sacola",
    text: "Ajuste quantidades, remova itens e aplique um cupom de desconto, se tiver um.",
  },
  {
    title: "Pagar no PIX",
    text: "Ao finalizar, abre um ticket privado só seu com o QR Code da cobrança.",
  },
  {
    title: "Receber a entrega",
    text: "Anexe o comprovante, a staff confirma e entrega no próprio ticket. No fim, você avalia com estrelas.",
  },
]

const FREE_FEATURES = [
  "Até 5 produtos e 2 painéis",
  "Vendas ilimitadas, sem taxa nem comissão",
  "3 gerações de loja com IA por dia",
  "Tickets, cupons, sorteios e convites",
  "Downgrade gracioso: nada é apagado",
]

const PREMIUM_FEATURES = [
  "Produtos e painéis ilimitados",
  "10 gerações de loja com IA por dia",
  "Tudo do plano Gratuito",
  "R$ 0,50 por dia, pago via PIX",
  "Ao renovar, os itens desativados voltam sozinhos",
]

export function HomePage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 pt-36 pb-16 text-center sm:px-6 sm:pt-44 sm:pb-24">
        <Badge variant="default" className="tilt tilt-l-sm tilt-hover">
          <SparklesIcon />
          Bot de vendas para Discord
        </Badge>

        <h1 className="max-w-4xl text-4xl leading-tight sm:text-6xl">
          Monte sua <Hl tone="amber">loja no Discord</Hl> e venda no{" "}
          <Hl tone="mint">PIX</Hl> em minutos
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Painéis de produtos, sacola, QR Code de pagamento e ticket de entrega:
          o cliente compra sem sair do servidor e você gerencia tudo por botões.
          Sem taxa sobre as suas vendas.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <CtaButton href={INVITE_URL}>Adicionar ao Discord</CtaButton>
          <CtaButton href={SERVER_URL} variant="white">
            Entrar no servidor
          </CtaButton>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4" aria-label="Destaques">
          <li className="neo-pill tilt tilt-l-sm tilt-hover">
            <span className="font-display text-lg font-bold">R$ 0</span> pra começar
          </li>
          <li className="neo-pill tilt tilt-r-sm tilt-hover">
            <span className="font-display text-lg font-bold">10 min</span> de configuração
          </li>
          <li className="neo-pill tilt tilt-l-sm tilt-hover">
            <span className="font-display text-lg font-bold">100%</span> por botões
          </li>
        </ul>

        <div className="tilt tilt-r tilt-hover neo-card mt-4 max-w-xl overflow-hidden p-3">
          <img
            src={asset("images/logo.png")}
            alt="Mascote da Moshiini: uma garota com chapéu de cogumelo vermelho"
            width={512}
            height={512}
            className="w-full rounded-2xl border-[3px] border-night-soft"
          />
        </div>
      </section>

      {/* ---------- RECURSOS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24" aria-labelledby="recursos">
        <SectionHead
          kicker="Recursos"
          kickerVariant="mint"
          title={
            <>
              Tudo que a sua loja precisa, <Hl tone="lilac">dentro do Discord</Hl>
            </>
          }
          lede="O cliente compra por menus e botões. Você configura uma vez pela Central de Administração e depois é só tocar na tela."
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Card
              key={f.title}
              hoverable
              className={cn(
                "flex flex-col gap-4 p-6",
                "tilt tilt-hover",
                i % 3 === 0 && "tilt-l-sm",
                i % 3 === 2 && "tilt-r-sm"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "grid size-12 place-items-center rounded-2xl border-[3px] border-night-soft shadow-[3px_3px_0_var(--color-night-soft)]",
                  f.tone
                )}
              >
                <f.icon className="size-6" />
              </span>
              <h3 className="font-display text-2xl font-semibold">{f.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{f.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- CRIAR LOJA COM IA ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24" aria-labelledby="ia">
        <div className="neo-card grid items-center gap-8 bg-night p-6 text-white sm:p-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start gap-5">
            <Badge variant="amber">
              <SparklesIcon />
              Criar loja com IA
            </Badge>
            <h2 className="text-3xl sm:text-4xl">
              Você descreve.{" "}
              <span className="hl hl-mint rotate-0">A IA monta a loja.</span>
            </h2>
            <p className="leading-relaxed text-white/80">
              Conte o que você vende — nicho, itens e preços — e a IA gera um
              rascunho completo: painel de vendas (título, descrição e cor) e
              produtos com nome, preço, estoque e emoji.
            </p>
            <ul className="flex flex-col gap-3 text-white/90">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 border-night bg-primary text-night">
                  <CheckIcon className="size-4" />
                </span>
                Você revisa tudo antes de qualquer coisa ser criada
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 border-night bg-primary text-night">
                  <CheckIcon className="size-4" />
                </span>
                Editar ou remover itens do rascunho não gasta geração
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 border-night bg-primary text-night">
                  <CheckIcon className="size-4" />
                </span>
                3 gerações por dia no plano Gratuito, 10 no Premium
              </li>
            </ul>
            <Button variant="default" render={<Link to="/como-funciona" />}>
              Ver o passo a passo
            </Button>
          </div>

          <figure className="tilt tilt-r tilt-hover relative">
            <div className="rounded-2xl border-[3px] border-night bg-white p-2 shadow-[6px_6px_0_rgb(50_237_187)]">
              <img
                src={asset("images/ia-rascunho.png")}
                alt="Rascunho gerado pela IA dentro do Discord: painel de Robux com produto, preço e estoque, e botões para criar tudo, editar, gerar de novo ou descartar"
                width={607}
                height={410}
                loading="lazy"
                className="w-full rounded-xl border-2 border-night/10"
              />
            </div>
            <figcaption className="neo-pill absolute -bottom-4 left-4 bg-white">
              Rascunho real gerado pela IA ✨
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- PLANOS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24" aria-labelledby="planos">
        <SectionHead
          kicker="Planos"
          kickerVariant="amber"
          title={
            <>
              Grátis pra começar, <Hl tone="amber">barato pra crescer</Hl>
            </>
          }
          lede="Sem taxa e sem comissão sobre suas vendas em nenhum plano. A licença Premium só destrava os limites de criação."
          className="mb-12"
        />
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <Card hoverable className="tilt tilt-l-sm tilt-hover flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-3xl font-bold">Gratuito</h3>
              <Badge variant="mint">Pra começar</Badge>
            </div>
            <p className="font-display text-5xl font-bold">
              R$ 0
              <span className="text-lg font-medium text-muted-foreground"> pra sempre</span>
            </p>
            <ul className="flex flex-col gap-3">
              {FREE_FEATURES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 border-night-soft bg-primary text-night-soft">
                    <CheckIcon className="size-4" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <CtaButton href={INVITE_URL} variant="white" className="w-full justify-between">
                Começar grátis
              </CtaButton>
            </div>
          </Card>

          <Card tone="night" hoverable className="tilt tilt-r-sm tilt-hover flex flex-col gap-6 p-6 text-white sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-3xl font-bold">Premium</h3>
              <Badge variant="amber">
                <CrownIcon />
                Loja sem teto
              </Badge>
            </div>
            <p className="font-display text-5xl font-bold">
              R$ 0,50
              <span className="text-lg font-medium text-white/70"> por dia</span>
            </p>
            <ul className="flex flex-col gap-3">
              {PREMIUM_FEATURES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 border-night bg-accent text-night">
                    <CheckIcon className="size-4" />
                  </span>
                  <span className="leading-relaxed text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <CtaButton href={INVITE_URL} className="w-full justify-between">
                Adicionar e assinar
              </CtaButton>
            </div>
            <p className="text-sm text-white/60">
              Ativação após a confirmação do pagamento, direto no Discord com
              /loja mudardeplano.
            </p>
          </Card>
        </div>
      </section>

      {/* ---------- FLUXO DE COMPRA ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24" aria-labelledby="fluxo">
        <SectionHead
          kicker="Fluxo de compra"
          kickerVariant="lilac"
          title={
            <>
              Do painel à entrega em <Hl tone="rose">5 passos</Hl>
            </>
          }
          lede="É assim que o seu cliente compra, no celular ou no PC — sempre por menus e botões."
          className="mb-12"
        />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {BUY_STEPS.map((step, i) => (
            <li key={step.title}>
              <StepCard n={i + 1} title={step.title} className="h-full">
                {step.text}
              </StepCard>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center text-muted-foreground">
          Quer o detalhe de cada passo?{" "}
          <Link to="/como-funciona" className="font-semibold text-night-soft underline underline-offset-4 outline-none hover:text-[#5865f2]">
            Veja como funciona
          </Link>
        </p>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-8 pb-4 sm:px-6" aria-labelledby="cta-final">
        <div className="neo-card relative overflow-hidden bg-night p-8 text-center text-white sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgb(255 255 255 / 0.25) 1.2px, transparent 1.4px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <img
              src={asset("images/logo.png")}
              alt=""
              width={72}
              height={72}
              className="size-18 rounded-full border-[3px] border-white/90 object-cover shadow-[4px_4px_0_rgb(50_237_187)]"
            />
            <h2 className="max-w-2xl text-3xl sm:text-5xl">
              Pronto pra vender no seu servidor?
            </h2>
            <p className="max-w-xl text-lg text-white/80">
              Adicione a Moshiini, rode /loja vincular e a sua loja já nasce no
              plano Gratuito. Sem burocracia.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <CtaButton href={INVITE_URL}>Adicionar ao Discord</CtaButton>
              <CtaButton href={SERVER_URL} variant="blurple">
                Entrar no servidor
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* atalho visual extra do painel (mensagens/modmail) */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6" aria-label="Suporte por ticket">
        <Card hoverable className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
          <span
            aria-hidden
            className="grid size-12 shrink-0 place-items-center rounded-2xl border-[3px] border-night-soft bg-[#5865f2] text-white shadow-[3px_3px_0_var(--color-night-soft)]"
          >
            <MessagesSquareIcon className="size-6" />
          </span>
          <p className="leading-relaxed text-muted-foreground">
            <span className="font-semibold text-night-soft">Ficou alguma dúvida?</span>{" "}
            Fale com a gente no servidor oficial, mande uma DM pro bot (o modmail
            abre um ticket com a staff) ou confira o{" "}
            <Link to="/faq" className="font-semibold text-night-soft underline underline-offset-4 outline-none hover:text-[#5865f2]">
              FAQ
            </Link>
            .
          </p>
        </Card>
      </section>
    </>
  )
}
