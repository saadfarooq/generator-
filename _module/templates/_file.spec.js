describe('<%= component_name %>', function() {
  var scope;

  beforeEach(function() {
    module('<%= ng_module_name %>');
    inject(function($rootScope) {
      scope = $rootScope.$new();
    });
  });

  it('should be defined', function() {
    expect(scope).toBeDefined();
  });
});
