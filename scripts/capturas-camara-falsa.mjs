import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const video = 'C:/Users/Ness/AppData/Local/Temp/opencode/marcador_hiro.y4m'
const carpeta = 'capturas'
await mkdir(carpeta, { recursive: true })

const navegador = await chromium.launch({
  channel: 'msedge',
  headless: true,
  args: [
    '--use-fake-device-for-media-stream',
    '--use-fake-ui-for-media-stream',
    `--use-file-for-fake-video-capture=${video}`,
  ],
})

const contexto = await navegador.newContext({
  viewport: { width: 1280, height: 800 },
  permissions: ['camera'],
})
const pagina = await contexto.newPage()

const logs = []
pagina.on('console', (m) => {
  if (m.text().includes('Marcador')) logs.push(m.text())
})

await pagina.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await pagina.locator('.panel h1').waitFor()
await pagina.waitForTimeout(7000)

const estado = await pagina.locator('.panel__estado').textContent()
console.log('Estado:', estado)
console.log('Logs de marcador:', logs)

await pagina.screenshot({ path: `${carpeta}/camara-falsa-01-inicio.png` })

await pagina.getByRole('button', { name: 'Mostrar dragón' }).click()
await pagina.waitForTimeout(3000)
await pagina.screenshot({ path: `${carpeta}/camara-falsa-02-dragon.png` })

await pagina.getByRole('button', { name: 'Tamaño: normal' }).click()
await pagina.waitForTimeout(2500)
await pagina.screenshot({ path: `${carpeta}/camara-falsa-03-dragon-grande.png` })

await pagina.getByRole('button', { name: 'Mostrar cubo' }).click()
await pagina.waitForTimeout(2000)
await pagina.screenshot({ path: `${carpeta}/camara-falsa-04-cubo-grande.png` })

console.log('Contador:', await pagina.locator('.panel__dato').textContent())
await navegador.close()
