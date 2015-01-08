'use strict';
var yeoman = require('yeoman-generator'),
  chalk = require('chalk');

var StyleGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.argument('componentName', {
      required: true,
      type: String,
      desc: 'The name of the module (e.g. dialog)'
    });

    this.argument('moduleType', {
      required: true,
      type: String,
      desc: 'The type of module (e.g. component, etc.)'
    });

    this.argument('folder', {
      required: true,
      type: String,
      desc: 'The folder where component will be created'
    });
  },

  writing: {
    scaffoldFoldersIfNeeded: function() {
      this.mkdir(this.folder);
    },

    files: function() {
      if (!this.componentName) {
        return console.error(chalk.red('A module name is required'));
      }

      var fileName = this._.underscored(this.componentName),
        componentFolder = this.folder + '/' + this.moduleType + 's',
        baseFile = componentFolder + '/_' + this.moduleType + 's.scss',
        file = componentFolder + '/_' + fileName + '.scss',
        fileContents = this.readFileAsString(baseFile)
                      + '@import "' + fileName + '";\n';

      var context = {
        component_name: fileName
      }

      this.template('_empty.scss', file, context);
      this.writeFileFromString(fileContents, baseFile);
      console.log(
          chalk.green('Add styles for ' + this.componentName + ' in ' + file));
    }
  },
});

module.exports = StyleGenerator;
