import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  external: ['@mui/material', 'react', 'react-dom', 'react-map-gl', 'mapbox-gl'],
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions: ['.js', '.ts', '.tsx'] }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json', sourceMap: true }),
    postcss(),
  ],
};
