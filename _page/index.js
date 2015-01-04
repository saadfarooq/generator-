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
      var htmlFile = this.folder + '/index.html',
        jsFile = this.folder + '/' + this.pageName + '.js',
        specFile = this.folder + '/' + this.pageName + '.spec.js';

      var context = {
        page_name: this.pageName,
        page_title: this.pageTitle,
        module_name: this._.capitalize(this.pageName),
        ng_app_name: this._.capitalize(this.pageName + 'App'),
        ng_ctrl_name: this._.capitalize(this.pageName + 'Ctrl')
      };

      this.template('_index.html', htmlFile, context);
      this.template('_page.js', jsFile, context);
      this.template('_page.spec.js', specFile, context);
    }
  }
});

module.exports = BasePageGenerator;
