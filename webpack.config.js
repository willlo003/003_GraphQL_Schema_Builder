const path = require("path");


module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    publicPath: "/public/",
    filename: "bundle.js",
    path: path.join(__dirname, "public"),
  },
  mode: process.env.NODE_ENV,
  devServer: {
    port: 8080,
    publicPath: "/public/",
    proxy: {
      "/": {
        target: "http://localhost:3000",
        // changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:3000/",
        secure: false,
        pathRewrite: { "^/api": "" },
      },
      // "/**": {
      //   target: "http://localhost:3000/",
      //   secure: false,
      // },
    },
  },
  module: {
    rules: [
      // ts-loader can convert TS (ES6) to JS (ES6), however,
      // babel/preset-typescript can replace it
      // convert JS (ES6) to JS (ES5)
      {
        test: /\.(ts|js)x?$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
        // include: [path.resolve(__dirname, "src")],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"],
      },
    ],

  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  devtool: "source-map",
};
