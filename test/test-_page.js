'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('nobular:_page', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../_page'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withArguments(['about page', 'About Page', 'client/test-pages'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'client/test-pages/about_page/index.html',
      'client/test-pages/about_page/about_page.js',
      'client/test-pages/about_page/about_page.spec.js'
    ]);
  });

  it('inserts page title', function() {
    assert.fileContent('client/test-pages/about_page/index.html',
      '{"title": "About Page"}'
    );
  });

  it('inserts script name', function() {
    assert.fileContent('client/test-pages/about_page/index.html',
      '{"script": "about_page.js"}'
    );
  });

  it('inserts app name and controller name', function() {
    assert.fileContent('client/test-pages/about_page/index.html',
      'ng-app="AboutPageApp"\n    ng-controller="AboutPageCtrl"'
    );

    assert.fileContent('client/test-pages/about_page/about_page.js',
      'angular\.module\(\'AboutPageApp\', \[\]\)\n\.controller\(\'AboutPageCtrl'
    );

    assert.fileContent('client/test-pages/about_page/about_page.spec.js',
      'describe\(\'AboutPageApp\','
    );

    assert.fileContent('client/test-pages/about_page/about_page.spec.js',
      'describe\(\'AboutPageApp\''
    );

    assert.fileContent('client/test-pages/about_page/about_page.spec.js',
      'controller\(\'AboutPageCtrl\','
    );
  });
});
