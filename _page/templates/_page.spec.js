describe('<%= ng_app_name %>', function() {
  var scope;

  beforeEach(function() {
    // load the module to be tested
    module('<%= ng_app_name %>');
    // inject dependencies
    inject(function($rootScope) {
      scope = $rootScope.$new();
    });
  });

  it('should be defined', function() {
    expect(scope).toBeDefined();
  });
});
