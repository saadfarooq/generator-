'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');
var os = require('os');
var yorc = {
  "generator-nobular": {
    "modulePrefix": "mp"
  }
};
var jsFile = 'client/types/test_component/test_component.js',
  specFile = 'client/types/test_component/test_component.spec.js';

describe('nobular:_module', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../_module'))
      .inDir(path.join(os.tmpdir(), './temp-test'), function(dir) {
        fs.outputJsonSync(path.join(dir, '/.yo-rc.json'), yorc, function(err) {
          console.log(err);
        })
      })
      .withOptions({
        'skip-install': true
      })
      .withArguments(['test-component', 'type', 'client/types'])
      .on('end', done);
  });

  it('creates files', function() {
    assert.file([jsFile, specFile]);
  });

  it('creates js file', function() {
    assert.fileContent(jsFile,
      'angular.module(\'mp.types\')\n\.factory(\'TestComponent')
  });

  it('creates spec file', function() {
    assert.fileContent(specFile,
      'module(\'mp\.types\');')
  });
});
