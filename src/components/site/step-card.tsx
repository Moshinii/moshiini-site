import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const TONES = [
  "bg-mint",
  "bg-amber",
  "bg-lilac",
  "bg-rose",
  "bg-blurple text-white",
  "bg-night text-white",
]

/** Card de passo numerado (fluxos em sequência). */
export function StepCard({
  n,
  title,
  children,
  className,
}: {
  n: number
  title: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <Card hoverable className={cn("relative flex flex-col gap-3 p-5 sm:p-6", className)}>
      <span
        aria-hidden
        className={cn(
          "grid size-11 place-items-center rounded-full border-[3px] border-night-soft font-display text-lg font-bold shadow-[3px_3px_0_var(--color-night-soft)]",
          TONES[(n - 1) % TONES.length]
        )}
      >
        {n}
      </span>
      <h3 className="font-display text-xl font-semibold text-balance">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </p>
    </Card>
  )
}
