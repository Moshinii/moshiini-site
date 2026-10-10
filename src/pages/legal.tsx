import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }

export type LegalSection = {
  heading?: string
  blocks: LegalBlock[]
}

export type LegalDoc = {
  etiqueta: string
  etiquetaVariant: "amber" | "mint" | "lilac" | "rose" | "blurple"
  title: string
  meta: string[]
  intro: string
  sections: LegalSection[]
}

/** Renderiza **negrito** inline do markdown legal. */
function Md({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-night-soft">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}

export function LegalArticle({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-5 pt-32 pb-10 text-center sm:px-6 sm:pt-40">
        <Badge variant={doc.etiquetaVariant}>{doc.etiqueta}</Badge>
        <h1 className="max-w-3xl text-4xl sm:text-5xl">{doc.title}</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {doc.meta.map((m) => (
            <span key={m} className="neo-pill bg-white text-xs">
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 pb-8 sm:px-6">
        <Card className="p-6 sm:p-10">
          <p className="text-lg leading-relaxed text-muted-foreground">
            <Md text={doc.intro} />
          </p>
          <Separator className="my-8" />
          <div className="flex flex-col gap-9">
            {doc.sections.map((section, i) => (
              <section key={i} aria-label={section.heading}>
                {section.heading ? (
                  <h2 className="mb-4 flex items-center gap-3 text-2xl">
                    <span
                      aria-hidden
                      className="grid size-9 shrink-0 place-items-center rounded-full border-[3px] border-night-soft bg-accent font-display text-base font-bold shadow-[2px_2px_0_var(--color-night-soft)]"
                    >
                      {i + 1}
                    </span>
                    {section.heading}
                  </h2>
                ) : null}
                <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
                  {section.blocks.map((block, j) =>
                    block.type === "p" ? (
                      <p key={j}>
                        <Md text={block.text} />
                      </p>
                    ) : (
                      <ul key={j} className="flex flex-col gap-3">
                        {block.items.map((item, k) => (
                          <li key={k} className="flex items-start gap-3">
                            <span
                              aria-hidden
                              className="mt-2 size-2.5 shrink-0 rounded-full border-2 border-night-soft bg-primary"
                            />
                            <span>
                              <Md text={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">{docOutro()}</p>
      </div>
    </>
  )
}

function docOutro(): ReactNode {
  return (
    <>
      Servidor oficial:{" "}
      <a
        href="https://discord.gg/C5aP3HEujN"
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-night-soft underline underline-offset-4 outline-none hover:text-[#5865f2]"
      >
        discord.gg/C5aP3HEujN
      </a>
    </>
  )
}
