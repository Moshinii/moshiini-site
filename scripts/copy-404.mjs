import { copyFileSync } from "node:fs"

// GitHub Pages serve 404.html para rotas desconhecidas — o React Router assume daí.
copyFileSync("dist/index.html", "dist/404.html")
console.log("dist/404.html criado (fallback SPA do GitHub Pages)")
