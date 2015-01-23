'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');
var os = require('os');

describe('nobular:_server', function() {
  before(function (done) {
    helpers.run(path.join(__dirname, '../_server'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

  it('creates files', function() {
    assert.file(['server/app.dpd', 'server/resources']);
  });
});
