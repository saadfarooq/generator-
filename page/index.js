'use strict';
var yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

var PageGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    // TODO: Better prompting when no argument provided
    this.argument('pageName', {
      required: true,
      type: String,
      desc: 'Name for the page ' +
        chalk.blue('(used for file and folder names and eventually ' + ' routes, e.g. about) ?')
    });
  },

  prompting: function() {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('page') + ' generator!'
    ));

    var prompts = [{
      name: 'pageTitle',
      message: 'What is the full page title ' +
        chalk.blue('(used for HTML page title, e.g. My Home Page)') + ' ?'
    }];

    this.prompt(prompts, function(props) {
      this.pageTitle = props.pageTitle;
      this.folder = 'client/pages/' + this.pageName;
      done();
    }.bind(this));
  },

  writing: {
    scaffoldFolders: function() {
      this.mkdir(this.folder);
    },

    files: function() {
      var htmlFile  = this.folder + '/index.html',
        jsFile      = this.folder + '/' + this.pageName + '.js';

      var context = {
        page_name: this.pageName,
        page_title: this.pageTitle,
        module_name: toTitleCase(this.pageName),
        app_name: toTitleCase(this.pageName) + 'App',
        ctrl_name: toTitleCase(this.pageName) + 'Ctrl'
      };
      this.template('_index.html', htmlFile, context);
      this.template('_page.js', jsFile, context);
    }
  }
});

module.exports = PageGenerator;
