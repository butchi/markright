'use strict';

// import
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import decodecode from 'gulp-decodecode';
import browserSync from 'browser-sync';
import watch from 'gulp-watch';


// const
const SRC = './src';
const HTDOCS = './docs';
const DEST = './dist';


gulp.task('browserify', () => {
  return browserify(`${SRC}/markright.js`)
    .transform(babelify)
    .bundle()
    .pipe(source('markright.js'))
    .pipe(gulp.dest(`${DEST}`))
  ;
});

gulp.task('minify', () => {
  return gulp.src(`${DEST}/markright.js`)
    .pipe(uglify({}))
    .pipe(rename('markright.min.js'))
    .pipe(gulp.dest(`${DEST}`))
  ;
});

gulp.task('deco', () => {
  return gulp.src(`${DEST}/markright.js`)
    .pipe(decodecode({
      decoArr: ['m', 'a', 'r', 'k', 'r', 'i', 'g', 'h', 't'],
    }))
    .pipe(rename('markright.deco.js'))
    .pipe(gulp.dest(`${DEST}`))
    .pipe(gulp.dest(`${HTDOCS}/js/lib`))
  ;
});

gulp.task('js', gulp.series('browserify', gulp.parallel('minify', 'deco')));


gulp.task('browser-sync' , () => {
  browserSync({
    server: {
      baseDir: HTDOCS,
    },
    startPath: '/',
    ghostMode: false,
  });

  watch([`${SRC}/*.js`], gulp.series('js', browserSync.reload));
});

gulp.task('serve', gulp.series('browser-sync'));


gulp.task('build', gulp.series('js'));
gulp.task('default', gulp.series('build', 'serve'));
