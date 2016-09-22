const gulp = require('gulp');
const browserify = require('gulp-browserify');

/**
 * Browserifies JavaScript for distribution
 */
gulp.task('scripts', () => {
  gulp.src('src/js/main.js')
    .pipe(browserify({
      debug : true
    }))
    .pipe(gulp.dest('./dist/js'))
});

/**
 * Copies images from source to distribution
 */
gulp.task('img', () => {
  gulp.src('src/img/*')
    .pipe(gulp.dest('./dist/img'));
});

/**
 * Copies CSS from source to distribution
 */
gulp.task('copyCSS', () => {
  gulp.src('src/css/*.css')
    .pipe(gulp.dest('./dist/css'));
});

/**
 * Gulp default task for running other tasks
 */
gulp.task('default', ['img', 'copyCSS', 'scripts'],  () => {
  console.log("Building project!");
});
