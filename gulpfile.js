const { series, parallel } = require('gulp');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

function cleanTask(cb) {
  // body omitted
  cb();
}

function cssTask(cb) {
  // body omitted
  cb();
}

function browserifyTask(cb) {
  browserify({
    entries: 'app.js',
    debug: true
  })
    .bundle()
    .on('error', err => {
      gutil.log("Browserify Error", gutil.colors.red(err.message))
    })
    .pipe(source('app.min.js'))
    .pipe(buffer())
//    .pipe(uglify())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
    cb();
}

//gulp.task('default', series(cleanTask, parallel(browserifyTask)), done => done());
exports.default = series(cleanTask, parallel(browserifyTask));