import { esbuildPlugin } from '@web/dev-server-esbuild'

export default {
  files: './**/__test__/*.test.ts',
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true })],
}