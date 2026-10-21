import {
  BellRingIcon,
  BotIcon,
  CrownIcon,
  GiftIcon,
  KeyRoundIcon,
  LayoutGridIcon,
  MessagesSquareIcon,
  PackagePlusIcon,
  RepeatIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StoreIcon,
  UserCheckIcon,
} from "lucide-react"
import {
  CentralAdminMock,
  EdicaoIaMock,
  LicencaIaMock,
  RascunhoIaMock,
} from "@/components/discord/screens"
import { CtaButton } from "@/components/site/cta-button"
import { Hl } from "@/components/site/hl"
import { PageHead, SectionHead } from "@/components/site/section-head"
import { StepCard } from "@/components/site/step-card"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { INVITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

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
    text: "Envie o comprovante no ticket e receba ali mesmo. Em lojas Premium, a IA confere o comprovante e confirma na hora. No fim, avalie com estrelas.",
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

      {/* ---------- A CENTRAL, AO VIVO ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14" aria-labelledby="central">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <Badge variant="mint">
              <SparklesIcon />
              Central de Administração
            </Badge>
            <h2 className="text-3xl sm:text-4xl">
              Um painel de gestão <Hl tone="amber">só seu</Hl>, dentro do servidor
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Rode <code className="cmd-chip text-sm">/painel_admin abrir</code> e
              a Central aparece como mensagem efêmera: só você vê, sem poluir o
              canal. Cada seção abre botões, menus e modais na mesma mensagem,
              sempre com Voltar.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              A versão fixa (<code className="cmd-chip text-sm">/painel_admin fixo</code>)
              fica presa num canal e <strong className="text-night-soft">nunca expira</strong> —
              sobrevive a reinícios do bot. Perfeita pra administrar a loja pelo
              celular, sem digitar nada.
            </p>
          </div>
          <CentralAdminMock className="tilt tilt-r-sm tilt-hover" />
        </div>
      </section>

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
                    className="grid size-11 shrink-0 place-items-center rounded-full border-[3px] border-night-soft bg-mint font-display text-lg font-bold shadow-[3px_3px_0_var(--color-night-soft)]"
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
      </section>

      {/* ---------- IA ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20" aria-labelledby="ia-setup">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <RascunhoIaMock className="tilt tilt-l-sm tilt-hover order-last lg:order-first" />
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

      {/* ---------- EDITAR POR TEXTO (PREMIUM) ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20" aria-labelledby="ia-texto">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <EdicaoIaMock className="tilt tilt-l-sm tilt-hover order-last lg:order-first" />
          <div className="flex flex-col items-start gap-5">
            <Badge variant="mint">
              <BotIcon />
              Premium · Edição por texto
            </Badge>
            <h2 className="text-3xl sm:text-4xl">
              Loja criada? <Hl tone="mint">Edite falando</Hl>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Mencione a Moshiini e escreva em português corriqueiro:{" "}
              <em>“muda o preço do Mush para 1 real”</em>, <em>“estoque infinito
              no produto VIP”</em>, <em>“desativa a Conta Premium”</em>. Preço,
              estoque, status, renomear, descrição e painéis — aplica na hora e
              mostra o antes → depois. Frases no padrão comum nem passam pela
              IA: são resolvidas localmente, sem latência.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              E continua sendo só seu: nenhum outro membro consegue editar sua
              loja por texto.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- PREMIUM AUTOMÁTICO ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20" aria-labelledby="ia-licenca">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <Badge variant="amber">
              <CrownIcon />
              Premium · Ativação automática
            </Badge>
            <h2 className="text-3xl sm:text-4xl">
              Pagou o PIX, <Hl tone="amber">a licença ativa na hora</Hl>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Assinar o Premium é tão automático quanto o resto: em{" "}
              <code className="cmd-chip text-sm">/loja mudardeplano</code> você
              escolhe os dias, paga o PIX que chega na sua DM e envia o
              comprovante na mesma conversa. A IA valida o comprovante — valor,
              destinatário, data e o identificador da cobrança — e a assinatura
              ativa em segundos, sem esperar ninguém aprovar.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Se algo não bater, a aprovação manual cuida — e o dono do bot
              recebe a análise da IA junto. Nada fica no limbo.
            </p>
          </div>
          <LicencaIaMock className="tilt tilt-r-sm tilt-hover" />
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
                  className="grid size-11 shrink-0 place-items-center rounded-2xl border-[3px] border-night-soft bg-amber shadow-[3px_3px_0_var(--color-night-soft)]"
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
        <div className="neo-card bg-amber p-8 text-center sm:p-12">
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
