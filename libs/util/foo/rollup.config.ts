import {defineConfig} from 'rollup';
import typescript, { RollupTypescriptOptions } from '@rollup/plugin-typescript';
import {Plugin} from 'rollup';
import {add} from '@test/package';
// import {add} from '../javascript/src/index.ts';

function fooPlugin() {
  return {
    name: 'foo-plugin',
    renderChunk (source: string) {
      return {
        code: source.replace(/add\(1, 2\)/, `add(${add(1, 2)}, 2)`),
      };
    },
  };
}

export default defineConfig([
  {
    input: './src/lib/foo.ts',
    output: {
      file: '../../../dist/foo/index.ts',
      format: 'es',
      sourcemap: false
    },
    plugins: [
        (<(options?: RollupTypescriptOptions) => Plugin><unknown>typescript)({
          tsconfig: './tsconfig.lib.json',
          sourceMap: false,
          compilerOptions: {
            sourceMap: false
          }
        }),
        fooPlugin(),
    ],
  },
]);
