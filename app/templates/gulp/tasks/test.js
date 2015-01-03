var gulp  = require('gulp'),
  karma   = require('karma').server,
  config  = require('../config');

gulp.task('test', ['bower'], function(done) {
  karma.start({
    configFile: config.karmaConf,
    files: config.globs.test,
    singleRun: true
  }, function() {
    done();
  });
});
