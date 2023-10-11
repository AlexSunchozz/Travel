const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Плагин для работы с HTML
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Плагин для того, чтобы сборка в папке dist всегда была свежей и файлы не кешировались

module.exports = {
  // Режим сборки проекта
  mode: "development",

  // Входная точка проекта
  entry: {
    main: "./src/js/index.js",
  },

  // Выходная точка проекта
  output: {
    filename: "[name].[contenthash].js", // Имя файла после сборки (можно использовать bondle.js, но для корректной сборки обычно используют [name].[contenthash].js для получения уникального имени итогового файла)
    path: path.resolve(__dirname, "dist/js"), // Куда сохраняются файлы webpack
  },

  // Запуск локального сервера и открытие вкладки браузера (изменения в коде автоматически подтягиваются)
  devServer: {
    port: 3000,
  },

  // Подключение модулей для обработки различных файлов
  module: {
    rules: [
      // Babel
      // {
      //   test: /\.(?:js|mjs|cjs)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         ['@babel/preset-env', { targets: "defaults" }]
      //       ]
      //     }
      //   }
      // },

      // Файлы стилей
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      // Файлы изображений
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/[name].[ext]",
            },
          },
        ],
      },

      // С сохранением структуры папок (сохраниться папка src/assets/img/<имя файла>.<расширение>)
      // {
      //     test: /\.(png|jpe?g|gif)$/i,
      //     loader: 'file-loader',
      //     options: {
      //         name: '[path][name].[ext]',
      //     },
      // },

      // Файлы шрифтов
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //           outputPath: '/assets/fonts',
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      // },
    ],
  },

  // Подключение плагинов
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/html/index.html"),
      filename: "index.[contenthash].html",
    }),
    new CleanWebpackPlugin(),
  ],
};
