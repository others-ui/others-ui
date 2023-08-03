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
  'others-ui-vue'
]

/** @type {import('rollup').RollupOptions[]} */
const rollupConfig = [
  {
    input: `packages/${pkg[0]}/src/index.ts`,
    output: [
      {
        file: `packages/${pkg[0]}/dist/${pkg[0]}.cjs.js`,
        format: 'cjs',
        sourcemap: !__PROD__
      },
      {
        file: `packages/${pkg[0]}/dist/${pkg[0]}.esm.js`,
        format: 'esm',
        sourcemap: !__PROD__
      },
      {
        file: `packages/${pkg[0]}/dist/${pkg[0]}.umd.js`,
        format: 'umd',
        name: 'OthersUi',
        sourcemap: !__PROD__
      },
    ],
    plugins: [
      postcss({
        extensions: [ '.css', '.scss', '.sass' ],
        inject: false,
        extract: false,
      }),
      commonjs(),
      resolve(),
      replace({
        preventAssignment: true,
        __DEV__: `${!__PROD__}`
      }),
      typescript({
        baseUrl: `./packages/${pkg[0]}`,
        tsconfig: `./packages/${pkg[0]}/tsconfig.json`,
        typescript: require('typescript'),
      }),
    ]
  },
  
  {
    input: `packages/${pkg[1]}/src/index.tsx`,
    output: [
      {
        file: `packages/${pkg[1]}/dist/${pkg[1]}.cjs.js`,
        format: 'cjs',
        sourcemap: !__PROD__
      },
      {
        file: `packages/${pkg[1]}/dist/${pkg[1]}.esm.js`,
        format: 'esm',
        sourcemap: !__PROD__
      },
      {
        file: `packages/${pkg[1]}/dist/${pkg[1]}.umd.js`,
        format: 'umd',
        name: 'OthersReact',
        sourcemap: !__PROD__
      }
    ],
    plugins: [
      postcss({
        extensions: [ '.css', '.scss', '.sass' ],
        inject: false,
        extract: false,
      }),
      commonjs(),
      resolve(),
      replace({
        preventAssignment: true,
        __DEV__: `${!__PROD__}`
      }),
      typescript({
        baseUrl: `./packages/${pkg[1]}`,
        tsconfig: `./packages/${pkg[1]}/tsconfig.json`,
        typescript: require('typescript'),
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: ['@babel/preset-env','@babel/preset-react'],
      })
    ]
  },
]

if (__PROD__) {
  rollupConfig.forEach(config => config.plugins.push(terser()))
}

export default rollupConfig