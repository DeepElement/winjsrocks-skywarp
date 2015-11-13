var gulp = require('gulp'),
  del = require('del'),
  mocha = require('gulp-mocha'),
  async = require('async'),
  runSequence = require('gulp-run-sequence'),
  rimraf = require('rimraf'),
  WebpackDevServer = require("webpack-dev-server"),
  compress = require('compression'),
  gutil = require("gulp-util"),
  webpack = require("webpack"),
  webpackConfig = require("./webpack.config.js"),
  packageConfig = require('./package.json');

gulp.task("dist:clean", function(cb) {
  del([
    'dist'
  ], cb);
});

gulp.task("test", function() {
  return gulp.src('test/**/*.js', {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec',
      timeout: 60000
    }));
});

gulp.task("dist", function(cb) {
  var args = ['dist:clean',
    'dist:web-client:deploy:sources',
    'dist:server:deploy:sources'
  ];

  if (process.env.NODE_ENV == "production")
    args.push("dist:package:release");
  else
    args.push("dist:package:debug");

  args.push(cb);
  runSequence.apply(this, args);
});

gulp.task('dist:server:deploy:sources', ['dist:web-client:deploy:sources'], function() {
  return gulp.src([
      'deploy/server/**'
    ])
    .pipe(gulp.dest('./dist/server'));
});

gulp.task('dist:web-client:deploy:sources', function() {
  return gulp.src([
      'package/web-client/**',
      'src/**/*.*',
      '!src/*.js',
      '!src/component/**',
      '!src/css/**',
      '!src/view/**/*.js'
    ])
    .pipe(gulp.dest('./dist/web-client'));
});

gulp.task("dist:package:release", function(cb) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins || [];
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    cb();
  });
});

gulp.task("dist:package:debug", function(cb) {
  // modify some webpack config options
  var myDevConfig = Object.create(webpackConfig);
  //myDevConfig.devtool = "eval";
  myDevConfig.debug = true;
  myDevConfig.watch = true;

  // create a single instance of the compiler to allow caching
  var devCompiler = webpack(myDevConfig);

  // run webpack
  devCompiler.run(function(err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    cb();
  });
});

gulp.task("web:watch", ['dist'], function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  //myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    contentBase: "dist/web-client",
    hot: true,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/default.html");
  });
});

gulp.task("dist:clean", function(cb) {
  rimraf('./dist', cb);
});
