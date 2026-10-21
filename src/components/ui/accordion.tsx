import { useId, useState } from "react"
import type { ReactNode } from "react"
import { PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Acordeão próprio: um <AccordionItem> por pergunta, abre e fecha de forma
 * independente. A animação usa a técnica de grid (0fr → 1fr), pura CSS.
 */
export function AccordionItem({
  question,
  children,
  className,
}: {
  question: ReactNode
  children: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div className={cn("neo-card neo-card-hover px-5 sm:px-6", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group/acc flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold text-balance outline-none"
      >
        {question}
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border-[3px] border-night-soft bg-mint shadow-[2px_2px_0_var(--color-night-soft)] transition-transform duration-150 group-aria-expanded/acc:rotate-45"
        >
          <PlusIcon className="size-5" />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t-[3px] border-dashed border-night-soft/25 pt-4 pb-5 leading-relaxed text-muted-foreground [&_a]:font-semibold [&_a]:text-night-soft [&_a]:underline [&_a]:underline-offset-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
