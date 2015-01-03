var gulp  = require('gulp');
  opn     = require('opn');

gulp.task('open', function() {
  opn('http://localhost:9000');
});
