import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import path from 'node:path'

const __PROD__ = process.env.BUILD === 'production'
const __PREFIX__ = 'ot'
const __UMD_GLOBAL_NAME__ = 'OthersUI'
const pkg = [
  'others-ui'
]

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
  if (['umd'].includes(format)) {
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

  if (['others-ui-react'].includes(name)) {
    plugins.push(
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: ['@babel/preset-env','@babel/preset-react'],
      })
    )
  }

  return plugins
}

function getRollupConfig(name, format) {
  /** @type {import('rollup').RollupOptions} */
  const pkgConfig = {}
  // 标准入口
  pkgConfig.input =  `./packages/${name}/src/index.ts`
  pkgConfig.output = {
    file: `./packages/${name}/dist/${name}.${format}.js`,
    format: format,
    sourcemap: true,
  }

  if (['umd'].includes(format)) {
    pkgConfig.input =  `./packages/${name}/src/index.umd.ts`
    pkgConfig.output.name = __UMD_GLOBAL_NAME__
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
  rollupConfig.push(
    ...['cjs', 'esm', 'umd'].map(format => getRollupConfig(name, format))
  )
})

if (__PROD__) {
  rollupConfig.forEach(config => config.plugins.push(terser()))
}

export default rollupConfig
