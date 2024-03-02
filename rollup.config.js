import fs from 'node:fs'
import path from 'node:path'
import {
  resolvePkgConfig,
  resolve_path
} from './rollup.config-utils'

const __PROD__ = process.env.BUILD === 'production'

const components_root_path = path.resolve(__dirname, './components')
const components_dirs = fs.readdirSync(components_root_path)
const components_config = components_dirs.map(dir => {
  const component_path = path.resolve(components_root_path, dir)
  const json = require(path.resolve(component_path, 'package.json'))
  const build_config = json.build
  return {
    ...build_config,
    package_name: dir,
    package_path: component_path
  }
})

const origin_config = [
  // 优先打包common
  {
    package_name: 'common',
    package_path: resolve_path('./packages/common'),
    global_name: 'OthersUICommon',
    mode: ['cjs', 'esm', 'umd']
  },
  ...components_config,
  // 最后打包主项目
  {
    package_name: 'others-ui',
    package_path: resolve_path('./packages/others-ui'),
    global_name: 'OthersUI',
    depend_globals: {
      '@others-ui/common': 'OthersUICommon'
    },
    mode: ['cjs', 'esm', 'umd']
  }
]

const dev_config = [
  {
    package_name: 'others-ui',
    package_path: resolve_path('./packages/others-ui'),
    global_name: 'OthersUI',
    depend_globals: {
      '@others-ui/common': 'OthersUICommon'
    },
    mode: ['cjs', 'esm', 'umd'],
    source: true
  }
]

const rollup_config = __PROD__
  ? origin_config.map(config => resolvePkgConfig(config)).flat(1)
  : dev_config.map(config => resolvePkgConfig(config)).flat(1)
export default rollup_config
