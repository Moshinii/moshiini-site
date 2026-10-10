import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "cn"

export function SectionHead({
  kicker,
  kickerVariant = "default",
  title,
  lede,
  align = "center",
  className,
}: {
  kicker: ReactNode
  kickerVariant?: "default" | "mint" | "amber" | "lilac" | "rose" | "blurple" | "night"
  title: ReactNode
  lede?: ReactNode
  align?: "center" | "start"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Badge variant={kickerVariant}>{kicker}</Badge>
      <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {lede ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  )
}

export function PageHead({
  kicker,
  kickerVariant = "default",
  title,
  lede,
}: {
  kicker: ReactNode
  kickerVariant?: "default" | "mint" | "amber" | "lilac" | "rose" | "blurple" | "night"
  title: ReactNode
  lede?: ReactNode
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 pt-32 pb-4 text-center sm:px-6 sm:pt-40 sm:pb-8">
      <Badge variant={kickerVariant}>{kicker}</Badge>
      <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
      {lede ? (
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {lede}
        </p>
      ) : null}
    </div>
  )
}
