import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'
import resolve from 'rollup-plugin-node-resolve'

const config = [
  {
    input: 'src/index.js',
    external: ['react'],
    output: {
      format: 'umd',
      file: 'dist/react-dialogue-tree.js',
      name: 'ReactDialogueTree'
    },
    plugins: [
      resolve({
        only: ['yarn-bound', /^@mnbroatch\/.*$/]
      }),
      babel({
        exclude: /node_modules\/(?!yarn-bound|@mnbroatch).+/
      }),
      scss()
    ]
  },
  {
    input: 'src/index.js',
    external: ['react'],
    output: {
      format: 'umd',
      file: 'dist/react-dialogue-tree.min.js',
      name: 'ReactDialogueTree'
    },
    plugins: [
      resolve({
        only: ['yarn-bound', /^@mnbroatch\/.*$/]
      }),
      babel({
        exclude: /node_modules\/(?!yarn-bound|@mnbroatch).+/
      }),
      scss({ outputStyle: 'compressed' }),
      terser()
    ]
  }
]

export default config
