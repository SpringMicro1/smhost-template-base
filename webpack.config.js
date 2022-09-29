const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const dotenv = require("dotenv");
// const { DefinePlugin } = require("webpack");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "app.js"),
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./public/build"),
    filename: "main.js",
    library: ["sheetsInit"],
  },
};
