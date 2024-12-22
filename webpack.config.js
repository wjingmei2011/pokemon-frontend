const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/views/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new htmlWebpackPlugin(
      { template: './src/views/public/index.html',
        inject: true,
      }
    )
  ],
  devServer: {
    static: './dist',
    port: 8000,
    open: true,
    proxy: process.env.NODE_ENV === 'development'?
      [
        {
          context: ['/pokemon'],
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false
        }
      ]: undefined
  },
  mode: process.env.NODE_ENV || 'development'
};