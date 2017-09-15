const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const RelayCompilerWebpackPlugin = require('relay-compiler-webpack-plugin')
const webpack = require('webpack');
const merge = require('webpack-merge');
const glob = require('glob');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const common = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'LifeApp',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['app', 'node_modules'],
    },
  },
  // parts.lintCSS({ include: PATHS.app }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.loadFonts({
    options: {
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.loadJavaScript({ include: PATHS.app, exclude: path.resolve(__dirname, 'node_modules') }),
]);

function production() {
  return merge([
    common,
    {
      performance: {
        hints: 'warning', // 'error'|'warning'|false
        maxEntrypointSize: 100000, // bytes
        maxAssetSize: 50000, // bytes
      },
      output: {
        chunkFilename: 'scripts/[chunkhash:8].js',
        filename: '[name].[chunkhash:8].js',
      },
      plugins: [
        new webpack.HashedModuleIdsPlugin(),
      ],
    },
    parts.clean(PATHS.build),
    // parts.minifyJavaScript({ useSourceMap: true }),
    // parts.minifyCSS({
    //   options: {
    //     discardComments: {
    //       removeAll: true,
    //     },
    //   },
    // }),
    parts.extractBundles({
      bundles: [
        {
          name: 'vendor',
          entries: ['react'],
        },
        {
          name: 'manifest',
        },
      ],
    }),
    // parts.lintJavaScript({ include: PATHS.app }),
    parts.extractCSS({
      use: ['css-loader', parts.autoprefix()],
    }),
    parts.purifyCSS({
      paths: glob.sync(path.join(PATHS.app, '**', '*')),
    }),
    parts.setFreeVariable(
      'process.env.NODE_ENV',
      'production'
    ),
  ]);
}

function development() {
  return merge([
    common,
    {
      plugins: [
        new webpack.NamedModulesPlugin(),
      ],
    },
    parts.devServer({
      host: process.env.HOST,
      port: process.env.PORT,
    }),
    { devtool: 'source-map' },
    // parts.lintJavaScript({
    //   include: PATHS.app,
    //   options: {
    //     emitWarning: true,
    //   },
    // }),
    parts.loadCSS(),
  ]);
}

function react() {
  return {
    entry: {
      app: PATHS.app,
    },
    plugins: [
      // new RelayCompilerWebpackPlugin({
      //   schema: path.resolve(__dirname, './data/schema.graphql'), // or schema.json
      //   src: path.resolve(__dirname, './app'),
      // }),
      new HtmlWebpackPlugin({
        template: HtmlWebpackTemplate,
        title: 'LifeApp',
        filename: 'index.html',
        appMountId: 'app',
        mobile: true,
        inject: false,
      }),
    ],
  };
}

function reactDevelopment() {
  return {
    entry: {
      app: ['react-hot-loader/patch', PATHS.app],
    },
  };
}

module.exports = function(env) {
  console.log(['BABEL_ENV'], process.env.BABEL_ENV);
  console.log(['env'], env);
  if (!process.env.BABEL_ENV) {
    console.log('No BABEL_ENV. Setting up to env.');
    process.env.BABEL_ENV = env;
  }

  if (env === 'production') {
    return merge(production(), react());
  }

  return merge(development(), react(), reactDevelopment());
};
