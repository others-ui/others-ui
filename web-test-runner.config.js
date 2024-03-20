import { esbuildPlugin } from '@web/dev-server-esbuild'

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
  nodeResolve: true,
  files: './packages/*/src/**/__tests__/*.test.ts',
  plugins: [esbuildPlugin({ ts: true, tsconfig: './tsconfig.json' })],
}
