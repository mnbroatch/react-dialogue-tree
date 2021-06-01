import babel from 'rollup-plugin-babel' 
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss'

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
    babel({ exclude: "node_modules/**" }),
    postcss({ plugins: [] }),
    terser()
  ]
}
export default config
