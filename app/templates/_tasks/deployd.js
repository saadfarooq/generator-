var gulp = require('gulp'),
  deployd = require('deployd'),
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  debug = require('gulp-debug'),
  config = require('../config'),
  tinylr;

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('server', ['build'], function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(8002);
  // setup deployd
  require('deployd').attach(server, {
    // socketIo: io, // if not provided, attach will create one for you.
    server_dir: 'server',
    public_dir: 'build',
    env: 'development'
  });
  // After attach, express can use server.handleRequest as middleware
  app.use(require('connect-livereload')({port: 8002}));
  app.use(server.handleRequest);
  // start server
  server.listen(9000, function() {
    console.log('Development server listening on port: ' + 9000);
  });

  gulp.watch('./bower.json', ['bower', 'wiresass']);
  gulp.watch(config.globs.js, ['js']);
  gulp.watch(config.globs.common, ['commonjs']);
  gulp.watch(config.globs.html, ['html']);
  gulp.watch(config.globs.sass, ['css']);
  gulp.watch(config.globs.build, notifyLiveReload);
});
