import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const carpeta = 'capturas'
await mkdir(carpeta, { recursive: true })

const navegador = await chromium.launch({
  channel: 'msedge',
  headless: true,
  args: [
    '--use-fake-device-for-media-stream',
    '--use-fake-ui-for-media-stream',
    '--allow-file-access-from-files',
  ],
})

const contexto = await navegador.newContext({
  viewport: { width: 1280, height: 800 },
  permissions: ['camera'],
})
const pagina = await contexto.newPage()

const errores = []
pagina.on('pageerror', (e) => errores.push(e.message))

await pagina.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await pagina.locator('.panel h1').waitFor()
await pagina.waitForTimeout(2500)

const info = await pagina.evaluate(() => ({
  titulo: document.querySelector('.panel h1')?.textContent,
  escena: Boolean(document.querySelector('a-scene')),
  aframe: Boolean(window.AFRAME),
  arjs: Boolean(document.querySelector('a-scene')?.getAttribute('arjs')),
}))
console.log('Estado de la página:', JSON.stringify(info))

await pagina.screenshot({ path: `${carpeta}/01-inicio.png` })

await pagina.getByRole('button', { name: 'Mostrar dragón' }).click()
await pagina.waitForTimeout(600)
await pagina.screenshot({ path: `${carpeta}/02-dragon.png` })

await pagina.getByRole('button', { name: 'Tamaño: normal' }).click()
await pagina.waitForTimeout(600)
await pagina.screenshot({ path: `${carpeta}/03-dragon-grande.png` })

await pagina.getByRole('button', { name: 'Mostrar cubo' }).click()
await pagina.waitForTimeout(600)
await pagina.screenshot({ path: `${carpeta}/04-cubo-grande.png` })

const clics = await pagina.locator('.panel__dato').textContent()
console.log('Contador final:', clics)
if (errores.length) console.log('Errores de página:', errores)

await navegador.close()
