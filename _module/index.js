'use strict';
var yeoman = require('yeoman-generator'),
  chalk = require('chalk');

var ModuleGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.argument('componentName', {
      required: true,
      type: String,
      desc: 'The name of the module (e.g. dialog)'
    });

    this.argument('moduleType', {
      required: true,
      type: String,
      desc: 'The type of module (e.g. component, service, etc.)'
    });

    this.argument('folder', {
      required: true,
      type: String,
      desc: 'The folder where component will be created'
    });
  },

  writing: {
    scaffoldFolders: function() {
      this.mkdir(this.folder);
    },

    files: function() {
      if(!this.componentName) {
        return console.error(chalk.red('A module name is required'));
      }

      var componentName = this._.classify(this.componentName),
        fileName = this._.underscored(componentName),
        filePrefix = this.folder + '/' + fileName + '/' + fileName,
        jsFile =  filePrefix + '.js',
        specFile = filePrefix + '.spec.js';

      var context = {
        component_name: componentName,
        module_type: this.moduleType,
        ng_module_name: this.config.get('modulePrefix') + '.'
                        + this.moduleType + 's'
      };
      this.template('_file.js', jsFile, context);
      this.template('_file.spec.js', specFile, context);

      console.log(chalk.green('Files written. Add any dependencies to module ' +
        'config in config/init.js'));
    }
  },
});

module.exports = ModuleGenerator;
