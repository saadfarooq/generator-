var gulp  = require('gulp'),
  connect = require('gulp-connect'),
  debug   = require('gulp-debug'),
  config  = require('../config');

gulp.task('server', ['build'], function() {
  connect.server({
    root: config.buildFolder,
    port: 9000,
    livereload: true
  });

  gulp.watch('./bower.json', ['bower', 'wiresass']);
  gulp.watch(config.globs.js, ['js']);
  gulp.watch(config.globs.common, ['commonjs']);
  gulp.watch(config.globs.html, ['html']);
  gulp.watch(config.globs.sass, ['css']);
  gulp.watch(config.globs.build, function() {
    return gulp.src('').pipe(connect.reload());
  });
});

