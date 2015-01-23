'use strict';

var path = require('path');
var os = require('os');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('nobular:app with firebase', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withPrompts({
        projectName: 'Project Test',
        modulePrefix: 'pt',
        server: 'firebase',
        firebaseURL: 'test-url'
      })
      .withArguments(['skip-install'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      '.gitignore',
      'client/pages/index.html',
      'client/pages/main.js',
      '.yo-rc.json',
      'gulpfile.js',
      'client/styles/main.scss',
      'client/resources/resources.js'
    ]);
  });

  it('creates default styles files', function() {
    assert.fileContent('client/styles/main.scss',
      '// bower:scss\n// endbower\n\n');
    assert.fileContent('client/styles/main.scss',
      '@import "base/base";\n'
      + '@import "lib/lib";');
    assert.fileContent('client/styles/main.scss',
      '@import "patterns/patterns";\n@import "pages/pages";\n'
      + '@import "components/components";');

  });

  it('creates firebase resoures', function() {
    assert.fileContent('client/config/init.js',
      'angular.module(\'pt.resources\', [\'firebase\']);');

    assert.fileContent('client/resources/resources.js',
      'function($firebase)');
    assert.noFileContent('client/includes/_footer.html',
      '/dpd\.js');
  });
});
