import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const VARIANTS = {
  default: "bg-white",
  mint: "bg-mint",
  amber: "bg-amber",
  lilac: "bg-lilac",
  rose: "bg-rose",
  blurple: "bg-blurple text-white",
  night: "bg-night text-white",
} as const

export type BadgeVariant = keyof typeof VARIANTS

export function Badge({
  variant = "default",
  className,
  children,
}: {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-full border-[3px] border-night-soft px-3 py-1 font-display text-xs font-semibold whitespace-nowrap text-night-soft shadow-[2px_2px_0_var(--color-night-soft)] select-none [&>svg]:size-3.5",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
