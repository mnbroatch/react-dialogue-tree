import babel from 'rollup-plugin-babel' 
import { terser } from "rollup-plugin-terser";

const config = {
  input: 'src/index.js',
  external: ['react'],
  output: {
    format: 'umd',
    name: 'react-dialogue-tree',
    globals: {
      react: "React"
    }
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    terser()
  ]
}
export default config
