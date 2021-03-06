const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: `${__dirname}/client/source/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js(\?.*)?$/i,
      minRatio: 0.8,
      filename(info) {
        return `${info.path}.gz${info.query}`;
      },
    }),
  ],
};
