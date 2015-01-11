var gulp  = require('gulp'),
  connect = require('gulp-connect'),
  config  = require('../config');

gulp.task('watch', ['connect'], function() {
  gulp.watch('./bower.json', ['bower']);
  gulp.watch(config.globs.js, ['js']);
  gulp.watch(config.globs.common, ['commonjs']);
  gulp.watch(config.globs.html, ['html']);
  gulp.watch(config.globs.build, function() {
    return gulp.src('').pipe(connect.reload());
  });
});
