import {
  CalculatorIcon,
  CopyIcon,
  FileImageIcon,
  RefreshCwIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TicketPercentIcon,
  Trash2Icon,
} from "lucide-react"
import {
  DiscordBtn,
  DiscordEphemeral,
  DiscordEmbed,
  DiscordMessage,
  DiscordOption,
  DiscordSelect,
  DiscordWindow,
} from "@/components/discord/discord"
import { FakeQr } from "@/components/discord/fake-qr"

const BOLD = "font-semibold text-[#f2f3f5]"
const CODE = "rounded bg-[#1e1f22] px-1 py-0.5 font-mono text-[12px] text-[#dbdee1]"

/** Painel de vendas postado no canal da loja (o produto estrela do site). */
export function PainelVendasMock({ className }: { className?: string }) {
  return (
    <DiscordWindow channel="loja" className={className}>
      <DiscordMessage time="15:42">
        <DiscordEmbed bar="#5865f2" title="🛒 Mushinko Store">
          <p>
            Bem-vindo! Escolha um produto no menu abaixo e toque em{" "}
            <strong className={BOLD}>Comprar</strong>. O valor aparece certinho
            antes de fechar o pedido.
          </p>
          <DiscordSelect
            placeholder="💎 1.000 Robux — R$ 25,00 · estoque 10"
            open
            className="mt-3 max-w-sm"
          >
            <DiscordOption selected>💎 1.000 Robux — R$ 25,00 · estoque 10</DiscordOption>
            <DiscordOption>🧬 Clonagem — R$ 2,00 · estoque infinito</DiscordOption>
            <DiscordOption>🍄 Mush — R$ 0,15 · estoque 403.500</DiscordOption>
            <DiscordOption>🔑 Tokens — R$ 20,00 · estoque 1.343</DiscordOption>
          </DiscordSelect>
          <div className="mt-3 flex flex-wrap gap-2">
            <DiscordBtn variant="success" icon={<ShoppingCartIcon className="size-4" />}>
              Comprar
            </DiscordBtn>
            <DiscordBtn variant="secondary" icon={<CalculatorIcon className="size-4" />}>
              Calculadora
            </DiscordBtn>
            <DiscordBtn variant="secondary" icon={<TicketPercentIcon className="size-4" />}>
              Cupom
            </DiscordBtn>
            <DiscordBtn variant="primary" icon={<ShoppingBagIcon className="size-4" />}>
              Sacola (1)
            </DiscordBtn>
          </div>
        </DiscordEmbed>
      </DiscordMessage>
    </DiscordWindow>
  )
}

/** Central de Administração — o painel de gestão por botões. */
export function CentralAdminMock({ className }: { className?: string }) {
  return (
    <DiscordWindow channel="gestão" className={className}>
      <DiscordMessage time="15:31" usedCommand="/painel_admin abrir">
        <DiscordEmbed bar="#32edbb" title="Central de Administração da Loja">
          <p className="text-[13px]">
            Tudo o que antes era comando agora está aqui, em botões e menus —
            funciona igual no PC e no celular.
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-[13px]">
            <li>
              🛍️ <strong className={BOLD}>Produtos & Estoque</strong> — adicionar, editar, listar, status, limiar e exclusão de produtos.
            </li>
            <li>
              🖼️ <strong className={BOLD}>Painéis de Venda</strong> — criar, editar, postar/sincronizar painéis e gerenciar opções.
            </li>
            <li>
              ⚙️ <strong className={BOLD}>Configuração da Loja</strong> — canais, PIX, campo de entrega, cliente, termos e carrinho.
            </li>
            <li>
              ✅ <strong className={BOLD}>Verificação de Membros</strong> — canal/cargo de verificação e postagem do painel.
            </li>
            <li>
              🎖️ <strong className={BOLD}>Cargos & Auxiliares</strong> — cargo de suporte, canais ignorados e recompensas por gasto.
            </li>
            <li>
              🌄 <strong className={BOLD}>Backup de Imagens</strong> — destino das imagens das transcrições desta loja.
            </li>
            <li>
              🎟️ <strong className={BOLD}>Cupons</strong> — criar, listar, excluir e desativar cupons.
            </li>
            <li>
              🎉 <strong className={BOLD}>Sorteios & Convites</strong> — sorteios do servidor e recompensas por convite.
            </li>
            <li>
              🛡️ <strong className={BOLD}>Segurança & Honeypot</strong> — honeypot anti-selfbot e desbanimentos.
            </li>
            <li>
              🔧 <strong className={BOLD}>Manutenção & Relatórios</strong> — estatísticas, CSV, diagnóstico e backup/restauração da loja.
            </li>
            <li>
              📩 <strong className={BOLD}>Mensagens</strong> — enviar mensagem embed pronta para um canal da loja.
            </li>
          </ul>
          <p className="mt-2 text-[12px] text-[#949ba4]">
            Selecione uma seção no menu abaixo. O painel não expira.
          </p>
          <DiscordSelect placeholder="Início da Central" className="mt-3 max-w-xs" />
          <div className="mt-3">
            <DiscordBtn variant="secondary" icon={<RefreshCwIcon className="size-4" />}>
              Sincronizar Comandos
            </DiscordBtn>
          </div>
        </DiscordEmbed>
      </DiscordMessage>
      <DiscordEphemeral />
    </DiscordWindow>
  )
}

/** Edição da loja por texto: menciona o bot e fala em português (Premium). */
export function EdicaoIaMock({ className }: { className?: string }) {
  return (
    <DiscordWindow channel="loja" className={className}>
      <DiscordMessage
        time="22:34"
        name="Moshinii_"
        nameTone="text-[#ffc94d]"
        app={false}
        avatarFallback={{ initial: "M", bg: "#ff8ab5" }}
      >
        <p>
          <span className="rounded bg-[#5865f2]/30 px-1 py-px text-[13px] font-medium text-[#c9cdfb]">
            @Moshiini
          </span>{" "}
          mude o valor do mush para 1 real
        </p>
      </DiscordMessage>
      <DiscordMessage time="22:34">
        <DiscordEmbed bar="#248046" title="✅ Preço atualizado">
          <p>
            <strong className={BOLD}>Mush</strong>: R$ 0,04 →{" "}
            <strong className={BOLD}>R$ 1,00</strong>
          </p>
          <p className="mt-1">Painéis ressincronizados: 1.</p>
          <p className="mt-1.5 text-[12px] text-[#949ba4]">
            Pedido interpretado por: escrita direta
          </p>
        </DiscordEmbed>
      </DiscordMessage>
      <DiscordMessage
        time="22:35"
        name="Moshinii_"
        nameTone="text-[#ffc94d]"
        app={false}
        avatarFallback={{ initial: "M", bg: "#ff8ab5" }}
      >
        <p>
          <span className="rounded bg-[#5865f2]/30 px-1 py-px text-[13px] font-medium text-[#c9cdfb]">
            @Moshiini
          </span>{" "}
          mude a unidade do mush para 10
        </p>
      </DiscordMessage>
      <DiscordMessage time="22:35">
        <DiscordEmbed bar="#248046" title="✅ Estoque atualizado">
          <p>
            <strong className={BOLD}>Mush</strong>: 10.329.222 unidades →{" "}
            <strong className={BOLD}>10 unidades</strong>
          </p>
          <p className="mt-1">Painéis ressincronizados: 1.</p>
          <p className="mt-1.5 text-[12px] text-[#949ba4]">
            Pedido interpretado por: IA
          </p>
        </DiscordEmbed>
      </DiscordMessage>
    </DiscordWindow>
  )
}

/** Compra da licença Premium: PIX na DM com ativação automática pela IA. */
export function LicencaIaMock({ className }: { className?: string }) {
  return (
    <DiscordWindow channel="Moshiini" channelKind="dm" className={className}>
      <DiscordMessage time="13:02">
        <DiscordEmbed bar="#5865f2" title="Cobrança de Assinatura - Moshiini_ automações">
          <div className="flex flex-wrap items-center gap-3">
            <FakeQr className="size-24 rounded-md border-2 border-[#1e1f22]" />
            <div className="flex flex-col items-start gap-1.5">
              <p className="text-[13px]">
                <strong className={BOLD}>30 dias</strong> de acesso ·{" "}
                <strong className={BOLD}>R$ 15,00</strong>
              </p>
              <DiscordBtn variant="success">Já Paguei</DiscordBtn>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-[#949ba4]">
            Após pagar, envie o comprovante aqui na nossa conversa.
          </p>
        </DiscordEmbed>
      </DiscordMessage>
      <DiscordMessage
        time="13:09"
        name="Moshinii_"
        nameTone="text-[#ffc94d]"
        app={false}
        avatarFallback={{ initial: "M", bg: "#ff8ab5" }}
      >
        <span className="flex w-fit items-center gap-2 rounded-lg bg-[#2b2d31] p-2 pr-3">
          <span className="grid size-9 place-items-center rounded-md bg-[#1e1f22]">
            <FileImageIcon className="size-4.5 text-[#949ba4]" />
          </span>
          <span className="flex flex-col text-[12px] leading-tight">
            <span className="text-[#00a8fc]">comprovante-pix.png</span>
            <span className="text-[#949ba4]">288 KB</span>
          </span>
        </span>
      </DiscordMessage>
      <DiscordMessage time="13:09">
        <DiscordEmbed bar="#248046" title="✅ Pagamento confirmado automaticamente">
          <p>
            A validação conferiu <strong className={BOLD}>tudo</strong> — valor,
            destinatário, data e o identificador da cobrança — e a assinatura
            foi <strong className={BOLD}>ativada por 30 dias</strong>. Boa venda!
            🎉
          </p>
          <p className="mt-1.5 text-[12px] text-[#949ba4]">
            Validado por IA, sem precisar esperar aprovação manual.
          </p>
        </DiscordEmbed>
      </DiscordMessage>
    </DiscordWindow>
  )
}

/** Rascunho gerado pela IA, aguardando revisão. */
export function RascunhoIaMock({ className }: { className?: string }) {
  return (
    <DiscordWindow channel="gestão" className={className}>
      <DiscordMessage time="15:36" usedCommand="/painel_admin abrir">
        <DiscordEmbed bar="#ffc94d" title="✨ Rascunho da IA — revise antes de criar">
          <p>
            <strong className={BOLD}>Painel:</strong> 💎 Robux — cor{" "}
            <span className={CODE}>#2ECC71</span>
          </p>
          <p className="my-1.5 border-l-4 border-[#4e5058] pl-2 text-[13px] text-[#b5bac1] italic">
            Venda de Robux por R$ 30,00 o milhar! ⚠️ Taxa do Roblox por conta do
            comprador. 🎒 Estoque disponível: 20.000 Robux. Compre já!
          </p>
          <p>
            <strong className={BOLD}>1.</strong> 💎 1.000 Robux — R$ 30,00 · estoque 20
          </p>
          <DiscordEmbed footer="Gerações hoje: 1/10 · Editar ou remover não gasta geração" className="mt-3">
            <div className="flex flex-wrap gap-2">
              <DiscordBtn variant="success">✅ Criar tudo</DiscordBtn>
              <DiscordBtn variant="primary">✏️ Editar painel</DiscordBtn>
              <DiscordBtn variant="secondary" icon={<RefreshCwIcon className="size-4" />}>
                Gerar de novo
              </DiscordBtn>
              <DiscordBtn variant="danger" icon={<Trash2Icon className="size-4" />}>
                Descartar
              </DiscordBtn>
            </div>
          </DiscordEmbed>
        </DiscordEmbed>
      </DiscordMessage>
      <DiscordEphemeral />
    </DiscordWindow>
  )
}

/** Do PIX à entrega: a história completa dentro do ticket. */
export function PixEntregaMock({ className }: { className?: string }) {
  return (
    <DiscordWindow channel="ticket-1032" channelKind="lock" className={className}>
      <DiscordMessage time="19:02">
        <p>
          Aqui está o seu QR Code, <strong className={BOLD}>Bia</strong>! ⏰ Ele
          expira em 15 minutos.
        </p>
        <DiscordEmbed bar="#248046" title="💸 Cobrança PIX — R$ 50,00" className="w-fit max-w-full">
          <div className="flex flex-wrap items-center gap-3">
            <FakeQr className="size-28 rounded-md border-2 border-[#1e1f22]" />
            <div className="flex flex-col items-start gap-2">
              <p className="text-[12px] text-[#949ba4]">
                2× 💎 1.000 Robux · Mushinko Store
              </p>
              <span className={CODE}>00020126PIXCOPIAECOLA…</span>
              <DiscordBtn variant="primary" icon={<CopyIcon className="size-4" />}>
                Copiar código
              </DiscordBtn>
            </div>
          </div>
        </DiscordEmbed>
      </DiscordMessage>

      <DiscordMessage
        time="19:07"
        name="Bia"
        nameTone="text-[#ffc94d]"
        app={false}
        avatarFallback={{ initial: "B", bg: "#ff8ab5" }}
      >
        <p>paguei aqui, comprovante em anexo! 🙏</p>
        <span className="mt-1 flex w-fit items-center gap-2 rounded-lg bg-[#2b2d31] p-2 pr-3">
          <span className="grid size-9 place-items-center rounded-md bg-[#1e1f22]">
            <FileImageIcon className="size-4.5 text-[#949ba4]" />
          </span>
          <span className="flex flex-col text-[12px] leading-tight">
            <span className="text-[#00a8fc]">comprovante-pix.png</span>
            <span className="text-[#949ba4]">312 KB</span>
          </span>
        </span>
      </DiscordMessage>

      <DiscordMessage time="19:09">
        <DiscordEmbed bar="#32edbb" title="✅ Pagamento confirmado">
          <p>
            Entrega feita: <strong className={BOLD}>2.000 Robux</strong>{" "}
            adicionados à sua conta. Obrigado por comprar na Mushinko Store!
          </p>
          <p className="mt-1.5 text-[13px] text-[#949ba4]">
            Avalie o atendimento:{" "}
            <span className="tracking-widest" aria-label="5 estrelas">
              ⭐⭐⭐⭐⭐
            </span>
          </p>
        </DiscordEmbed>
      </DiscordMessage>
    </DiscordWindow>
  )
}
