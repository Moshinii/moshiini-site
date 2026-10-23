import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { ComoFuncionaPage } from "@/pages/como-funciona"
import { DocsPage } from "@/pages/docs"
import { FaqPage } from "@/pages/faq"
import { HomePage } from "@/pages/home"
import { PrivacidadePage } from "@/pages/privacidade"
import { TermosPage } from "@/pages/termos"

const PAGE_TITLES: Record<string, string> = {
  "/": "Moshiini Automações — Bot de vendas para Discord",
  "/como-funciona": "Como funciona — Moshiini Automações",
  "/faq": "Perguntas frequentes — Moshiini Automações",
  "/docs": "Documentação dos comandos — Moshiini Automações",
  "/termos": "Termos de Uso — Moshiini Automações",
  "/privacidade": "Política de Privacidade — Moshiini Automações",
}

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    // páginas estáticas são servidas com barra final (/termos/)
    const path = pathname.replace(/\/+$/, "") || "/"
    document.title = PAGE_TITLES[path] ?? PAGE_TITLES["/"]
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RouteEffects />
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/como-funciona" element={<ComoFuncionaPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/termos" element={<TermosPage />} />
            <Route path="/privacidade" element={<PrivacidadePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}
