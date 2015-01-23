var gulp  = require('gulp'),
  sass    = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  config  = require('../config');

// wiring the sass deps
gulp.task('css', function() {
  gulp.src(config.globs.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(config.dest.css));
});
