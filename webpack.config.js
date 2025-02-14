const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@Api': path.resolve(__dirname, 'src/api/'),
      '@Components': path.resolve(__dirname, 'src/components/'),
      '@Context': path.resolve(__dirname, 'src/context/'),
      '@Core': path.resolve(__dirname, 'src/core/'),
      '@Views': path.resolve(__dirname, 'src/views/'),
      '@Utils': path.resolve(__dirname, 'src/utils/'),
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /\.test\.(ts|tsx)$/],
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '/fonts',
            },
          },
        ],
      },
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      failOnError: false, // Do not fail on errors
      emitWarning: true, // Emit warnings instead of errors
    }),
  ],
};