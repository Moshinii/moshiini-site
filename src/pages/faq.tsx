import {
  CircleHelpIcon,
  LifeBuoyIcon,
  MailIcon,
  MessagesSquareIcon,
} from "lucide-react"
import { CtaButton } from "@/components/site/cta-button"
import { Hl } from "@/components/site/hl"
import { PageHead, SectionHead } from "@/components/site/section-head"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { SERVER_URL } from "@/lib/site"
import { cn } from "cn"

const CHANNELS = [
  {
    icon: MessagesSquareIcon,
    tone: "bg-[#5865f2] text-white",
    title: "Servidor oficial",
    text: "Tire dúvidas com a comunidade e abra um ticket com a equipe da Moshiini.",
    href: SERVER_URL,
    linkLabel: "Entrar no servidor",
  },
  {
    icon: MailIcon,
    tone: "bg-primary",
    title: "DM no bot (modmail)",
    text: "Mande uma mensagem direta pra Moshiini: o modmail abre um ticket privado com a staff da loja ou do servidor.",
  },
  {
    icon: LifeBuoyIcon,
    tone: "bg-accent",
    title: "/ajuda",
    text: "Central de ajuda interativa dentro do Discord, com todos os comandos organizados por categoria e permissão.",
  },
  {
    icon: CircleHelpIcon,
    tone: "bg-[#a78bfa]",
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
        suspenso e toque em <strong>Comprar</strong>. Monte a sacola (dá pra
        ajustar quantidade e aplicar cupom) e toque em{" "}
        <strong>Finalizar Compra</strong>. Vai abrir um ticket privado com o QR
        Code PIX — pague, anexe o comprovante e a staff entrega ali mesmo.
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
        A confirmação é feita pela staff da loja, de forma manual — então pode
        levar alguns minutos fora do horário de pico. Anexe o comprovante no
        ticket e aguarde a resposta por ali. Se a loja não responder, fale com
        a administração do servidor. A Moshiini não consegue confirmar pagamento
        nem estornar compras, porque o dinheiro não passa pelo bot.
      </>
    ),
  },
  {
    q: "O bot é grátis mesmo?",
    a: (
      <>
        Sim. O plano Gratuito inclui até <strong>5 produtos</strong> e{" "}
        <strong>2 painéis</strong> por servidor, com vendas ilimitadas, sem taxa
        e sem comissão. Tickets, cupons, sorteios e convites também estão
        liberados.
      </>
    ),
  },
  {
    q: "Quanto custa o Premium e o que muda?",
    a: (
      <>
        O Premium custa <strong>R$ 0,50 por dia</strong> e remove os limites de
        criação: produtos e painéis ilimitados, além de 10 gerações de loja com
        IA por dia (no Gratuito são 3). A ativação é feita no Discord, com
        /loja mudardeplano, após a confirmação do PIX.
      </>
    ),
  },
  {
    q: "Se a licença Premium expirar, eu perco minha loja?",
    a: (
      <>
        Não. O downgrade é gracioso: os <strong>primeiros 5 produtos e 2
        painéis</strong> continuam ativos e vendendo. Os excedentes são
        desativados temporariamente — nada é apagado — e voltam sozinhos quando
        você renovar.
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
                    <span className="mt-1 font-display text-sm font-semibold text-[#5865f2] underline underline-offset-4">
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
        <Accordion>
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-6 pb-4 sm:px-6" aria-labelledby="cta">
        <div className="neo-card bg-primary p-8 text-center sm:p-12">
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
