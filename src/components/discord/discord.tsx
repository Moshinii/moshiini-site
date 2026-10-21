import type { ReactNode } from "react"
import {
  AtSignIcon,
  CheckIcon,
  ChevronDownIcon,
  EyeIcon,
  HashIcon,
  LockIcon,
} from "lucide-react"
import { asset } from "@/lib/site"
import { cn } from "@/lib/utils"

/* ============================================================
   Biblioteca de componentes que recriam a interface do Discord
   em HTML/CSS puro — nada de screenshot: cada tela do bot que
   aparece no site é renderizada por esses primitivos.
   ============================================================ */

export type DiscordBtnVariant = "primary" | "success" | "secondary" | "danger"

const BTN_STYLES: Record<DiscordBtnVariant, string> = {
  primary: "bg-[#5865f2] text-white hover:bg-[#4752c4]",
  success: "bg-[#248046] text-white hover:bg-[#1a6334]",
  secondary: "bg-[#4e5058] text-[#dbdee1] hover:bg-[#6d6f78]",
  danger: "bg-[#da373c] text-white hover:bg-[#a12828]",
}

/** Botão do Discord (clickable de mentira, visual de verdade). */
export function DiscordBtn({
  variant = "primary",
  icon,
  children,
  className,
}: {
  variant?: DiscordBtnVariant
  icon?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex cursor-default items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[13px] font-medium select-none",
        BTN_STYLES[variant],
        className
      )}
    >
      {icon}
      {children}
    </span>
  )
}

/** Select do Discord; com `open` mostra a lista de opções. */
export function DiscordSelect({
  placeholder,
  open = false,
  children,
  className,
}: {
  placeholder: string
  open?: boolean
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="inline-flex cursor-default items-center justify-between gap-2 rounded-md bg-[#4e5058] px-3 py-2 text-[13px] font-medium text-[#dbdee1] select-none">
        <span className="truncate">{placeholder}</span>
        <ChevronDownIcon
          className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")}
        />
      </span>
      {open ? (
        <span className="flex flex-col gap-0.5 rounded-lg border border-[#1e1f22] bg-[#2b2d31] p-1.5 shadow-[0_8px_16px_rgba(0,0,0,0.35)]">
          {children}
        </span>
      ) : null}
    </div>
  )
}

/** Opção dentro do select aberto (com check quando selecionada). */
export function DiscordOption({
  children,
  selected = false,
}: {
  children: ReactNode
  selected?: boolean
}) {
  return (
    <span className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[13px] text-[#dbdee1] odd:bg-white/[0.04]">
      <span className="truncate">{children}</span>
      {selected ? (
        <CheckIcon className="size-4 shrink-0 text-[#dbdee1]" />
      ) : (
        <span className="size-4 shrink-0 rounded-full border-2 border-[#4e5058]" />
      )}
    </span>
  )
}

/** Mensagem do Discord: avatar + nome + selo APP + horário + conteúdo. */
export function DiscordMessage({
  name = "Moshiin",
  nameTone = "text-[#eb459e]",
  app = true,
  time = "15:31",
  usedCommand,
  avatar,
  avatarFallback,
  children,
  className,
}: {
  name?: string
  nameTone?: string
  app?: boolean
  time?: string
  /** linha de contexto "Fulano usou /comando" */
  usedCommand?: string
  /** caminho de imagem do avatar (bot usa o logo) */
  avatar?: string
  /** avatar sem imagem: inicial colorida */
  avatarFallback?: { initial: string; bg: string }
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex gap-3 px-4 py-1.5", className)}>
      <div className="shrink-0 pt-0.5">
        {usedCommand ? (
          <p className="mb-1 flex items-center gap-1.5 pl-1 text-[12px] text-[#949ba4]">
            <img
              src={avatar ?? asset("images/logo.png")}
              alt=""
              width={16}
              height={16}
              className="size-4 rounded-full object-cover"
            />
            <span className={cn("font-medium", nameTone)}>{name}</span>
            usou
            <span className="rounded bg-[#2b2d31] px-1.5 py-0.5 font-medium text-[#dbdee1]">
              {usedCommand}
            </span>
          </p>
        ) : null}
        <div className="flex gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span
              className="grid size-10 shrink-0 place-items-center rounded-full font-display text-base font-bold text-white"
              style={{ background: avatarFallback?.bg ?? "#5865f2" }}
              aria-hidden
            >
              {avatarFallback?.initial ?? name.charAt(0)}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="flex items-baseline gap-1.5">
              <span className={cn("text-[15px] leading-none font-semibold", nameTone)}>
                {name}
              </span>
              {app ? (
                <span className="rounded-[4px] bg-[#5865f2] px-1 py-px text-[9px] leading-[1.4] font-bold tracking-wide text-white uppercase">
                  app
                </span>
              ) : null}
              <span className="text-[11px] text-[#949ba4]">{time}</span>
            </p>
            <div className="mt-1 text-[14px] leading-relaxed break-words text-[#dbdee1]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Embed do Discord com a barra lateral colorida. */
export function DiscordEmbed({
  bar = "#5865f2",
  title,
  children,
  footer,
  className,
}: {
  bar?: string
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "my-1 max-w-lg overflow-hidden rounded-[4px] border-l-4 bg-[#2b2d31] py-2.5 pr-3 pl-3",
        className
      )}
      style={{ borderLeftColor: bar }}
    >
      {title ? (
        <p className="mb-1 text-[14px] leading-snug font-bold text-[#f2f3f5]">{title}</p>
      ) : null}
      {children}
      {footer ? (
        <p className="mt-2 text-[11px] text-[#949ba4]">{footer}</p>
      ) : null}
    </div>
  )
}

/** Rodapé de mensagem efêmera ("só você pode ver"). */
export function DiscordEphemeral({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-1.5 px-4 pt-1 pb-3 text-[11px] text-[#949ba4]",
        className
      )}
    >
      <EyeIcon className="size-3.5 shrink-0" />
      Só você pode ver esta mensagem ·{" "}
      <span className="font-medium text-[#00a8fc]">Ignorar mensagem</span>
    </p>
  )
}

/** Barra superior do canal (#loja, ticket privado ou DM com o bot). */
export function DiscordChannelBar({
  name,
  kind = "hash",
}: {
  name: string
  kind?: "hash" | "lock" | "dm"
}) {
  const Icon = kind === "hash" ? HashIcon : kind === "dm" ? AtSignIcon : LockIcon
  const badge = kind === "lock" ? "ticket privado" : kind === "dm" ? "mensagem direta" : "canal da loja"
  return (
    <div className="flex items-center gap-2 border-b border-[#26272b] bg-[#313338] px-4 py-2.5 text-[14px] font-semibold text-[#f2f3f5]">
      <Icon className="size-4 text-[#949ba4]" aria-hidden />
      {name}
      <span className="ml-auto rounded-full bg-[#5865f2]/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#a5adf7] uppercase">
        {badge}
      </span>
    </div>
  )
}

/**
 * Moldura de janela do Discord no estilo da marca (borda + sombra dura).
 * Todo o miolo é UI do Discord recriada em código.
 */
export function DiscordWindow({
  channel,
  channelKind = "hash",
  children,
  className,
}: {
  channel: string
  channelKind?: "hash" | "lock" | "dm"
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "neo-card overflow-hidden font-sans text-left",
        className
      )}
    >
      <DiscordChannelBar name={channel} kind={channelKind} />
      <div className="flex min-w-0 flex-col bg-[#313338] py-2">
        {children}
      </div>
    </div>
  )
}
