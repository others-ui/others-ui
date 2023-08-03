import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

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
        file: 'packages/others/dist/others.esm.js',
        format: 'esm'
      },
      {
        file: "packages/others/dist/others.umd.js",
        format: 'umd',
        name: 'Others'
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
        baseUrl: "./packages/others",
        tsconfig: "./packages/others/tsconfig.json",
        typescript: require('typescript'),
      }),
    ]
  },
  
  {
    input: 'packages/others-react/src/index.tsx',
    output: [
      {
        file: 'packages/others-react/dist/others-react.cjs.js',
        format: 'cjs'
      },
      {
        file: "packages/others-react/dist/others-react.umd.js",
        format: 'umd',
        name: 'OthersReact'
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
        baseUrl: "./packages/others-react",
        tsconfig: "./packages/others-react/tsconfig.json",
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