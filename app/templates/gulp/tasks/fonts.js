var gulp = require('gulp');

gulp.task('fonts', function() {
  gulp.src(paths.fonts + '/**/*')
    .pipe($.flatten())
    .pipe(dest('fonts'));
});
