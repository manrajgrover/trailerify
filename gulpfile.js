const gulp = require('gulp');
const browserify = require('gulp-browserify');

/**
 * Browserifies JavaScript for distribution
 */
gulp.task('scripts', () => {
  gulp.src('src/js/main.js')
    .pipe(browserify({
      debug: true,
    }))
    .pipe(gulp.dest('./dist/js'));
});

/**
 * Copies images from source to distribution
 */
gulp.task('copyImg', () => {
  gulp.src('src/img/*')
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('watch', () => {
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/img/*', ['copyImg']);
});

/**
 * Gulp default task for running other tasks
 */
gulp.task('default', ['copyImg', 'scripts'], () => {
  console.log('Building project!');
});
