const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.tsx?/,
        // exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader',
          'postcss-loader'
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './client'),
    },
    proxy: [
      {
        context: ['/'],
        target: 'http://localhost:3000',
        changeOrigin: true,
        logLevel: 'info',
      },
    ],
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
};
