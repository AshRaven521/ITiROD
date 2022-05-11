const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.[chunkhash].js",
    assetModuleFilename: "src/assets/images/[name][ext]",
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HTMLPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: "html-withimg-loader",
      },
    ],
  },
};
