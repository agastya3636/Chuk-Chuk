import path from 'path';

export default {
  entry: '/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
