'use strict';
var yeoman = require('yeoman-generator'),
  chalk = require('chalk');

var ModuleGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.argument('moduleName', {
      required: true,
      type: String,
      desc: 'The name of the module (e.g. dialog)'
    });

    this.argument('moduleType', {
      required: true,
      type: String,
      desc: 'The type of module (e.g. component, service, etc.)'
    });

    this.folder = 'client/' + this.moduleType
                  + 's/' + this.moduleName;
  },

  writing: {
    scaffoldFolders: function() {
      this.mkdir(this.folder);
    },

    files: function() {
      var jsFile = this.folder + '/' + this.moduleName + '.js',
        specFile = this.folder + '/' + this.moduleName + '.spec.js',
        initFile = 'client/config/init.js';

      var context = {
        module_name: this.moduleName,
        module_type: this.moduleType,
        ng_module_name: this.config.get('modulePrefix')
                        + '.' + this.moduleType + 's'
      };
      this.template('_file.js',  jsFile, context);
      this.template('_file.spec.js', specFile, context);

      console.log(chalk.green('Files written. Add any dependencies to module ' +
                  'config in config/init.js'));

      // this.writeFileFromString(
      //   this.readFileAsString(initFile)
      //   + 'angular.module(\' + context.ng_module_name + \', []);',
      //   initFile
      // );
    }
  }
});

module.exports = ModuleGenerator;
