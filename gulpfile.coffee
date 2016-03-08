'use strict'

gulp = require 'gulp'
runSequence = require 'run-sequence'
source = require 'vinyl-source-stream';
browserify = require 'browserify';
babelify = require 'babelify';
debowerify = require 'debowerify';
rename = require 'gulp-rename'
uglify = require 'gulp-uglify'
decodecode = require 'gulp-decodecode'
plumber = require 'gulp-plumber'
notify = require 'gulp-notify'
webserver = require 'gulp-webserver'

gulp.task 'serve', () ->
  gulp.src '.'
    .pipe webserver
      livereload: true,
      directoryListing: false,
      open: true,
  gulp.watch 'src/markright.js', ['build']

gulp.task 'js', () ->
  return browserify('src/markright.js')
    .transform(babelify)
    .transform(debowerify)
    .bundle()
    .pipe(source('markright.js'))
    .pipe(gulp.dest('.'));

gulp.task 'minify', () ->
  gulp.src('markright.js')
    .pipe (uglify {
      preserveComments: 'license',
    })
    .pipe (rename 'markright.min.js')
    .pipe (gulp.dest '.')

gulp.task 'deco', () ->
  gulp.src('markright.js')
    .pipe (decodecode
      preserveComments: 'license',
      decoArr: ['m', 'a', 'r', 'k', 'r', 'i', 'g', 'h', 't']
    )
    .pipe (rename 'markright.deco.js')
    .pipe (gulp.dest '.')

gulp.task 'build', () ->
  runSequence ['js']
#  runSequence 'js', 'minify', 'deco'

gulp.task 'watch', () ->
  gulp.watch('src/markright.js', ['build'])

gulp.task 'default', ['build']
