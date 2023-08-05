import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

const __PROD__ = process.env.BUILD === 'production'
const pkg = [
  'others-ui',
  'others-ui-react',
]

/**
 * 根据包名和不同打包格式决定插件
*/
function getPlugins(name, format) {
  const plugins = []

  // 公共
  plugins.push(
    postcss({
      extensions: [ '.css', '.scss', '.sass' ],
      inject: false,
      extract: false,
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
      'process.env.OTHER_PREFIX': `'ot'`
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
    pkgConfig.output.name = 'OtherUi'
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