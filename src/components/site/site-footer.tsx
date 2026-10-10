import { ArrowUpRightIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { INVITE_URL, SERVER_URL, asset } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-[3px] border-night-soft bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-2.5 rounded-full outline-none">
            <img
              src={asset("images/logo.png")}
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full border-[3px] border-night-soft object-cover"
            />
            <span className="font-display text-xl font-bold">
              Moshiini
              <span className="font-medium text-muted-foreground"> automações</span>
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            O bot que transforma seu servidor do Discord em uma loja completa,
            com PIX, carrinho e entrega por ticket.
          </p>
          <span className="neo-pill">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#23a559] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[#23a559]" />
            </span>
            Bot operacional · Discord
          </span>
        </div>

        <nav aria-label="Navegação" className="flex flex-col gap-2.5">
          <span className="font-display font-semibold">Navegação</span>
          <Link to="/" className="w-fit text-sm text-muted-foreground underline-offset-4 outline-none hover:text-night-soft hover:underline">Início</Link>
          <Link to="/como-funciona" className="w-fit text-sm text-muted-foreground underline-offset-4 outline-none hover:text-night-soft hover:underline">Como funciona</Link>
          <Link to="/faq" className="w-fit text-sm text-muted-foreground underline-offset-4 outline-none hover:text-night-soft hover:underline">FAQ</Link>
        </nav>

        <nav aria-label="Legal" className="flex flex-col gap-2.5">
          <span className="font-display font-semibold">Legal</span>
          <Link to="/termos" className="w-fit text-sm text-muted-foreground underline-offset-4 outline-none hover:text-night-soft hover:underline">Termos de uso</Link>
          <Link to="/privacidade" className="w-fit text-sm text-muted-foreground underline-offset-4 outline-none hover:text-night-soft hover:underline">Privacidade (LGPD)</Link>
        </nav>

        <nav aria-label="Comunidade" className="flex flex-col gap-2.5">
          <span className="font-display font-semibold">Comunidade</span>
          <a
            href={SERVER_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground underline-offset-4 outline-none hover:text-night-soft hover:underline"
          >
            Servidor oficial <ArrowUpRightIcon className="size-3.5" />
          </a>
          <a
            href={INVITE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground underline-offset-4 outline-none hover:text-night-soft hover:underline"
          >
            Adicionar o bot <ArrowUpRightIcon className="size-3.5" />
          </a>
        </nav>
      </div>

      <Separator />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-center text-sm text-muted-foreground sm:flex-row sm:px-6 sm:text-left">
        <p>© 2026 Moshiini Automações. Todos os direitos reservados.</p>
        <p>
          Feito com 🍄 para quem vende no{" "}
          <a
            href={SERVER_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-night-soft underline underline-offset-4 outline-none hover:text-[#5865f2]"
          >
            Discord
          </a>
        </p>
      </div>
    </footer>
  )
}
