'use strict';
var yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  config = require('../app/templates/gulp/config');

var PageGenerator = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('page') + ' subgenerator!'
    ));

    var prompts = [{
      name: 'pageName',
      message: 'Name for the page ' +
        chalk.blue('(used for file and folder names and eventually '
          + 'routes, e.g. about) ?')
    }, {
      name: 'pageTitle',
      message: 'What is the full page title ' +
        chalk.blue('(used for HTML page title, e.g. My Home Page)') + ' ?'
    }];

    this.prompt(prompts, function(props) {
      this.composeWith('ng-multipage:_page', {
        args: [
          props.pageName,
          props.pageTitle,
          config.src.pages
        ]
      });
      done();
    }.bind(this));
  },
});

module.exports = PageGenerator;
