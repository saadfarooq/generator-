var gulp  = require('gulp'),
  config  = require('../config'),
  debug   = require('gulp-debug'),
  concat  = require('gulp-concat');

gulp.task('js', function() {
  gulp.src(config.globs.js)
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('commonjs', function() {
  gulp.src(config.globs.common)
    .pipe(debug({title: 'commonjs'}))
    .pipe(concat('common.js'))
    .pipe(gulp.dest(config.dest.js));
});
