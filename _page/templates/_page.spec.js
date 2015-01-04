describe('<%= ng_app_name %>', function() {
  var scope, ctrl;

  beforeEach(function() {
    // load the module to be tested
    module('<%= ng_app_name %>');
    // inject dependencies
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('<%= ng_ctrl_name %>', {
          $scope: scope
      });
    });
  });

  it('should be defined', function() {
    expect(ctrl).toBeDefined();
    expect(scope).toBeDefined();
  });
});
