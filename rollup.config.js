import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import path from 'node:path'

const __PROD__ = process.env.BUILD === 'production'
const __PREFIX__ = 'ot'
const __UMD_GLOBAL_COMMON_NAME__ = 'OthersUICommon'
const __UMD_GLOBAL_NAME__ = 'OthersUI'
const pkg = [
  'common',
  'others-ui'
]
const mode = [
  'cjs',
  'esm',
  // 嵌入lit
  'umd',
  // 不嵌入lit
  'umd-alone',
]
const global_name_map = {
  common: __UMD_GLOBAL_COMMON_NAME__,
  'others-ui': __UMD_GLOBAL_NAME__
}

const format_map = {
  cjs: 'cjs',
  esm: 'esm',
  umd: 'umd',
  'umd-alone': 'umd',
}

/**
 * 根据包名和不同打包格式决定插件
*/
function getPlugins(name, format) {
  const plugins = []

  // 公共
  plugins.push(
    // 打包全局css样式 脱离组件库
    postcss({
      extensions: [ '.css', '.scss', '.sass' ],
      inject: false,
      extract: path.resolve(__dirname, './packages/others-ui/dist/others-ui.css'),
      exclude: /components/
    }),
    // 只打包组件内的css 跟随组件库
    postcss({
      extensions: [ '.css', '.scss', '.sass' ],
      inject: false,
      extract: false,
      include: /components/,
    })
  )
  // cjs | esm
  if (['umd', 'umd-alone', 'lit'].includes(format)) {
    plugins.push(
      commonjs(),
      resolve(),
    )
  }

  plugins.push(
    replace({
      preventAssignment: true,
      __DEV__: `${!__PROD__}`,
      'process.env.OTHER_PREFIX': `'${__PREFIX__}'`
    }),
    typescript({
      baseUrl: `./packages/${name}`,
      tsconfig: `./packages/${name}/tsconfig.json`,
      typescript: require('typescript'),
    }),
  )

  return plugins
}

function getRollupConfig(name, format) {
  /** @type {import('rollup').RollupOptions} */
  const pkgConfig = {}
  // 标准入口
  pkgConfig.input =  `./packages/${name}/src/index.ts`
  pkgConfig.output = {
    file: `./packages/${name}/dist/${name}.${format}.js`,
    format: format_map[format],
    sourcemap: true,
  }

  if (['umd', 'umd-alone'].includes(format)) {
    pkgConfig.input =  `./packages/${name}/src/index.umd.ts`
    pkgConfig.output.name = global_name_map[name]
  }

  if (['umd-alone'].includes(format)) {
    pkgConfig.external = ['@others-ui/common']
    pkgConfig.output.globals = {
      '@others-ui/common': __UMD_GLOBAL_COMMON_NAME__
    }
  }

  if(['cjs'].includes(format)) {
    pkgConfig.output.exports = 'named'
  }

  if (['cjs', 'esm'].includes(format)) {
    pkgConfig.onwarn = (warning, warn) => {
      if (
        [
          'UNRESOLVED_IMPORT',
          'MIXED_EXPORTS'
        ].includes(warning.code)
      ) {
        return
      }
      warn(warning)
    }
  }

  pkgConfig.plugins = getPlugins(name, format)
  return pkgConfig
}

/** @type {import('rollup').RollupOptions[]} */
const rollupConfig = []

pkg.forEach(name => {
  let useMode = [...mode]
  if (name === 'common' || !__PROD__) {
    useMode = useMode.filter(m => m !== 'umd-alone')
  }
  rollupConfig.push(
    ...useMode.map(format => getRollupConfig(name, format))
  )
})

if (__PROD__) {
  rollupConfig.forEach(config => config.plugins.push(terser()))
}

export default rollupConfig
