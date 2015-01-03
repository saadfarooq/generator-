var gulp  = require('gulp'),
  connect = require('gulp-connect'),
  config  = require('../config');

gulp.task('connect', function() {
  connect.server({
    root: config.buildFolder,
    port: 9000,
    livereload: true
  })
});
