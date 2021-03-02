const PACKAGE = require("./package.json");

const PATH = require("path");
const WEBPACK = require("webpack");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const BANNER = `
/*!
 * HTML Element Style v${PACKAGE.version} (https://github.com/Byloth/html-element-style.git)
 *
 *  -> Copyright © 2020 - 2021, Matteo Bilotta
 *  -> Licensed under GPL v3 (https://github.com/Byloth/html-element-style/blob/master/LICENSE)
 */
`;

module.exports = {
  entry: {
    "html-element-style": "./src/index.ts",
    "html-element-style.min": "./src/index.ts"
  },
  output: {
    path: PATH.resolve(__dirname, "dist/"),
    filename: "[name].js",
    library: "HTMLElementStyle",
    libraryExport: "default",
    libraryTarget: "assign"
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: { "@": PATH.resolve("src") }
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({ include: /\.min.js$/ })]
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new WEBPACK.BannerPlugin({
      banner: BANNER,
      raw: true
    })
  ]
};
