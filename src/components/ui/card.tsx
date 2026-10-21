import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

const TONES = {
  white: "bg-white",
  night: "bg-night text-white",
  paper: "bg-paper",
  mint: "bg-mint",
  amber: "bg-amber",
  lilac: "bg-lilac",
} as const

export type CardTone = keyof typeof TONES

export function Card({
  tone = "white",
  hoverable = false,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  tone?: CardTone
  hoverable?: boolean
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        "neo-card text-night-soft",
        TONES[tone],
        hoverable && "neo-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Separator({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("h-[3px] w-full shrink-0 rounded-full bg-night-soft/20", className)}
      {...props}
    />
  )
}
