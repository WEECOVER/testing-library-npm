const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");

const modeConfig = (env) => require(`./webpack.${env}.js`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return merge(
    {
      mode,
      devServer: {
        static: "./dist",
        compress: true,
        port: 8080,
        historyApiFallback: true,
      },
      resolve: {
        alias: {
          assets: path.resolve(__dirname, "src/assets"),
        },
      },
      module: {
        rules: [
          {
            test: /(\.js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg|pdf)$/,
            type: "asset/resource",
          },
        ],
      },
      plugins: [
        // This is important part
        new HtmlWebPackPlugin({
          template: "./public/index.html",
        }),
        new webpack.ProgressPlugin(),
        new Dotenv(),
      ],
    },
    modeConfig(mode)
  );
};
