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
      this.mkdir('client');
      this.mkdir('client/images');
      this.mkdir('client/fonts');
      this.mkdir('client/pages');
      this.mkdir('client/components');
      this.mkdir('client/services');
      this.mkdir('client/config');
      this.mkdir('client/resources');
      this.mkdir('client/styles');
      this.mkdir('client/styles/base');
      this.mkdir('client/styles/lib');
      this.mkdir('client/styles/components');
      this.mkdir('client/styles/pages');
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
      var context = {
        module_prefix: this.config.get('modulePrefix')
      };
      this.copy('_index.html', 'client/pages/index.html');
      this.template('_main.js', 'client/pages/main.js', context);
      this.directory('_includes', 'client/includes');
    },

    resources: function() {
      var context = {
        module_prefix: this.config.get('modulePrefix'),
        firebase_url: 'flickering-inferno-7472.firebaseio.com'
      };
      this.template('resources/_firebase.js', 'client/resources/resources.js', context);
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
        module_prefix: this.modulePrefix,
        res_deps: 'firebase'
      };
      this.template('_init.js', 'client/config/init.js', context);
    },

    styles: function() {
      this.copy('_main.scss', 'client/styles/main.scss');
      this.copy('styles/_empty.scss', 'client/styles/base/_base.scss');
      this.copy('styles/_empty.scss', 'client/styles/lib/_lib.scss');
      this.copy('styles/_empty.scss', 'client/styles/components/_components.scss');
      this.copy('styles/_empty.scss', 'client/styles/pages/_pages.scss');
    },

    installResourceLibrary: function() {
      this.bowerInstall(['firebase'], { 'save': true });
      this.bowerInstall(['angularfire'], { 'save': true });
    }
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
