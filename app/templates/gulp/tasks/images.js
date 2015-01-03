var gulp = require('gulp');

gulp.task('images', function() {
  gulp.src(paths.images + '/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(dest('images'));
});
