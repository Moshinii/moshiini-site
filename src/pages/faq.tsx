import {
  CircleHelpIcon,
  LifeBuoyIcon,
  MailIcon,
  MessagesSquareIcon,
} from "lucide-react"
import { CtaButton } from "@/components/site/cta-button"
import { Hl } from "@/components/site/hl"
import { PageHead, SectionHead } from "@/components/site/section-head"
import { AccordionItem } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { SERVER_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

const CHANNELS = [
  {
    icon: MessagesSquareIcon,
    tone: "bg-blurple text-white",
    title: "Servidor oficial",
    text: "Tire dúvidas com a comunidade e abra um ticket com a equipe da Moshiini.",
    href: SERVER_URL,
    linkLabel: "Entrar no servidor",
  },
  {
    icon: MailIcon,
    tone: "bg-mint",
    title: "DM no bot (modmail)",
    text: "Mande uma mensagem direta pra Moshiini: o modmail abre um ticket privado com a staff da loja ou do servidor.",
  },
  {
    icon: LifeBuoyIcon,
    tone: "bg-amber",
    title: "/ajuda",
    text: "Central de ajuda interativa dentro do Discord, com todos os comandos organizados por categoria e permissão.",
  },
  {
    icon: CircleHelpIcon,
    tone: "bg-lilac",
    title: "/sugestao",
    text: "Ideia ou pedido de recurso? Envia direto pro dono do bot pelo comando /sugestao (uma por dia).",
  },
]

const FAQ_ITEMS = [
  {
    q: "Como faço pra comprar em uma loja?",
    a: (
      <>
        Abra o painel da loja no canal de compras, escolha o produto no menu
        suspenso e toque em <strong>Comprar</strong>. Informe a quantidade,
        monte a sacola (dá pra ajustar, remover e aplicar cupom) e toque em{" "}
        <strong>Finalizar Compra</strong>. Se a loja tiver Termos, aceite com um
        botão e preencha o campo de entrega — aí abre o ticket privado com o QR
        Code PIX e o copia-e-cola. Pague, anexe o comprovante e a staff entrega
        ali mesmo.
      </>
    ),
  },
  {
    q: "Como funciona o pagamento via PIX?",
    a: (
      <>
        O QR Code é gerado na hora, dentro do ticket, já com o valor exato do
        pedido. O pagamento vai <strong>direto para a chave PIX da loja</strong>:
        a Moshiini não recebe, não custodia e não intermedia o dinheiro. Por
        isso, dúvidas sobre uma compra são resolvidas com a loja, no próprio
        ticket.
      </>
    ),
  },
  {
    q: "Paguei e não confirmaram. E agora?",
    a: (
      <>
        Em lojas <strong>Gratuitas</strong>, a confirmação é manual pela staff —
        então pode levar alguns minutos fora do horário de pico. Anexe o
        comprovante no ticket e aguarde por ali. Em lojas{" "}
        <strong>Premium</strong>, a IA confere o comprovante (imagem até{" "}
        <span className="tabular-nums">5 MB</span> ou PDF até{" "}
        <span className="tabular-nums">8 MB</span>, até{" "}
        <span className="tabular-nums">2</span> análises por canal) e confirma
        sozinha quando tudo bate — valor, destinatário, data e o identificador
        do pedido —; qualquer divergência volta para a equipe conferir. Se a
        loja não responder, fale com a administração do servidor. A Moshiini
        não consegue estornar compras, porque o dinheiro não passa pelo bot.
      </>
    ),
  },
  {
    q: "O bot é grátis mesmo?",
    a: (
      <>
        Sim — não tem mensalidade. O plano Gratuito é{" "}
        <strong>ilimitado</strong>: produtos e painéis de venda sem teto por
        servidor, com vendas ilimitadas. Nele, as primeiras{" "}
        <span className="tabular-nums">24 horas</span> são sem taxa; depois, cada
        venda entregue leva <span className="tabular-nums">2%</span> de taxa.
        Tickets, cupons, sorteios, convites e{" "}
        <strong className="tabular-nums">3 gerações de loja com IA por dia</strong>{" "}
        também estão liberados.
      </>
    ),
  },
  {
    q: "Como funciona a taxa do plano Gratuito?",
    a: (
      <>
        A loja começa com <span className="tabular-nums">24 horas</span> sem
        taxa, contadas desde a ativação. Depois, cada venda{" "}
        <strong>entregue</strong> gera <span className="tabular-nums">2%</span>{" "}
        de taxa pra loja — compra cancelada não conta, e o cliente não paga nada
        a mais. O valor acumula e vira uma fatura PIX a cada ciclo de{" "}
        <span className="tabular-nums">15 dias</span> (a partir de{" "}
        <span className="tabular-nums">R$ 1,00</span>), com{" "}
        <span className="tabular-nums">7 dias</span> de prazo. Dá pra acompanhar
        e quitar em /loja plano. Quem tem a licença Premium fica isento.
      </>
    ),
  },
  {
    q: "Quanto custa o Premium e o que muda?",
    a: (
      <>
        O Premium custa <strong className="tabular-nums">R$ 0,50 por dia</strong>{" "}
        e livra a loja da taxa de 2% das vendas. Também libera as funções de IA:{" "}
        <strong>editar a loja por texto</strong>{" "}
        mencionando o bot, o <strong>leitor de comprovante</strong> nos tickets
        (a IA confirma o pagamento sozinha) e{" "}
        <span className="tabular-nums">10</span> gerações de loja com IA por dia
        (no Gratuito são <span className="tabular-nums">3</span>). Produtos e
        painéis já são ilimitados no Grátis. A ativação é no Discord, com
        /loja mudardeplano: informa os dias no modal, o PIX chega na DM e, com
        o pagamento conferido, a licença destrava na hora.
      </>
    ),
  },
  {
    q: "Como funciona a ativação automática do Premium?",
    a: (
      <>
        Em <strong>/loja mudardeplano</strong>, um modal pergunta quantos dias
        você quer e o PIX (QR Code e copia-e-cola) chega na sua DM. Envie o
        comprovante (imagem ou PDF) na mesma conversa: o pagamento é conferido
        — valor, destinatário, data e o identificador da cobrança — e a
        assinatura ativa na hora, sem esperar aprovação. Se algo divergir, o
        dono do bot aprova manualmente como sempre. Nada fica no limbo.
      </>
    ),
  },
  {
    q: "Como edito minha loja sem abrir a Central?",
    a: (
      <>
        No plano Premium, <strong>mencione o bot e escreva em português</strong>:
        <em> @Moshiini muda o preço do Mush para 1 real</em>,{" "}
        <em>“estoque infinito no produto VIP”</em>,{" "}
        <em>“desativa a Conta Premium”</em>. Funciona para preço, estoque,
        status, renomear, descrição, título/cor de painel e adicionar ou
        remover produto de painel — o bot aplica na hora e mostra o antes →
        depois. Só o dono do servidor consegue usar.
      </>
    ),
  },
  {
    q: "Se a licença Premium expirar, eu perco minha loja?",
    a: (
      <>
        Não. Nada é desativado nem apagado: produtos e painéis continuam
        ativos e vendendo normalmente — o plano Gratuito é ilimitado. O que
        muda: as funções de IA (edição por texto e leitor de comprovante)
        pausam e a taxa de 2% por venda entregue volta a valer. Renovar
        religa tudo.
      </>
    ),
  },
  {
    q: "A Moshiini vende os produtos das lojas?",
    a: (
      <>
        Não. A Moshiini é a ferramenta: quem vende é cada servidor, de forma
        independente, com seus próprios produtos, preços e chave PIX. Problemas
        com um pedido (produto não entregue, item diferente) são resolvidos com
        a loja onde a compra foi feita.
      </>
    ),
  },
  {
    q: "É seguro pagar pelo bot?",
    a: (
      <>
        Pague sempre pelo <strong>QR Code gerado dentro do ticket oficial</strong> da
        loja e desconfie de qualquer pessoa que peça pagamento por DM fora desse
        fluxo. A equipe da Moshiini nunca pede senha, token ou códigos da sua
        conta do Discord.
      </>
    ),
  },
  {
    q: "Como peço acesso ou exclusão dos meus dados?",
    a: (
      <>
        Pela LGPD, você pode pedir acesso, correção ou exclusão dos seus dados
        a qualquer momento: abra um ticket no{" "}
        <a href={SERVER_URL} target="_blank" rel="noreferrer">
          servidor oficial
        </a>{" "}
        ou mande uma DM pro bot (modmail). Pedidos legítimos são atendidos em
        até 15 dias. Os detalhes estão na Política de Privacidade.
      </>
    ),
  },
]

export function FaqPage() {
  return (
    <>
      <PageHead
        kicker="Suporte"
        kickerVariant="amber"
        title={
          <>
            Perguntas <Hl tone="mint">frequentes</Hl>
          </>
        }
        lede="As dúvidas que chegam todo dia, respondidas direto. Não achou a sua? Fale com a gente por um dos canais abaixo."
      />

      {/* ---------- CANAIS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16" aria-labelledby="canais">
        <div className="grid gap-6 sm:grid-cols-2">
          {CHANNELS.map((channel, i) => {
            const inner = (
              <>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-2xl border-[3px] border-night-soft shadow-[3px_3px_0_var(--color-night-soft)]",
                    channel.tone
                  )}
                >
                  <channel.icon className="size-6" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-display text-2xl font-semibold">
                    {channel.title}
                  </span>
                  <span className="leading-relaxed text-muted-foreground">
                    {channel.text}
                  </span>
                  {channel.href ? (
                    <span className="mt-1 font-display text-sm font-semibold text-blurple underline underline-offset-4">
                      {channel.linkLabel} →
                    </span>
                  ) : null}
                </span>
              </>
            )
            return channel.href ? (
              <a
                key={channel.title}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "neo-card neo-card-hover flex items-start gap-4 p-6 outline-none",
                  "tilt tilt-hover",
                  i % 2 === 0 ? "tilt-l-sm" : "tilt-r-sm"
                )}
              >
                {inner}
              </a>
            ) : (
              <Card
                key={channel.title}
                hoverable
                className={cn(
                  "flex items-start gap-4 p-6",
                  "tilt tilt-hover",
                  i % 2 === 0 ? "tilt-l-sm" : "tilt-r-sm"
                )}
              >
                {inner}
              </Card>
            )
          })}
        </div>
      </section>

      {/* ---------- ACORDEÃO ---------- */}
      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-16" aria-labelledby="duvidas">
        <SectionHead
          kicker="Dúvidas"
          kickerVariant="lilac"
          title="Respostas diretas"
          className="mb-10"
        />
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.q} question={item.q}>
              {item.a}
            </AccordionItem>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-6 pb-4 sm:px-6" aria-labelledby="cta">
        <div className="neo-card bg-mint p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl">
            Ainda com dúvida?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-night-soft/80">
            A comunidade e a equipe estão no servidor oficial. É o lugar mais
            rápido pra conseguir ajuda.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton href={SERVER_URL} variant="night">
              Entrar no servidor
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  )
}
