var gulp  = require('gulp'),
  karma   = require('karma').server,
  config  = require('../config');

// for testing we include devDependencies in vendor.js
gulp.task('tdd', ['includeDev', 'bower'], function(done) {
  karma.start({
    files: config.globs.test,
    singleRun: false
  }, function() {
    done();
  });
});
