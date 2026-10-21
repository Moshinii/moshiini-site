/**
 * QR Code decorativo desenhado em SVG — padrão determinístico (seed fixa),
 * sem biblioteca externa. Não escaneia: é só a cara de um PIX no mock.
 */
export function FakeQr({
  seed = 7,
  size = 25,
  className,
}: {
  seed?: number
  size?: number
  className?: string
}) {
  // mulberry32 — PRNG simples e estável entre builds
  let a = seed >>> 0
  const rand = () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const finderBox = (x: number, y: number, bx: number, by: number) =>
    x >= bx && x < bx + 7 && y >= by && y < by + 7
  // anel externo + núcleo dos finders (o meio fica branco)
  const finderFill = (x: number, y: number) => {
    const ring = (bx: number, by: number) => {
      if (!finderBox(x, y, bx, by)) return false
      const dx = x - bx
      const dy = y - by
      const inner = dx > 0 && dx < 6 && dy > 0 && dy < 6
      const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4
      return inner ? core : true
    }
    return ring(0, 0) || ring(size - 7, 0) || ring(0, size - 7)
  }
  const finderZone = (x: number, y: number) =>
    finderBox(x, y, 0, 0) ||
    finderBox(x, y, size - 7, 0) ||
    finderBox(x, y, 0, size - 7)
  // padrão de alinhamento 5×5 perto do canto inferior direito
  const alignFill = (x: number, y: number) => {
    const ax = size - 9
    const ay = size - 9
    if (x < ax || x > ax + 4 || y < ay || y > ay + 4) return false
    const edge = x === ax || x === ax + 4 || y === ay || y === ay + 4
    return edge || (x === ax + 2 && y === ay + 2)
  }

  const cells: Array<{ x: number; y: number }> = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (finderFill(x, y) || alignFill(x, y)) {
        cells.push({ x, y })
      } else if (x === 6 || y === 6) {
        if ((x + y) % 2 === 0) cells.push({ x, y })
      } else if (!finderZone(x, y) && rand() > 0.52) {
        cells.push({ x, y })
      }
    }
  }

  return (
    <svg
      viewBox={`-1 -1 ${size + 2} ${size + 2}`}
      role="img"
      aria-label="QR Code de exemplo (decorativo)"
      className={className}
      shapeRendering="crispEdges"
    >
      <rect x={-1} y={-1} width={size + 2} height={size + 2} fill="#fff" />
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={1} height={1} fill="#1e1c2e" />
      ))}
    </svg>
  )
}
