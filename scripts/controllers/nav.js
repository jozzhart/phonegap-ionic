angular.module('app')
.controller('NavCtrl', function ($scope, $rootScope, $location, UserService, $ionicSideMenuDelegate) {

  $scope.leftButtons = [{
    type: 'button-icon button-clear ion-navicon',
    tap: function(e) {
      $ionicSideMenuDelegate.toggleLeft($scope);
    }
  }];

  var getUser = function() {
    UserService.get(function(err, user) {
      if(err) return console.log('error getting user');
      $scope.user = user;
      $rootScope.globals.user = user;
    });
  };

  getUser();
  $rootScope.$on('LOGGED_IN', getUser);
});
