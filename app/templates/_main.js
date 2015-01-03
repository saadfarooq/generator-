angular.module('<%= module_prefix %>.pages.home',
  [
    '<%= module_prefix %>.services',
    '<%= module_prefix %>.components',
    '<%= module_prefix %>.models'
  ])
.controller('HomePageCtrl', function( $scope ) {

});
