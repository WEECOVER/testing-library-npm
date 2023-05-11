import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import postcss from "rollup-plugin-postcss-modules";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import packageJson from "./package.json" assert { type: "json" };

const isProduction = process.env.NODE_ENV === "production";

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    preventAssignment: true,
  }),
  postcss({
    plugins: [],
    writeDefinitions: true, // write CSS modules definitions to a separate file
    modules: {
      generateScopedName: "[local]__[hash:base64:5]", // customize the class names
    },
  }),
  image(),
  resolve({
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  }),
  commonjs({
    include: "node_modules/**",
  }),
  babel({
    babelHelpers: "bundled",
    exclude: "node_modules/**",
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  }),
  sizeSnapshot(),
  peerDepsExternal(),
];

if (isProduction) {
  plugins.push(terser());
}

export default {
  input: "src/index.js",
  output: {
    // This is an easy way to keep your `main` in sync between rollup & the package
    file: packageJson.main,
    format: "cjs",
    sourcemap: true,
    assetFileNames: "[name]-[hash][extname]",
  },
  external: ["core-js"],
  plugins,
};
