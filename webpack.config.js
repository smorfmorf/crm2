//тк мы используем NodeJs тогда мы можем
const mode = process.env.NODE_ENV || "development";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const target = mode === "development" ? "web" : "browserslist";
const devtool = mode === "development" ? "source-map" : undefined;

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode,
  target,
  devtool,
  //пересборка при изменении чего-либо в проекте
  devServer: {
    static: {
      directory: path.join(__dirname, "img"),
    },
    hot: true,
    port: 8081,
  },

  //точка входа
  entry: ["@babel/polyfill", "./src/script/app.js"],
  //результат сборки
  output: {
    filename: "[name][contenthash].js",
    //куда складываем готовые файлы
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
  },

  //htmlWebpackPlugin
  plugins: [
    new HtmlWebpackPlugin({
      //файл из которого собираем html
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({ filename: "[name][contenthash].css" }),

    // Добавляем конфигурацию CopyWebpackPlugin
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/img", // папка с изображениями
          to: "assets", // папка назначения (внутри output.path)
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        //определяем что файл является стилем
        test: /\.(sa|sc|c)ss$/i,
        //важен порядок - идет снизу вверх
        use: [
          MiniCssExtractPlugin.loader, //минифицирует
          "css-loader", //загружаем css в js
          "postcss-loader", //добавляем префикс
          "sass-loader", //из scss делаем css
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff2|woff|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        //тк nodemodules не нужно прогонять через babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
