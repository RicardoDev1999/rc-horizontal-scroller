import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import autoprefixer from 'autoprefixer';
import postcssRTL from 'postcss-rtl';

import pkg from './package.json';

export default [
  // ESM and CJS builds
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      postcss({
        extract: true,
        minimize: true,
        sourceMap: false,
        use: ['less'],
        plugins: [
          autoprefixer({
            grid: true,
            flexbox: true
          }),
          postcssRTL()
        ]
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      resolve(),
      commonjs(),
      terser()
    ],
    external: Object.keys(pkg.peerDependencies || {})
  },
  // UMD build for direct browser use
  {
    input: 'src/index.js',
    output: {
      file: pkg.unpkg,
      format: 'umd',
      name: 'ReactInfiniteSlider',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },
      sourcemap: true
    },
    plugins: [
      peerDepsExternal(),
      postcss({
        extract: true,
        minimize: true,
        sourceMap: false,
        use: ['less'],
        plugins: [
          autoprefixer({
            grid: true,
            flexbox: true
          }),
          postcssRTL()
        ]
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      resolve(),
      commonjs(),
      terser()
    ],
    external: Object.keys(pkg.peerDependencies || {})
  }
];