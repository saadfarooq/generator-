angular.module('<%= module_prefix %>.resources')
.factory('res', function($firebase) {
  var ref = new Firebase('<%= firebase_url %>');
  var res = $firebase(ref);
  return res;
});
