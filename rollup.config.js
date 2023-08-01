import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'

const __PROD__ = process.env.BUILD === 'production'

/** @type {import('rollup').RollupOptions[]} */
const rollupConfig = [
  {
    input: 'packages/others/src/index.ts',
    output: [
      {
        file: 'packages/others/dist/others.cjs.js',
        format: 'cjs'
      },
      {
        file: "packages/others/dist/others.umd.js",
        format: 'umd',
        name: 'Others'
      }
    ],
    plugins: [
      postcss({
        extensions: [ '.css', '.scss', '.sass' ],
        inject: false,
        extract: false,
      }),
      resolve(),
      replace({
        __DEV__: `${__PROD__}`
      }),
      typescript({
        typescript: require('typescript'),
      }),
    ]
  }
]

if (__PROD__) {
  rollupConfig[0].plugins.push(terser())
}

export default rollupConfig