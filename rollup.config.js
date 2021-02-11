import typescript from "rollup-plugin-typescript";

export default {
  input: "src/plugin.ts",
  output: {
    format: "esm",
    file: "dist/molgenis-i18n-js.esm.js",
  },
  plugins: [
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: "es2015",
    })
  ]
}
