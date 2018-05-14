// Karma configuration
// Generated on Sun Mar 25 2018 16:54:15 GMT+0800 (中国标准时间)
const webpack = require('webpack')

module.exports = function(config) {
  config.set({
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              'presets': [
                ['env', {
                  'targets': {
                    'node': 4,
                  },
                }],
                'flow',
              ],
              'plugins': [
                'transform-object-rest-spread',
                'transform-runtime',
              ],
            },
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: 'development',
          },
        }),
      ],
      devtool: '#inline-source-map',
    },
    webpackMiddleware: {
      noInfo: true,
    },
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    preprocessors: {
      './src/handlers/__tests__/renderHandler-test.js': ['webpack', 'sourcemap'],
      // './src/resolver/__tests__/findAllComponentDefinitions-test.js': ['webpack', 'sourcemap'],
      // './src/utils/__tests__/resolveToValue-test.js': ['webpack', 'sourcemap'],
      
    },
    
    // list of files / patterns to load in the browser
    // list of files / patterns to load in the browser
    files: [
      // 'test/libs/helpers.js',
      './src/handlers/__tests__/renderHandler-test.js',
      // './src/resolver/__tests__/findAllComponentDefinitions-test.js',
      // './src/utils/__tests__/resolveToValue-test.js',
    ],
    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    plugins: [
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-chrome-launcher',
    ],
  })
}
