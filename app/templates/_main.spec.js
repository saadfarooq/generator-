describe('HomePageApp', function() {
  var scope, ctrl;

  beforeEach(function() {
    // load the module to be tested
    module('HomePageApp');
    // inject dependencies
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('HomePageCtrl', {
          $scope: scope
      });
    });
  });

  it('should be defined', function() {
    expect(ctrl).toBeDefined();
    expect(scope).toBeDefined();
  });
});
