import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import Dotenv from 'dotenv-webpack';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js',
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin(
      { template: './public/index.html',
        inject: true,
      }
    ),
    new Dotenv(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files from 'public'
    },
    port: 8000,
    open: true,
    proxy: 
        {
          context: ['/pokemon'],
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false
        }
  },
  mode: process.env.NODE_ENV || 'development'
};