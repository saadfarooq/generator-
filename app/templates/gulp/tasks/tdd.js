var gulp  = require('gulp'),
  karma   = require('karma').server,
  config  = require('../config');

gulp.task('tdd', ['bower'], function(done) {
  karma.start({
    files: config.globs.test,
    singleRun: false
  }, function() {
    done();
  });
});
