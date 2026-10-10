import { useState } from "react"
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { INVITE_URL, SERVER_URL, asset } from "@/lib/site"
import { cn } from "cn"

const NAV_LINKS = [
  { to: "/", label: "Início" },
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/faq", label: "FAQ" },
]

function isActivePath(pathname: string, to: string) {
  if (to === "/") return pathname === "/"
  return pathname.startsWith(to)
}

export function SiteHeader() {
  // menu aberto só vale para a rota onde foi aberto — navegar fecha sozinho
  const [openPath, setOpenPath] = useState<string | null>(null)
  const { pathname } = useLocation()
  const open = openPath === pathname

  const toggle = () => setOpenPath(open ? null : pathname)
  const close = () => setOpenPath(null)

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-4 focus:z-50 focus:rounded-full focus:border-[3px] focus:border-night-soft focus:bg-white focus:px-4 focus:py-2 focus:font-display focus:font-semibold"
      >
        Ir para o conteúdo
      </a>
      <div className="mx-auto max-w-6xl">
        <nav
          aria-label="Navegação principal"
          className="flex items-center justify-between gap-2 rounded-full border-[3px] border-night-soft bg-white py-2 pr-2 pl-3 shadow-[5px_5px_0_var(--color-night-soft)]"
        >
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-full py-0.5 pr-2 outline-none"
            aria-label="Moshiini Automações — página inicial"
          >
            <img
              src={asset("images/logo.png")}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full border-[3px] border-night-soft object-cover"
            />
            <span className="font-display text-lg leading-none font-bold">
              Moshiini
              <span className="hidden font-medium text-muted-foreground sm:inline">
                {" "}
                automações
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors duration-150 outline-none",
                  isActivePath(pathname, link.to)
                    ? "bg-accent"
                    : "hover:bg-muted"
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden md:inline-flex" render={<a href={INVITE_URL} target="_blank" rel="noreferrer" />}>
              Adicionar ao Discord
              <ArrowUpRightIcon />
            </Button>
            <Button
              size="icon"
              variant="white"
              className="md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={toggle}
            >
              {open ? <XIcon /> : <MenuIcon />}
            </Button>
          </div>
        </nav>

        {open ? (
          <div
            id="menu-mobile"
            className="neo-card mt-3 flex flex-col gap-1 p-3 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={close}
                className={cn(
                  "rounded-2xl px-4 py-3 font-display text-base font-semibold outline-none",
                  isActivePath(pathname, link.to) ? "bg-accent" : "hover:bg-muted"
                )}
              >
                {link.label}
              </NavLink>
            ))}
            <Button className="mt-2" onClick={close} render={<a href={INVITE_URL} target="_blank" rel="noreferrer" />}>
              Adicionar ao Discord
              <ArrowUpRightIcon />
            </Button>
            <Button variant="blurple" onClick={close} render={<a href={SERVER_URL} target="_blank" rel="noreferrer" />}>
              Entrar no servidor
              <ArrowUpRightIcon />
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  )
}
