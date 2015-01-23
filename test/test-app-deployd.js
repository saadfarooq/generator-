'use strict';

var path = require('path');
var os = require('os');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var deps = [
  [helpers.createDummyGenerator(), 'nobular:_server']
];

describe('nobular:app with deployd', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['skip-install'])
      .withGenerators(deps)
      .withPrompts({
        projectName: 'Project Test',
        modulePrefix: 'pt',
        server: 'deployd',
        firebaseUrl: ''
      })
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

  it('creates deployd resoures', function() {
    assert.fileContent('client/config/init.js',
      'angular.module(\'pt.resources\', []);');

    assert.fileContent('client/resources/resources.js',
      '\'res\', function()');
    assert.fileContent('client/includes/_footer.html',
      '/dpd\.js');
  });
});
