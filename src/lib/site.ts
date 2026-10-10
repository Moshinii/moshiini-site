export const INVITE_URL =
  "https://discord.com/oauth2/authorize?client_id=1360681926318624908&permissions=8&scope=bot"
export const SERVER_URL = "https://discord.gg/C5aP3HEujN"

/** Resolve caminho de asset respeitando o base do Vite (deploy em subpasta). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "")
  return `${base}/${path.replace(/^\//, "")}`
}
