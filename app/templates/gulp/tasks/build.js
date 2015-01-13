var gulp = require('gulp');

gulp.task('build', ['bower', 'html', 'wiresass', 'css', 'js', 'commonjs']);
