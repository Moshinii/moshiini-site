import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

// Gera dist/<rota>/index.html para cada rota do site com meta tags próprias
// (título, description, og:*), para que o GitHub Pages responda 200 no acesso
// direto e links compartilhados gerem embed correto no Discord etc.
// Mantém o dist/404.html como fallback SPA para rotas desconhecidas.

const SITE_NAME = "Moshiini Automações"
const SITE_URL = "https://moshinii.github.io"

// Os títulos precisam ficar em sync com PAGE_TITLES em src/App.tsx
const ROUTES = {
  "/": {
    title: "Moshiini Automações — Bot de vendas para Discord",
    description:
      "Moshiini Automações: o bot que transforma seu servidor do Discord em uma loja completa. Painéis de produtos, carrinho, cobrança PIX com QR Code, tickets de entrega, cupons e sorteios. Grátis pra começar, sem taxa sobre as vendas.",
    ogDescription:
      "Monte sua loja no Discord em 10 minutos: produtos, carrinho, PIX com QR Code, tickets de entrega e cupons. Grátis pra começar.",
  },
  "/como-funciona": {
    title: "Como funciona — Moshiini Automações",
    description:
      "Passo a passo pra montar sua loja no Discord com a Moshiini: convite do bot, vínculo da loja, chave PIX, canais, produtos e painel de vendas prontos em 10 minutos.",
  },
  "/faq": {
    title: "Perguntas frequentes — Moshiini Automações",
    description:
      "Tire suas dúvidas sobre a Moshiini: planos e taxas, PIX e entregas, tickets, sorteios, suporte e resolução de problemas comuns do bot de vendas para Discord.",
  },
  "/docs": {
    title: "Documentação dos comandos — Moshiini Automações",
    description:
      "Referência completa dos 27 comandos da Moshiini: compras e sacola, central de administração da loja, PIX, sorteios, convites e moderação.",
  },
  "/termos": {
    title: "Termos de Uso — Moshiini Automações",
    description:
      "Termos de uso da Moshiini Automações: regras do bot de vendas para Discord, responsabilidades de lojistas e compradores, conduta, punições e encerramento do serviço.",
  },
  "/privacidade": {
    title: "Política de Privacidade — Moshiini Automações",
    description:
      "Política de Privacidade da Moshiini (LGPD): quais dados o bot coleta no Discord, como eles são usados, por quanto tempo ficam guardados e como exercer seus direitos.",
  },
}

const indexHtml = readFileSync(join("dist", "index.html"), "utf8")

// O base do build (/moshiini-site/ no CI, / local) é o prefixo dos assets:
// ex. href="/moshiini-site/assets/index-XXX.css" → base "/moshiini-site/"
const assetPrefix = indexHtml.match(/href="([^"]*)\/assets\//)?.[1] ?? ""
const base = assetPrefix ? `${assetPrefix}/` : "/"
const homeUrl = `${SITE_URL}${base}`

// Referências relativas (./images/…) quebram em URLs aninhadas como /termos/
function fixRelativeImages(html) {
  return html.replaceAll('"./images/', `"${base}images/`)
}

function buildPage(html, { title, description, ogDescription, pageUrl }) {
  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  out = out.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${description}$2`,
  )
  out = out.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    `$1${title}$2`,
  )
  out = out.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${ogDescription ?? description}$2`,
  )
  const extras = [
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:url" content="${pageUrl}" />`,
    `<link rel="canonical" href="${pageUrl}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join("\n    ")
  out = out.replace("    <title>", `    ${extras}\n    <title>`)
  return fixRelativeImages(out)
}

for (const [route, meta] of Object.entries(ROUTES)) {
  const pageUrl = route === "/" ? homeUrl : `${homeUrl.replace(/\/$/, "")}${route}/`
  const html = buildPage(indexHtml, { ...meta, pageUrl })
  if (route === "/") {
    writeFileSync(join("dist", "index.html"), html)
  } else {
    const dir = join("dist", route)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, "index.html"), html)
  }
  console.log(`dist${route === "/" ? "/index" : route + "/index"}.html gerado`)
}

// Fallback SPA: rotas desconhecidas caem aqui e o React Router assume
copyFileSync(join("dist", "index.html"), join("dist", "404.html"))
console.log("dist/404.html criado (fallback SPA do GitHub Pages)")
