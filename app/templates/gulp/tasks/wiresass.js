var gulp = require('gulp'),
  wiredep = require('wiredep').stream,
  config  = require('../config');

gulp.task('wiresass', function() {
  gulp.src(config.globs.sass)
    .pipe(wiredep())
    .pipe(gulp.dest(config.src.sass));
});
