import path, { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const args = process.argv.slice(2)
const name = args[0]

if (!name) {
  console.error('组件名不能为空！')
  process.exit(1)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const componentName = name
const globalComponentName = componentName.slice(0, 1).toUpperCase() + componentName.slice(1)

const template_path = resolve(__dirname, '../template')
const target_path = resolve(__dirname, `../components/${componentName}`)

const replace = (content) =>
  content
    .replace(/\$\$componentName\$\$/g, componentName)
    .replace(/\$\$globalComponentName\$\$/g, globalComponentName)

const copy = (sd, td) => {
  const sourceFile = fs.readdirSync(sd, { withFileTypes: true })
  for (const file of sourceFile) {
    const srcFile = path.resolve(sd, file.name)
    const tagFile = path.resolve(td, replace(file.name).replace('.template', ''))
    if (file.isDirectory() && !fs.existsSync(tagFile)) {
      fs.mkdirSync(tagFile, (err) => console.log(err))
      copy(srcFile, tagFile)
    } else if (file.isDirectory() && fs.existsSync(tagFile)) {
      copy(srcFile, tagFile)
    }

    if (!file.isDirectory()) {
      const content = fs.readFileSync(srcFile).toString()
      fs.writeFileSync(tagFile, replace(content))
    }
  }
}

const run = () => {
  if (!fs.existsSync(template_path)) {
    throw '模版不存在！'
  } else if (!fs.existsSync(target_path)) {
    fs.mkdirSync(target_path, (err) => console.log(err))
    copy(template_path, target_path)
  } else {
    throw '目录已存在！'
  }
}

run()
