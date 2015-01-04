'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Angular ' + chalk.red('NgMultipage') + ' generator!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What is the project name to use for your app ?'
    }, {
      name: 'modulePrefix',
      message: 'What prefix do you want to use to identify Angular modules ' + '(e.g. xx.models, xx.services, etc) ?'
    }];

    this.prompt(prompts, function(props) {
      this.projectName = props.projectName;
      this.modulePrefix = props.modulePrefix;
      this.config.set(props);
      done();
    }.bind(this));
  },

  writing: {
    scaffoldFolders: function() {
      this.mkdir("client");
      this.mkdir("client/styles");
      this.mkdir("client/images");
      this.mkdir("client/fonts");
      this.mkdir("client/pages");
      this.mkdir("client/components");
      this.mkdir("client/services");
      this.mkdir("client/config");
    },

    app: function() {
      var packageName = this._.slugify(this.projectName);
      var context = {
        package_name: packageName
      };
      this.template('_package.json', 'package.json', context);
      this.template('_bower.json', 'bower.json', context);
      this.copy('_bowerrc', '.bowerrc');
    },

    page: function() {
      this.copy('_index.html', 'client/pages/index.html');
      this.copy('_main.js', 'client/pages/main.js');
      this.copy('_footer.html', 'client/includes/_footer.html');
      this.copy('_header.html', 'client/includes/_header.html');
    },

    projectfiles: function() {
      this.copy('_editorconfig', '.editorconfig');
      this.copy('_jshintrc', '.jshintrc');
      this.copy('_gitignore', '.gitignore');
    },

    build: function() {
      this.directory('gulp', 'gulp');
      this.copy('_gulpfile.js', 'gulpfile.js');
    },

    config: function() {
      var context = {
        module_prefix: this.modulePrefix
      };
      this.template('_init.js', 'client/config/init.js', context);
    }
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
