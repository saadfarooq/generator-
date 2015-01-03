var gulp  = require('gulp'),
  config  = require('../config'),
  wiredep = require('wiredep').stream,
  fileInclude = require('gulp-file-include');

gulp.task('html', function() {
  gulp.src(config.globs.html)
    .pipe(fileInclude({
      basepath: config.src.includes
    }))
    .pipe(gulp.dest(config.dest.html));
});
