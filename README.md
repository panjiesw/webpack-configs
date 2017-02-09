# Webpack Configs

Various slightly opinionated shared webpack configurations to help you survive.
Particularly useful with tools like [webpack-merge](https://www.npmjs.com/package/webpack-merge).

<!-- TOC -->

- [Webpack Configs](#webpack-configs)
	- [Why?](#why)
	- [Requirements](#requirements)
	- [Installation](#installation)
	- [Usage](#usage)
	- [Shared Configuration Parts](#shared-configuration-parts)
		- [`devServer(options?: DevServer)`](#devserveroptions-devserver)
		- [`javascript(options?: {include?, exclude?, options?})`](#javascriptoptions-include-exclude-options)
		- [`javascript.lint(options?: {include?, exclude?, options?})`](#javascriptlintoptions-include-exclude-options)
		- [`typescript(options?: {include?, exclude?, options?})`](#typescriptoptions-include-exclude-options)
		- [`style(options: {test, include, exclude})`](#styleoptions-test-include-exclude)
			- [`style.css(options?)`](#stylecssoptions)
			- [`style.post(options?)`](#stylepostoptions)
			- [`style.less(options?)`](#stylelessoptions)
			- [`style.sass(options?)`](#stylesassoptions)
			- [Using `extract-text-webpack-plugin`](#using-extract-text-webpack-plugin)
	- [Contribution](#contribution)
	- [License](#license)

<!-- /TOC -->

## Why?

1. Specifically for my lazy self use case to not repeat common config over and over again.
2. Maybe for you who have similarly use case as mine.
3. More composed build.


## Requirements

- Node JS >= 6 LTS
- Webpack >= 2.2.0

## Installation

with npm

```
npm install -D webpack webpack-merge webpack-configs
```

with yarn

```
yarn add -D webpack webpack-configs
```

This will not include any loader dependencies used in the shared configurations.
You will have to install them separately.

## Usage

```javascript
const shared = require('webpack-configs');
// dev server
shared.devServer(options);
// javascript with babel-loader
shared.javascript(options);
// javascript linting with eslint-loader
shared.javascript.lint(options);
// style loaders
shared.style(options)
  .use(shared.style.css({importLoaders: 1}))
  .use(shared.style.post());
```

These configurations are best used with `webpack-merge`.

```javascript
// webpack.config.js
const webpack = require('webpack');
const merge = require('webpack-merge');
const shared = require('webpack-configs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        title: 'Webpack demo',
      }),
    ],
  },
]);

function production() {
  return merge([
    common,
    shared.javascript.lint({ include: PATHS.app }),
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
    shared.devServer(),
    shared.javascript.lint({
      include: PATHS.app,
      options: {
        emitWarning: true,
      },
    }),
  ]);
}

module.exports = function(env) {
  if (env === 'production') {
    return production();
  }

  return development();
};
```

See more about composing webpack configuration in [this SurviveJS page](http://survivejs.com/webpack/developing-with-webpack/composing-configuration/).

## Shared Configuration Parts

### `devServer(options?: DevServer)`

Returns webpack configuration which include `devServer` and `webpack.HotModuleReplacementPlugin`.

- [optional] `options` - [DevServer](https://webpack.js.org/configuration/dev-server/) options with some defaults set below
  - `host` - use `process.env.HOST` if set, or webpack defaults otherwise (`'localhost'`)
  - `port` - use `process.env.PORT` if set, or webpack defaults otherwise (`8080`)
  - `historyApiFallback` - defaults to `true`
  - `stats` - defaults to `'errors-only'`
  - `publicPath` - defaults to `'/'`
  - `contentBase` - defaults to `public` dir relative to `process.cwd()`
  - `hotOnly` - defaults to `true`

```javascript
shared.devServer() ===
{
  devServer: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    stats: 'errors-only',
    publicPath: '/',
    contentBase: `${process.cwd()}/public`,
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}
```

### `javascript(options?: {include?, exclude?, options?})`

Returns webpack configuration which include `module.rules` with `babel-loader`.

_**NOTES**_: You must add `babel-loader` dependency to use this.

- [optional] `options` - [Rule Config](https://webpack.js.org/configuration/module/#rule) to be applied
  - `exclude` - Resource to [exclude](https://webpack.js.org/configuration/module/#rule-exclude)
  - `include` - Resource to [include](https://webpack.js.org/configuration/module/#rule-include)
  - `options` - [Options](https://github.com/babel/babel-loader#options) passed to `babel-loader`

```javascript
shared.javascript({include: path.resolve(__dirname, 'src')}) ===
{
  module: {
    rules: [{
      test: /\.js(x?)$/,
      loader: 'babel-loader',
      include: './src'
    }]
  }
}
```

### `javascript.lint(options?: {include?, exclude?, options?})`

Returns webpack configuration which include `module.rules` with `eslint-loader`.

_**NOTES**_: You must add `eslint-loader` dependency to use this.

- [optional] `options` - [Rule Config](https://webpack.js.org/configuration/module/#rule) to be applied
  - `exclude` - Resource to [exclude](https://webpack.js.org/configuration/module/#rule-exclude)
  - `include` - Resource to [include](https://webpack.js.org/configuration/module/#rule-include)
  - `options` - [Options](https://github.com/MoOx/eslint-loader#options) passed to `eslint-loader`

```javascript
shared.javascript.lint({include: path.resolve(__dirname, 'src')}) ===
{
  module: {
    rules: [{
      test: /\.js(x?)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: './src'
    }]
  }
}
```

### `typescript(options?: {include?, exclude?, options?})`

Returns webpack configuration which include `module.rules` with `awesome-typescript-loader`.

_**NOTES**_: You must add `awesome-typescript-loader` dependency to use this.

- [optional] `options` - [Rule Config](https://webpack.js.org/configuration/module/#rule) to be applied
  - `exclude` - Resource to [exclude](https://webpack.js.org/configuration/module/#rule-exclude)
  - `include` - Resource to [include](https://webpack.js.org/configuration/module/#rule-include)
  - `options` - [Options](https://github.com/s-panferov/awesome-typescript-loader#loader-options) passed to `awesome-typescript-loader`

```javascript
shared.typescript({include: path.resolve(__dirname, 'src')}) ===
{
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'awesome-typescript-loader',
      include: './src'
    }]
  },
  plugins: [
    new require('awesome-typescript-loader').CheckerPlugin(),
    new require('awesome-typescript-loader').TsConfigPathsPlugin()
  ]
}
```

### `style(options: {test, include, exclude})`

Returns webpack configuration which include `module.rules` with `style-loader`.

_**NOTES**_: You must add `style-loader` dependency to use this.

- **required** `options` - [Rule Config](https://webpack.js.org/configuration/module/#rule) to be applied
  - `exclude` - Resource to [exclude](https://webpack.js.org/configuration/module/#rule-exclude)
  - `include` - Resource to [include](https://webpack.js.org/configuration/module/#rule-include)
  - `test` - Resource [test](https://webpack.js.org/configuration/module/#rule-test)
- methods:
  - `use(loader, options?)` - Chain `style-loader` with other commonly used style related loaders.
      - **required** `loader` - The loader to use, e.g `'css-loader'`. Or one of predefined loaders described below.
      - [optional] options - Options passed to the loader.
  - `extract(options?)` - Transform the configuration to use `extract-text-webpack-plugin`. More info [below](#using-extract-text-webpack-plugin).
      - [optional] options - [Options](https://github.com/webpack-contrib/extract-text-webpack-plugin#options) passed to instantiate the `extract-text-webpack-plugin`.

```javascript
shared.style({test: /\.css$/}) ===
{
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader']
    }]
  }
}
```

You can chain with other shared style config below to make a `use` style loaders chain, e.g. with prepocessor loader.

_**NOTES**_: The order of chain call matters.

```javascript
shared.style({test: /\.css$/}).use(shared.style.css());
```

Below are the list of available method to chain

#### `style.css(options?)`

Chain `style-loader` with `css-loader`.

_**NOTES**_: You must add `css-loader` dependency to use this.

- [optional] `options` - [Options](https://github.com/webpack-contrib/css-loader#options) for `css-loader`

```javascript
shared.style({test: /\.css$/}).use(shared.style.css({modules: true})) ===
{
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      ]
    }]
  }
}
```

#### `style.post(options?)`

Chain `style-loader`, `css-loader`, with `postcss-loader`.

_**NOTES**_: You must add `postcss-loader` dependency to use this. <br/>
_**NOTES**_: Because the loader chain matters, you must call this after including `css-loader`.

- [optional] `options` - [Options](https://github.com/postcss/postcss-loader#options for `postcss-loader`

```javascript
shared.style({test: /\.css$/})
  .use(shared.style.css({modules: true}))
  .use(shared.style.post()) ===
{
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        'postcss-loader'
      ]
    }]
  }
}
```

#### `style.less(options?)`

Chain `style-loader`, `css-loader`, with `less-loader`.

_**NOTES**_: You must add `less-loader` dependency to use this. <br/>
_**NOTES**_: Because the loader chain matters, you must call this after including `css-loader`.

- [optional] `options` - [Options](https://github.com/webpack-contrib/less-loader#options) for `less-loader`

```javascript
shared.style({test: /\.css$/})
  .use(shared.style.css({modules: true}))
  .use(shared.style.less()) ===
{
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        'less-loader'
      ]
    }]
  }
}
```

#### `style.sass(options?)`

Chain `style-loader`, `css-loader`, with `sass-loader`.

_**NOTES**_: You must add `sass-loader` dependency to use this. <br/>
_**NOTES**_: Because the loader chain matters, you must call this after including `css-loader`.

- [optional] `options` - [Options](https://github.com/jtangelder/sass-loader#examples) for `sass-loader`

```javascript
shared.style({test: /\.css$/})
  .use(shared.style.css({modules: true}))
  .use(shared.style.sass()) ===
{
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        'sass-loader'
      ]
    }]
  }
}
```

#### Using `extract-text-webpack-plugin`

You can call the `extract` method as the last chain to transform the configuration
to use `extract-text-webpack-plugin` instead. This will also include the plugin instance
in `plugins` webpack array.

```javascript
// You can use styleConfig in other config, e.g for development and test
const styleConfig = shared.style({test: /\.css$/})
  .use(shared.style.css({modules: true}))
  .use(shared.style.post())
  .use(shared.style.sass())

// Then for a specific build config, you want it to use `extract-text-webpack-plugin`
const extracted = styleConfig.extract({filename: '[name].[contenthash].css'}) ===
{
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      })
    }]
  },
  // plugins included
  plugins: [
    new ExtractTextPlugin({filename: '[name].[contenthash].css'})
  ]
}
```

## Contribution

The included shared configs are non exhaustive, if you have some configurations you want to share
please drop an issue.

## License

MIT
