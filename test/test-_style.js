'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');
var os = require('os');

var sassFile = 'client/styles/types/_test_component.scss',
  componentFile = 'client/styles/types/_types.scss';

describe('nobular:_style', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../_style'))
      .inDir(path.join(os.tmpdir(), './temp-test'), function(dir) {
        console.log(path.join(dir, '/client/styles/types/_types.scss'));
        fs.outputFileSync(
          path.join(dir, '/client/styles/types/_types.scss'),
          '@import \"_basic_component\";\n')
      })
      .withOptions({
        'skip-install': true
      })
      .withArguments(['test-component', 'type', 'client/styles'])
      .on('end', done);
  });

  it('creates sass file', function() {
    assert.file([sassFile]);
  });

  it('should add import to component basic styles', function() {
    assert.fileContent(componentFile,
      '@import "test_component";')
  });
});
