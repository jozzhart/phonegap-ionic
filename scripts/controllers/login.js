angular.module('app')
.controller('LoginCtrl', function ($scope, $rootScope, $location, UserService) {

  $scope.onSignUp = function() {
    UserService.create($scope.register, function(err, user) {
      if(err) return;

      $location.path('/');
      $rootScope.$broadcast('LOGGED_IN');
    });
  };
});
