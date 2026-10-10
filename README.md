# Moshiini Automações — site oficial

Site público da **Moshiini Automações**, o bot de vendas para Discord:
painéis de produtos, carrinho, cobrança PIX com QR Code, tickets de entrega,
cupons, sorteios, convites, honeypot anti-hack, modmail e criação de loja com IA.

- Stack: **Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui** (estilo base-nova)
- Rotas: `/` (home), `/como-funciona`, `/faq`, `/docs` (comandos), `/termos`, `/privacidade`
- Design: neobrutalismo pastel — bordas 3px, sombras sólidas, Fredoka + Nunito

## Rodar local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build    # gera dist/ + dist/404.html (fallback SPA)
npm run preview  # serve o build em http://localhost:4173
```

## Deploy (GitHub Pages)

O repositório já vem com `.github/workflows/deploy.yml`:

1. GitHub → **Settings → Pages → Source: GitHub Actions**
2. Push na branch `main` dispara o deploy sozinho
3. O site fica em `https://<conta>.github.io/moshiini-site/`

O `base` do Vite é definido automaticamente em CI (`/moshiini-site/`) e a rota
SPA funciona por causa do `dist/404.html` gerado no pós-build.

Para publicar na raiz (`<conta>.github.io` ou domínio próprio), troque a linha
do `base` em `vite.config.ts` para `/`.
