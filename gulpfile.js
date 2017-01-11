const gulp = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const minimist = require('minimist');
const rimraf = require('rimraf');

// ---------------------------------------------
// コマンドラインの入力を解析
// ---------------------------------------------

const knownOptions = {
  string: 'env',
  default: {env: 'development'}
};
const options = minimist(process.argv.slice(2), knownOptions);
const isProduction = (options.env === 'production') ? true : false;
const isStaging = (options.env === 'staging') ? true : false;
const isDevelopment = (options.env === 'development') ? true : false;

// ---------------------------------------------
// build タスク
// ---------------------------------------------

gulp.task('clean', function(cb) {
  return rimraf('./dist', cb);
});

gulp.task('pug', function() {
  return gulp.src('./src/**/index.pug')
    .pipe(plumber())
    .pipe(pug({
      basedir: './src/_html/',
      pretty: true,
      data: {
        isProduction: isProduction,
        isStaging: isStaging,
        isDevelopment: isDevelopment
      }
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['clean'], function() {
  return gulp.start(['pug']);
});

gulp.task('default', ['build']);
