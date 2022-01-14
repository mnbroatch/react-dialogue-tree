import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'

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
      babel({
        exclude: /node_modules\/(?!yarn-bound|@mnbroatch).+/
      }),
      scss({ outputStyle: 'compressed' }),
      terser()
    ]
  }
]

export default config
