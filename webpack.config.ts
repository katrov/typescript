const path = require("path");

const SRC_PATH = path.join(__dirname, '../typescript/src');
const NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules');
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  // entry: './src/index.ts',
  entry: {
    basic: path.join(SRC_PATH, '/01_basic_types/index.ts'), 
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader?configFile=tsconfig.webpack.json',
            options: {
              transpileOnly: false,
            },
          },
        ],
        exclude: NODE_MODULES_PATH,
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', 'json']
  },
  output: {
    path: DIST_PATH,
    filename: 'index.js'
  },
};