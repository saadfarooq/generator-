var gulp  = require('gulp'),
  karma   = require('karma').server,
  config  = require('../config');

// for testing we include devDependencies in vendor.js
gulp.task('test', ['includeDev', 'bower'], function(done) {
  karma.start({
    configFile: config.karmaConf,
    files: config.globs.test,
    singleRun: true
  }, function() {
    done();
  });
});
