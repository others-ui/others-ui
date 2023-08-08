import { execa } from 'execa'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import jsonfile from 'jsonfile'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function getPkgVersion() {
  const { version } = await jsonfile.readFile(resolve(__dirname, '../packages/others-ui/package.json'))
  return `v${version}`
}

async function run() {
  await execa('git', ['clean', '-fdx'], { stdio: 'inherit' })
  await execa('pnpm', ['i'], { stdio: 'inherit' })
  await execa('pnpm', ['build'], { stdio: 'inherit' })
  await execa('pnpm', ['run', 'lint'], { stdio: 'inherit' })
  await execa('pnpm', ['run', 'test'], { stdio: 'inherit' })
  await execa('pnpm', ['run', 'changeset:version'], { stdio: 'inherit' })
  const version = await getPkgVersion()
  await execa('git', ['tag', '-a', version, '-m', version], { stdio: 'inherit' })
  await execa('git', ['push', 'origin', version], { stdio: 'inherit' })
}

run()