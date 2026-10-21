import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export type BtnVariant =
  | "default"
  | "white"
  | "night"
  | "blurple"
  | "amber"
  | "lilac"
  | "ghost"
export type BtnSize = "default" | "sm" | "lg" | "icon"

const BASE =
  "group/btn inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-[3px] border-night-soft font-display font-semibold whitespace-nowrap select-none transition-[transform,box-shadow,background-color,color] duration-150 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5"

const VARIANTS: Record<BtnVariant, string> = {
  default:
    "bg-mint text-night-soft shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
  white:
    "bg-white text-night-soft shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
  night:
    "bg-night text-white shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-night-soft hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
  blurple:
    "bg-blurple text-white shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-blurple-deep hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
  amber:
    "bg-amber text-night-soft shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
  lilac:
    "bg-lilac text-night-soft shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
  ghost: "border-transparent bg-transparent text-night-soft hover:bg-white/60",
}

const SIZES: Record<BtnSize, string> = {
  default: "h-11 px-5 text-base",
  sm: "h-9 px-4 text-sm",
  lg: "h-13 px-6 text-lg sm:h-14 sm:px-8",
  icon: "size-11",
}

function btnCls(variant: BtnVariant, size: BtnSize, className?: string) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className)
}

type Common = {
  variant?: BtnVariant
  size?: BtnSize
  children: ReactNode
  className?: string
}

/** Botão neobrutalista (elemento <button>). */
export function Button({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={btnCls(variant, size, className)} {...props}>
      {children}
    </button>
  )
}

/**
 * Botão que navega: `to` renderiza um Link do router (navegação interna);
 * `href` renderiza uma âncora (abre em nova aba por padrão).
 */
export function ButtonLink({
  variant = "default",
  size = "default",
  className,
  children,
  to,
  href,
  external = true,
}: Common & {
  to?: string
  href?: string
  external?: boolean
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const cls = btnCls(variant, size, className)
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cls}
    >
      {children}
    </a>
  )
}
