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
      'Welcome to the ' + chalk.red('nobular') + ' project generator!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What is the project name to use for your app ?'
    }, {
      name: 'modulePrefix',
      message: 'What prefix do you want to use to identify Angular modules ' +
        '(e.g. xx.models, xx.services, etc) ?'
    }, {
      type: 'list',
      name: 'server',
      message: 'Which nobackend server do you want to use ?',
      choices: [{
        name: 'Firebase',
        value: 'firebase'
      }, {
        name: 'Deployd',
        value: 'deployd'
      }]
    }, {
      when: function(props) { return props.server == 'firebase' },
      name: 'firebaseUrl',
      message: 'What is the URL for your firebase backend ?'
    }];

    this.prompt(prompts, function(props) {
      this.projectName = props.projectName;
      this.modulePrefix = props.modulePrefix;
      this.firebaseUrl = props.firebaseUrl;
      this.server = props.server;
      // write to .yo-rc.json to read in subgenerators
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
      if (this.server != 'firebase') {
        this.invoke('nobular:_server');
      }
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
        module_prefix: this.config.get('modulePrefix'),
        dpd_js: this.server == 'firebase' ? '' :
        '<script src="/dpd.js"></script>'
      };
      this.copy('_index.html', 'client/pages/index.html');
      this.template('_main.js', 'client/pages/main.js', context);
      this.template('_main.spec.js', 'client/pages/main.spec.js', context);
      this.copy('_includes/_header.html', 'client/includes/_header.html');
      this.template('_includes/_footer.html', 'client/includes/_footer.html',
                  context);
    },

    resources: function() {
      var context = {
        module_prefix: this.config.get('modulePrefix'),
        firebase_url: this.firebaseUrl
      };
      this.template('_resources/' + this.server + '.js',
                      'client/resources/resources.js', context);
    },

    projectfiles: function() {
      this.copy('_editorconfig', '.editorconfig');
      this.copy('_jshintrc', '.jshintrc');
      this.copy('_gitignore', '.gitignore');
    },

    build: function() {
      this.directory('gulp', 'gulp');
      this.copy('_gulpfile.js', 'gulpfile.js');
      this.copy('_tasks/' + this.server + '.js', 'gulp/tasks/server.js');
    },

    config: function() {
      var context = {
        module_prefix: this.modulePrefix,
        res_deps: this.server == 'firebase' ? '\'firebase\'' : ''
      };
      this.template('_init.js', 'client/config/init.js', context);
    },

    styles: function() {
      this.directory('_styles', 'client/styles');
    },

    installResourceLibrary: function() {
      var self = this;
      var firebaseInstall = function() {
        self.bowerInstall(['firebase', 'angularfire'], { 'save': true });
        self.npmInstall(['gulp-connect'], { 'save-dev': true });
      };
      var deploydInstall = function() {
        self.npmInstall('deployd/deployd', { 'save': true });
        self.npmInstall(['express','tiny-lr','connect-livereload','http'],
                        { 'save-dev': true });
      };

      if (!this.options['skip-install']) {
        this.server == 'firebase' ? firebaseInstall() : deploydInstall();
      }
    }
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
