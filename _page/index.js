'use strict';
var yeoman = require('yeoman-generator');

var BasePageGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.argument('pageName', {
      required: true,
      type: String,
      desc: 'Name for the page (used for file and folder names and eventually routes, e.g. about) ?'
    });

    this.argument('pageTitle', {
      required: true,
      type: String,
      desc: 'The full title for the HTML page'
    });

    this.argument('folder', {
      required: true,
      type: String,
      desc: 'The folder where files are to be created'
    });
  },

  writing: {
    scaffoldFolders: function() {
      this.mkdir(this.folder);
    },

    files: function() {
      var appName = this._.classify(this.pageName),
        fileName  = this._.underscored(this.pageName),
        filePrefix = this.folder + '/' + fileName + '/' + fileName,
        htmlFile  = this.folder + '/' + fileName + '/index.html',
        jsFile    = filePrefix + '.js',
        specFile  = filePrefix + '.spec.js';

      var context = {
        page_name: fileName,
        page_title: this.pageTitle,
        ng_app_name: appName + 'App',
        ng_ctrl_name: appName + 'Ctrl'
      };

      this.template('_index.html', htmlFile, context);
      this.template('_page.js', jsFile, context);
      this.template('_page.spec.js', specFile, context);
    }
  }
});

module.exports = BasePageGenerator;
