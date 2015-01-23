'use strict';
var yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  config = require('../app/templates/gulp/config'),
  type = 'model';

var DeploydGenerator = yeoman.generators.Base.extend({
  writing: {
    scaffoldFolders: function() {
      this.mkdir('server');
      this.mkdir('server/resources');
    },
    deployd: function() {
      this.writeFileFromString('\{\}','server/app.dpd');
    }
  },
});

module.exports = DeploydGenerator;
