var gulp = require('gulp'),
  wiredep = require('wiredep').stream,
  bower   = require('gulp-bower'),
  uglify  = require('gulp-uglify'),
  concat  = require('gulp-concat'),
  gulpif  = require('gulp-if'),
  config  = require('../config'),
  bowerFiles = require('main-bower-files');

gulp.task('prune', function(done) {
  // we prune on each run to ensure dependencies removed from bower.json
  // are also removed from local components
  bower({
    cmd: 'prune'
  });
  // callback ensures task is run before dependent tasks
  done();
});

gulp.task('bower', ['prune'], function() {
  // return ensures task is run before dependent tasks
  return gulp.src(bowerFiles({
    filter: '**/*.js',
    includeDev: config.includeDev
  }))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(config.prod, uglify()))
    .pipe(gulp.dest(config.dest.js));
});
