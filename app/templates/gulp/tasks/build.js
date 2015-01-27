var gulp = require('gulp'),
  gulpSequence = require('gulp-sequence');

gulp.task('build',
  gulpSequence(['bower', 'wiresass'],
               ['html', 'css', 'js', 'commonjs']));
