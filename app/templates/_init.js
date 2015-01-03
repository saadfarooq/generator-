'use strict';
/*
* All modules and their dependencies are declared here
* Instances can then just use the angular.module(name) syntax
*/
angular.module('<%= module_prefix %>.components',
                [/* examples: 'ui.bootstrap.modal', 'ui.bootstrap.tpls', 'ui.bootstrap.tooltip'*/]);
angular.module('<%= module_prefix %>.resources', []);
angular.module('<%= module_prefix %>.models', ['<%= module_prefix %>.resources']);
angular.module('<%= module_prefix %>.services', []);
