// const fs = require('fs');
const path = require('path');
// var process = require("process");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const languages = [
  'bg', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'ga', 'hr', 'hu', 'it', 'lt', 'lv', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'sl', 'sv',
];

const templates = languages.flatMap(lang => [
  `index_${lang}.html`,
  `accessibility-statement_${lang}.html`,
]);

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.sc|ass$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader', options: {
              url: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                ctx: {
                  cssnano: {},
                  autoprefixer: {},
                },
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              root: path.join(__dirname, 'src'),
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        // test: /\.(eot|ttf|woff|woff2|svg)$/,
        test: /\.(eot|ttf|woff|woff2)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash].[ext]', // where to save the file and how to name it
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[name].[hash].[ext]', // where to save the file and how to name it
              name: './[name].[ext]', // where to save the file and how to name it,
              outputPath: 'img',
            },
          },
          { loader: 'image-webpack-loader' },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }), // delete all files in 'dist' folder without deleting the folder itself
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunckFileName: '[id].css',
    }),
    ...templates.flatMap((fichier) => {
      return [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/' + fichier),
          inject: false,
          hash: true,
          minify: true,
          filename: fichier,
        }),
        // new HtmlWebpackPlugin({
        //   template: path.resolve(__dirname, './src/' + fichier),
        //   inject: false,
        //   hash: true,
        //   minify: true,
        //   filename: fichier.replace('.html', ''),
        // }),
      ];
    }),
  ],
};
