import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import path from 'node:path'

const __PROD__ = process.env.BUILD === 'production'
const __PREFIX__ = 'ot'

const common_replace_variables = {
  __DEV__: `${!__PROD__}`,
  'process.env.OTHER_PREFIX': `'${__PREFIX__}'`
}

export const resolve_path = (_path) => path.resolve(__dirname, _path)

export function resolvePlugins({
  css_output,
  resolve_module = false,
  replace_variables = {},
  package_path = '',
  source = false
}) {
  const plugins = []
  const outer_css_exp = /\.outer.(scss|sass|css)$/

  // 打包全局css样式 脱离组件库
  css_output && plugins.push(
    postcss({
      extensions: ['.css', '.scss', '.sass'],
      inject: false,
      extract: css_output,
      include: outer_css_exp
    })
  )

  // 只打包组件内的css为字符串
  plugins.push(
    postcss({
      use: {
        sass: {
          data: `@import "${path.resolve(__dirname, './styles/index.scss')}";`
        }
      },
      extensions: ['.css', '.scss', '.sass'],
      inject: false,
      extract: false,
      exclude: outer_css_exp,
    })
  )

  // 打包umd格式的可以开启
  if (source) {
    // 源码引入
    plugins.push(
      commonjs(),
      resolve({
        // exportConditions: ['source', 'default', 'module', 'import'],
        // resolveOnly: [/^@others-ui\/.*$/],
        mainFields: ['source', 'module', 'main']
      }),
    )
  } else {
    resolve_module && plugins.push(
      commonjs(),
      resolve(),
    )
  }

  plugins.push(
    replace({
      preventAssignment: true,
      ...common_replace_variables,
      ...replace_variables
    }),
    typescript({
      baseUrl: package_path,
      tsconfig: `${package_path}/tsconfig.json`,
      typescript: require('typescript'),
      paths: (
        source
          ? {
            '@others-ui/*': [
              '../*/src',
              '../../components/*/src'
            ],
          }
          : undefined
      )
    }),
  )

  return plugins
}

export function resolveRollupConfig({
  package_path = '',
  package_name = '',
  // cjs | esm | umd
  format = '',
  format_suffix = '',
  // umd启用
  global_name,
  // umd启用 全局依赖
  depend_globals,
  replace_variables = {},
  source = false,
}) {
  /** @type {import('rollup').RollupOptions} */
  const pkgConfig = {}
  // 标准入口
  pkgConfig.input = `${package_path}/src/index${format === 'umd' ? '.umd' : ''}.ts`
  pkgConfig.output = {
    file: `${package_path}/dist/${package_name}.${format_suffix || format}.js`,
    format: format,
    sourcemap: true,
  }

  if (format === 'umd' && global_name) {
    pkgConfig.output.name = global_name
  }

  if (format_suffix === 'umd-alone') {
    const globals = {}
    const external = []

    Object.keys(depend_globals).forEach(key => {
      external.push(key)
      globals[key] = depend_globals[key]
    })

    pkgConfig.external = external
    pkgConfig.output.globals = globals
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

  pkgConfig.plugins = resolvePlugins({
    css_output: `${package_path}/dist/${package_name}.css`,
    resolve_module: format === 'umd',
    replace_variables,
    package_path,
    source
  })

  if (__PROD__) {
    pkgConfig.plugins.push(terser())
  }

  return pkgConfig
}

export function resolvePkgConfig({
  package_path = '',
  package_name = '',
  // umd启用
  global_name,
  // umd启用 全局依赖
  depend_globals,
  replace_variables = {},
  // cjs | esm | umd
  mode = [],
  source = false,
}) {

  const is_umd_alone = depend_globals && Object.keys(depend_globals).length

  const get_rollup_config = (mode, suffix) => {
    return {
      package_path: package_path,
      package_name: package_name,
      // cjs | esm | umd
      format: mode,
      format_suffix: suffix,
      // umd启用
      global_name,
      // umd启用 全局依赖
      depend_globals,
      replace_variables,
      source
    }
  }

  const configs = mode.map(m => resolveRollupConfig(get_rollup_config(m, m)))

  if (mode.includes('umd') && is_umd_alone) {
    configs.push(resolveRollupConfig(get_rollup_config('umd', 'umd-alone')))
  }

  return configs
}
