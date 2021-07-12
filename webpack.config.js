const path = require("path");
// const { isExpressionStatement } = require("typescript");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/client/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        // include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "public",
    // compress: true,
    // port: 8080,
    // publicPath: "/public/",
    // proxy: {
    //   "/": {
    //     target: "http://localhost:3000",
    //   },
    //   "/api/**": {
    //     target: "http://localhost:3000",
    //     secure: false,
    //   },
    // },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.join(__dirname, "public"),
  },
};
