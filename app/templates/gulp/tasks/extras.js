var gulp = require('gulp');

gulp.task('extras', function() {
  gulp.src([
    paths.src + '/*.*',
    '!' + paths.src + '*.html'
  ], {
    dot: true
  }).pipe(dest());
});
