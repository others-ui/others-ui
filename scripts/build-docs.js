import { copySync, removeSync } from 'fs-extra/esm'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execa } from 'execa'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


async function run() {
  removeSync(resolve(__dirname, '../docs/docs'))
  removeSync(resolve(__dirname, '../packages/others-ui-docs/.vitepress/dist'))
  await execa('pnpm', ['i'], { stdio: 'inherit' })
  await execa('pnpm', ['build'], { stdio: 'inherit' })
  await execa('pnpm', ['docs:build'], { stdio: 'inherit' })
  copySync(
    resolve(__dirname, '../packages/others-ui-docs/.vitepress/dist'),
    resolve(__dirname, '../docs/docs')
  )
  await execa('pnpm', ['docs:submodule-push'], { stdio: 'inherit' })
}

run()
