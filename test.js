import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss-modules";
import packageJson from "./package.json" assert { type: "json" };

export default {
  input: "src/index.js", // All of your library files will be named exports from here
  output: [
    {
      // This is an easy way to keep your `main` in sync between rollup & the package
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      assetFileNames: "[name]-[hash][extname]",
    },
  ],
  plugins: [
    // This prevents needing an additional `external` prop in this config file by automaticall excluding peer dependencies
    peerDepsExternal(),
    // Convert CommonJS modules to ES6
    commonjs({
      include: "node_modules/**",
      // This was required to fix some random errors while building
    }),
    // "...locates modules using the Node resolution algorithm"
    resolve(),
    // Do Babel transpilation
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    postcss({
      plugins: [],
      writeDefinitions: true, // write CSS modules definitions to a separate file
      modules: {
        generateScopedName: "[local]__[hash:base64:5]", // customize the class names
      },
    }),
  ],
};
