import type { ReactNode } from "react"
import { cn } from "cn"

/** Marca-texto: destaque arredondado atrás de palavras-chave dos títulos. */
export function Hl({
  children,
  tone = "amber",
}: {
  children: ReactNode
  tone?: "amber" | "mint" | "lilac" | "rose" | "blurple"
}) {
  const tones = {
    amber: "hl-amber",
    mint: "hl-mint",
    lilac: "hl-lilac",
    rose: "hl-rose",
    blurple: "hl-blurple",
  }
  return <span className={cn("hl", tones[tone])}>{children}</span>
}
